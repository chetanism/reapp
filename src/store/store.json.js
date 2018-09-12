const config = {
  models: require('./models/models.json'),

  store: {
    rootModel: 'App'
  },

  selectors: require('./selectors/selectors.json')
}

module.exports = config
