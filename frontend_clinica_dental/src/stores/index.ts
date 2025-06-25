import { defineStore } from 'pinia';
import { getTokenFromLocalStorage } from '../helpers';
import http from '../plugins/axios';
import router from '@/router';
import { AxiosError } from 'axios';

// Definir la interfaz de la respuesta de error
interface ErrorResponse {
  message: string;
}

// Definir la interfaz del usuario
interface User {
  id: number;
  name: string;
  email: string;
}

// Definir la tienda de autenticación
const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
    token: getTokenFromLocalStorage(),
    role: localStorage.getItem('role') || '',
    returnUrl: '',
  }),
  getters: {
    isAuthenticated: state => !!state.token,
    userName: state => state.user?.name || 'Usuario',
  },
  actions: {
    async login(email: string, clave: string) {
      try {
        const response = await http.post('auth/login', { email, clave });

        console.log('Respuesta completa del backend:', response.data);

        const userData = response.data.data;

        if (!userData.rol) {
          console.error('El rol no está presente en la respuesta del backend.');
          throw new Error('Error al obtener el rol del usuario.');
        }

        this.user = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
        };
        this.token = userData.access_token || '';
        this.role = userData.rol || '';

        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', this.token || '');
        localStorage.setItem('role', this.role || '');

        router.push(this.returnUrl || '/');
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>;
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'Error al iniciar sesión';

        console.error('Error al iniciar sesión:', errorMessage);
        throw new Error(errorMessage);
      }
    },
    logout() {
      if (!this.token && !this.user) {
        console.warn('Ya estás desconectado. Ignorando logout.');
        return;
      }
    
      localStorage.clear();
      this.$reset();
      router.push('/');
    },
    validateToken() {
      if (!this.token) return;
    
      try {
        const decoded = JSON.parse(atob(this.token.split('.')[1]));
        const currentTime = Date.now() / 1000;
    
        if (decoded.exp < currentTime) {
          if (!this.user) {
            console.warn('El token ha expirado y el usuario ya está deslogueado.');
            return;
          }
          console.warn('El token ha expirado.');
          this.logout();
        }
      } catch (error) {
        console.error('Error al validar el token:', error);
        this.logout();
      }
    },
  },
});


export { useAuthStore };
