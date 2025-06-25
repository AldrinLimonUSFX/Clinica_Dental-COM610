<script setup lang="ts">
import Button from 'primevue/button';
import { useAuthStore } from '@/stores'; // Aseguramos la ruta correcta
import { ref, computed } from 'vue';
import router from '@/router';
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';

const authStore = useAuthStore();
const showLogoutMessage = ref(false); // Controla la visibilidad del mensaje flotante
const userMenu = ref<InstanceType<typeof Menu> | null>(null);
const showConfirmLogout = ref(false); // Estado para mostrar el diálogo de confirmación

async function handleLogout() {
  showConfirmLogout.value = false; // Oculta el diálogo
  showLogoutMessage.value = true; // Muestra el mensaje flotante
  setTimeout(() => {
    authStore.logout(); // Llama al método de cierre de sesión
    showLogoutMessage.value = false; // Oculta el mensaje flotante
    router.push('/'); // Redirige al inicio
  }, 1000); // Espera 1 segundo antes de redirigir
}

// Opciones dinámicas del menú del usuario según el rol
const userMenuItems = computed(() => {
  if (authStore.role === 'cliente') {
    return [
      {
        label: 'Ver Perfil',
        icon: 'pi pi-user',
        command: () => router.push('/cliente-perfil'),
      },
      {
        label: 'Salir',
        icon: 'pi pi-sign-out',
        command: () => (showConfirmLogout.value = true),
      },
    ];
  } else if (authStore.role === 'odontologo') {
    return [
      {
        label: 'Ver Perfil',
        icon: 'pi pi-user',
        command: () => router.push('/odontologo-perfil'),
      },
      {
        label: 'Salir',
        icon: 'pi pi-sign-out',
        command: () => (showConfirmLogout.value = true),
      },
    ];
  }
  return []; // Menú vacío para otros roles o usuarios no autenticados
});
</script>

