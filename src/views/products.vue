<template>
  <div class="list-of-products">
    <h2>Список товаров</h2>
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
import Cart from '@/views/cart.vue'

export default {
  components: {
    Product,
    Cart
  },
  data() {
    return {
      products: [
        { id: 1, name: 'Мыло', description: 'Вкусно пахнет', price: 100 },
        { id: 2, name: 'Зубная щётка', description: 'Настоящая', price: 650 },
        { id: 3, name: 'Губка', description: 'Мягкая', price: 250 },
        { id: 4, name: 'Хозяйственное мыло', description: 'Надёжное', price: 70 },
        { id: 5, name: 'Зубная нить', description: 'Тонкая', price: 330 },
      ],
      cart: []
    };
  },
  methods: {
    addToCart(productId) {
      this.$store.dispatch('addToCart', { productId, quantity: 1 });
    }
  }
}
</script>