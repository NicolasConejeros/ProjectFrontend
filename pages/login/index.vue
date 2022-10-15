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
              v-model="user.email"
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
              Contraseña
            </div>
            <input
              type="password"
              v-model="user.password"
              placeholder="************"
              class="input input-bordered input-primary w-full w-full p-2.5"
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
  export default {
    data: () => ({
      user: {
        email: "",
        password: "",
      },
    }),
    methods: {
      async loginUser() {  
        await this.$auth.loginWith('local', {
          data: {
            email: this.user.email,
            password: this.user.password
          }
        })
      },
    },
  };
  </script>