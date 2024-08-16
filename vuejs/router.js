
import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '@/components/LoginComponent.vue';
import RegisterPage from '@/components/RegisterPage.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginComponent, 
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;