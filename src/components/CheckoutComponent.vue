<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded shadow">
    <h1 class="text-2xl font-bold mb-6">Confirmar Pedido</h1>

    <!-- Éxito -->
    <div v-if="successMessage" class="bg-green-100 text-green-800 p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-2">✅ Pedido Enviado</h2>
      <p>{{ successMessage }}</p>
      <router-link to="/" class="mt-4 inline-block text-blue-600 underline">Volver al inicio</router-link>
    </div>

    <!-- Formulario -->
    <form v-else @submit.prevent="submitOrder" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Destinatario</label>
        <input v-model="form.destinatario" type="text" class="input" required />
      </div>

      <div>
        <label class="block text-sm font-medium">Dirección</label>
        <input v-model="form.direccion" type="text" class="input" required />
      </div>

      <div class="flex gap-2">
        <div class="flex-1">
          <label class="block text-sm font-medium">Ciudad</label>
          <input v-model="form.ciudad" type="text" class="input" required />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium">País</label>
          <input v-model="form.pais" type="text" class="input" required />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium">Código Postal (ZIP)</label>
        <input v-model="form.zip" type="text" class="input" required />
      </div>

      <div>
        <label class="block text-sm font-medium">Referencia</label>
        <input v-model="form.referencia" type="text" class="input bg-gray-100" readonly/>
      </div>

      <div>
        <label class="block text-sm font-medium">Método de Pago</label>
        <select v-model="form.metodo_pago" class="input" required>
          <option disabled value="">Seleccionar método</option>
          <option value="tarjeta">Tarjeta de crédito</option>
          <option value="efectivo">Pago en efectivo</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      <!-- Campos inhabilitados -->
      <div class="flex gap-2">
        <div class="flex-1">
          <label class="block text-sm font-medium">Tipo de Envío</label>
          <input v-model="form.tipo_envio" class="input bg-gray-100" readonly />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium">Precio Envío</label>
          <input v-model="form.precio_envio" class="input bg-gray-100" readonly />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium">Tiempo Estimado</label>
        <input v-model="form.tiempo_estimado" class="input bg-gray-100" readonly />
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Confirmar Pedido
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import api from '@/plugins/axios';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const successMessage = ref('');

const cartItems = computed(() => store.state.cart);
const total = computed(() => store.getters.cartTotal);

// Generar referencia automáticamente a partir de los títulos de los productos
const productTitles = computed(() =>
  cartItems.value.map(p => p.titulo || p.name).join(', ')
);

// Formulario con la referencia prellenada
const form = ref({
  destinatario: '',
  direccion: '',
  ciudad: '',
  pais: '',
  zip: '',
  referencia: '', // Será seteada automáticamente
  metodo_pago: '',
  tipo_envio: 'normal',
  precio_envio: '5.99',
  tiempo_estimado: '3-5 días',
  estado: 'pendiente',
});

// Asignar referencia al montar el componente
onMounted(() => {
  form.value.referencia = productTitles.value;
});

async function submitOrder() {
  const now = new Date();

  const payload = {
    ...form.value,
    total_pagado: total.value,
    day: now.getDate().toString().padStart(2, '0'),
    month: (now.getMonth() + 1).toString().padStart(2, '0'),
    year: now.getFullYear().toString(),
  };

  try {
    const { data } = await api.post('/ventas/', payload);
    store.commit('clearCart');
    successMessage.value = `✅ Tu pedido fue registrado exitosamente. Número de comprobante: ${data.tracking_number}`;
  } catch (error) {
    console.error('Error al enviar pedido:', error);
    alert('Hubo un error al procesar el pedido. Intenta nuevamente.');
  }
}
</script>


<style scoped>
.input {
  @apply w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400;
}
</style>
