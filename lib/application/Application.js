const colors = require('colors')


class Application {
  constructor(config) {
    this.config = config
  }

  start() {
    console.info(colors.blue(`Starting Application...`))
  }
}

module.exports = Application
