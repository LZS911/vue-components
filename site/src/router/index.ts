import { createRouter, createWebHashHistory } from 'vue-router';
import { VuePopperDemo } from '../demo';

const routes = [
  {
    path: '/',
    redirect: '/popper'
  },
  { path: '/popper', component: VuePopperDemo }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
