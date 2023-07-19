import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './pages/AppHome.vue';
import ApartmentList from './pages/ApartmentList.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
        path: '/',
        name: 'home',
        component: AppHome
        },
        {
        path: '/apartment',
        name: 'apartment',
        component: ApartmentList
        },
    ]
});
export { router };