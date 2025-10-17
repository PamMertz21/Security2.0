
import { createRouter, createWebHistory } from 'vue-router';

import Home from './components/HomePage.vue';
import Dashboard from './components/UserDashboard.vue';
import ForgotPassword from './components/ForgotPassword.vue';
import SignupForm from './components/SignupForm.vue';
import LoginForm from './components/LoginForm.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: LoginForm },
  { path: '/signup', name: 'signup', component: SignupForm },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '/forgot', name: 'forgot', component: ForgotPassword }
];

// Use Vite's base (set in vite.config.js) for history so router works when app is served from /Security/
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// disable back button only when user is on login
router.afterEach((to) => {
  if (to.name === 'login') {
    history.pushState(null, document.title, location.href);
    window.onpopstate = () => {
      history.pushState(null, document.title, location.href);
    };
  } else {
    window.onpopstate = null;
  }
});

export default router;
