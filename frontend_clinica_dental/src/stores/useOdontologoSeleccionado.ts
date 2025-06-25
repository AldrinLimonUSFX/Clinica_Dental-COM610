// useOdontologoStore.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOdontologoSeleccionado = defineStore('odontologo', () => {
  const nombreBusqueda = ref('')
  return { nombreBusqueda }
})
