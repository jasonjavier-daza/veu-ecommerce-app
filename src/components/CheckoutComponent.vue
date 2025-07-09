<template>
  <div class="max-w-lg mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Checkout</h1>
    <form @submit.prevent="submitOrder" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" v-model="form.name" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
      </div>
      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
        <input type="text" id="address" v-model="form.address" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
      </div>
      <div>
        <label for="city" class="block text-sm font-medium text-gray-700">City</label>
        <input type="text" id="city" v-model="form.city" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
      </div>
      <div>
        <label for="zip" class="block text-sm font-medium text-gray-700">Zip Code</label>
        <input type="text" id="zip" v-model="form.zip" required class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md">Confirm Order</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        address: '',
        city: '',
        zip: ''
      }
    };
  },
  methods: {
    submitOrder() {
      // Logic to handle order submission
      console.log('Order submitted:', this.form);
      // Reset form after submission
      this.form = {
        name: '',
        address: '',
        city: '',
        zip: ''
      };
    }
  }
};
</script>

<style scoped>
</style>