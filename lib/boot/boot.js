const AppLoader = require('./AppLoader')

function boot(appConfig) {
  const appLoader = new AppLoader(appConfig)
  const container = appLoader.container

  const router = container.get('router')
  router.resolveRoute('/todos/show').then(x => console.log(x))

  // console.log(container.initializers)
  const store = container.get('store')
  console.log(store.store.state)

  store.store.transforms.todoList.todos.add({
    id: 1,
    title: 'Test',
    description: 'Test Todo',
    completed: false
  })

  store.store.transforms.todoList.todos.add({
    id: 2,
    title: 'Test',
    description: 'Test Todo',
    completed: true
  })

  console.log(store.store.state)

  console.log(1, container.get('store.selectors.todos.all'))
  console.log(2, container.get('store.selectors.todos.completed'))
  console.log(3, container.get('store.selectors.todos.pending'))

  store.store.transforms.todoList.todos.add({
    id: 3,
    title: 'Test',
    description: 'Test Todo',
    completed: false
  })

  console.log(4, container.get('store.selectors.todos.all'))
  console.log(5, container.get('store.selectors.todos.pending'))


  return container.get('application')
}

module.exports = boot
