<script setup lang="ts">
import type { Cita } from '../../models/Cita'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref, computed } from 'vue'
import { useAuthStore } from '../../stores'
import { useToast } from 'primevue/usetoast';

const authStore = useAuthStore() // Para obtener el odontólogo logueado
const ENDPOINT = 'citas'

let citas = ref<Cita[]>([]) // Todas las citas
let citasFiltradas = computed(
  () => citas.value.filter(cita => cita.odontologoId === authStore.user?.id), // Filtra las citas del odontólogo logueado
)

// Computed para calcular el monto total de las citas confirmadas
const totalCobrar = computed(() =>
  citasFiltradas.value.reduce((total, cita) => {
    // Sumar solo si el estado es "Confirmado"
    return cita.estado === 'Confirmado' ? total + Number(cita.servicio?.precio || 0) : total;
  }, 0),
);

const toast = useToast(); // Instancia de Toast

const emit = defineEmits(['edit'])
const citaDelete = ref<Cita | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

// Obtener todas las citas desde el backend
async function obtenerLista() {
  citas.value = await http.get(ENDPOINT).then(response => response.data)
}

// Función para cambiar el estado a "Confirmado"
async function confirmarCita(cita: Cita) {
  try {
    await http.patch(`${ENDPOINT}/${cita.id}`, { estado: 'Confirmado' })
    toast.add({
      severity: 'success',
      summary: 'Cita confirmada',
      detail: 'La cita ha sido confirmada con éxito.',
      life: 3000,
    });
    obtenerLista()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo confirmar la cita. Intente nuevamente.',
      life: 3000,
    });
  }
}
// Función para cambiar el estado a "Rechazado"
async function rechazarCita(cita: Cita) {
  try {
    await http.patch(`${ENDPOINT}/${cita.id}`, { estado: 'Rechazado' })
    toast.add({
      severity: 'success',
      summary: 'Cita Rechazada',
      detail: 'La cita ha sido rechazada con éxito.',
      life: 3000,
    });
    obtenerLista()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo rechazar la cita. Intente nuevamente.',
      life: 3000,
    });
  }
}

// Mostrar diálogo de confirmación de eliminación
function mostrarEliminarConfirm(cita: Cita) {
  citaDelete.value = cita
  mostrarConfirmDialog.value = true
}

// Eliminar cita seleccionada
async function eliminar() {
  if (citaDelete.value?.id) {
    await http.delete(`${ENDPOINT}/${citaDelete.value.id}`)
    toast.add({
      severity: 'success',
      summary: 'Cita eliminada',
      detail: 'La cita ha sido eliminada con éxito.',
      life: 3000,
    });
    obtenerLista()
    mostrarConfirmDialog.value = false
  }
}

// Obtener la lista al montar el componente
onMounted(() => {
  obtenerLista()
})

// Exponer la función de actualización
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Paciente</th>
          <th>Servicio</th>
          <th>Precio</th>
          <th>Estado</th>
          <th>Fecha y Hora</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cita, index) in citasFiltradas" :key="cita.id">
          <td>{{ index + 1 }}</td>
          <td>{{ cita.cliente.nombre + ' ' + cita.cliente.primerApellido }}</td>
          <td>{{ cita.servicio?.nombre }}</td>
          <td>{{ cita.servicio?.precio }} Bs.</td>
          <td>{{ cita.estado }}</td>
          <td>
            {{ new Date(cita.fechaHoraInicio).toLocaleString() }} -
            {{ new Date(cita.fechaHoraFin).toLocaleString() }}
          </td>
          <!-- Botón para cambiar estado a Confirmado -->

          <td>
            <Button
              v-if="cita.estado === 'Pendiente'"
              icon="pi pi-check"
              label="Confirmar"
              text
              class="p-button-success"
              @click="confirmarCita(cita)"
            />
            <Button
              v-if="cita.estado === 'Pendiente'"
              icon="pi pi-check"
              label="Rechazar"
              text
              class="p-button-danger"
              @click="rechazarCita(cita)"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(cita)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Mostrar total de precios confirmados -->
    <div class="total-container">
      <p>
        Monto Total de Cobrar:
        <strong>{{ totalCobrar }} Bs.</strong>
      </p>
    </div>
    <!-- Diálogo de confirmación para eliminar -->
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar esta cita?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:hover {
  background-color: #f5f5f5;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.action-buttons button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 6px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

.action-buttons button.delete {
  background-color: #f44336;
}

.total-container {
  margin-top: 20px;
  font-size: 18px;
  text-align: right;
}
</style>
