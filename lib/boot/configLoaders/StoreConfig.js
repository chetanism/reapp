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
}

module.exports = StoreConfig
