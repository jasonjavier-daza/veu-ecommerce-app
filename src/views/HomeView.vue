<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold my-4">Welcome to Our E-Commerce Store</h1>
    <ProductListComponent />
  </div>
</template>

<script>
import ProductListComponent from '@/components/ProductListComponent.vue';

export default {
  components: {
    ProductListComponent
  }
}
</script>

<style scoped>
/* Add any specific styles for HomeView here */
</style>