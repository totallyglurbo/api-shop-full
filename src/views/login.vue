<template>
  <form class="login" @submit.prevent="login">
    <h1>Вход в аккаунт</h1>
    <div class="container">
      <label>Электронная почта</label>
      <input
          type="email"
          required
          v-model="email"
          :class="{ error: emailError }"
          placeholder="email@example.com"
      />
      <div v-if="emailError" class="error-message">{{ emailError }}</div>
    </div>
    <div class="container">
      <label>Пароль</label>
      <input
          type="password"
          required
          v-model="password"
          :class="{ error: passwordError }"
      />
      <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
    </div>
    <hr />
    <button type="submit">Войти</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
    };
  },

  methods: {
    login() {
      this.emailError = "";
      this.passwordError = "";

      const emailPattern = /^\S+@\S+\.\S+$/;
      if (!this.email) {
        this.emailError = "Email обязателен";
      } else if (!emailPattern.test(this.email)) {
        this.emailError = "Введите корректный Email";
      }

      if (!this.password) {
        this.passwordError = "Пароль обязателен";
      }

      if (this.emailError || this.passwordError) {
        return;
      }

      const userData = {
        email: this.email,
        password: this.password,
      };

      this.$store
          .dispatch('AUTH_REQUEST', userData)
          .then(() => {
            this.$router.push("/");
          })
          .catch(error => {
            console.error('Ошибка при логине:', error);
            alert('Не удалось войти: ' + (error?.message || 'неизвестная ошибка'));
          });
    },
  },
}
</script>