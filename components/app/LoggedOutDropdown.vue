<template>
  <div class="dropdown dropdown-end">
    <button tabindex="0" class="btn btn-square btn-ghost">
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
    <ul
      tabindex="0"
      class="
        mt-3
        p-2
        shadow
        menu menu-compact
        dropdown-content
        bg-base-300
        rounded-box
        w-52
      "
    >
      <nuxt-link to="/signup">
        <li><a>Registrarse</a></li>
      </nuxt-link>
      <li><a>Iniciar sesión</a></li>
    </ul>
  </div>
</template>