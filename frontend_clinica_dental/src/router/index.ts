import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getTokenFromLocalStorage } from '@/helpers'
import { useAuthStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requireMainJs: true, roles: [] }, // Accesible por cualquier rol
    },
    {
      path: '/citas',
      name: 'citas',
      component: () => import('../views/CitaView.vue'),
      meta: { roles: ['cliente', 'odontologo'] }, // Accesible por ambos roles
    },
    {
      path: '/citas-cliente',
      name: 'citas-cliente',
      component: () => import('../views/CitaView.vue'),  // Componente predeterminado
      meta: { roles: ['cliente'] }, // Solo accesible por clientes
    }, 
    {
      path: '/citas-odontologo',
      name: 'citas-odontologo',
      component: () => import('../views/CitaOdontologoView.vue'),  // Componente predeterminado
      meta: { roles: ['odontologo'] }, // Solo accesible por odontólogos
    },  
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/ClienteCrudView.vue'),
      meta: { roles: ['odontologo'] },
    },
    {
      path: '/cliente-crear-cuenta',
      name: 'cliente-crear-cuenta',
      component: () => import('../views/ClienteCrearCuentaView.vue'),
      meta: { roles: [] },
    },
    {
      path: '/cliente-perfil',
      name: 'cliente-perfil',
      component: () => import('../views/ClienteView.vue'),
      meta: { roles: ['cliente'] },
    },
    {
      path: '/odontologo-perfil',
      name: 'odontologo-perfil',
      component: () => import('../views/OdontologoPerfilView.vue'),
      meta: { roles: ['odontologo'] },
    },
    {
      path: '/odontologos',
      name: 'odontologos',
      component: () => import('../views/OdontologoView.vue'),
      meta: { roles: ['odontologo'] }, // Solo accesible por odontólogos
    },
    {
      path: '/servicios',
      name: 'servicios',
      component: () => import('../views/ServiciosView.vue'),
      meta: { roles: ['odontologo'] }, // Solo accesible por odontólogos
    },
    {
      path: '/odontologo_servicios',
      name: 'odontologo_servicios',
      component: () => import('../views/OdontologoServiciosView.vue'),
      meta: { roles: ['odontologo'] }, // Solo accesible por odontólogos
    },
    {
      path: '/odontologo-cards', 
      name: 'odontologo-cards', 
      component: () => import('../views/OdontologoCardView.vue'),
      meta: { roles: [] }, // Sin restricción de rol
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { roles: [] }, // Sin restricción de rol
    },
    // Ruta comodín para manejar rutas desconocidas
    {
      path: '/:pathMatch(.*)*', // Captura cualquier ruta no definida
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/', '/login','/cliente-crear-cuenta', '/odontologo-cards'] // Páginas públicas
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()
  const userRole = authStore.role // Obtener el rol del usuario autenticado

  // Verificar si el usuario tiene un token válido
  if (authRequired && !getTokenFromLocalStorage()) {
    if (authStore) authStore.logout()
    authStore.returnUrl = to.fullPath
    return next({ name: 'login' })  // Redirige a la página de login
  }

  // Lógica para manejar la redirección según el rol en la ruta '/citas'
  if (to.name === 'citas') {
    if (userRole === 'cliente') {
      next({ name: 'citas-cliente' }) // Redirige a la vista de citas para clientes
    } else if (userRole === 'odontologo') {
      next({ name: 'citas-odontologo' }) // Redirige a la vista de citas para odontólogos
    } else {
      next({ name: 'unauthorized' }) // Redirige si no tiene un rol válido
    }
  } else {
    next() // Si la ruta no es '/citas', permite la navegación normal
  }
})

export default router
