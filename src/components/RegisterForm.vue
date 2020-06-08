<template>
  <v-form class="sign-up">
    <div class="display-2 text-center mb-3">Sign up</div>
    <v-alert type="success" v-if="signedUp">
      You are successfully registered
    </v-alert>
    <v-alert type="error" v-if="errored">
      Some fields is filled incorectly
    </v-alert>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            class="sign-up__name"
            v-model="name"
            :rules="nameRules"
            label="First name"
            prepend-icon="mdi-account"
            data-testid="name-input"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            class="sign-up__surname"
            v-model="surname"
            :rules="surnameRules"
            label="Last name"
            prepend-icon="mdi-account"
            data-testid="surname-input"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            class="sign-up__country"
            v-model="country"
            :items="countries"
            menu-props="auto"
            label="Select country"
            hide-details
            prepend-icon="map"
            single-line
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="sign-up__age"
            v-model="age"
            :rules="ageRules"
            label="Age"
            prepend-icon="mdi-account"
            data-testid="age-input"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            class="sign-up__email"
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            prepend-icon="mdi-email"
            data-testid="email-input"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            class="sign-up__password"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            prepend-icon="mdi-lock"
            type="password"
            data-testid="password-input"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="sign-up__repeat"
            v-model="repeatPassword"
            :rules="repeatPasswordRules"
            label="Repeat password"
            prepend-icon="mdi-lock"
            type="password"
            data-testid="password-repeat-input"
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="d-flex justify-end">
          <v-btn class="mr-4" @click="reset">Reset</v-btn>
          <v-btn color="primary" @click="submit">Register</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  numeric,
  minValue,
  email,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  name: "RegisterForm",
  data() {
    return {
      name: "",
      surname: "",
      age: null,
      country: null,
      email: "",
      password: "",
      repeatPassword: "",

      signedUp: false,
      errored: false,

      nameRules: [
        () => !!this.$v.name.required || "Name is required",
        () => !!this.$v.name.alpha || "Name must be alphabetical",
      ],
      surnameRules: [
        () => !!this.$v.surname.required || "Surname is required",
        () => !!this.$v.surname.alpha || "Surname must be alphabetical",
      ],
      emailRules: [() => !!this.$v.email.email || "E-mail must be valid"],
      ageRules: [
        () => !!this.$v.age.required || "Age is required",
        () => !!this.$v.age.numeric || "Age must be valid",
        () =>
          !!this.$v.age.minValue ||
          "You must be at least 18 years old to register",
      ],
      passwordRules: [
        () => !!this.$v.password.required || "Password is required",
        () =>
          !!this.$v.password.minLength ||
          "Password must be at least 6 characters length",
        () =>
          !!this.$v.password.maxLength ||
          "Password must be maximum 10 characters length",
      ],
      repeatPasswordRules: [
        () =>
          !!this.$v.repeatPassword.required || "Password repeat is required",
        () =>
          !!this.$v.repeatPassword.sameAsPassword ||
          "Password repeat doesn't match password",
      ],
    };
  },
  validations: {
    name: {
      required,
      alpha,
    },
    surname: {
      required,
      alpha,
    },
    age: {
      required,
      numeric,
      minValue: minValue(18),
    },
    email: {
      email,
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(10),
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs("password"),
    },
  },
  computed: {
    countries() {
      return ["United Kingdom", "Germany", "France"];
    },
  },
  methods: {
    submit() {
      this.$v.$touch();

      if (this.$v.$error) {
        this.errored = true;
        this.signedUp = false;
      } else {
        this.signedUp = true;
        this.errored = false;
      }
    },
    reset() {
      this.name = "";
      this.surname = "";
      this.age = null;
      this.country = null;
      this.email = "";
      this.password = "";
      this.repeatPassword = "";
      this.errored = false;
      this.signedUp = false;

      this.$v.$reset();
    },
  },
};
</script>

<style>
.sign-up {
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 120px auto;
}
</style>
