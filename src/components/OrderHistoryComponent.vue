<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Gestión de Órdenes</h1>

    <div v-if="loading" class="text-gray-600">Cargando órdenes...</div>
    <div v-else-if="orders.length === 0" class="text-gray-500">No hay órdenes registradas.</div>

    <ul v-else class="space-y-4">
      <li v-for="order in orders" :key="order.id" class="border p-4 rounded-lg bg-white shadow">
        <h2 class="font-semibold text-lg mb-2">Orden #{{ order.id }}</h2>

        <div class="grid md:grid-cols-2 gap-2 text-sm">
          <p><strong>Fecha:</strong> {{ formatDate(order.created_at) }}</p>
          <p><strong>Total:</strong> ${{ order.total_pagado }}</p>
          <p><strong>Estado:</strong> <span class="font-medium">{{ order.estado }}</span></p>
          <p><strong>Tracking:</strong> {{ order.tracking_number || 'No generado' }}</p>
          <p><strong>Pago:</strong> {{ order.metodo_pago || '-' }}</p>
          <p><strong>Cupon:</strong> {{ order.codigo_cupon || 'Ninguno' }}</p>
          <p><strong>Destinatario:</strong> {{ order.destinatario }}</p>
          <p><strong>Dirección:</strong> {{ order.direccion }}, {{ order.ciudad }}, {{ order.pais }}</p>
        </div>

        <!-- Acciones -->
        <div class="mt-4 flex flex-wrap gap-2">
          <select v-model="order.estado" @change="actualizarEstado(order)" class="border rounded px-2 py-1">
            <option value="pendiente">Pendiente</option>
            <option value="procesando">Procesando</option>
            <option value="enviado">Enviado</option>
            <option value="entregado">Entregado</option>
            <option value="cancelado">Cancelado</option>
          </select>

          <button @click="eliminarOrden(order.id)" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
            Eliminar
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const orders = ref([])
const loading = ref(true)

onMounted(fetchOrders)

async function fetchOrders() {
  loading.value = true
  try {
    const { data } = await api.get('/admin/orders/')
    orders.value = data
  } catch (error) {
    console.error('Error al obtener órdenes:', error)
  } finally {
    loading.value = false
  }
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleString()
}

async function actualizarEstado(order) {
  try {
    await api.patch(`/admin/orders/${order.id}/`, { estado: order.estado })
    alert('Estado actualizado correctamente.')
  } catch (error) {
    console.error('Error actualizando estado:', error)
    alert('Hubo un error al actualizar el estado.')
  }
}

async function eliminarOrden(id) {
  if (!confirm('¿Seguro que deseas eliminar esta orden?')) return
  try {
    await api.delete(`/admin/orders/${id}/`)
    orders.value = orders.value.filter(o => o.id !== id)
    alert('Orden eliminada correctamente.')
  } catch (error) {
    console.error('Error eliminando orden:', error)
    alert('No se pudo eliminar la orden.')
  }
}
</script>

<style scoped>
select {
  min-width: 160px;
}
</style>
