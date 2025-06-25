<script setup lang="ts">
import ClienteSave from '@/components/clientes/ClienteSaveFormulario.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast'; // Importar el hook de Toast

const clienteNuevo = ref({}); // Datos iniciales para un nuevo cliente
const router = useRouter();
const toast = useToast(); // Instancia de Toast

function handleGuardar() {
  // Mostrar un mensaje Toast
  toast.add({
    severity: 'success', // Nivel de importancia
    summary: 'Éxito', // Título del Toast
    detail: 'Cuenta creada con éxito', // Mensaje
    life: 3000, // Duración en milisegundos
  });

  router.push('/login'); // Redirige al login después de guardar
}

function handleCloseDialog() {
  // Mostrar un mensaje Toast
  toast.add({
    severity: 'info', // Nivel de importancia
    summary: 'Información', // Título del Toast
    detail: 'Formulario cerrado', // Mensaje
    life: 3000, // Duración en milisegundos
  });

  router.push('/login'); // Redirige al login si el formulario se cierra
}
</script>


<template>
    <div class="create-view">
      <div class="form-container">
        <h1 class="form-title">Registro</h1>
        <ClienteSave
          :cliente="clienteNuevo"
          :modoEdicion="false"
          @guardar="handleGuardar"
          @close="handleCloseDialog"
        />
      </div>
    </div>
  </template>
  
  <style scoped>
  .create-view {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to right, #2700C1, #0056B3); /* Fondo degradado */
    padding: 2rem;
    padding-top: 14rem;
  }
  
  .form-container {
    background: rgba(255, 255, 255, 0.95); /* Fondo blanco semitransparente */
    border-radius: 16px; /* Bordes redondeados */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3); /* Sombra más definida */
    padding: 2rem;
    width: 100%;
    max-width: 600px; /* Ancho máximo para el formulario */
    animation: fadeIn 0.5s ease-in-out; /* Animación para suavidad al cargar */
  }
  
  .form-title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1.5rem;
    color: #2700C1; /* Color del título */
    font-weight: bold;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  </style>
  