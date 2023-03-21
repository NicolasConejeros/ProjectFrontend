<template>
  <div class="container grid grid-cols-12 grid-rows-12 gap-4">
    <div
      class="text-sm text-neutral-content row-start-4 col-span-2 col-start-3"
    >
      <nuxt-link to="/" class="hover:underline underline-offset-1"
        >Home
      </nuxt-link>
      <a>\</a>
      <a>Configuración</a>
    </div>
    <div
      class="
        text-4xl
        font-semibold
        text-neutral-content
        row-start-5
        col-span-1 col-start-3
      "
    >
      {{ this.$auth.user.name }}
    </div>
    <div class="row-start-7 col-span-4 col-start-6 grid">
      <form>
        <div class="mb-6">
          <AppInputText
            v-model="user.name"
            label="Nombre"
            name="name"
            :required="false"
            placeholder="Ingrese un nombre"
            :error-messages="nameErrors"
            @input="$v.user.name.$touch()"
            @blur="$v.user.name.$touch()"
          />
        </div>
        <div class="mb-6">
          <div
            class="
              block
              mb-2
              text-md
              font-medium
              text-gray-900
              dark:text-gray-300
              font-semibold
            "
          >
            Descripción
          </div>

          <textarea
            type="text"
            :value="this.$auth.user.description"
            @input="(event) => (user.description = event.target.value)"
            placeholder="Ej: Hola! soy.."
            :maxlength="180"
            style="
               {
                resize: vertical;
                max-height: 110px;
                min-height: 110px;
              }
            "
            class="
              input input-bordered input-primary
              w-full w-full
              p-2.5
              overflow-y-visible
              h-24
            "
          />
        </div>
        <div class="mb-6">
          <AppInputText
            v-model="user.email"
            label="Email"
            name="email"
            placeholder="Ingrese un correo"
            :required="false"
            :error-messages="emailErrors"
            @input="$v.user.email.$touch()"
            @blur="$v.user.email.$touch()"
          />
        </div>
        <div class="mb-6">
          <AppInputText
            v-model="user.password"
            label="Nueva contraseña"
            name="password"
            :type="'password'"
            :required="false"
            placeholder="Ingrese una contraseña"
            :error-messages="passwordErrors"
            @input="$v.user.password.$touch()"
            @blur="$v.user.password.$touch()"
          />
        </div>
        <div class="mb-6">
          <div
            class="
              block
              mb-2
              text-md
              font-medium
              text-gray-900
              dark:text-gray-300
              font-semibold
            "
          >
            Contraseña anterior
          </div>
          <input
            type="password"
            v-model="user.passwordConfirm"
            placeholder="************"
            class="input input-bordered input-primary w-full w-full p-2.5"
          />
        </div>
      </form>
      <button class="btn btn-primary w-full" @click="onUpdateUser">
        Actualizar datos
      </button>
    </div>
  </div>
</template>
  
  <script>
import {
  required,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
export default {
  mixins: [validationMixin],
  middleware: "auth",
  data: () => ({
    user: {
      name: "",
      avatar: "",
      description: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  }),
  validations: {
    user: {
      name: {
        maxLength: maxLength(255),
      },
      email: {
        email,
      },
      password: {
        maxLength: maxLength(60),
        minLength: minLength(6),
      },
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.user.name.$dirty) return errors;
      !this.$v.user.name.maxLength &&
        errors.push("El nombre debe tener menos de 255 caracteres");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) return errors;
      !this.$v.user.email.email && errors.push("El email no es válido");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      !this.$v.user.password.maxLength &&
        errors.push("La contraseña debe tener menos de 60 caracteres");
      !this.$v.user.password.maxLength &&
        errors.push("La contraseña debe tener más de 6 caracteres");
      return errors;
    },
  },
  created() {
    this.user.name = this.$auth.user.name;
    this.user.avatar = this.$auth.user.avatar;
    this.user.description = this.$auth.user.description;
    this.user.email = this.$auth.user.email;
  },
  methods: {
    async onUpdateUser() {
      try {
        this.$v.$touch();
        if (this.$v.$invalid) {
          console.log("Error en el formulario de usuario");
        } else {
          const a = await this.$api.user.updateUser(this.user);
          this.$router.go()
        }
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>