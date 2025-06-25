<script setup lang="ts">
import type { Servicios } from '../../models/Servicios'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { computed, ref, watch } from 'vue'
import { Textarea } from 'primevue'
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast'

const toast = useToast()
const ENDPOINT = 'servicios'
const props = defineProps({
  mostrar: Boolean,
  servicio: {
    type: Object as () => Servicios,
    default: () => ({}) as Servicios,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: value => {
    if (!value) emit('close')
  },
})

const servicio = ref<Servicios>({ ...props.servicio })
watch(
  () => props.mostrar,
  newVal => {
    if (newVal) {
      servicio.value = props.modoEdicion
        ? {
          ...props.servicio,
          precio: Math.round(props.servicio.precio * 100) / 100,
        }
        : ({
          nombre: '',
          descripcion: '',
          precio: 0,
          duracion: 0,
        } as Servicios)
    }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: servicio.value.nombre,
      descripcion: servicio.value.descripcion,
      precio: servicio.value.precio,
      duracion: servicio.value.duracion,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${servicio.value.id}`, body)
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Servicio actualizado correctamente.', life: 3000 });
    } else {
      await http.post(ENDPOINT, body)
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Servicio creado correctamente.', life: 3000 });
    }
    // Emitir evento global de servicio creado 
    const event = new CustomEvent('servicioCreado')
    window.dispatchEvent(event)


    emit('guardar')
    servicio.value = {} as Servicios
    dialogVisible.value = false
  } catch (error: any) {
    console.error('Error al guardar el servicio:', error)
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el servicio.', life: 3000 })
  }
}
</script>

<template>
  <Toast />
  <div class="card flex justify-center">
    <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar' : 'Crear'" style="width: 25rem">
      <div class="p-fluid">
        <!-- Nombre del Servicio -->
        <div class="p-field p-grid">
          <label for="nombre" class="p-col-12 p-md-4 font-semibold">Nombre del Servicio</label>
          <div class="p-col-12 p-md-8">
            <InputText id="nombre" v-model="servicio.nombre" class="p-inputtext-sm w-full" autocomplete="off"
              autofocus />
          </div>
        </div>

        <!-- Descripción -->
        <div class="p-field p-grid">
          <label for="descripcion" class="p-col-12 p-md-4 font-semibold">Descripción</label>
          <div class="p-col-12 p-md-8">
            <Textarea id="descripcion" v-model="servicio.descripcion" autoResize rows="5" cols="30" class="w-full"
              autocomplete="off" />
          </div>
        </div>

        <!-- Precio -->
        <div class="p-field p-grid">
          <label for="precio" class="p-col-12 p-md-4 font-semibold">Precio (Bs)</label>
          <div class="p-col-12 p-md-8">
            <InputNumber id="precio" v-model="servicio.precio" class="p-inputtext-sm w-full" autocomplete="off"
              :step="0.01" :min="0" :mode="'decimal'" :locale="'es-BO'" :decimalSeparator="'.'" :useGrouping="false" />
          </div>
        </div>

        <!-- Duración -->
        <div class="p-field p-grid">
          <label for="duracion" class="p-col-12 p-md-4 font-semibold">Duración (Min)</label>
          <div class="p-col-12 p-md-8">
            <InputNumber id="duracion" v-model="servicio.duracion" class="p-inputtext-sm w-full" autocomplete="off"
              :step="1" :min="0" />
          </div>
        </div>

        <!-- Botones -->
        <div class="p-dialog-footer p-d-flex p-jc-end">
          <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary"
            @click="dialogVisible = false" />
          <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave" />
        </div>
      </div>
    </Dialog>
  </div>
</template>
