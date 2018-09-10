const winston = require('winston')

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
}

const logger = Reflect.ownKeys(levels).reduce((logger, level) => {
  console.log(logger)

  logger[level] = winston.createLogger({
    level: level,
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.simple
  })
  console.log(logger[level].log)

  logger[level].log(1)

  return logger
}, {})

module.exports = logger

/// UNUSED; FIX IT