const todoList = {
  propTypes: {
    todos: { type: 'MODEL', model: 'Todo.List' },
    visibilityFilter: { type: 'VALUE', defaultValue: 'SHOW_ALL' }
  }
}

module.exports = todoList
