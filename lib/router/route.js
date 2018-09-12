class Route {
  constructor(options) {
    this.id = options.id
    this.path = options.path || ''
    this.children = (options.children || []).map(child => new Route(child))
    this.page = options.page
    this.action = options.action
  }

  getRouteConfig() {
    const config = {
      name: this.id,
      path: this.path,
      action: this.action,
      page: this.page
    }

    if (this.children.length > 0) {
      config.children = this.children.map(child => child.getRouteConfig())
    }

    return config
  }
}

module.exports = {
  Route
}