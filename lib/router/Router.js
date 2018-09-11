const UniversalRouter = require('universal-router')
const Route = require('./route').Route


class Router {
  constructor(routerConfig) {
    this.config = routerConfig
    this.routes = this.loadRoutes()
    this.router = this.buildRouter()
  }

  loadRoutes() {
    return new Route({
      id: '__root_route__',
      children: [this.config.getRoutes()]
    })
  }

  buildRouter() {
    return new UniversalRouter(this.routes.getRouteConfig())
  }

  resolveRoute(pathname) {
    return this.router.resolve({ pathname })
  }
}

module.exports = Router
