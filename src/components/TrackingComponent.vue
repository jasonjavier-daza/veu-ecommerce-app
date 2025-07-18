<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">🔍 Seguimiento de tu Pedido</h1>

    <form @submit.prevent="fetchTracking" class="mb-6">
      <label class="block mb-2 font-medium">Número de seguimiento</label>
      <input
        v-model="trackingNumber"
        type="text"
        placeholder="Ej. TRK123456"
        class="w-full border border-gray-300 rounded px-4 py-2 mb-3"
        required
      />
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
        Consultar
      </button>
    </form>

    <div v-if="venta">
      <h2 class="text-xl font-semibold mb-2">📦 Detalles del Pedido</h2>
      <ul class="bg-gray-100 p-4 rounded space-y-2 text-sm">
        <li><strong>Estado:</strong> {{ venta.estado }}</li>
        <li><strong>Destinatario:</strong> {{ venta.destinatario }}</li>
        <li><strong>Dirección:</strong> {{ venta.direccion }}, {{ venta.ciudad }} ({{ venta.pais }})</li>
        <li><strong>Referencia:</strong> {{ venta.referencia }}</li>
        <li><strong>Tipo de envío:</strong> {{ venta.tipo_envio }} ({{ venta.tiempo_estimado }})</li>
        <li><strong>Total pagado:</strong> ${{ Number(venta.total_pagado).toFixed(2) }}</li>
        <li><strong>Método de pago:</strong> {{ venta.metodo_pago }}</li>
        <li><strong>Fecha:</strong> {{ venta.day }}/{{ venta.month }}/{{ venta.year }}</li>
      </ul>
    </div>

    <div v-else-if="error" class="text-red-500 mt-4">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/plugins/axios';

const trackingNumber = ref('');
const venta = ref(null);
const error = ref('');

async function fetchTracking() {
  try {
    const { data } = await api.get(`/tracking/${trackingNumber.value}`);
    venta.value = data;
    error.value = '';
  } catch (err) {
    venta.value = null;
    error.value = 'No se encontró ningún pedido con ese número.';
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}
</style>
