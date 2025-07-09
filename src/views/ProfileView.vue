<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Perfil de Usuario</h1>
    <UserProfileComponent />
  </div>
</template>

<script>
import UserProfileComponent from '@/components/UserProfileComponent.vue';

export default {
  components: {
    UserProfileComponent
  }
};
</script>

<style scoped>
</style>