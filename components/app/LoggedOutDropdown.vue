<template>
  <div class="dropdown dropdown-end">
    <button v-if="!isLoggedIn" tabindex="0" class="btn btn-square btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-5 h-5 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
    </button>
    <label
      v-else
      tabindex="0"
      class="btn btn-primary btn-circle flex justify-center"
    >
      <div>
        <img class="object-cover rounded-full" :alt="onUserInitial" />
      </div>
    </label>
    <ul
      tabindex="0"
      class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52"
    >
      <div v-if="!isLoggedIn">
        <nuxt-link to="/signup">
          <li><a>Registrarse</a></li>
        </nuxt-link>
        <nuxt-link to="/login">
          <li><a>Iniciar sesión</a></li>
        </nuxt-link>
      </div>
      <div v-else>
        <nuxt-link to="/config">
          <li><a>Mi cuenta</a></li>
        </nuxt-link>
        <li @click="onLogout"><a>Cerrar sesión</a></li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    onUserInitial() {
      return this.$auth.user.name.charAt(0);
    },
  },
  methods: {
    async onLogout() {
      await this.$auth.logout();
    },
  },
};
</script>