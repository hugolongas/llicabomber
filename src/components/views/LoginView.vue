<template>
  <div class="login-page">
    <div class="login-form">
      <div v-if="this.error">ERROR {{ this.error }}</div>
      <label class="bomber-label" for="username">USUARI:</label>
      <input
        v-model="username"
        type="text"
        class="bomber-input"
        required
        id="username"
      />
      <label class="bomber-label" for="password">CONTRASENYA:</label>
      <input
        id="password"
        v-model="password"
        type="password"
        class="bomber-input"
        required
      />
      <div class="bomber-accedir" @click="doLogin">ENTRAR</div>
    </div>

    <router-link class="bomber-accedir" :to="{ name: 'home' }">Tornar</router-link>
  </div>
</template>
<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: null,
      password: null,
      error: "",
    };
  },
  methods: {
    async doLogin() {
      window.console.log(this.username);
      window.console.log(this.password);
      let loginData = {
        username: this.username,
        password: this.password,
      };
      window.console.log(loginData);
      this.$store.dispatch("login", loginData).then((response) => {
        window.console.log(response);
        if (response == "success") {
          this.$router.push({ name: "CodeValidator" });
        } else {
          this.error = response;
        }
      });
    },
  },
};
</script>

<style>
</style>