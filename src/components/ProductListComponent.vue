<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Product List</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="product in products" :key="product.id" class="border rounded-lg p-4 shadow-lg">
        <img :src="product.image" alt="Product Image" class="w-full h-48 object-cover mb-2 rounded">
        <h3 class="text-lg font-semibold">{{ product.name }}</h3>
        <p class="text-gray-700">${{ product.price.toFixed(2) }}</p>
        <button @click="viewDetails(product.id)" class="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductListComponent',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  methods: {
    viewDetails(productId) {
      this.$emit('view-product', productId);
    }
  }
}
</script>

<style scoped>
</style>