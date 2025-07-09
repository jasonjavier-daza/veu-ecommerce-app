<!-- filepath: c:\Users\Julian\Documents\workspace\vue-ecommerce-app\src\components\UserManageComponent.vue -->
<template>
  <div class="p-6">
    <!-- Listado -->
    <div v-if="!showForm">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Listado de Usuarios</h2>
        <button @click="openCreateForm" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Crear Usuario
        </button>
      </div>
      <table class="min-w-full bg-white shadow rounded mb-6">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Perfil</th>
            <th class="py-2 px-4 border-b">Nombre</th>
            <th class="py-2 px-4 border-b">Email</th>
            <th class="py-2 px-4 border-b">Rol</th>
            <th class="py-2 px-4 border-b">Teléfono</th>
            <th class="py-2 px-4 border-b">País</th>
            <th class="py-2 px-4 border-b">Documento</th>
            <th class="py-2 px-4 border-b">Creado</th>
            <th class="py-2 px-4 border-b">Actualizado</th>
            <th class="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, idx) in users" :key="user.id">
            <td class="py-2 px-4 border-b">
              <img v-if="user.perfil" :src="user.perfil" alt="Perfil" class="w-12 h-12 object-cover rounded-full" />
              <span v-else class="text-gray-400">Sin imagen</span>
            </td>
            <td class="py-2 px-4 border-b">{{ user.first_name }} {{ user.last_name }}</td>
            <td class="py-2 px-4 border-b">{{ user.email }}</td>
            <td class="py-2 px-4 border-b">{{ user.role || '-' }}</td>
            <td class="py-2 px-4 border-b">{{ user.telefono || '-' }}</td>
            <td class="py-2 px-4 border-b">{{ user.pais || '-' }}</td>
            <td class="py-2 px-4 border-b">{{ user.numdoc || '-' }}</td>
            <td class="py-2 px-4 border-b text-xs">{{ formatDate(user.created_at) }}</td>
            <td class="py-2 px-4 border-b text-xs">{{ formatDate(user.updated_at) }}</td>
            <td class="py-2 px-4 border-b flex gap-2">
              <button @click="openEditForm(idx)" class="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500">Editar</button>
              <button @click="deleteUser(idx)" class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">Eliminar</button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="10" class="py-4 text-center text-gray-400">No hay usuarios</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Formulario -->
    <div v-else class="max-w-lg mx-auto bg-white p-6 rounded shadow-lg overflow-y-auto" style="max-height: 80vh;">
      <h3 class="text-xl font-bold mb-4">{{ editIndex === null ? 'Crear Usuario' : 'Editar Usuario' }}</h3>
      <form @submit.prevent="saveUser" class="space-y-3">
        <div>
          <label class="block text-sm font-medium">Nombre</label>
          <input v-model="form.first_name" type="text" class="input" required />
        </div>
        <div>
          <label class="block text-sm font-medium">Apellido</label>
          <input v-model="form.last_name" type="text" class="input" required />
        </div>
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input v-model="form.email" type="email" class="input" required />
        </div>
        <div>
          <label class="block text-sm font-medium">Contraseña</label>
          <input v-model="form.password" type="password" class="input" required />
        </div>
        <div>
          <label class="block text-sm font-medium">Rol</label>
          <input v-model="form.role" type="text" class="input" />
        </div>
        <div>
          <label class="block text-sm font-medium">Perfil (Imagen)</label>
          <input type="file" accept="image/*" class="input" @change="onImageChange" />
          <div v-if="form.perfil" class="mt-2">
            <img :src="form.perfil" alt="Vista previa" class="w-16 h-16 object-cover rounded-full" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium">Teléfono</label>
          <input v-model="form.telefono" type="text" class="input" />
        </div>
        <div>
          <label class="block text-sm font-medium">País</label>
          <input v-model="form.pais" type="text" class="input" />
        </div>
        <div>
          <label class="block text-sm font-medium">Número de documento</label>
          <input v-model="form.numdoc" type="text" class="input" />
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
const users = ref([])
const editIndex = ref(null)
let nextId = 1

const initialForm = {
  id: null,
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role: null,
  perfil: null,
  telefono: null,
  pais: null,
  numdoc: null,
  created_at: null,
  updated_at: null
}
const form = ref({ ...initialForm })

function onImageChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (event) => {
    form.value.perfil = event.target.result
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
  form.value = { ...users.value[idx] }
  showForm.value = true
}

function saveUser() {
  const now = new Date().toISOString()
  if (editIndex.value === null) {
    form.value.id = nextId++
    form.value.created_at = now
    form.value.updated_at = now
    users.value.push({ ...form.value })
  } else {
    form.value.updated_at = now
    users.value[editIndex.value] = { ...form.value }
  }
  showForm.value = false
  form.value = { ...initialForm }
  editIndex.value = null
}

function deleteUser(idx) {
  if (confirm('¿Seguro que deseas eliminar este usuario?')) {
    users.value.splice(idx, 1)
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