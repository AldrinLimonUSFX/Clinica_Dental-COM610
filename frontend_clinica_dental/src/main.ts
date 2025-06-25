import { createApp } from 'vue';
import { createPinia } from 'pinia';


// Importa PrimeVue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.min.css';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import App from './App.vue';
import router from './router';



// Crea la aplicación de Vue
const app = createApp(App);

// Crea la instancia de Pinia (solo una vez)
const pinia = createPinia();

// Usa Pinia, Router y PrimeVue en la aplicación
app.use(pinia);
app.use(router);
app.use(ToastService);
app.component('Toast', Toast);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

// Monta la aplicación en el DOM
app.mount('#app');
