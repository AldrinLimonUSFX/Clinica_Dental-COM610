<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import http from '../../plugins/axios'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import type { Odontologo_servicio } from '../../models/Odontologo_servicio'
import type { Odontologo } from '../../models/Odontologo'
import type { Servicios } from '../../models/Servicios'
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const props = defineProps({
  mostrar: Boolean,
  relacion: {
    type: Object as () => Odontologo_servicio,
    default: () => ({ id: 0, odontologo_id: 0, servicio_id: 0 }),
  },
  modoEdicion: Boolean,
})

const emit = defineEmits(['guardar', 'close'])

// Controlar la visibilidad del diálogo
const dialogVisible = computed({
  get: () => props.mostrar,
  set: value => {
    if (!value) emit('close')
  },
})

// Datos de odontólogos y servicios
const odontologos = ref<Odontologo[]>([])
const servicios = ref<Servicios[]>([])

// Relación editable
const relacion = ref({
  id: props.relacion.id,
  odontologo_id: props.relacion.odontologo_id,
  servicio_id: props.relacion.servicio_id,
})

// Actualizar `relacion` cuando cambie `props.relacion`
watch(
  () => props.relacion,
  newRelacion => {
    relacion.value = { ...newRelacion }
  },
  { immediate: true },
)

// Cargar odontólogos y servicios
async function cargarDatos() {
  const [odontologoResponse, servicioResponse] = await Promise.all([
    http.get('odontologos'),
    http.get('servicios'),
  ])
  odontologos.value = odontologoResponse.data
  servicios.value = servicioResponse.data
}

// Guardar cambios
async function handleEditSave() {
  try {
    if (!relacion.value.odontologo_id || !relacion.value.servicio_id) {
      toast.add({ severity: 'warn', summary: 'Error', detail: 'Debe seleccionar un odontólogo y un servicio', life: 3000 });
      return
    }

    // Crear el cuerpo con el id de la relación y el nuevo servicio
    const body = {
      odontologoId: relacion.value.odontologo_id, // Este no cambia
      servicioId: relacion.value.servicio_id, // Este sí cambia
    }

    // Enviar el PATCH con el ID de la relación
    await http.patch(`odontologos_servicios/${relacion.value.id}`, body)

    // Emitir evento para recargar la lista
    emit('guardar')
    dialogVisible.value = false
  } catch (error: any) {
    console.error(error)
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error desconocido', life: 3000 });
    
  }
}

onMounted(() => {
  cargarDatos()
})
</script>

<template>
  <Dialog
    v-model:visible="dialogVisible"
    :header="props.modoEdicion ? 'Editar Relación' : 'Crear Nueva Relación'"
    style="width: 30rem"
  >
    <div class="mb-4">
      <label class="font-semibold mb-2">Odontólogo</label>
      <Dropdown
        v-model="relacion.odontologo_id"
        :options="odontologos"
        :disabled="modoEdicion"
        option-label="nombre"
        option-value="id"
        class="w-full"
      />
    </div>
    <div class="mb-4">
      <label class="font-semibold mb-2">Servicio</label>
      <Dropdown
        v-model="relacion.servicio_id"
        :options="servicios"
        option-label="nombre"
        option-value="id"
        class="w-full"
      />
    </div>

    <div class="flex justify-end gap-2">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        severity="secondary"
        @click="dialogVisible = false"
      />
      <Button label="Guardar" icon="pi pi-save" @click="handleEditSave" />
    </div>
  </Dialog>
</template>
