<script setup lang="ts">
import type { Odontologo } from '../../models/Odontologo'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { computed, ref, watch } from 'vue'

const toast = useToast()

const ENDPOINT = 'odontologos'
const props = defineProps({
  mostrar: Boolean,
  odontologo: {
    type: Object as () => Odontologo,
    default: () => ({}) as Odontologo,
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

const odontologo = ref<Odontologo>({ ...props.odontologo })
watch(
  () => props.odontologo,
  newVal => {
    odontologo.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: odontologo.value.nombre,
      primerApellido: odontologo.value.primerApellido,
      segundoApellido: odontologo.value.segundoApellido,
      especialidad: odontologo.value.especialidad,
      password: odontologo.value.password,
      email: odontologo.value.email,
      telefono: odontologo.value.telefono,
      direccion: odontologo.value.direccion,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${odontologo.value.id}`, body)
      toast.add({
        severity: 'success',
        summary: 'Odontologo actualizado',
        detail: 'Los datos del odontologo se han actualizado correctamente',
        life: 3000
      })
    } else {
      await http.post(ENDPOINT, body)
      toast.add({
        severity: 'success',
        summary: 'Odontologo Creado',
        detail: 'El odontologo se ha creado correctamente',
        life: 3000
      })
    }
    emit('guardar')
    odontologo.value = {} as Odontologo
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <Toast />
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="p-fluid">
        <!-- Nombre -->
        <div class="p-field mb-4">
          <label for="nombre" class="font-semibold">Nombre</label>
          <InputText
            id="nombre"
            v-model="odontologo.nombre"
            autocomplete="off"
            autofocus
          />
        </div>

        <!-- Primer Apellido -->
        <div class="p-field mb-4">
          <label for="primer_apellido" class="font-semibold">Primer Apellido</label>
          <InputText
            id="primer_apellido"
            v-model="odontologo.primerApellido"
            autocomplete="off"
          />
        </div>

        <!-- Segundo Apellido -->
        <div class="p-field mb-4">
          <label for="segundo_apellido" class="font-semibold">Segundo Apellido</label>
          <InputText
            id="segundo_apellido"
            v-model="odontologo.segundoApellido"
            autocomplete="off"
          />
        </div>

        <!-- Especialidad -->
        <div class="p-field mb-4">
          <label for="especialidad" class="font-semibold">Especialidad</label>
          <InputText
            id="especialidad"
            v-model="odontologo.especialidad"
            autocomplete="off"
          />
        </div>

        <!-- Contraseña -->
        <div class="p-field mb-4">
          <label for="password" class="font-semibold">Contraseña</label>
          <Password
            id="password"
            v-model="odontologo.password"
            :disabled="props.modoEdicion"
            :toggleMask="!props.modoEdicion"
            :feedback="!props.modoEdicion"
            autocomplete="off"
            weakLabel="Débil"
            mediumLabel="Media"
            strongLabel="Fuerte"
          />
        </div>

        <!-- Correo -->
        <div class="p-field mb-4">
          <label for="email" class="font-semibold">Correo</label>
          <InputText
            id="email"
            v-model="odontologo.email"
            autocomplete="off"
          />
        </div>

        <!-- Teléfono -->
        <div class="p-field mb-4">
          <label for="telefono" class="font-semibold">Teléfono</label>
          <InputText
            id="telefono"
            v-model="odontologo.telefono"
            autocomplete="off"
          />
        </div>

        <!-- Dirección -->
        <div class="p-field mb-4">
          <label for="direccion" class="font-semibold">Dirección</label>
          <InputText
            id="direccion"
            v-model="odontologo.direccion"
            autocomplete="off"
          />
        </div>

        <!-- Botones -->
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancelar"
            icon="pi pi-times"
            severity="secondary"
            @click="dialogVisible = false"
          ></Button>
          <Button
            type="button"
            label="Guardar"
            icon="pi pi-save"
            @click="handleSave"
          ></Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
