<template>
  <div class="product-item">
    <h3>Название: {{ product.name }}</h3>
    <p>Описание: {{ product.description }} </p>
    <p>Стоимость: {{ product.price }} ₽</p>
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