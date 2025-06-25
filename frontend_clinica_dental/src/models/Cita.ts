import type { Cliente } from './Cliente'
import type { Odontologo } from './Odontologo'
import type { Servicios } from './Servicios'

export interface Cita {
  id: number
  estado: string
  fechaHoraInicio: Date
  fechaHoraFin: Date
  clienteId: number
  odontologoId: number
  servicioId: number
  cliente: Cliente
  odontologo: Odontologo
  servicio?: Servicios;
}
