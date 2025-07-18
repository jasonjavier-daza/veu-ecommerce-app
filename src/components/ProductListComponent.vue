<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Nuestros Productos</h2>

    <div v-if="loading" class="text-gray-500 text-center py-10">
      Cargando productos...
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="(prod, idx) in products"
        :key="prod.id || idx"
        class="border rounded-lg p-4 shadow hover:shadow-md transition"
      >
        <img
          v-if="prod.poster"
          :src="prod.poster"
          alt="Imagen del producto"
          class="w-full h-48 object-cover mb-3 rounded"
        />
        <span
          v-else
          class="block w-full h-48 bg-gray-100 text-gray-400 flex items-center justify-center mb-3"
        >
          Sin imagen
        </span>
        <h3 class="text-lg font-semibold mb-1">{{ prod.titulo }}</h3>
        <p class="text-gray-700 mb-2">${{ prod.precio_ahora }}</p>
        <button
          @click="addToCart(prod)"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Agregar al carrito
        </button>
      </div>
    </div>

    <div
      v-if="!loading && products.length === 0"
      class="text-center text-gray-500 py-10"
    >
      No hay productos disponibles.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import api from '@/plugins/axios.js';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const loading = ref(false);

const products = computed(() => store.state.products);

async function fetchProductos() {
  loading.value = true;
  try {
    const { data } = await api.get('productos/');
    store.commit('setProducts', data);
  } catch (error) {
    console.error('Error al cargar productos:', error);
  } finally {
    loading.value = false;
  }
}

function addToCart(product) {
  // Asegúrate que tu store los formatee bien:
  // { id, name, price, poster, quantity }
  store.commit('addToCart', {
    id: product.id,
    name: product.titulo,
    price: product.precio_ahora,
    poster: product.poster,
    quantity: 1
  });
  router.push('/cart');
}

onMounted(() => {
  fetchProductos();
});
</script>

<style scoped></style>
