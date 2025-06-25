<script setup lang="ts">
import type { Cliente } from '../../models/Cliente';
import { ref, watch } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

// Props: Cliente a editar y modo edición
const props = defineProps({
  cliente: {
    type: Object as () => Cliente,
    default: () => ({} as Cliente),
  },
  modoEdicion: {
    type: Boolean,
    default: true, // Por defecto está en modo edición
  },
});

// Evento para emitir al guardar
const emit = defineEmits(['guardar', 'cancelar']);

// Estado local del cliente (clonado desde las props)
const cliente = ref<Cliente>({ ...props.cliente });

// Sincronizar cambios si las props cambian
watch(
  () => props.cliente,
  (newVal) => {
    cliente.value = { ...newVal };
  },
);

// Función para reiniciar los valores originales
function cancelarEdicion() {
  emit('cancelar'); // Emitir evento de cancelación al padre
  cliente.value = { ...props.cliente }; // Reiniciar los valores
}

// Función para guardar los cambios
function guardar() {
  emit('guardar', cliente.value); // Emitir el cliente actualizado al padre
}
</script>


<template>
  <div class="card flex flex-column gap-4">
    <!-- Nombre -->
    <div class="form-group">
      <label for="nombre" class="font-semibold w-24">Nombre</label>
      <InputText
        id="nombre"
        v-model="cliente.nombre"
        class="flex-auto"
        autocomplete="off"
      />
    </div>

    <!-- Primer Apellido -->
    <div class="form-group">
      <label for="primer_apellido" class="font-semibold w-24">Primer Apellido</label>
      <InputText
        id="primer_apellido"
        v-model="cliente.primerApellido"
        class="flex-auto"
        autocomplete="off"
      />
    </div>

    <!-- Segundo Apellido -->
    <div class="form-group">
      <label for="segundo_apellido" class="font-semibold w-24">Segundo Apellido</label>
      <InputText
        id="segundo_apellido"
        v-model="cliente.segundoApellido"
        class="flex-auto"
        autocomplete="off"
      />
    </div>

    <!-- Correo Electrónico -->
    <div class="form-group">
      <label for="email" class="font-semibold w-24">Correo</label>
      <InputText
        id="email"
        v-model="cliente.email"
        class="flex-auto"
        autocomplete="off"
      />
    </div>

    <!-- Teléfono -->
    <div class="form-group">
      <label for="telefono" class="font-semibold w-24">Teléfono</label>
      <InputText
        id="telefono"
        v-model="cliente.telefono"
        class="flex-auto"
        autocomplete="off"
      />
    </div>

    <!-- Dirección -->
    <div class="form-group">
      <label for="direccion" class="font-semibold w-24">Dirección</label>
      <InputText
        id="direccion"
        v-model="cliente.direccion"
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
  border: 1px solid #000000; /* Borde */
  border-radius: 8px; /* Bordes redondeados */
  background-color: #e2e2ec; /* Fondo claro */
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
  color: #000000; /* Color del texto */
  width: 150px; /* Ancho de la etiqueta */
}

input {
  padding: 10px; /* Espaciado interno */
  border: 1px solid #000000; /* Borde */
  border-radius: 4px; /* Bordes redondeados */
  font-size: 1rem; /* Tamaño de texto */
  flex: 1; /* Expande para ocupar el espacio disponible */
}

input:focus {
  border-color: #000000; /* Borde verde al enfocar */
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
  
