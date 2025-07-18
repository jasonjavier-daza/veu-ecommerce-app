<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Detalle de Orden</h1>

    <div v-if="loading">Cargando datos...</div>

    <div v-else-if="!order">No se encontró la orden.</div>

    <div v-else class="space-y-4 bg-white shadow p-6 rounded-lg">
      <p><strong>Orden ID:</strong> {{ order.id }}</p>
      <p><strong>Fecha:</strong> {{ formatDate(order.created_at) }}</p>
      <p><strong>Cliente:</strong> {{ order.user?.first_name }} {{ order.user?.last_name }}</p>
      <p><strong>Total:</strong> ${{ order.total.toFixed(2) }}</p>
      <p><strong>Estado:</strong> {{ order.status }}</p>

      <h2 class="text-xl font-semibold mt-4">Productos</h2>
      <ul class="border-t mt-2 pt-2 space-y-2">
        <li v-for="item in order.items" :key="item.id" class="border-b pb-2">
          {{ item.product_name }} - {{ item.quantity }} x ${{ item.price }}
        </li>
      </ul>

      <router-link to="/admin/order-history" class="inline-block mt-4 text-blue-500 hover:underline">
        ← Volver al listado
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/plugins/axios'

const route = useRoute()
const orderId = route.params.id

const loading = ref(false)
const order = ref(null)

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleString()
}

async function fetchOrderDetails() {
  loading.value = true
  try {
    const res = await api.get(`/orders/${orderId}/`)
    order.value = res.data
  } catch (error) {
    console.error('Error cargando orden:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOrderDetails()
})
</script>
