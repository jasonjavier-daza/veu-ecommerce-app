<template>
  <div class="admin-dashboard p-4">
    <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-white shadow-md rounded-lg p-4">
        <h2 class="text-xl font-semibold">Manage Users</h2>
        <p class="text-gray-600">View and manage user accounts.</p>
        <router-link to="/admin/users" class="text-blue-500 hover:underline">Go to Users</router-link>
      </div>
      <div class="bg-white shadow-md rounded-lg p-4">
        <h2 class="text-xl font-semibold">Manage Products</h2>
        <p class="text-gray-600">Add, edit, or remove products.</p>
        <router-link to="/admin/products" class="text-blue-500 hover:underline">Go to Products</router-link>
      </div>
      <div class="bg-white shadow-md rounded-lg p-4">
        <h2 class="text-xl font-semibold">Manage Orders</h2>
        <p class="text-gray-600">View and manage customer orders.</p>
        <router-link to="/admin/orders" class="text-blue-500 hover:underline">Go to Orders</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboardView',
};
</script>

<style scoped>
.admin-dashboard {
  background-color: #f9fafb; /* Tailwind's gray-100 */
}
</style>