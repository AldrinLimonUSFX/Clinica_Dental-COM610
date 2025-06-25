import { ref } from 'vue'
import http from '@/plugins/axios'
// Estado reactivo global para los servicios
const servicios = ref([])

export function useServicios() {
  // Función para cargar servicios disponibles
  const cargarServiciosDisponibles = async () => {
    try {
      const response = await http.get('odontologos_servicios/mis-servicios-disponibles')
      servicios.value = response.data
    } catch (error) {
      console.error('Error al cargar servicios disponibles:', error)
    }
  }
  // Devuelve las funciones y estados reactivos que necesites
  return {
    servicios,
    cargarServiciosDisponibles,
  }
}
