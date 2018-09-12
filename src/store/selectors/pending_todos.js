function pendingTodos(allTodos) {
  return allTodos.filter(todo => !todo.completed)
}

module.exports = pendingTodos
