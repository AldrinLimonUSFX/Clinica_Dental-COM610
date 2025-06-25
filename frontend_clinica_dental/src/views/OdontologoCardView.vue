<script setup lang="ts">
import { ref } from 'vue'
import OdontologosListCard from '@/components/odontologos/OdontologosListCard.vue';

const OdontologoListCardRef = ref<typeof OdontologosListCard | null>(null)
</script>

<template>
  <div class="slider-background">
    <div class="contenedor">
      <h1 class="page-title">Nuestros Odontólogos</h1>
      <OdontologosListCard ref="OdontologoListCardRef" />
    </div>
  </div>
</template>

<style scoped>
.slider-background {
  background-image: url('@/assets/images/slider/slider-1.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.contenedor {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  width: 95%;
  max-width: 1400px;
  margin-top: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: #240090;
  margin-bottom: 2rem;
  text-align: center;
}

@media (max-width: 768px) {
  .slider-background {
    padding: 1rem 0.5rem;
  }

  .contenedor {
    padding: 1rem;
    width: 100%;
  }

  .page-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
}
</style>