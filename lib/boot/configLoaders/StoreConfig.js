const traux = require('traux')
const { createModel, createStore } = traux
const createSelector = require('reselect').createSelector


class StoreConfig {
  constructor(config, container) {
    this.config = config
    this.container = container
    this.modelNames = Reflect.ownKeys(config.models)
  }

  getRootModel() {
    return this.config.store.rootModel
  }

  getModelDescriptor(modelName) {
    const modelConfig = this.config.models[modelName]
    const descriptor = { ...modelConfig }

    descriptor.propTypes = Reflect.ownKeys(modelConfig.propTypes).reduce((propTypes, prop) => {
      if (modelConfig.propTypes[prop].type === 'VALUE') {
        propTypes[prop] = modelConfig.propTypes[prop].defaultValue

      } else if (modelConfig.propTypes[prop].type === 'MODEL') {
        propTypes[prop] = this.getModel(modelConfig.propTypes[prop].model)
      }

      return propTypes
    }, {})

    return descriptor
  }

  getModel(name) {
    const [modelName, ...modelContainers] = name.split('.')
    let model = this.container.get(`store.models.${modelName}`)
    for (const modelContainer of modelContainers) {
      model = model[modelContainer]
    }
    return model
  }

  buildModelServices() {
    return this.modelNames.reduce((services, model) => {
      services[model] = {
        type: 'factory',
        factory: () => createModel(this.getModelDescriptor(model))
      }
      return services
    }, {})
  }

  buildSelectorServices(selectors, path = []) {
    return Reflect.ownKeys(selectors).reduce((services, key) => {
      if (typeof selectors[key] === 'function') {
        services[key + '__Selector__'] = {
          type: 'value',
          value: selectors[key]
        }

        services[key] = {
          type: 'factory',
          factory: store => selectors[key](store.state),
          inject: ['store.store'],
          singleton: false
        }

      } else if (typeof selectors[key] === 'object') {
        if (selectors[key].selector) {
          services[key + '__Selector__'] = {
            type: 'factory',
            factory: (...args) => createSelector(...args, selectors[key].selector),
            inject: (selectors[key].inject || []).map(d => `store.selectors.${d}__Selector__`)
          }

          services[key] = {
            type: 'factory',
            factory: (selector, store) => selector(store.state),
            inject: [`store.selectors.${path.join('.')}.${key}__Selector__`, 'store.store'],
            singleton: false
          }
        } else {
          services[key] = this.buildSelectorServices(selectors[key], [...path, key])
        }
      }

      return services
    }, {})
  }

  getStoreServices() {
    return {
      models: this.buildModelServices(),

      store: {
        type: 'factory',
        factory: rootModel => createStore(rootModel),
        inject: [`store.models.${this.getRootModel()}`],
        singleton: true
      },

      selectors: this.buildSelectorServices(this.config.selectors)
    }
  }
}


module.exports = StoreConfig
