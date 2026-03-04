<template>
  <div class="product-item">
    <h3>{{ product.name }}</h3>
    <p>Описание: {{ product.description }} </p>
    <p>Цена: {{ product.price }} ₽</p>
    <button @click="addToCart">Добавить в корзину</button>
  </div>
</template>

<script>
export default {
  name: 'product',

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  methods: {
    addToCart() {
      this.$store.commit('addToCart', this.product);
    }
  }
}
</script>