<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <form @submit.prevent="register" class="bg-white p-6 rounded shadow-md w-80">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input type="text" id="username" v-model="username" required class="mt-1 block w-full p-2 border border-gray-300 rounded" />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" v-model="email" required class="mt-1 block w-full p-2 border border-gray-300 rounded" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" v-model="password" required class="mt-1 block w-full p-2 border border-gray-300 rounded" />
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
    </form>
    <p class="mt-4 text-sm">Already have an account? <router-link to="/login" class="text-blue-500">Login here</router-link>.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    register() {
      // Handle user registration logic here
      console.log('User registered:', this.username, this.email);
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>