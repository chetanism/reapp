const routes = [
  {
    path: '',

    children: [
      {
        name: 'home',
        path: '',
      },

      {
        name: 'about',
        path: '/about',
      }
    ]
  }
]

module.exports = routes
