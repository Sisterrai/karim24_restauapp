import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from "./supabase/supabase"

// Pages client
import Accueil from "./pages/client/Accueil.vue"
import Menue from "./pages/client/Menue.vue"
import APropos from "./pages/client/APropos.vue"
import Commander from "./pages/client/Commander.vue"

// Pages admin
import Dashboard from './pages/admin/Dashboard.vue'
import Commandes from './pages/admin/Commandes.vue'
import MenuGestion from './pages/admin/MenuGestion.vue'
import Parametres from './pages/admin/Parametres.vue'
import LoginAdmin from "./pages/admin/LoginAdmin.vue"
import Unauthorized from './pages/admin/Unauthorized.vue'
import DashboardStats from './components/DashboardStats.vue'

let localUser;

// lesroutes
export const routes = [
  // Routes client
  { path: '/', component: Accueil },
  { path: '/menue', component: Menue },
  { path: '/a-propos', component: APropos },
  { path: '/commander', component: Commander },

  // Routes admin
  {
    path: '/admin',
    component: Dashboard,
    children: [
      { path: 'commandes', component: Commandes, meta: {requiresAuth: true} },
      { path: 'menu', component: MenuGestion, meta: {requiresAuth: true} },
      { path: 'parametres', component: Parametres, meta: {requiresAuth: true} },
      { path: 'dashboardstats', component: DashboardStats, meta: {requiresAuth: true} },
      { path: 'login', component: LoginAdmin },
      { path: 'unauthorized', component: Unauthorized },

    ]
  },

]

// Création du router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Fonction pour vérifier si l'utilisateur est connecté
async function getUser() {
  localUser = await supabase.auth.getSession();
  if (localUser.data.session == null) {
    next('/unauthorized')
  } else {
    next()
  }
}

//protection des pages
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    getUser(next)

  } else {
    next()
  }
})

export default router
