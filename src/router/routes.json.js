const routes = {
  id: 'home',
  path: '/todos',

  children: [
    {
      id: 'list',
      path: '',
      page: 'TodosPage'
    },
    {
      id: 'new',
      path: '/new',
      page: 'NewTodoPage'
    },
    {
      id: 'show',
      path: '/:todoId',
      // page: 'ShowTodoPage'
      action: () => 'ShowTodosPage'
    }
  ]
}

module.exports = routes
