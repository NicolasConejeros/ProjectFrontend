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
        {{this.$auth.user.name}}
      </div>
      <div class="row-start-7 col-span-4 col-start-6 grid">
        <form>
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
              Nombre
            </div>
            <input
              type="text"
              :value="this.$auth.user.name"
              @input="(event) => (user.name = event.target.value)"
              placeholder="Ej: Juan Pérez"
              class="input input-bordered input-primary w-full w-full p-2.5"
              required="true"
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
              Email
            </div>
            <input
              type="text"
              :value="this.$auth.user.email"
              @input="(event) => (user.email = event.target.value)"
              placeholder="Ej: Cuando el usuario.. entonces.."
              class="input input-bordered input-primary w-full w-full p-2.5"
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
              Nueva contraseña
            </div>
            <input
              type="password"
              v-model="user.password"
              placeholder="************"
              class="input input-bordered input-primary w-full w-full p-2.5"
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
              Contraseña antigua
            </div>
            <input
              type="password"
              v-model="user.passwordConfirm"
              placeholder="************"
              class="input input-bordered input-primary w-full w-full p-2.5"
            />
          </div>
        </form>
        <button class="btn btn-primary w-full" @click="onCreateUser">
          Actualizar datos
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
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
    methods: {
      async onCreateUser() {
        const newUser = await this.$api.auth.createUser(this.user);
      },
    },
  };
  </script>