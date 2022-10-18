<template>
  <div class="container grid grid-cols-12 grid-rows-12 gap-4">
    <div
      class="
        text-4xl
        font-semibold
        text-neutral-content
        row-start-4
        col-span-1 col-start-3
      "
    >
      Iniciar sesión
    </div>
    <div class="row-start-7 col-span-4 col-start-6 grid">
      <form>
        <div class="mb-6">
          <AppInputText
            v-model="user.email"
            label="Email"
            name="email"
            placeholder="Ingrese un correo"
            required
            :error-messages="emailErrors"
            @input="$v.user.email.$touch()"
            @blur="$v.user.email.$touch()"
          />
        </div>
        <div class="mb-6">
          <AppInputText
            v-model="user.password"
            label="Contraseña"
            name="password"
            :type="'password'"
            required
            placeholder="Ingrese una contraseña"
            :error-messages="passwordErrors"
            @input="$v.user.password.$touch()"
            @blur="$v.user.password.$touch()"
          />
        </div>
      </form>
      <button class="btn btn-primary w-full" @click="loginUser">
        Iniciar sesión
      </button>
      <label
        ><template class="text-sm text-secondary"
          >No estas registrado?
        </template>
        <nuxt-link to="/signup" class="text-secondary-focus"
          >Registarse</nuxt-link
        ></label
      >
    </div>
  </div>
</template>
  
<script>
import {
  required,
  maxLength,
  email,
  minLength,
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  mixins: [validationMixin],

  data: () => ({
    user: {
      email: "",
      password: "",
    },
  }),
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
        maxLength: maxLength(60),
      },
    },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) return errors;
      !this.$v.user.email.required && errors.push("El email es requerido");
      !this.$v.user.email.email && errors.push("El email no es válido");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.user.password.$dirty) return errors;
      !this.$v.user.password.required &&
        errors.push("Es requerida una contraseña");
      !this.$v.user.password.maxLength &&
        errors.push("La contraseña debe tener menos de 60 caracteres");
      return errors;
    },
  },
  methods: {
    async loginUser() {
      try {
        this.$v.$touch();
        if (this.$v.$invalid) {
          console.log("Error en el formulario de usuario");
        } else {
          await this.$auth.loginWith("local", {
            data: {
              email: this.user.email,
              password: this.user.password,
            },
          });
          this.$router.push("/main");
        }
      } catch (error) {
        alert("error al iniciar sesión");
      }
    },
  },
};
</script>