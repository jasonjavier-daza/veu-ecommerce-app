// Importo funciones de Vue Router:
// createRouter: crea la instancia del enrutador
// createWebHistory: permite usar historial HTML5 (URLs limpias)
import { createRouter, createWebHistory } from 'vue-router';

// Importo todas las vistas que se usarán como componentes de las rutas
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import CartView from '../views/CartView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ProfileView from '../views/ProfileView.vue';
import OrderHistoryView from '../views/OrderHistoryView.vue';
import AdminDashboardView from '../views/AdminDashboardView.vue';
import ProductManageView from '../views/ProductManageView.vue';
import BrandsView from '../views/BrandsView.vue';
import CategoriesView from '../views/CategoriesView.vue';
import UsersView from '../views/UsersView.vue';

// Defino las rutas de la aplicación
const routes = [
  // Página principal
  { path: '/', component: HomeView },

  // Vista para gestionar productos (administrador)
  { path: '/product', component: ProductManageView },

  // Vista para ver el detalle de un producto (usa parámetro dinámico :id)
  { path: '/product/:id', component: ProductView },

  // Carrito de compras
  { path: '/cart', component: CartView },

  // Checkout o proceso de pago
  { path: '/checkout', component: CheckoutView },

  // Login de usuarios
  { path: '/login', component: LoginView },

  // Registro de usuarios
  { path: '/register', component: RegisterView },

  // Perfil de usuario
  { path: '/profile', component: ProfileView },

  // Historial de pedidos
  { path: '/order-history', component: OrderHistoryView },

  // Gestión de marcas
  { path: '/brands', component: BrandsView },

  // Gestión de categorías
  { path: '/categories', component: CategoriesView },

  // Gestión de usuarios
  { path: '/users', component: UsersView },

  // Dashboard de administración
  { path: '/admin', component: AdminDashboardView },
];

// Creo el enrutador usando historial HTML5 y las rutas definidas
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

// Exporto el enrutador para importarlo en main.js
export default router;
// Nota: Este archivo define las rutas de la aplicación y los componentes asociados a cada ruta.