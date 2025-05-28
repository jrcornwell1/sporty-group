import { createRouter, createWebHistory } from 'vue-router';
import { ROUTE } from '../const/index.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTE.$_ROOT,
      redirect: { name: ROUTE.ALL_LEAGUES },
    },
    {
      path: '/app',
      name: ROUTE.$_APP,
      component: () => import('../components/AppFrame.vue'),
      children: [
        {
          path: '',
          name: ROUTE.$_PRIMARY_LAYOUT,
          component: () => import('../components/AppFramePage.vue'),
          children: [
            {
              path: 'all-leagues',
              name: ROUTE.$_APP_ALL_LEAGUES,
              children: [
                {
                  path: '',
                  name: ROUTE.ALL_LEAGUES,
                  components: {
                    content: () => import('../components/ViewAllLeagues.vue'),
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

export const initRouter = (pinia) => {
  /**
   * Do things before navigation has resolved
   */
  router.beforeResolve(async (to, from) => {
    const isHardRefresh = typeof from.name === 'undefined';

    /**
     * Only run these if it's a hard page load
     */
    if (isHardRefresh) {
      //
    }
  });

  return router;
};

export default router;
