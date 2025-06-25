<script setup lang="ts">
import { ref, computed } from 'vue'
import CitaOdontologoList from '../components/citas/CitaOdontologoList.vue'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore() // Accede al usuario autenticado
const CitaOdontologoListRef = ref<typeof CitaOdontologoList | null>(null)

// Filtrar citas solo del cliente autenticado
const clienteId = computed(() => authStore.user?.id || null) // Obtiene el ID del cliente autenticado

</script>

<template>
  <div class="slider-background">
    <div class="content-container">
      <h1 class="title">Citas Programadas</h1>
      <CitaOdontologoList ref="CitaOdontologoListRef" :cliente-id="clienteId" />
    </div>
  </div>
</template>

<style scoped>
.slider-background {
  background-image: url('@/assets/images/slider/slider-1.png');
  background-size: cover; /* Escala la imagen para cubrir todo el contenedor */
  background-repeat: no-repeat; /* Evita que se repita */
  background-position: center; /* Centra la imagen */
  min-height: 100vh; /* Asegura que ocupe al menos el alto de la ventana */
  display: flex; /* Habilita el centrado del contenido */
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  padding: 2rem; /* Espaciado interno */
}

.content-container {
  background: rgba(255, 255, 255, 0.9); /* Fondo blanco semitransparente */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra */
  padding: 2rem; /* Espaciado interno */
  width: 100%; /* Ajusta al contenedor */
  max-width: 1200px; /* Ancho máximo */
  margin-top: 200px;
}

.title {
  font-size: 2rem; /* Tamaño del título */
  text-align: center; /* Centrado del título */
  margin-bottom: 1.5rem; /* Espaciado inferior */
}
</style>
