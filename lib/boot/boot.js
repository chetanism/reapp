const AppLoader = require('./AppLoader')

function boot(appConfig) {
  const appLoader = new AppLoader(appConfig)
  const container = appLoader.container

  const router = container.get('router')
  router.resolveRoute('/').then(x => console.log(x))

  return container.get('application')
}

module.exports = boot
