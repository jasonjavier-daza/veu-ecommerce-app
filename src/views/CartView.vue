<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Shopping Cart</h1>
    <CartComponent />
  </div>
</template>

<script>
import CartComponent from '@/components/CartComponent.vue';

export default {
  components: {
    CartComponent
  }
}
</script>

<style scoped>
</style>