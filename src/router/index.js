import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/publish',
                component: () => import('@/views/publish/index.vue'),
            },
            {
                path: '/profile',
                component: () => import('@/views/profile/index.vue'),
            },
            {
                path: '/article',
                component: () => import('@/views/article/index.vue'),
            },
            {
                path: '/',
                component: () => import('@/views/home/index.vue'),
            },
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
