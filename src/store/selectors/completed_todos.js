function completedTodos(allTodos) {
  return allTodos.filter(todo => todo.completed)
}

module.exports = completedTodos
