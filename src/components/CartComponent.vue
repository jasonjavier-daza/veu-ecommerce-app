<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Shopping Cart</h1>
    <div v-if="cartItems.length === 0" class="text-center">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in cartItems" :key="item.id" class="flex justify-between items-center border-b py-2">
          <div>
            <h2 class="font-semibold">{{ item.name }}</h2>
            <p class="text-gray-600">Price: ${{ item.price }}</p>
            <div class="flex items-center">
              <button @click="decreaseQuantity(item)" class="bg-red-500 text-white px-2 py-1 rounded">-</button>
              <span class="mx-2">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="bg-green-500 text-white px-2 py-1 rounded">+</button>
            </div>
          </div>
          <button @click="removeItem(item.id)" class="bg-red-500 text-white px-4 py-2 rounded">Remove</button>
        </li>
      </ul>
      <div class="mt-4">
        <h2 class="text-xl font-bold">Total: ${{ total }}</h2>
        <router-link to="/checkout" class="bg-blue-500 text-white px-4 py-2 rounded">Proceed to Checkout</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [], // This should be populated from a Vuex store or props
    };
  },
  computed: {
    total() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  methods: {
    increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
    removeItem(itemId) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    },
  },
  mounted() {
    // Fetch cart items from a store or API
  },
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>