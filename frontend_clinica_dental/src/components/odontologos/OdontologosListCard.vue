<script setup lang="ts">
import type { Odontologo } from '../../models/Odontologo'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'odontologos'
let odontologos = ref<Odontologo[]>([])

const emit = defineEmits(['edit'])

async function obtenerLista() {
  odontologos.value = await http.get(ENDPOINT).then(response => response.data)
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div class="dentists-container">
    <div class="cards-grid">
      <div
        class="card-wrapper"
        v-for="(odontologo, index) in odontologos"
        :key="odontologo.id"
      >
        <div class="card shadow-sm h-100">
          <div class="card-header">
            <h5 class="card-title">
              <strong>Dr. {{ odontologo.nombre }} {{ odontologo.primerApellido }}</strong>
            </h5>
          </div>
          <div class="card-body">
            <div class="specialty">
              {{ odontologo.especialidad }}
            </div>
            <div class="contact-info">
              <div class="info-item">
                <strong>Correo:</strong> {{ odontologo.email }}
              </div>
              <div class="info-item">
                <strong>Teléfono:</strong> {{ odontologo.telefono }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dentists-container {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #f0f9ff, #cfe9ff);
  border-radius: 12px;
  overflow-y: auto;
  max-height: calc(80vh - 100px); /* Ajusta según el título */
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.card-wrapper {
  height: 100%;
}

.card {
  background: white;
  border-radius: 12px;
  border: none;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.card-header {
  background: #240090;
  color: white;
  padding: 1rem;
  border-bottom: none;
}

.card-title {
  color: white;
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.card-body {
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.specialty {
  color: #240090;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem;
  background: rgba(36, 0, 144, 0.1);
  border-radius: 6px;
  text-align: center;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  font-size: 0.9rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .dentists-container {
    padding: 0.5rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0.5rem;
  }
}
</style>