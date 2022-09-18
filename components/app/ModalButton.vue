<template>
  <button
    :for="forModal"
    type="btn"
    class="
      text-blue-700
      border border-blue-700
      rounded-md
      text-center
      inline-flex
      items-center
      dark:border-blue-500
    "
    :class="hover"
  >
    <label :for="forModal" class="modal-button">
      <svg
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 12 7Z"
          fill="evenodd"
        />
      </svg>
    </label>
  </button>
</template>

<script>
export default {
  props: {
    hover: "",
    forModal: "",
  },
  data: () => ({
    projectId: "",
    title: "",
  }),
  methods: {
    async onSubmit() {
      const epic = {
        projectId: this.$route.params.id,
        title: this.title,
      };
      console.log(epic);
      await this.$api.epic.createEpic(epic);
      this.$emit("updateEpics");
    },
  },
  components: {},
};
</script>
