const selectors = {
  todos: {
    all: require('./all_todos'),

    completed: {
      selector: require('./completed_todos'),
      inject: ['todos.all']
    },
    pending: {
      selector: require('./pending_todos'),
      inject: ['todos.all']
    }
  }
}

module.exports = selectors
