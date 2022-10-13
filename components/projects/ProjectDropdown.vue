<template>
  <div class="dropdown dropdown-left">
    <label tabindex="0" class="hover:text-accent text-primary drop-shadow-md">
      <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"
        />
      </svg>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52"
    >
      <li class="modal-button" type="btn">
        <label
          for="addAudioModal"
          class="hover:bg-primary-focus"
          :class="[modalButtonString]"
          >Subir</label
        >
      </li>
      <li  class="modal-button" type="btn">
        <label
          for="deleteAudioModal"
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
  