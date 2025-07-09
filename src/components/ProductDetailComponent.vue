<template>
  <div class="max-w-2xl mx-auto p-4">
    <div class="flex flex-col md:flex-row">
      <img :src="product.image" alt="Product Image" class="w-full md:w-1/2 h-auto object-cover mb-4 md:mb-0" />
      <div class="md:ml-4">
        <h1 class="text-2xl font-bold mb-2">{{ product.name }}</h1>
        <p class="text-lg text-gray-700 mb-4">{{ product.description }}</p>
        <p class="text-xl font-semibold mb-4">${{ product.price.toFixed(2) }}</p>
        <button @click="addToCart" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    addToCart() {
      // Logic to add the product to the cart
      this.$emit('add-to-cart', this.product);
    }
  }
}
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>