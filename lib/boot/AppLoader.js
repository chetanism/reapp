const Container = require('dilite').Container

const Application = require('../application/Application')
const StoreConfig = require('./configLoaders/StoreConfig')
const RouterConfig = require('./configLoaders/RouterConfig')

const Router = require('../router/Router')
const StoreManager = require('../store/StoreManager')

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
      application: { type: 'ctor', ctor: Application },
      router: { type: 'ctor', ctor: Router, inject: ['configs.router'] },
      storeManager: { type: 'ctor', ctor: StoreManager, inject: ['configs.store']}
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

        // application: {
        //   type: 'factory',
        //   factory: () => new ApplicationConfig(appConfig.application)
        // }
      }
    })
  }

  addStoreServices() {
    const storeConfig = this.container.get('configs.store')
    this.container.loadServices({
      store: storeConfig.getStoreServices()
    })
  }
}


module.exports = AppLoader
