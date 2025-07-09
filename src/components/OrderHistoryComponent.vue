<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Order History</h1>
    <div v-if="orders.length === 0" class="text-gray-500">
      No orders found.
    </div>
    <ul v-else class="space-y-4">
      <li v-for="order in orders" :key="order.id" class="border p-4 rounded-lg">
        <h2 class="font-semibold">Order #{{ order.id }}</h2>
        <p>Date: {{ order.date }}</p>
        <p>Total: ${{ order.total.toFixed(2) }}</p>
        <p>Status: {{ order.status }}</p>
        <button @click="viewOrderDetails(order.id)" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          View Details
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OrderHistoryComponent',
  props: {
    orders: {
      type: Array,
      required: true
    }
  },
  methods: {
    viewOrderDetails(orderId) {
      // Logic to view order details
      this.$emit('view-order', orderId);
    }
  }
}
</script>

<style scoped>
/* Additional styles can be added here */
</style>