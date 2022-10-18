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
      Registrarse
    </div>
    <div class="row-start-7 col-span-4 col-start-6 grid">
      <form>
        <div class="mb-6">
          <AppInputText
            v-model="user.name"
            label="Nombre"
            name="name"
            required
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
            v-model="user.description"
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
        <div class="mb-6">
          <AppInputText
            v-model="user.passwordConfirm"
            label="Confirmar contraseña"
            name="password"
            :type="'password'"
            required
            placeholder="Ingrese la contraseña nuevamente"
            :error-messages="passwordConfirmErrors"
            @input="$v.user.passwordConfirm.$touch()"
            @blur="$v.user.passwordConfirm.$touch()"
          />
        </div>
      </form>
      <button class="btn btn-primary w-full" @click="onCreateUser">
        Registrarse
      </button>
      <label
        ><template class="text-sm text-secondary"
          >ya tienes una cuenta?
        </template>
        <nuxt-link to="/login" class="text-secondary-focus"
          >inicia sesión</nuxt-link
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
  sameAs,
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
export default {
  mixins: [validationMixin],
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
        required,
        maxLength: maxLength(255),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        maxLength: maxLength(60),
        minLength: minLength(6),
      },
      passwordConfirm: {
        sameAs: sameAs("password"),
      },
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.user.name.$dirty) return errors;
      !this.$v.user.name.required && errors.push("El nombre es requerido");
      !this.$v.user.name.maxLength &&
        errors.push("El nombre debe tener menos de 255 caracteres");
      return errors;
    },
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
      !this.$v.user.password.minLength &&
        errors.push("La contraseña debe tener más de 6 caracteres");
      return errors;
    },
    passwordConfirmErrors() {
      const errors = [];
      if (!this.$v.user.passwordConfirm.$dirty) return errors;
      !this.$v.user.passwordConfirm.sameAs &&
        errors.push("Las contraseñas no coinciden");
      return errors;
    },
  },
  methods: {
    async onCreateUser() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Error en el formulario de usuario");
      } else {
        const newUser = await this.$api.auth.createUser(this.user);
        this.$router.push("/login");
      }
    },
  },
};
</script>