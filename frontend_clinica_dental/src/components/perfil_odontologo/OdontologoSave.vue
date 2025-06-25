<script setup lang="ts">
import type { Odontologo } from '../../models/Odontologo';
import { ref, watch } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

// Props: Odontologo a editar y modo edición
const props = defineProps({
  odontologo: {
    type: Object as () => Odontologo,
    default: () => ({} as Odontologo),
  },
  modoEdicion: {
    type: Boolean,
    default: true, // Por defecto está en modo edición
  },
});

// Evento para emitir al guardar
const emit = defineEmits(['guardar', 'cancelar']);

// Estado local del odontologo (clonado desde las props)
const odontologo = ref<Odontologo>({ ...props.odontologo });

// Sincronizar cambios si las props cambian
watch(
  () => props.odontologo,
  (newVal) => {
    odontologo.value = { ...newVal };
  },
);

// Función para reiniciar los valores originales
function cancelarEdicion() {
  emit('cancelar'); // Emitir evento de cancelación al padre
  odontologo.value = { ...props.odontologo }; // Reiniciar los valores
}

// Función para guardar los cambios
function guardar() {
  emit('guardar', odontologo.value); // Emitir el odontologo actualizado al padre
}
</script>


<template>
  <div class="card flex flex-column gap-4">
    <!-- Nombre -->
    <div class="form-group">
      <label for="nombre" class="font-semibold w-24">Nombre</label>
      <InputText
        id="nombre"
        v-model="odontologo.nombre"
        class="flex-auto"
        autocomplete="off"
      />
    </div>

    <!-- Primer Apellido -->
    <div class="form-group">
      <label for="primer_apellido" class="font-semibold w-24">Primer Apellido</label>
      <InputText
        id="primer_apellido"
        v-model="odontologo.primerApellido"
        class="flex-auto"
        autocomplete="off"
      />
    </div>

    <!-- Segundo Apellido -->
    <div class="form-group">
      <label for="segundo_apellido" class="font-semibold w-24">Segundo Apellido</label>
      <InputText
        id="segundo_apellido"
        v-model="odontologo.segundoApellido"
        class="flex-auto"
        autocomplete="off"
      />
    </div>

    <!-- Correo Electrónico -->
    <div class="form-group">
      <label for="email" class="font-semibold w-24">Correo</label>
      <InputText
        id="email"
        v-model="odontologo.email"
        class="flex-auto"
        autocomplete="off"
      />
    </div>

    <!-- Especialidad -->
    <div class="form-group">
      <label for="especialidad" class="font-semibold w-24">Especialidad</label>
      <InputText
        id="especialidad"
        v-model="odontologo.especialidad"
        class="flex-auto"
        autocomplete="off"
      />
    </div>

    <!-- Teléfono -->
    <div class="form-group">
      <label for="telefono" class="font-semibold w-24">Teléfono</label>
      <InputText
        id="telefono"
        v-model="odontologo.telefono"
        class="flex-auto"
        autocomplete="off"
      />
    </div>

    <!-- Dirección -->
    <div class="form-group">
      <label for="direccion" class="font-semibold w-24">Dirección</label>
      <InputText
        id="direccion"
        v-model="odontologo.direccion"
        class="flex-auto"
        autocomplete="off"
      />
    </div>

    <!-- Botones de acción -->
    <div class="button-group flex justify-end gap-2">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        class="p-button-text"
        @click="cancelarEdicion"
      />
      <Button
        label="Guardar"
        icon="pi pi-save"
        class="p-button-primary"
        @click="guardar"
      />
    </div>
  </div>
</template>



<style scoped>
.card {
  max-width: 600px; /* Ancho máximo */
  margin: 0 auto; /* Centrar */
  padding: 20px; /* Espaciado interno */
  border: 1px solid #ddd; /* Borde */
  border-radius: 8px; /* Bordes redondeados */
  background-color: #f9f9f9; /* Fondo claro */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra */
}

/* Agrupación de formulario */
.form-group {
  display: flex; /* Alinear en fila */
  align-items: center; /* Alinear verticalmente */
  gap: 10px; /* Espaciado entre etiqueta y campo */
  margin-bottom: 1rem; /* Espaciado inferior */
}

label {
  font-size: 1rem; /* Tamaño de texto */
  font-weight: bold; /* Texto en negrita */
  color: #333; /* Color del texto */
  width: 150px; /* Ancho de la etiqueta */
}

input {
  padding: 10px; /* Espaciado interno */
  border: 1px solid #ccc; /* Borde */
  border-radius: 4px; /* Bordes redondeados */
  font-size: 1rem; /* Tamaño de texto */
  flex: 1; /* Expande para ocupar el espacio disponible */
}

input:focus {
  border-color: #4caf50; /* Borde verde al enfocar */
  outline: none; /* Quitar contorno por defecto */
}

/* Botones */
.button-group .p-button-primary {
  background-color: #4caf50; /* Verde principal */
  border: none;
}

.button-group .p-button-primary:hover {
  background-color: #45a049; /* Verde más oscuro */
}

.button-group .p-button-text {
  color: #f44336; /* Rojo */
}
</style>
  
