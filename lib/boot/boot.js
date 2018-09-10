const AppLoader = require('./AppLoader')

function boot(appConfig) {
  const appLoader = new AppLoader(appConfig)
  const container = appLoader.container

  return container.get('application')
}

module.exports = boot
