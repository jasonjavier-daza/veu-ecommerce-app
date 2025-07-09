<!-- filepath: c:\Users\Julian\Documents\workspace\vue-ecommerce-app\src\components\CategoryManageComponent.vue -->
<template>
  <div class="p-6">
    <!-- Listado -->
    <div v-if="!showForm">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Listado de Categorías</h2>
        <button @click="openCreateForm" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Crear Categoría
        </button>
      </div>
      <table class="min-w-full bg-white shadow rounded mb-6">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Banner</th>
            <th class="py-2 px-4 border-b">Nombre</th>
            <th class="py-2 px-4 border-b">Icono</th>
            <th class="py-2 px-4 border-b">Subcategorías</th>
            <th class="py-2 px-4 border-b">State Banner</th>
            <th class="py-2 px-4 border-b">Creado</th>
            <th class="py-2 px-4 border-b">Actualizado</th>
            <th class="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cat, idx) in categorias" :key="idx">
            <td class="py-2 px-4 border-b">
              <img v-if="cat.banner" :src="cat.banner" alt="Banner" class="w-16 h-16 object-cover rounded" />
              <span v-else class="text-gray-400">Sin imagen</span>
            </td>
            <td class="py-2 px-4 border-b">{{ cat.nombre }}</td>
            <td class="py-2 px-4 border-b">{{ cat.icono }}</td>
            <td class="py-2 px-4 border-b">{{ cat.subcategorias }}</td>
            <td class="py-2 px-4 border-b">{{ cat.state_banner ? 'Sí' : 'No' }}</td>
            <td class="py-2 px-4 border-b text-xs">{{ formatDate(cat.created_at) }}</td>
            <td class="py-2 px-4 border-b text-xs">{{ formatDate(cat.updated_at) }}</td>
            <td class="py-2 px-4 border-b flex gap-2">
              <button @click="openEditForm(idx)" class="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500">Editar</button>
              <button @click="deleteCategoria(idx)" class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">Eliminar</button>
            </td>
          </tr>
          <tr v-if="categorias.length === 0">
            <td colspan="8" class="py-4 text-center text-gray-400">No hay categorías</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Formulario -->
    <div v-else class="max-w-lg mx-auto bg-white p-6 rounded shadow-lg overflow-y-auto" style="max-height: 80vh;">
      <h3 class="text-xl font-bold mb-4">{{ editIndex === null ? 'Crear Categoría' : 'Editar Categoría' }}</h3>
      <form @submit.prevent="saveCategoria" class="space-y-3">
        <div>
          <label class="block text-sm font-medium">Nombre</label>
          <input v-model="form.nombre" type="text" class="input" required />
        </div>
        <div>
          <label class="block text-sm font-medium">Icono</label>
          <input v-model="form.icono" type="text" class="input" required />
        </div>
        <div>
          <label class="block text-sm font-medium">Subcategorías</label>
          <input v-model="form.subcategorias" type="text" class="input" required />
        </div>
        <div>
          <label class="block text-sm font-medium">Banner (Imagen)</label>
          <input type="file" accept="image/*" class="input" @change="onImageChange" />
          <div v-if="form.banner" class="mt-2">
            <img :src="form.banner" alt="Vista previa" class="w-24 h-24 object-cover rounded" />
          </div>
        </div>
        <div>
          <label class="inline-flex items-center mt-2">
            <input type="checkbox" v-model="form.state_banner" class="form-checkbox" />
            <span class="ml-2">¿Mostrar banner?</span>
          </label>
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
import { ref } from 'vue'

const showForm = ref(false)
const categorias = ref([])
const editIndex = ref(null)

const initialForm = {
  nombre: '',
  icono: '',
  subcategorias: '',
  banner: null,
  state_banner: false,
  created_at: null,
  updated_at: null
}
const form = ref({ ...initialForm })

function onImageChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (event) => {
    form.value.banner = event.target.result
  }
  reader.readAsDataURL(file)
}

function openCreateForm() {
  editIndex.value = null
  form.value = { ...initialForm }
  showForm.value = true
}

function openEditForm(idx) {
  editIndex.value = idx
  form.value = { ...categorias.value[idx] }
  showForm.value = true
}

function saveCategoria() {
  const now = new Date().toISOString()
  if (editIndex.value === null) {
    form.value.created_at = now
    form.value.updated_at = now
    categorias.value.push({ ...form.value })
  } else {
    form.value.updated_at = now
    categorias.value[editIndex.value] = { ...form.value }
  }
  showForm.value = false
  form.value = { ...initialForm }
  editIndex.value = null
}

function deleteCategoria(idx) {
  if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
    categorias.value.splice(idx, 1)
  }
}

function cancelForm() {
  showForm.value = false
  form.value = { ...initialForm }
  editIndex.value = null
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleString()
}
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400;
}
</style>