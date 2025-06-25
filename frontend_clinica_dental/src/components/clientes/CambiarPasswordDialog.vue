<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const passwordActual = ref('');
const nuevaPassword = ref('');
const emit = defineEmits(['guardar' , 'cerrar']); // Emitir evento para cambiar contraseña

function guardar() {
  emit('guardar', passwordActual.value, nuevaPassword.value); // Emitir las contraseñas al padre
}
function cancelar() {
  emit('cerrar'); // Emitir evento para cerrar el diálogo
}
</script>

<template>
  <form @submit.prevent="guardar">
    <div class="form-group">
      <label for="passwordActual">Contraseña Actual</label>
      <InputText
        id="passwordActual"
        v-model="passwordActual"
        type="password"
        class="w-full"
      />
    </div>
    <div class="form-group mt-4">
      <label for="nuevaPassword">Nueva Contraseña</label>
      <InputText
        id="nuevaPassword"
        v-model="nuevaPassword"
        type="password"
        class="w-full"
      />
    </div>

    <!-- Botones -->
    <div class="button-group flex justify-end mt-4 gap-2">
        <Button
        label="Cancelar"
        class="p-button-text"
        @click.prevent="cancelar"
      />
      <Button
        label="Cambiar"
        type="submit"
        class="p-button-danger"
      />
    </div>
  </form>
</template>

<style scoped>
.form-group {
  margin-bottom: 16px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
}
/* Estilo para los labels */
label {
  font-weight: bold;
  color: #000000; /* Blanco */
  display: block;
  margin-bottom: 8px;
}

/* Estilo para los inputs */
input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: #ffffff; /* Texto blanco */
  background-color: #e6c4c4; /* Fondo oscuro */
  border: 1px solid #00ff40; /* Borde verde */
  border-radius: 6px; /* Bordes redondeados */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra ligera */
  transition: border-color 0.3s, box-shadow 0.3s; /* Transiciones suaves */
}

/* Placeholder estilizado */
input::placeholder {
  color: #aaaaaa; /* Placeholder gris claro */
  font-style: italic; /* Opcional: texto en cursiva */
}

/* Efecto al enfocar el input */
input:focus {
  border-color: #4caf50; /* Borde verde brillante */
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.5); /* Sombra verde */
  outline: none; /* Quitar el contorno predeterminado */
}

/* Botones personalizados */
.button-group .p-button-danger {
  background-color: #f44336; /* Rojo */
  color: #ffffff; /* Texto blanco */
  border: none;
}

.button-group .p-button-danger:hover {
  background-color: #d32f2f; /* Rojo más oscuro */
}

.button-group .p-button-text {
  color: #9e9e9e; /* Gris claro */
}

.button-group .p-button-text:hover {
  color: #ffffff; /* Blanco al pasar el mouse */
}

</style>
