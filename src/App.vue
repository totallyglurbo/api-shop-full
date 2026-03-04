<template>
  <div>
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Вход</router-link>
      <router-link v-if="!isAuthenticated" to="/register">Регистрация</router-link>
      <a href="#" v-if="isAuthenticated" @click.prevent="logout">Выйти</a>
    </nav>
    <router-view />
  </div>
</template>

<style src="@/assets/css/styles.css"></style>

<script>

export default {

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },

  methods: {
    async logout() {
      try {
        await this.$store.dispatch('LOGOUT');
        await this.$router.push('/login');
      } catch (e) {
        console.error('Ошибка при выходе:', e);
      }
    }
  }
}
</script>