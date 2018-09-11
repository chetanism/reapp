const routes = {
  id: 'home',
  path: '/',
  children: [
    {
      id: 'about',
      path: '/about',
    }
  ]
}

module.exports = routes
