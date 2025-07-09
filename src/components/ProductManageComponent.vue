<template>
  <div class="p-6">
    <!-- Listado de productos -->
    <div v-if="!showForm">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Listado de Productos</h2>
        <button @click="openCreateForm" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Crear Producto
        </button>
      </div>
      <table class="min-w-full bg-white shadow rounded mb-6">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Imagen</th>
            <th class="py-2 px-4 border-b">Título</th>
            <th class="py-2 px-4 border-b">Precio</th>
            <th class="py-2 px-4 border-b">Stock</th>
            <th class="py-2 px-4 border-b">Estado</th>
            <th class="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(prod, idx) in products" :key="prod.id || idx">
            <td class="py-2 px-4 border-b">
              <img v-if="prod.poster" :src="prod.poster" alt="Imagen" class="w-16 h-16 object-cover rounded" />
              <span v-else class="text-gray-400">Sin imagen</span>
            </td>
            <td class="py-2 px-4 border-b">{{ prod.titulo }}</td>
            <td class="py-2 px-4 border-b">${{ prod.precio_ahora }}</td>
            <td class="py-2 px-4 border-b">{{ prod.stock }}</td>
            <td class="py-2 px-4 border-b">{{ prod.status }}</td>
            <td class="py-2 px-4 border-b flex gap-2">
              <button @click="openEditForm(idx)" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                Editar
              </button>
              <button @click="deleteProduct(idx)" class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                Eliminar
              </button>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="6" class="py-4 text-center text-gray-400">
              No hay productos
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Formulario -->
    <div v-else class="max-w-lg mx-auto bg-white p-6 rounded shadow-lg overflow-y-auto" style="max-height: 80vh;">
      <h3 class="text-xl font-bold mb-4">
        {{ editIndex === null ? "Crear Producto" : "Editar Producto" }}
      </h3>
      <form @submit.prevent="saveProduct" class="space-y-3">
        <div>
          <label class="block text-sm font-medium">URL de la Imagen</label>
          <input v-model="form.poster" type="url" placeholder="https://..." class="input" />
          <div v-if="form.poster" class="mt-2">
            <img :src="form.poster" alt="Vista previa" class="w-24 h-24 object-cover rounded" />
          </div>
        </div>
        <div class="flex gap-2">
          <div class="flex-1">
            <label class="block text-sm font-medium">Categoría</label>
            <select v-model.number="form.categoria_id" class="input" required>
              <option disabled value="">Seleccione</option>
              <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
                {{ cat.nombre }}
              </option>
            </select>
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium">Marca</label>
            <select v-model.number="form.marca_id" class="input" required>
              <option disabled value="">Seleccione</option>
              <option v-for="mar in marcas" :key="mar.id" :value="mar.id">
                {{ mar.nombre }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium">Título</label>
          <input v-model="form.titulo" type="text" class="input" required />
        </div>
        <div>
          <label class="block text-sm font-medium">Slug</label>
          <input v-model="form.slug" type="text" class="input" required />
        </div>
        <div class="flex gap-2">
          <div class="flex-1">
            <label class="block text-sm font-medium">Precio Actual</label>
            <input v-model.number="form.precio_ahora" type="number" class="input" required />
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium">Precio Antes</label>
            <input v-model.number="form.precio_antes" type="number" class="input" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium">Video Review</label>
          <input v-model="form.video_review" type="url" class="input" />
        </div>
        <div>
          <label class="block text-sm font-medium">Info Short</label>
          <input v-model="form.info_short" type="text" class="input" />
        </div>
        <div>
          <label class="block text-sm font-medium">Detalle</label>
          <textarea v-model="form.detalle" class="input"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium">Stock</label>
          <input v-model.number="form.stock" type="number" class="input" required />
        </div>
        <div>
          <label class="block text-sm font-medium">Subcategoría</label>
          <input v-model="form.subcategoria" type="text" class="input" />
        </div>
        <div>
          <label class="block text-sm font-medium">Nombre Selector</label>
          <input v-model="form.nombre_selector" type="text" class="input" />
        </div>
        <div class="flex gap-2">
          <div class="flex-1">
            <label class="block text-sm font-medium">Stars</label>
            <input v-model.number="form.stars" type="number" class="input" min="0" />
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium">Ventas</label>
            <input v-model.number="form.ventas" type="number" class="input" min="0" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium">Estado</label>
          <select v-model="form.status" class="input">
            <option value="Active">Activo</option>
            <option value="Inactive">Inactivo</option>
          </select>
        </div>
        <div class="flex gap-2 mt-4">
          <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
            Guardar
          </button>
          <button type="button" @click="cancelForm"
            class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 w-full">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios.js";

const showForm = ref(false);
const products = ref([]);
const categorias = ref([]);
const marcas = ref([]);
const editIndex = ref(null);

const initialForm = {
  categoria_id: "",
  marca_id: "",
  titulo: "",
  slug: "",
  poster: "",
  precio_ahora: 0,
  precio_antes: 0,
  video_review: "",
  info_short: "",
  detalle: "",
  stock: 0,
  subcategoria: "",
  nombre_selector: "",
  stars: 0,
  ventas: 0,
  status: "Active",
};

const form = ref({ ...initialForm });

async function fetchCategorias() {
  const { data } = await api.get("categorias/");
  categorias.value = data;
}

async function fetchMarcas() {
  const { data } = await api.get("marcas/");
  marcas.value = data;
}

async function fetchProductos() {
  const { data } = await api.get("productos/");
  products.value = data;
}

async function saveProduct() {
  if (editIndex.value === null) {
    await api.post("productos/", form.value);
  } else {
    const id = products.value[editIndex.value].id;
    await api.put(`productos/${id}/`, form.value);
  }
  await fetchProductos();
  cancelForm();
}

async function deleteProduct(idx) {
  const producto = products.value[idx];
  if (!producto?.id) return;
  if (confirm("¿Seguro que deseas eliminar este producto?")) {
    await api.delete(`productos/${producto.id}/`);
    await fetchProductos();
  }
}

function openCreateForm() {
  editIndex.value = null;
  form.value = { ...initialForm };
  showForm.value = true;
}

function openEditForm(idx) {
  editIndex.value = idx;
  form.value = { ...products.value[idx] };
  showForm.value = true;
}

function cancelForm() {
  showForm.value = false;
  form.value = { ...initialForm };
  editIndex.value = null;
}

onMounted(() => {
  fetchCategorias();
  fetchMarcas();
  fetchProductos();
});
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400;
}
</style>
