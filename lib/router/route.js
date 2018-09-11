class Route {
  constructor(options) {
    this.id = options.id
    this.path = options.path || ''
    this.children = (options.children || []).map(child => new Route(child))
    this.action = ({ next }) => {
      return next().then(child => {
        return (child !== null && child !== undefined) ? child : `Showing Page: ${this.id}`
      })
    }
  }

  getRouteConfig() {
    return {
      name: this.id,
      path: this.path,
      action: this.action,
      children: this.children.map(child => child.getRouteConfig())
    }
  }
}

module.exports = {
  Route
}