const AppLoader = require('./AppLoader')

function boot(appConfig) {
  const appLoader = new AppLoader(appConfig)
  const container = appLoader.container

  console.log(container.get('store.models.Genre').List)
  return container.get('application')
}

module.exports = boot
