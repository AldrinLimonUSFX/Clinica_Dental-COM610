<script setup lang="ts">
import type { Cita } from '../../models/Cita'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref, computed } from 'vue'
import { useAuthStore } from '../../stores'

const authStore = useAuthStore() // Para obtener el cliente logueado
const ENDPOINT = 'citas'

let citas = ref<Cita[]>([]) // Todas las citas
let citasFiltradas = computed(() =>
  citas.value.filter(cita => cita.clienteId === authStore.user?.id),
) // Filtra las citas del cliente logueado

// Computed para calcular el total de precios
const totalPrecio = computed(() =>
  citasFiltradas.value.reduce((total, cita) => {
    // Sumar solo si el estado no es "Rechazado"
    if (cita.estado !== 'Rechazado') {
      return total + Number(cita.servicio?.precio || 0) // Convertir a número antes de sumar
    }
    return total
  }, 0),
)

const emit = defineEmits(['edit'])
const citaDelete = ref<Cita | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

// Obtener todas las citas desde el backend
async function obtenerLista() {
  citas.value = await http.get(ENDPOINT).then(response => response.data)
  citas.value.sort((a, b) => a.id - b.id) // Ordenar por ID
}

// Emitir evento para edición
function emitirEdicion(cita: Cita) {
  emit('edit', cita)
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
          <th>Odontólogo</th>
          <th>Servicio</th>
          <th>Precio</th>
          <th>Estado</th>
          <th>Duracion (MIN)</th>
          <th>Fecha y Hora</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(cita, index) in citasFiltradas"
          :key="cita.id"
          :class="{
            confirmado: cita.estado === 'Confirmado',
            pendiente: cita.estado === 'Pendiente',
            rechazado: cita.estado === 'Rechazado',
          }"
        >
          <td>{{ index + 1 }}</td>
          <td>
            {{ cita.odontologo.nombre }} {{ cita.odontologo.primerApellido }}
          </td>
          <td>{{ cita.servicio?.nombre }}</td>
          <td>{{ cita.servicio?.precio }} Bs.</td>
          <td>{{ cita.estado }}</td>
          <td>{{ cita.servicio?.duracion }}</td>
          <td>
            {{ new Date(cita.fechaHoraInicio).toLocaleString() }} -
            {{
              new Date(cita.fechaHoraFin).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
            }}
          </td>

          <td>
            <Button
              v-if="cita.estado !== 'Confirmado' && cita.estado !== 'Rechazado'"
              icon="pi pi-pencil"
              aria-label="Editar"
              text
              @click="emitirEdicion(cita)"
            />
            <Button
              v-if="cita.estado !== 'Confirmado'"
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(cita)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Mostrar total de precios -->
    <div class="total-container">
      <p>
        Monto Total de las Citas Programadas:
        <strong>{{ totalPrecio }} Bs.</strong>
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
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ffffff;
}

th {
  background-color: #ffffff;
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
.confirmado {
  background-color: #d4edda; /* Verde claro */
  color: #155724; /* Texto verde oscuro */
}

.pendiente {
  background-color: #fff3cd; /* Amarillo claro */
  color: #9b7015; /* Texto amarillo oscuro */
}
.rechazado {
  background-color: #f8d7da; /* Rojo claro */
  color: #af2432; /* Texto rojo oscuro */
}
</style>
