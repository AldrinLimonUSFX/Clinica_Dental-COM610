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
</style>
