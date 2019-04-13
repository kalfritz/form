<template>
  <div class="home">
    <v-container fluid class="container">
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm3 class="formContainer">
          <v-alert :value="errorMessage" type="error">{{errorMessage}}</v-alert>
          <v-alert :value="successMessage" type="success">{{successMessage}}</v-alert>

          <v-form ref="signupForm" v-model="valid">
            <h1 class="text-xs-center grey--text text--darken-3">Register</h1>

            <v-text-field
              label="Name"
              v-model="newUser.name"
              prepend-icon="person"
              :rules="[nameRules]"
              validate-on-blur
            ></v-text-field>
            <v-text-field
              label="Username"
              v-model="newUser.username"
              prepend-icon="person"
              :rules="[usernameRules]"
              validate-on-blur
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="newUser.email"
              prepend-icon="email"
              :rules="[emailRules]"
              validate-on-blur
            ></v-text-field>

            <v-text-field
              label="Password"
              v-model="newUser.password"
              prepend-icon="lock"
              :rules="[passwordRules]"
              validate-on-blur
              type="password"
            ></v-text-field>
            <v-text-field
              label="Confirm password"
              v-model="newUser.confirmPassword"
              prepend-icon="lock"
              :rules="[confirmPasswordRules]"
              validate-on-blur
              type="password"
              ref="password"
            ></v-text-field>
            <v-btn
              type="submit"
              @click="signup"
              flat
              class="success mx-0 mt-3"
              :loading="loading"
              block
            >Create Account</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import api from "../services/api";
export default {
  data: () => ({
    valid: null,
    loading: false,
    errorMessage: "",
    successMessage: "",
    newUser: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  }),
  methods: {
    async signup() {
      if (this.$refs.signupForm.validate()) {
        try {
          console.log(this.newUser);
          this.errorMessage = "";
          this.loading = true;
          const response = await api.post("/users", {
            newUser: {
              name: this.newUser.name,
              username: this.newUser.username,
              email: this.newUser.email,
              password: this.newUser.password
            }
          });

          // const { user, token } = response.data;
          this.loading = false;

          this.successMessage = "Logged In successfully";
        } catch (err) {
          this.errorMessage = response.data.error;
        }
      } else {
        this.errorMessage = "Please fill up the fields correctly";
      }
    },
    nameRules(name) {
      if (!name) return "";
      if (name.length <= 3 || name.length >= 30)
        return "Name must be a least 4 characteres long and max of 20";
      if (!name.match(/(^[a-zA-Z]+$)/))
        return "Name must not contain numbers or underscores";
      return true;
    },
    usernameRules(username) {
      if (!username) return "";
      if (!username.match(/(^[a-zA-Z0-9_]+$)/))
        return "Username must only contain numbers, letters and underscore";
      if (username.length <= 2 || username.length >= 30)
        return `Username must be a least 3 characteres long and max of 20`;
      return true;
    },
    emailRules(email) {
      if (!email) return "";
      if (
        !email.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      )
        return "Please enter a valid email";
      return true;
    },
    passwordRules(password) {
      if (!password) return "";
      if (password.length < 8)
        return "Password must be at least 8 characteres long";
      return true;
    },
    confirmPasswordRules(password) {
      if (!password) return "";
      if (password.length < 8)
        return "Password must be at least 8 characteres long";

      if (password !== this.newUser.password) return "Passwords not match";
      return true;
    }
  }
};
</script>

<style>
body {
  background: #ccc;
}
.formContainer {
  margin-top: 5%;

  background: white;
  padding: 15px;
  border: 1px solid purple;
}
</style>
