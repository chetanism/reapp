class RouterConfig {
  constructor(config) {
    this.config = config
  }

  getRoutes() {
    return this.config.routes
  }
}

module.exports = RouterConfig
