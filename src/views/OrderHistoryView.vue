<template>
  <div class="container mx-auto p-4">
    <OrderHistoryComponent :orders="orders" />
  </div>
</template>

<script>
import OrderHistoryComponent from '@/components/OrderHistoryComponent.vue';

export default {
  name: 'OrderHistoryView',
  components: {
    OrderHistoryComponent,
  },
  data() {
    return {
      orders: [], // This will hold the order data
    };
  },
  created() {
    this.fetchOrderHistory();
  },
  methods: {
    fetchOrderHistory() {
      // Fetch order history from an API or store
      // For now, we will simulate with dummy data
      this.orders = [
        { id: 1, date: '2023-01-01', total: 100 },
        { id: 2, date: '2023-02-15', total: 200 },
      ];
    },
  },
};
</script>

<style scoped>
/* Add any specific styles for this view here */
</style>