<template>
  <v-app>
    <v-content>
      <register-form />
    </v-content>
  </v-app>
</template>

<script>
import RegisterForm from "./components/RegisterForm.vue";

export default {
  name: "App",
  components: {
    RegisterForm,
  },
};
</script>
