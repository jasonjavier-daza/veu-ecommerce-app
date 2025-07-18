<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">🛒 Shopping Cart</h1>

    <!-- Carrito vacío -->
    <div v-if="cartItems.length === 0" class="text-center text-gray-500 py-10">
      <p>Your cart is empty.</p>
      <router-link
        to="/"
        class="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go Back to Products
      </router-link>
    </div>

    <!-- Carrito con productos -->
    <div v-else>
      <ul class="divide-y divide-gray-200">
        <li
          v-for="item in cartItems"
          :key="item.id"
          class="flex flex-col md:flex-row md:items-center justify-between py-4"
        >
          <div class="flex items-center gap-4">
            <img
              v-if="item.poster"
              :src="item.poster"
              alt="Product Image"
              class="w-24 h-24 object-cover rounded border"
            />
            <div>
              <h2 class="text-lg font-semibold">{{ item.name }}</h2>
              <p>Price: ${{ Number(item.price).toFixed(2) }}</p>
              <p>Subtotal: ${{ (Number(item.price) * item.quantity).toFixed(2) }}</p>
              <div class="flex items-center mt-2">
                <button
                  @click="decreaseQuantity(item)"
                  class="bg-red-500 text-white px-2 py-1 rounded"
                >
                  -
                </button>
                <span class="mx-2">{{ item.quantity }}</span>
                <button
                  @click="increaseQuantity(item)"
                  class="bg-green-500 text-white px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button
            @click="removeItem(item.id)"
            class="mt-2 md:mt-0 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Remove
          </button>
        </li>
      </ul>

      <!-- Totales -->
      <div class="mt-6 flex flex-col md:flex-row md:justify-between md:items-center border-t pt-4">
        <h2 class="text-2xl font-bold">Total: ${{ total.toFixed(2) }}</h2>
        <div class="flex gap-2 mt-4 md:mt-0">
          <router-link
            to="/checkout"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </router-link>
          <button
            @click="clearCart"
            class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["cartTotal"]),
    cartItems() {
      return this.cart;
    },
    total() {
      return this.cartTotal;
    },
  },
  methods: {
    ...mapMutations(["addToCart", "removeFromCart", "clearCart"]),
    increaseQuantity(item) {
      this.addToCart(item);
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        const updatedItem = { ...item, quantity: item.quantity - 1 };
        this.removeFromCart(item.id);
        this.addToCart(updatedItem);
      }
    },
    removeItem(id) {
      this.removeFromCart(id);
    },
  },
};
</script>

<style scoped>
/* Estilos extra opcionales */
</style>
