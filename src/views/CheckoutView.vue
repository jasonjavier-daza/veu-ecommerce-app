<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 m-auto">
    <h1 class="text-2xl font-bold mb-4">Checkout</h1>
    <CheckoutComponent />
  </div>
</template>

<script>
import CheckoutComponent from '@/components/CheckoutComponent.vue';

export default {
  components: {
    CheckoutComponent,
  },
};
</script>

<style scoped>
</style>