<script setup lang="ts">
import Button from 'primevue/button'
import { ref, computed } from 'vue'
import CitaList from '../components/citas/CitaList.vue'
import CitaSave from '../components/citas/CitaSave.vue'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore() // Accede al usuario autenticado
const mostrarDialog = ref<boolean>(false)
const CitaListRef = ref<typeof CitaList | null>(null)
const citaEdit = ref<any>(null)

// Filtrar citas solo del cliente autenticado
const clienteId = computed(() => authStore.user?.id || null) // Obtiene el ID del cliente autenticado

function handleCreate() {
  citaEdit.value = null // Resetea el formulario para crear una nueva cita
  mostrarDialog.value = true
}

function handleEdit(cita: any) {
  if (cita.clienteId === clienteId.value) {
    citaEdit.value = cita // Solo permite editar si la cita pertenece al cliente autenticado
    mostrarDialog.value = true
  } else {
    alert('No puedes editar citas de otros clientes.')
  }
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  CitaListRef.value?.obtenerLista() // Actualiza la lista después de guardar o editar
}
</script>

<template>
  <div class="slider-background">
    <div class="content-container">
      <h1 class="title">Citas Programadas</h1>
      <Button label="Crear Nueva Cita" icon="pi pi-plus" @click="handleCreate" />
      <CitaList ref="CitaListRef" :cliente-id="clienteId" @edit="handleEdit" />
      <CitaSave
        :mostrar="mostrarDialog"
        :cita="citaEdit"
        :modoEdicion="!!citaEdit"
        @guardar="handleGuardar"
        @close="handleCloseDialog"
      />
    </div>
  </div>
</template>

<style scoped>
.slider-background {
  background-color: #2700C1; /* Fondo sólido con el color especificado */
  min-height: 100vh; /* Asegura que cubra al menos el alto de la ventana */
  display: flex; /* Flexbox para centrar el contenido */
  justify-content: center; /* Centra el contenido horizontalmente */
  align-items: flex-start; /* Alinea el contenido al inicio vertical */
  padding: 2rem; /* Espaciado interno */
}

.content-container {
  background: rgba(255, 255, 255, 0.9); /* Fondo blanco semitransparente */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra */
  padding: 2rem; /* Espaciado interno */
  width: 100%; /* Ajusta al contenedor */
  max-width: 1200px; /* Ancho máximo */
  margin-top: 200px; /* Espaciado superior */
}

.title {
  font-size: 2rem; /* Tamaño del título */
  text-align: center; /* Centrado del título */
  margin-bottom: 1.5rem; /* Espaciado inferior */
}

</style>
