const Dlite = require('dilite').Dlite
const { Container } = Dlite
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
      application: Dlite.ctor(Application)
    })
  }

  addConfigServices(appConfig) {
    this.container.loadServices({
      configs: {
        store: Dlite.factory(
          container => new StoreConfig(appConfig.store, container),
          ['container']
        ),

        router: Dlite.factory(
          () => new RouterConfig(appConfig.router)
        ),

        application: Dlite.factory(
          () => new ApplicationConfig(appConfig.application)
        )
      }
    })
  }

  addStoreServices() {
    const storeConfig = this.container.get('configs.store')

    this.container.loadServices({
      store: {
        models: storeConfig.modelNames.reduce((services, model) => {
          services[model] = Dlite.factory(
            () => createModel(storeConfig.getModelDescriptor(model))
          )
          return services
        }, {}),

        store: Dlite.factory(
          rootModel => createStore(rootModel),
          [`store.models.${storeConfig.getRootModel()}`]
        )
      }
    })
  }
}


module.exports = AppLoader
