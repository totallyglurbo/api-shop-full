import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";

function isAuthenticated(to, from, next) {
    if (store.getters.isAuthenticated) {
        next();
    } else {
        next('/login');
    }
}

function ifNotAuthenticated(to, from, next) {
    if (!store.getters.isAuthenticated) {
        next();
    } else {
        next('/');
    }
}

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/register.vue'),
       beforeEnter: ifNotAuthenticated,
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;