<template>
  <div class="navbar bg-base-300">
    <div class="flex-none">
      
      <label
        v-if="this.$auth.loggedIn &&  $route.name == 'projects-id'"
        for="my-drawer"
        class="btn btn-primary drawer-button"
        >
        {{this.$router.name}}<svg
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
      </label>
    </div>
    <div class="flex-1">
      <nuxt-link :to="this.$auth.loggedIn ? '/main' : '/'"
        ><a class="btn btn-ghost normal-case text-xl"
          >Proyecto de Tesis</a
        ></nuxt-link
      >
    </div>
    <div class="flex-none">
      <LoggedOutDropdown :is-logged-in="this.$auth.loggedIn ? true : false" />
    </div>
  </div>
</template>

<script>
import LoggedOutDropdown from "./LoggedOutDropdown.vue";
export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  components: { LoggedOutDropdown },
};
</script>
