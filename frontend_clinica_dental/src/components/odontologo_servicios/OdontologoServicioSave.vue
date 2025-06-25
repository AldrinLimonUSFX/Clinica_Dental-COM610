<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import http from '../../plugins/axios'
import Dialog from 'primevue/dialog'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import type { Servicios } from '../../models/Servicios'
import type { Odontologo_servicio } from '../../models/Odontologo_servicio'
import { useAuthStore } from '@/stores' // Store para autenticación

// Obtener el odontólogo autenticado
const authStore = useAuthStore()
const odontologoLogueado = computed(() => authStore.user)

// Inicializar Toast
const toast = useToast()

// Props y eventos
const props = defineProps({
  mostrar: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

// Estado reactivo
const servicios = ref<Servicios[]>([]) // Servicios disponibles (no asignados)
const serviciosAsignados = ref<number[]>([]) // IDs de servicios ya asignados
const serviciosSeleccionados = ref<number[]>([]) // IDs de servicios seleccionados

// Computed para el estado del diálogo
const dialogVisible = computed({
  get: () => props.mostrar,
  set: async value => {
    if (!value) {
      resetFormulario() // Limpia el formulario al cerrar
      emit('close')
    } else {
      // Recarga los servicios disponibles y asignados al abrir el diálogo
      if (odontologoLogueado.value?.id) {
        await Promise.all([
          cargarServiciosAsignados(),
          cargarServiciosDisponibles(),
        ])
      }
    }
  },
})

// Reiniciar el formulario
function resetFormulario() {
  serviciosSeleccionados.value = [] // Limpia los servicios seleccionados
}

// Cargar servicios disponibles
async function cargarServiciosDisponibles() {
  try {
    const response = await http.get(
      'odontologos_servicios/mis-servicios-disponibles',
    )
    servicios.value = response.data // Aquí se actualiza con los servicios no asignados
  } catch (error) {
    console.error('Error al cargar servicios disponibles:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Hubo un problema al cargar los servicios disponibles.',
      life: 3000,
    })
  }
  return
}

// Cargar servicios ya asignados al odontólogo autenticado
async function cargarServiciosAsignados() {
  if (!odontologoLogueado.value?.id) return

  try {
    const response = await http.get('odontologos_servicios/mis-servicios')
    serviciosAsignados.value = response.data.map(
      (item: Odontologo_servicio) => item.servicio_id,
    )
  } catch (error) {
    console.error('Error al cargar servicios asignados:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Hubo un problema al cargar los servicios asignados.',
      life: 3000,
    })
  }
}

// Guardar relaciones
async function handleSave() {
  try {
    if (serviciosSeleccionados.value.length === 0) {
      toast.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe seleccionar al menos un servicio.',
        life: 3000,
      })
      return
    }

    // Crear relaciones para cada servicio seleccionado
    await Promise.all(
      serviciosSeleccionados.value.map(servicioId =>
        http.post('odontologos_servicios', {
          odontologoId: odontologoLogueado.value?.id ?? 0,
          servicioId,
        }),
      ),
    )

    // Actualizar los servicios disponibles después de guardar
    await cargarServiciosDisponibles()

    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Servicio añadido correctamente.',
      life: 3000,
    })
    emit('guardar')
    emit('close')
    dialogVisible.value = false
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error?.message || 'Error desconocido'
    console.error('Error al guardar relaciones:', errorMessage)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `Hubo un problema al guardar las relaciones: ${errorMessage}`,
      life: 3000,
    })
  }
}

// Escuchar el evento global de servicio eliminado
const onServicioEliminado = async () => {
  await cargarServiciosDisponibles()
}
// Cargar servicios disponibles y asignados al odontólogo al montar el componente
onMounted(() => {
  window.addEventListener('servicioEliminado', onServicioEliminado)
  window.addEventListener('servicioCreado', onServicioEliminado)
})
// Limpiar los eventos al desmontar el componente
onBeforeUnmount(() => {
  window.removeEventListener('servicioEliminado', onServicioEliminado)
  window.removeEventListener('servicioCreado', onServicioEliminado)
})

// Montar datos iniciales
onMounted(async () => {
  if (odontologoLogueado.value?.id) {
    // Cargar los servicios disponibles y los asignados al odontólogo
    await Promise.all([
      cargarServiciosAsignados(),
      cargarServiciosDisponibles(),
    ])
  }
})

</script>

<template>
  <Dialog v-model:visible="dialogVisible" header="Relacionar Servicios" style="width: 30rem">
    <div class="mb-4">
      <label class="font-semibold mb-2">Odontólogo</label>
      <div v-if="odontologoLogueado" class="font-semibold text-blue-500">
        <p>Nombre: {{ odontologoLogueado.name || 'Nombre no disponible' }}</p>
        <p>Email: {{ odontologoLogueado.email || 'Email no disponible' }}</p>
      </div>
      <p v-else class="font-semibold text-red-500">Odontólogo no autenticado</p>
    </div>

    <div class="mb-4">
      <label class="font-semibold mb-2">Servicios</label>
      <div v-if="servicios.length">
        <div v-for="servicio in servicios" :key="servicio.id" class="flex items-center">
          <Checkbox v-model="serviciosSeleccionados" :value="servicio.id" />
          <span class="ml-2">{{ servicio.nombre }}</span>
        </div>
      </div>
      <p v-else class="text-red-500">No hay servicios para seleccionar</p>
    </div>

    <div class="flex justify-end gap-2">
      <Button label="Cancelar" icon="pi pi-times" severity="secondary" @click="$emit('close')" />
      <Button label="Guardar" icon="pi pi-save" @click="handleSave" />
    </div>
  </Dialog>
</template>
