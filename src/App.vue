<template>
  <div class="min-h-screen bg-gray-100 flex flex-row gap-2.5">
    <NavbarComponent />
    <router-view />
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';

export default {
  components: {
    NavbarComponent
  }
}
</script>

<style>
@import './assets/styles.css'; /* Assuming you have a styles.css for global styles */
</style>