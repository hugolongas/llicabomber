<template>
  <div class="code-validator-page">
    <div :class="'user-info ' + user.username">
      <img
        v-bind:src="'/img/' + user.username + '.png'"
        class="user-logo"
        :alt="'logo-' + user.username"
      />
      {{ user.username }}
    </div>
    <div class="code-validator-form">
      <div class="code-validator-check-code">
        <label class="bomber-label" for="code">CODI:</label>
        <input
          v-model="code"
          type="text"
          class="bomber-input"
          required
          id="code"
          @change="validated=false"
        />
        <div class="code-validator-text" v-if="code_text">{{ code_text }}</div>
        <div class="bomber-accedir" @click="doCheckCode">COMPORVAR</div>
      </div>
      <div class="code-validator-colles" v-if="validated">
        <label class="bomber-label" for="colla">COLLA A QUI S'APLICA:</label>
        <select v-model="colla_id" class="bomber-input">
          <option disabled value="">Escolliu una colla</option>
          <option
            v-for="(option, i) in collaList"
            v-bind:value="option.value"
            :key="i"
          >
            {{ option.text }}
          </option>
        </select>
        <label class="bomber-label" for="colla">LI VOLS SUMAR O RESTAR:</label>
        <select v-model="sign" class="bomber-input">
          <option v-bind:value="'suma'">Sumar</option>
          <option v-bind:value="'resta'">Restar</option>
        </select>        
        <div class="bomber-accedir" @click="doInsertCode" v-if="!quiz">
          VALIDAR
        </div>
        <div class="bomber-accedir" @click="doRestore">RESTAURAR</div>
      </div>
      <div class="code-validator-success" v-if="code_success">{{ code_success }}</div>
      <div class="code-validator-error" v-if="code_error">{{ code_error }}</div>
    </div>
    <div class="bomber-accedir" @click="logout">Tancar</div>
  </div>
</template>
<script>
export default {
  name: "CodeValidatorView",
  data() {
    return {
      code: "",
      code_text: "",
      code_error: "",
      code_success: "",
      colla_id: "",
      collaList: [
        { text: "Bisky", value: "d70fced1-d6c2-434d-a22f-89bfb73e7a17" },
        {
          text: "Can T'Implora",
          value: "e881b6b6-b600-4811-a4bd-c74e06369f8c",
        },
        { text: "Concos", value: "46f79134-9481-46f1-8fe3-7315d3e2703c" },
        { text: "Skando", value: "824fb934-6c55-4931-8e0d-dcf8f3a5105d" },
        {
          text: "Sporting l'Olla",
          value: "605fc6f3-d357-4c6f-a826-e465af1bd05b",
        },
      ],
      sign: "suma",
      validated: false,
      quiz: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    async doCheckCode() {
      this.code_text = "";
      this.code_error = "";
      this.code_success = "";
      this.validated = false;
      this.quiz = false;
      if (this.code != "") {
        this.$store.dispatch("checkCode", this.code).then((response) => {
          if (response.type == "success") {
            this.validated = true;
            this.code_text = response.message;
          } else if (response.type == "quiz") {
            this.code_success = response.message;
            this.quiz = true;
          } else {
            window.console.log(response);
            this.code_error = response.message;
          }
        });
      } else {
        this.code_error = "HAS D'INTRODUIR UN CODI CRACK!";
      }
    },
    async doInsertCode() {
      this.code_success = "";
      this.code_error = "";
      if (this.colla_id != "") {
        if (this.validated) {
          let payload = {
            code: this.code,
            colla_id: this.colla_id,
            sign: this.sign,
          };
          this.$store.dispatch("insertCode", payload).then((response) => {
            if (response.type == "success") {
              this.validated = true;
              this.code_success = response.message;
            } else {
              this.code_error = response.message;
            }
          });
        } else {
          this.code_error = "SI NO VALIDES EL CODI VEURAS";
        }
      }
      else{
        this.code_error = "HAS DE SELECCIONAR UNA COLLA MAQUINA";
      }
    },
    doRestore() {
      this.code = "";
      this.code_text = "";
      this.code_error = "";
      this.code_success = "";
      this.colla_id = "";
      this.validated = false;
      this.quiz = false;
    },
    logout() {
      this.$store.dispatch("logout").then((response) => {
        window.console.log(response);
        if (response == "success") {
          this.$router.push({ name: "home" });
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