<template>
  <!-- Header Section Start -->
  <div class="section header-section transparent-header">
    <!-- Mensaje flotante de cierre de sesión -->
    <div v-if="showLogoutMessage" class="logout-overlay">
      <p>Cerrando sesión...</p>
    </div>
    <!-- Header Top Start -->
    <div class="header-top d-none d-lg-block">
      <div class="container">
        <!-- Header Top Wrapper Start -->
        <div class="header-top-wrapper">
          <!-- Header Info Start -->
          <div class="header-top-info">
            <ul>
              <li>
                <i class="ri-map-pin-add-line"></i>
                <span>257 Calle Audiencia Frente a la plaza 25 de Mayo</span>
              </li>
              <li>
                <i class="ri-mail-unread-fill"></i>
                <span>info@clinicadental.com</span>
              </li>
              <li><i class="ri-phone-fill"></i> +591 76543210</li>
            </ul>
          </div>
          <!-- Header Info End -->

          <!-- Header Social Start -->
          <div class="header-social">
            <ul class="social">
              <li>
                <a href="#"><i class="ri-facebook-fill"></i></a>
              </li>
              <li>
                <a href="#"><i class="ri-twitter-fill"></i></a>
              </li>
              <li>
                <a href="#"><i class="ri-linkedin-fill"></i></a>
              </li>
              <li>
                <a href="#"><i class="ri-instagram-fill"></i></a>
              </li>
            </ul>
          </div>
          <!-- Header Social End -->
        </div>
        <!-- Header Top Wrapper End -->
      </div>
    </div>
    <!-- Header Top End -->

    <!-- Header Bottom Start -->
    <div class="header-bottom">
      <div class="container">
        <!-- Header Bottom Wrapper Start -->
        <div
          class="header-bottom-wrapper d-flex align-items-center justify-content-between"
        >
          <!-- Header Logo Start -->
          <div class="header-logo">
            <router-link to="/">
              <img src="@/assets/images/logo.png" alt="Logo" />
            </router-link>
          </div>
          <!-- Header Logo End -->

          <!-- Header Primary Menu Start -->
          <div class="header-primary-menu d-none d-lg-flex align-items-center">
            <ul class="nav-menu d-flex align-items-center">
              <li>
                <router-link to="/" class="active">Inicio</router-link>
              </li>

              <!-- Pestañas visibles solo para clientes -->
              <li v-if="authStore.token && authStore.role === 'cliente'">
                <router-link to="/citas">Mis Citas</router-link>
              </li>

              <!-- Pestañas visibles solo para odontólogos -->
              <li v-if="authStore.token && authStore.role === 'odontologo'">
                <router-link to="/citas">Ver Citas</router-link>
              </li>
              <li v-if="authStore.token && authStore.role === 'odontologo'">
                <router-link to="/odontologo_servicios">Servicios</router-link>
              </li>
              <li v-if="authStore.token && authStore.role === 'odontologo'">
                <router-link to="/odontologos">Odontólogos</router-link>
              </li>
              <li v-if="authStore.token && authStore.role === 'cliente'">
                <router-link to="/odontologo-cards">Odontólogos</router-link>
              </li>
              <li v-if="authStore.token && authStore.role === 'odontologo'">
                <router-link to="/clientes">Clientes</router-link>
              </li>
            </ul>

            <!-- Saludo y botón de logout -->
            <div class="d-flex align-items-center ms-4">
              <!-- Saludo dinámico -->
              <p
                v-if="authStore.token"
                class="mb-0 me-3"
                style="font-size: 1rem; font-weight: bold; color: #2e7d32"
              >
                Bienvenido, {{ authStore.user?.name || 'Usuario' }}!
              </p>

              <!-- Menú del usuario -->
              <div
                v-if="authStore.token"
                class="user-menu ms-3"
                style="position: relative"
              >
                <Button
                  icon="pi pi-user"
                  style="font-size: 2rem"
                  class="p-button-rounded p-button-text custom-button"
                  aria-label="User Menu"
                  @click="userMenu?.toggle($event)"
                />

                <!-- Menú desplegable -->
                <Menu ref="userMenu" :model="userMenuItems" popup />

                <Dialog
                  v-model:visible="showConfirmLogout"
                  header="Confirmación"
                  modal
                  :closable="false"
                  :style="{ width: '350px' }"
                >
                  <p>¿Está seguro de que desea cerrar sesión?</p>
                  <div class="d-flex justify-content-end mt-4">
                    <Button
                      label="Cancelar"
                      icon="pi pi-times"
                      class="p-button-text"
                      @click="showConfirmLogout = false"
                    />
                    <Button
                      label="Salir"
                      icon="pi pi-check"
                      class="p-button-danger"
                      @click="handleLogout"
                    />
                  </div>
                </Dialog>
              </div>

              <!-- Botón de login/logout -->
              <router-link
                v-if="!authStore.token"
                to="/login"
                class="btn btn-primary"
              >
                INICIAR SESIÓN
              </router-link>
            </div>
          </div>
          <!-- Header Primary Menu End -->

          <!-- Header Mobile Toggle Start -->
          <div class="header-toggle d-lg-none">
            <button
              class="menu-toggle"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <!-- Header Mobile Toggle End -->
        </div>
        <!-- Header Bottom Wrapper End -->
      </div>
    </div>
    <!-- Header Bottom End -->
  </div>
  <!-- Header Section End -->

  <!-- Mobile Menu End -->
  <div class="offcanvas offcanvas-start" id="offcanvasMenu">
    <div class="offcanvas-header">
      <a class="logo" href="#">
        <img src="@/assets/images/logo.png" alt="Logo" />
      </a>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>

    <div class="offcanvas-body">
      <!-- Header Info Start -->
      <div class="header-top-info">
        <ul>
          <li>
            <i class="ri-map-pin-add-line"></i>
            <span>257 Calle Audiencia Frente a la plaza 25 de Mayo</span>
          </li>
          <li>
            <i class="ri-mail-unread-fill"></i>
            <span>info@clinicadental.com</span>
          </li>
          <li><i class="ri-phone-fill"></i> +591 76543210</li>
        </ul>
      </div>
      <!-- Header Info End -->

      <!-- Header Social Start -->
      <div class="header-social">
        <ul class="social">
          <li>
            <a href="#"><i class="ri-facebook-fill"></i></a>
          </li>
          <li>
            <a href="#"><i class="ri-twitter-fill"></i></a>
          </li>
          <li>
            <a href="#"><i class="ri-linkedin-fill"></i></a>
          </li>
          <li>
            <a href="#"><i class="ri-instagram-fill"></i></a>
          </li>
        </ul>
      </div>
      <!-- Header Social End -->

      <div class="mobile-menu">
        <ul class="nav-menu">
          <li>
            <router-link to="/" class="active">Inicio</router-link>
          </li>

          <!-- Menú móvil - Pestañas dinámicas -->
          <li v-if="authStore.token && authStore.role === 'cliente'">
            <router-link to="/citas">Mis Citas</router-link>
          </li>
          <li v-if="authStore.token && authStore.role === 'odontologo'">
            <router-link to="/citas">Ver Citas</router-link>
          </li>
          <li v-if="authStore.token && authStore.role === 'odontologo'">
            <router-link to="/odontologos">Odontólogos</router-link>
          </li>
          <li v-if="authStore.token && authStore.role === 'odontologo'">
            <router-link to="/odontologo_servicios">Servicios</router-link>
          </li>
          <li v-if="authStore.token && authStore.role === 'odontologo'">
            <router-link to="/clientes">Clientes</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- Mobile Menu End -->
</template>

<style scoped>
/* Ajuste para alinear el saludo con el botón */
.header-primary-menu .d-flex {
  align-items: center;
}
.header-primary-menu .btn {
  font-size: 0.9rem;
  margin-left: 0.5rem;
}
/* Mensaje al Salir */
.logout-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.5rem;
  z-index: 1000;
}

.logout-overlay p {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1rem 2rem;
  border-radius: 8px;
}
.user-menu {
  cursor: pointer;
  padding-left: 2rem;
  padding-right: 3rem;
}
.custom-button {
  transform: scale(2);
}
</style>
