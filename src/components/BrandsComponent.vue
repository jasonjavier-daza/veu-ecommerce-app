<template>
    <div class="p-6">
        <!-- Listado -->
        <div v-if="!showForm">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">Listado de Marcas</h2>
                <button @click="openCreateForm" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Crear Marca
                </button>
            </div>
            <table class="min-w-full bg-white shadow rounded mb-6">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b">Banner</th>
                        <th class="py-2 px-4 border-b">Nombre</th>
                        <th class="py-2 px-4 border-b">Descripción</th>
                        <th class="py-2 px-4 border-b">Creado</th>
                        <th class="py-2 px-4 border-b">Actualizado</th>
                        <th class="py-2 px-4 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(marca, idx) in marcas" :key="marca.id">
                        <td class="py-2 px-4 border-b">
                            <img v-if="marca.banner" :src="marca.banner" alt="Banner"
                                class="w-16 h-16 object-cover rounded" />
                            <span v-else class="text-gray-400">Sin imagen</span>
                        </td>
                        <td class="py-2 px-4 border-b">{{ marca.nombre }}</td>
                        <td class="py-2 px-4 border-b">{{ marca.descripcion }}</td>
                        <td class="py-2 px-4 border-b text-xs">{{ formatDate(marca.created_at) }}</td>
                        <td class="py-2 px-4 border-b text-xs">{{ formatDate(marca.updated_at) }}</td>
                        <td class="py-2 px-4 border-b flex gap-2">
                            <button @click="openEditForm(idx)"
                                class="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500">
                                Editar
                            </button>
                            <button @click="deleteMarca(idx)"
                                class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                    <tr v-if="marcas.length === 0">
                        <td colspan="6" class="py-4 text-center text-gray-400">
                            No hay marcas
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Formulario -->
        <div v-else class="max-w-lg mx-auto bg-white p-6 rounded shadow-lg overflow-y-auto" style="max-height: 80vh;">
            <h3 class="text-xl font-bold mb-4">
                {{ editIndex === null ? 'Crear Marca' : 'Editar Marca' }}
            </h3>
            <form @submit.prevent="saveMarca" class="space-y-3">
                <div>
                    <label class="block text-sm font-medium">Nombre</label>
                    <input v-model="form.nombre" type="text" class="input" required />
                </div>
                <div>
                    <label class="block text-sm font-medium">Descripción</label>
                    <input v-model="form.descripcion" type="text" class="input" required />
                </div>
                <div>
                    <label class="block text-sm font-medium">URL del Banner</label>
                    <input v-model="form.banner" type="text" class="input"
                        placeholder="https://tuservidor.com/imagen.jpg" />
                    <div v-if="form.banner" class="mt-2">
                        <img :src="form.banner" alt="Vista previa" class="w-24 h-24 object-cover rounded" />
                    </div>
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
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios.js'

const apiEndpoint = 'marcas/'

const showForm = ref(false)
const marcas = ref([])
const editIndex = ref(null)

const initialForm = {
    id: null,
    nombre: '',
    descripcion: '',
    banner: '',
    created_at: null,
    updated_at: null
}
const form = ref({ ...initialForm })

onMounted(fetchMarcas)

async function fetchMarcas() {
    try {
        const response = await api.get(apiEndpoint)
        marcas.value = response.data
    } catch (error) {
        console.error('Error al cargar marcas:', error)
        alert('Error al cargar marcas.')
    }
}

function openCreateForm() {
    editIndex.value = null
    form.value = { ...initialForm }
    showForm.value = true
}

function openEditForm(idx) {
    editIndex.value = idx
    form.value = { ...marcas.value[idx] }
    showForm.value = true
}

async function saveMarca() {
    try {
        if (editIndex.value === null) {
            const response = await api.post(apiEndpoint, form.value)
            marcas.value.push(response.data)
        } else {
            const id = form.value.id
            const response = await api.put(`${apiEndpoint}${id}/`, form.value)
            marcas.value[editIndex.value] = response.data
        }
        showForm.value = false
        form.value = { ...initialForm }
        editIndex.value = null
    } catch (error) {
        console.error('Error al guardar marca:', error)
        alert('Error al guardar marca.')
    }
}

async function deleteMarca(idx) {
    if (!confirm('¿Seguro que deseas eliminar esta marca?')) return
    try {
        const id = marcas.value[idx].id
        await api.delete(`${apiEndpoint}${id}/`)
        marcas.value.splice(idx, 1)
    } catch (error) {
        console.error('Error al eliminar marca:', error)
        alert('Error al eliminar marca.')
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
