const movie = {
  propTypes: {
    homepage: { type: 'VALUE', defaultValue: '' },
    id: { type: 'VALUE', defaultValue: '' },
    overview: { type: 'VALUE', defaultValue: '' },
    popularity: { type: 'VALUE', defaultValue: '' },
    posterPath: { type: 'VALUE', defaultValue: '' },
    title: { type: 'VALUE', defaultValue: '' },
    tagLine: { type: 'VALUE', defaultValue: '' },
    voteAverage: { type: 'VALUE', defaultValue: '' },
    voteCount: { type: 'VALUE', defaultValue: '' },
    genres: { type: 'MODEL', model: 'Genre.List' }
  }
}

module.exports = movie
