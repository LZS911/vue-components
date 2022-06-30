import { createRouter, createWebHashHistory } from 'vue-router';
import { VuePopperDemo, VueDropdownTableDemo } from '../demo';

const routes = [
  {
    path: '/',
    redirect: '/popper'
  },
  { path: '/popper', component: VuePopperDemo },
  { path: '/dropdown', component: VueDropdownTableDemo }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
