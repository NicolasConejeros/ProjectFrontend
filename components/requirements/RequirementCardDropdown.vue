<template>
  <div class="dropdown dropdown-left p-2">
    <label tabindex="0" class="hover:text-accent text-primary drop-shadow-md">
      <svg
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z"
          fill="evenodd"
        />
      </svg>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52"
    >
      <li>
        <label
          :for="forModal"
          type="btn"
          class="hover:bg-primary-focus"
          :class="[modalButtonString]"
          >editar</label
        >
      </li>
      <li>
        <label
          :for="forModalC"
          type="btn"
          class="modal-button hover:text-base-300 hover:bg-accent"
          >Eliminar</label
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    forModal: {
      type: String,
      default: "",
    },
    forModalC: {
      type: String,
      default: "",
    },
    modalButton: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    modalButtonString: "",
  }),
  created() {
    if (this.modalButton) {
      this.modalButtonString = "modal-button";
    }
  },
};
</script>
