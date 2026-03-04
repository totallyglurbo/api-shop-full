<template>

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