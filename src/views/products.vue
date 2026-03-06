<template>
  <div class="list-of-products">
    <h2>Каталог товаров</h2>
    <div class="products-container">
      <Product
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import Product from '@/components/product.vue';
import { productsRequest } from '@/utils/api.js';
import Cart from '@/views/cart.vue'

export default {
  components: {
    Product,
    Cart
  },
  data() {
    return {
      products: [],
      cart: []
    };
  },
  mounted() {
  this.loadProducts();
},
  methods: {
    addToCart(productId) {
      this.$store.dispatch('addToCart', { productId, quantity: 1 });
    },
    loadProducts() {
    productsRequest()
      .then(data => {
        this.products = data;
      })
      .catch(error => {
        console.error('Ошибка загрузки продуктов:', error);
      });
  }
  }
}
</script>