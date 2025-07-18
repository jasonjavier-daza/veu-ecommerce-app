<template>
  <div class="admin-dashboard p-6">
    <h1 class="text-3xl font-bold mb-4">Bienvenido, {{ adminName }}</h1>
    <p class="text-gray-600 mb-8">Desde aquí puedes gestionar tu tienda en línea.</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="card in dashboardCards"
        :key="card.title"
        class="bg-white shadow-md rounded-lg p-6"
      >
        <h2 class="text-xl font-semibold mb-2">{{ card.title }}</h2>
        <p class="text-gray-500 text-sm">{{ card.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const adminName = computed(() => {
  const user = store.state.user
  return user ? `${user.first_name} ${user.last_name}` : 'Administrador'
})

const dashboardCards = [
  {
    title: 'Usuarios',
    description: 'Administra cuentas de usuario, incluyendo otros administradores.',
  },
  {
    title: 'Productos',
    description: 'Agrega, edita o elimina productos de tu tienda.',
  },
  {
    title: 'Categorías',
    description: 'Organiza tus productos en categorías claras.',
  },
  {
    title: 'Marcas',
    description: 'Gestiona las marcas asociadas a tus productos.',
  },
  {
    title: 'Pedidos',
    description: 'Consulta los pedidos realizados por tus clientes.',
  },
  {
    title: 'Perfil',
    description: 'Actualiza tu información personal y de acceso.',
  },
]
</script>

<style scoped>
.admin-dashboard {
  background-color: #f9fafb; /* gray-100 */
}
</style>
