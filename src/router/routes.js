

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
    meta: { title: 'CLDfit' }
  },
  {
    path: '/menu',
    component: () => import('layouts/MainLayout.vue'),
    meta: { title: 'CLDfit' },
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'exercicio',
        name: 'exercicio',
        component: () => import('pages/ExercisesPage.vue'),
      },
      {
        path: 'serie',
        name: 'serie',
        component: () => import('pages/SeriePage.vue'),
      },
      {
        path: 'santinho',
        name: 'santinho',
        component: () => import('pages/SantoSetup.vue'),
      },
      {
        path: 'treino',
        name: 'treino',
        component: () => import('pages/TreinoPage.vue'),
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
