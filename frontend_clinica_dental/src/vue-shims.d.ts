declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// aqui le digo a typescript que el archivo .vue es un componente de vue
