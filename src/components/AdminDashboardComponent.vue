<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-white shadow-md rounded-lg p-4">
        <h2 class="text-xl font-semibold">Manage Users</h2>
        <p class="text-gray-600">View and manage user accounts.</p>
        <button class="mt-2 bg-blue-500 text-white py-2 px-4 rounded">Go to Users</button>
      </div>
      <div class="bg-white shadow-md rounded-lg p-4">
        <h2 class="text-xl font-semibold">Manage Products</h2>
        <p class="text-gray-600">Add, edit, or remove products.</p>
        <button class="mt-2 bg-blue-500 text-white py-2 px-4 rounded">Go to Products</button>
      </div>
      <div class="bg-white shadow-md rounded-lg p-4">
        <h2 class="text-xl font-semibold">Manage Orders</h2>
        <p class="text-gray-600">View and manage customer orders.</p>
        <button class="mt-2 bg-blue-500 text-white py-2 px-4 rounded">Go to Orders</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboardComponent',
  methods: {
    // Add methods for administrative tasks here
  }
}
</script>

<style scoped>
/* Add any specific styles for the AdminDashboardComponent here */
</style>