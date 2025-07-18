<template>
  <!-- Botón de menú -->
  <button @click="toggleSidebar" class="absolute top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white">
    <svg v-if="!isSidebarOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
    <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <!-- Sidebar -->
  <transition name="slide">
    <fwb-sidebar v-if="isSidebarOpen"
      class="fixed top-0 left-0 z-40 w-64 bg-white shadow-lg h-screen transition-transform" :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-full': !isSidebarOpen && isMobile,
        'md:static md:block': true
      }">
      <!-- Encabezado -->
      <div class="flex justify-between items-center p-4 md:hidden">
        <span class="text-lg font-bold">MyShop</span>
        <button @click="toggleSidebar">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Sidebar content -->
      <div class="px-4 py-2 text-center text-gray-700 ml-8">
        <p class="text-sm">E-commerce App</p>
        <p class="text-xs text-gray-500">{{ userRoleLabel }}</p>
      </div>
      <!-- Ítems públicos SOLO para clientes -->
      <template v-if="!isAdmin">
        <fwb-sidebar-item>
          <template #icon>
            <!-- Tienda icon -->
          </template>
          <template #default>
            <router-link to="/" @click="closeSidebarOnMobile" class="block py-2 px-4 rounded hover:bg-gray-100">
              Tienda
            </router-link>
          </template>
        </fwb-sidebar-item>

        <fwb-sidebar-item>
          <template #icon>
            <!-- Seguimiento icon -->
          </template>
          <template #default>
            <router-link to="/tracking" @click="closeSidebarOnMobile" class="block py-2 px-4 hover:bg-gray-100">
              Seguimiento
            </router-link>
          </template>
        </fwb-sidebar-item>

        <fwb-sidebar-item>
          <template #icon>
            <!-- Login icon -->
          </template>
          <template #default>
            <router-link to="/login" @click="closeSidebarOnMobile" class="block py-2 px-4 hover:bg-gray-100">
              Login
            </router-link>
          </template>
        </fwb-sidebar-item>
      </template>




      <!-- Rutas del ADMIN -->
      <template v-if="isAdmin">
        <fwb-sidebar-item>
          <template #icon>
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h18M9 3v18M15 3v18M4 9h16M4 15h16" />
            </svg>
          </template>
          <template #default>
            <router-link to="/admin/order-history" @click="closeSidebarOnMobile"
              class="block py-2 px-4 hover:bg-gray-100">
              Órdenes
            </router-link>
          </template>
        </fwb-sidebar-item>

        <fwb-sidebar-item>
          <template #icon>
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4" />
            </svg>
          </template>
          <template #default>
            <router-link to="/admin/productos" @click="closeSidebarOnMobile" class="block py-2 px-4 hover:bg-gray-100">
              Productos
            </router-link>
          </template>
        </fwb-sidebar-item>

        <fwb-sidebar-item>
          <template #icon>
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </template>
          <template #default>
            <router-link to="/admin/categorias" @click="closeSidebarOnMobile" class="block py-2 px-4 hover:bg-gray-100">
              Categorías
            </router-link>
          </template>
        </fwb-sidebar-item>

        <fwb-sidebar-item>
          <template #icon>
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 12l2 2 4-4" />
            </svg>
          </template>
          <template #default>
            <router-link to="/admin/marcas" @click="closeSidebarOnMobile" class="block py-2 px-4 hover:bg-gray-100">
              Marcas
            </router-link>
          </template>
        </fwb-sidebar-item>

        <fwb-sidebar-item>
          <template #icon>
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </template>
          <template #default>
            <router-link to="/admin/usuarios" @click="closeSidebarOnMobile" class="block py-2 px-4 hover:bg-gray-100">
              Usuarios
            </router-link>
          </template>
        </fwb-sidebar-item>

        <fwb-sidebar-item>
          <template #icon>
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </template>
          <template #default>
            <router-link to="/admin/profile" @click="closeSidebarOnMobile" class="block py-2 px-4 hover:bg-gray-100">
              Perfil
            </router-link>
          </template>
        </fwb-sidebar-item>
        <fwb-sidebar-item>
          <template #icon>
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
            </svg>
          </template>
          <template #default>
            <button @click="logout" class="block py-2 px-4 w-full text-left hover:bg-gray-100">
              Cerrar Sesión
            </button>
          </template>
        </fwb-sidebar-item>

      </template>
    </fwb-sidebar>
  </transition>

  <!-- Overlay oscuro -->
  <div v-if="isSidebarOpen && isMobile" class="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
    @click="toggleSidebar"></div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { FwbSidebar, FwbSidebarItem } from 'flowbite-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

const isSidebarOpen = ref(window.innerWidth >= 768)
const isMobile = ref(window.innerWidth < 768)

// Rol desde Vuex
const userRole = computed(() => store.state.user?.role)
const isAdmin = computed(() => userRole.value === 'admin')
const userRoleLabel = computed(() => (isAdmin.value ? 'Administrador' : 'Cliente'))


function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebarOnMobile() {
  if (isMobile.value) isSidebarOpen.value = false
}

function handleResize() {
  isMobile.value = window.innerWidth < 768
  isSidebarOpen.value = !isMobile.value
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})


function logout() {
  store.commit('logout') // limpia Vuex
  router.push('/login')
  location.reload();
}

</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
