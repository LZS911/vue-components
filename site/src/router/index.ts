import { createRouter, createWebHashHistory } from 'vue-router';
import { VuePopperDemo, VueDropdownTableDemo, VueDirectivesDemo } from '../demo';

const routes = [
  {
    path: '/',
    redirect: '/popper'
  },
  { path: '/popper', component: VuePopperDemo },
  { path: '/dropdown', component: VueDropdownTableDemo },
  { path: '/directives', component: VueDirectivesDemo }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
