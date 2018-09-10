const config = require('./config.json')
const boot = require('../../lib/boot/boot')


const application = boot(config)
application.start()
