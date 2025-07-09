<template>
  <!--
    Contenedor principal:
    - min-h-screen: altura mínima de toda la pantalla
    - bg-gray-100: color de fondo gris claro
    - flex flex-row: distribuye los hijos en fila horizontal
    - gap-2.5: espacio entre elementos
  -->
  <div class="min-h-screen bg-gray-100 flex flex-row gap-2.5">
    <!-- Componente de la barra de navegación -->
    <NavbarComponent />

    <!-- Aquí se renderizarán las rutas definidas en Vue Router -->
    <router-view />
  </div>
</template>

<script>
// Importamos el componente de la barra de navegación
import NavbarComponent from './components/NavbarComponent.vue';

export default {
  // Declaramos los componentes que se usan en este layout
  components: {
    NavbarComponent
  }
}
</script>

<style>
/* 
  Importamos estilos globales personalizados
  (Asegúrate de que ./assets/styles.css exista)
*/
@import './assets/styles.css';
</style>
