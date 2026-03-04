<template>
  <div class="cart">
    <h2>Корзина</h2>
    <div v-if="$store.state.cart.length === 0">Пусто</div>
    <ul>
      <div class="cart-item-container">
        <li v-for="item in $store.state.cart" :key="item.id" class="cart-item">
          {{ item.name }} — {{ item.price }} ₽ (Количество: {{ item.quantity }})
          <div class="add-remove">
            <button @click="decreaseQuantity(item)">-</button>
            <button @click="increaseQuantity(item)">+</button>
          </div>
          <button @click="removeItem(item)">Удалить</button>
        </li>
      </div>

    </ul>
    <div v-if="$store.state.cart.length > 0" class="footer">
      <div class="total">Общая цена: {{ totalPrice }} ₽</div>
      <button @click="placeOrder">Оформить заказ</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Cart',

  computed: {
    ...mapState({
      cart: state => state.cart
    }),
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  },

  methods: {
    increaseQuantity(item) {
      this.$store.commit('incrementItem', item.id);
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        this.$store.commit('decrementItem', item.id);
      } else {
        this.removeItem(item);
      }
    },
    removeItem(item) {
      this.$store.commit('removeFromCart', item.id);
    },
    placeOrder() {
      alert('Заказ оформлен!');
    }
  }
}
</script>