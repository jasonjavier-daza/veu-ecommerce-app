<template>
  <div class="container mx-auto p-4">
    <ProductDetailComponent :product="product" />
  </div>
</template>

<script>
import ProductDetailComponent from '@/components/ProductDetailComponent.vue';

export default {
  components: {
    ProductDetailComponent,
  },
  data() {
    return {
      product: null,
    };
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    fetchProduct() {
      // Fetch product details based on route parameter (e.g., product ID)
      const productId = this.$route.params.id;
      // Simulating an API call
      this.product = {
        id: productId,
        name: 'Sample Product',
        description: 'This is a sample product description.',
        price: 29.99,
        image: 'path/to/image.jpg',
      };
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>