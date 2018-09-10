const config = {
  models: {
    Genre: require('./models/genre'),
    Movie: require('./models/movie')
  },

  store: {
    rootModel: 'Movie'
  }
}

module.exports = config
