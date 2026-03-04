import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;