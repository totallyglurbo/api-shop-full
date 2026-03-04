<template>
  <div class="product-item">
    <h3>{{ product.name }}</h3>
    <p>Описание: {{ product.description }} </p>
    <p>Цена: {{ product.price }} ₽</p>

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

  }
}
</script>