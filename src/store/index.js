import { createStore } from 'vuex';

const store = createStore({
  state: {
    products: [],
    cart: [],
    user: null,
    orders: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, product) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    },
    clearCart(state) {
      state.cart = [];
    },
    setUser(state, user) {
      state.user = user;
    },
    setOrders(state, orders) {
      state.orders = orders;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      // Fetch products from an API or other source
      // commit('setProducts', fetchedProducts);
    },
    login({ commit }, user) {
      // Handle user login
      // commit('setUser', loggedInUser);
    },
    register({ commit }, user) {
      // Handle user registration
      // commit('setUser', registeredUser);
    },
    fetchOrders({ commit }) {
      // Fetch orders for the logged-in user
      // commit('setOrders', fetchedOrders);
    },
  },
  getters: {
    cartItemCount(state) {
      return state.cart.reduce((count, item) => count + item.quantity, 0);
    },
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    isAuthenticated(state) {
      return !!state.user;
    },
  },
});

export default store;