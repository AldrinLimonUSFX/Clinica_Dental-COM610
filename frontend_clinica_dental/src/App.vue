<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import MainHeader from '@/components/MainHeader.vue'
import MainFooter from '@/components/MainFooter.vue'

import { useAuthStore } from '@/stores' // Importa la tienda de autenticación
import '@/assets/js/plugins/bootstrap.min.js'
import '@/assets/js/main.js'

// Reimporta `main.js` en cada navegación
const route = useRoute()
const authStore = useAuthStore()

onMounted(() => {
  // Inicializa los scripts necesarios después de que el DOM esté renderizado
  console.log('Todo ok - inicializando scripts locales')

  // Verifica el token al cargar la aplicación
  authStore.validateToken()

  // Configura una validación periódica del token (cada 10 segundos)
  setInterval(() => {
    authStore.validateToken()
  }, 10000)
})

// Escucha cambios de ruta para ejecutar `main.js` nuevamente
watch(route, async newRoute => {
  if (newRoute.path === '/') {
    const { default: initializeMainScripts } = await import(
      '@/assets/js/main.js'
    )
    initializeMainScripts()
  }
})
</script>

<template>
  <MainHeader />
  <div class="main-content">
    <Toast />
    <RouterView />
  </div>
  <MainFooter />
</template>

<style>
/* Icon Font CSS */
@import '@/assets/css/plugins/font-awesome.min.css';
@import '@/assets/css/plugins/remixicon.css';
@import '@/assets/css/plugins/flaticon.css';

/* Bootstrap CSS */
@import '@/assets/css/plugins/bootstrap.min.css';

/* Animaciones CSS */
@import '@/assets/css/plugins/animate.min.css';

/* Preloader (local si no hay CDN disponible) */
@import '@/assets/css/plugins/preloader.css';
/* Main Style CSS */
@import '@/assets/css/style.css';
</style>
