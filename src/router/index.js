import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Prijava from "@/views/Prijava";
import Profil from "@/views/Profil";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Prijava',
    component: Prijava
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
