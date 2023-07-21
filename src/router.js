import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './pages/AppHome.vue';
import ApartmentList from './pages/ApartmentList.vue';
import SingleApartment from './pages/SingleApartment.vue';

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
            name: 'apartments',
            component: ApartmentList
        },
        {
            path: '/apartment/:slug',
            name: 'apartment',
            component: SingleApartment
        },
    ]
});
export { router };