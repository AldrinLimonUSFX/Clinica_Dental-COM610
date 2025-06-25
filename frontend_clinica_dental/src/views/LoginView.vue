<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/index'

const email = ref('')
const clave = ref('')
const error = ref('')
const isSubmitting = ref(false) // Estado para deshabilitar el botón mientras se envía el formulario

function onSubmit() {
  const authStore = useAuthStore()
  isSubmitting.value = true // Deshabilita el botón

  authStore
    .login(email.value, clave.value)
    .then(() => {
      error.value = '' // Resetea el error en caso de éxito
    })
    .catch(err => {
      error.value = err.message || 'Error al iniciar sesión' // Muestra el mensaje de error
    })
    .finally(() => {
      isSubmitting.value = false // Habilita el botón después de completar la solicitud
    })
}
</script>

<template>
  <div class="section slider-area slider-active">
    <!-- Single Slider Start -->
    <div
      class="single-slider bg-cover d-flex align-items-center justify-content-center slider-background"
    >
      <div class="auth-container my-5 pt-5">
        <h1 class="auth-title">Iniciar Sesión</h1>
        <form class="auth-form" @submit.prevent="onSubmit">
          <label class="auth-label">Correo:</label>
          <input
            v-model="email"
            type="email"
            class="auth-input"
            placeholder="Ingrese su email"
            required
            autofocus
          />

          <label class="auth-label">Contraseña:</label>
          <input
            v-model="clave"
            type="password"
            class="auth-input"
            placeholder="Ingrese su contraseña"
            required
          />

          <p v-if="error" class="auth-error">
            {{ error }}
          </p>
          <button type="submit" class="auth-submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Ingresando...' : 'Ingresar' }}
          </button>
        </form>

        <!-- Nuevo enlace para crear cuenta -->
        <router-link to="/cliente-crear-cuenta" class="create-account-link">
          ¿No tienes una cuenta? <br> 
          <span>Crear una cuenta</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Mantengo tus estilos originales */
.slider-background {
  background-image: url('@/assets/images/slider/slider-1.png');
  background-size: cover; /* Asegura que cubra toda el área */
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-top: 14rem;
  position: relative;
}

.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  background: #ffffff; /* Fondo blanco con transparencia */
  border-radius: 15px; /* Bordes más redondeados */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3); /* Sombra más difusa */
  backdrop-filter: blur(10px); /* Efecto de desenfoque para más modernidad */
}

.auth-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #4caf50; /* Verde oscuro */
  margin-bottom: 1.5rem;
  text-align: center;
  text-transform: uppercase; /* Convierte el texto a mayúsculas */
  letter-spacing: 2px; /* Espaciado entre letras */
}

.auth-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Espaciado uniforme entre los campos */
}

.auth-label {
  font-size: 1rem;
  color: #4caf50; /* Verde vivo */
  font-weight: bold;
}

.auth-input {
  width: 100%;
  padding: 0.9rem;
  font-size: 1rem;
  border: 1px solid rgba(76, 175, 80, 0.6); /* Borde verde translúcido */
  border-radius: 8px;
  transition: box-shadow 0.3s, border-color 0.3s;
  background-color: rgba(255, 255, 255, 0.8); /* Blanco translúcido */
}

.auth-input:focus {
  border-color: #4caf50; /* Verde brillante */
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.5); /* Sombra verde brillante */
  outline: none;
}

.auth-submit {
  width: 100%;
  padding: 0.9rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  background-color: #4caf50; /* Verde vivo */
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
}

.auth-submit:hover {
  background-color: #388e3c; /* Verde más oscuro */
  box-shadow: 0 4px 15px rgba(56, 142, 60, 0.5); /* Sombra verde más prominente */
}

.auth-submit:active {
  transform: scale(0.96);
}

.auth-error {
  font-size: 0.9rem;
  color: #f44336; /* Rojo */
  text-align: center;
  margin-top: 1rem;
}

.create-account-link {
  margin-top: 1rem;
  font-size: 0.9rem;
  text-align: center;
  color: #1976d2; /* Azul */
  text-decoration: none;
  transition: color 0.3s;
}

.create-account-link:hover {
  color: #0d47a1; /* Azul más oscuro */
}

</style>
