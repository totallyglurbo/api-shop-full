<template>
  <form class="register" @submit.prevent="register">
    <h1>Регистрация</h1>
    <div class="container">
      <label>Фамилия</label>
      <input type="text" required v-model="lastName"/>
      <div v-if="errors.lastName" class="error-text">{{ errors.lastName }}</div>
    </div>

    <div class="container">
      <label>Имя</label>
      <input type="text" required v-model="firstName"/>
      <div v-if="errors.firstName" class="error-text">{{ errors.firstName }}</div>
    </div>

    <div class="container">
      <label>Отчество</label>
      <input type="text" v-model="patronymic"/>
      <div v-if="errors.patronymic" class="error-text">{{ errors.patronymic }}</div>
    </div>

    <div class="container">
      <label>Электронная почта</label>
      <input type="email" required v-model="email"/>
      <div v-if="errors.email" class="error-text">{{ errors.email }}</div>
    </div>

    <div class="container">
      <label>Пароль</label>
      <input type="password" required v-model="password"/>
      <div v-if="errors.password" class="error-text">{{ errors.password }}</div>
    </div>
    <hr />
    <button type="submit">Зарегистрироваться</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      lastName: '',
      firstName: '',
      patronymic: '',
      email: '',
      password: '',
      errors: {}
    };
  },

  methods: {
    validate() {
      this.errors = {};

      const nameRe = /^[A-Za-zА-Яа-яЁё\s-]+$/;

      if (!this.lastName.trim()) {
        this.errors.lastName = 'Фамилия обязательна';
      } else if (!nameRe.test(this.lastName.trim())) {
        this.errors.lastName = 'Поле содержит недопустимые символы';
      }

      if (!this.firstName.trim()) {
        this.errors.firstName = 'Имя обязательно';
      } else if (!nameRe.test(this.firstName.trim())) {
        this.errors.firstName = 'Поле содержит недопустимые символы';
      }

      if (this.patronymic.trim() && !nameRe.test(this.patronymic.trim())) {
        this.errors.patronymic = 'Поле содержит недопустимые символы';
      }

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email.trim()) {
        this.errors.email = 'Email обязателен';
      }

      if (!this.password) {
        this.errors.password = 'Пароль обязателен';
      } else if (this.password.length < 6) {
        this.errors.password = 'Пароль должен быть не менее 6 символов';
      }

      return Object.keys(this.errors).length === 0;
    },

    register() {
      if (!this.validate()) {
        return;
      }

      const fullName = [this.lastName.trim(), this.firstName.trim(), this.patronymic.trim()]
          .filter(part => part !== '')
          .join(' ');

      const userData = {
        fio: fullName,
        email: this.email.trim(),
        password: this.password
      };

      this.$store.dispatch('AUTH_REGISTER', userData)
          .then(() => {
            this.$router.push('/login');
          })
          .catch(err => {
            alert(err.message);
          });
    }
  }
}
</script>