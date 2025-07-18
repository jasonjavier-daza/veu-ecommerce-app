<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 m-auto">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Login
        </button>

        <p v-if="error" class="text-red-500 text-sm mt-4 text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/plugins/axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async handleLogin() {
      this.error = '';
      try {
        const response = await api.post('/login/', {
          email: this.email,
          password: this.password
        });

        const user = response.data;

        if (user && user.role === 'admin') {
          this.$store.commit('setUser', user);
          this.$router.push('/admin');
        } else {
          this.error = 'No tiene permisos de administrador.';
        }
      } catch (err) {
        this.error = 'Credenciales inválidas o error al conectar con el servidor.';
      }
    }
  }
};
</script>
