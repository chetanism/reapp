const Container = require('dilite').Container
const traux = require('traux')
const { createModel, createStore } = traux

const Application = require('../application/Application')
const StoreConfig = require('./configLoaders/StoreConfig')

class AppLoader {
  constructor(appConfig) {
    this.container = this.initContainer()
    this.addConfigServices(appConfig)
    this.addStoreServices()
    this.addServices()
  }

  initContainer() {
    return new Container()
  }

  addServices() {
    this.container.loadServices({
      application: { type: 'ctor', ctor: Application }
    })
  }

  addConfigServices(appConfig) {
    this.container.loadServices({
      configs: {
        store: {
          type: 'factory',
          factory: container => new StoreConfig(appConfig.store, container),
          inject: ['container']
        },

        router: {
          type: 'factory',
          factory: () => new RouterConfig(appConfig.router)
        },

        application: {
          type: 'factory',
          factory: () => new ApplicationConfig(appConfig.application)
        }
      }
    })
  }

  addStoreServices() {
    const storeConfig = this.container.get('configs.store')

    this.container.loadServices({
      store: {
        models: storeConfig.modelNames.reduce((services, model) => {
          services[model] = {
            type: 'factory',
            factory: () => createModel(storeConfig.getModelDescriptor(model))
          }
          return services
        }, {}),

        store: {
          type: 'factory',
          factory: rootModel => createStore(rootModel),
          inject: [`store.models.${storeConfig.getRootModel()}`]
        }
      }
    })
  }
}


module.exports = AppLoader
