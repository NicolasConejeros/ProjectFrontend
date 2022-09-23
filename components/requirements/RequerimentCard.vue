<template>
  <div
    class="card-body dark:bg-gray-800 dark:border-gray-700 w-full type:btn flex"
    :class="[hover]"
    v-on="
      button
        ? {
            click: () =>
              displayInfo(id, description, epicId, acceptanceCriteria, title),
          }
        : {}
    "
  >
    <RequirementCardDropdown
      v-if="descriptionCard"
      class="absolute right-2 top-2"
    />
    <!-- <label
      v-if="descriptionCard"
      for="requirementUpdate"
      type="btn"
      class="
        absolute
        right-2
        top-2
        modal-button
        hover:text-white
        focus:ring-4 focus:outline-none focus:ring-blue-300
        dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800
      "
    >
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
    </label> -->
    <h5
      class="
        flex
        tracking-wide
        text-gray-900
        dark:text-white
        justify-center
        font-bold
        text-xl
      "
    >
      {{ title }}
    </h5>
    <p
      v-if="descriptionCard"
      class="
        text-gray-900
        dark:text-gray-300
        font-semibold
        grid
        place-content-start
        text-base
      "
    >
      Descripción
    </p>

    <p v-if="descriptionCard" class="text-clip" :class="[font, size, justify]">
      {{ description }}
    </p>
    <p
      v-if="descriptionCard"
      class="
        text-gray-900
        dark:text-gray-300
        font-semibold
        grid
        place-content-start
        text-base
      "
    >
      Criterios de aceptación
    </p>

    <p v-if="descriptionCard" :class="[font, size, justify]">
      {{ acceptanceCriteria }}
    </p>
    <ConfirmationModal
      v-if="descriptionCard"
      :id="this.id"
      @updateArray="getArrays"
    />
  </div>
</template>
  
  <script>
import RequirementInputModal from "./RequirementInputModal.vue";
import RequirementCardDropdown from "./RequirementCardDropdown.vue";
import ConfirmationModal from "../app/ConfirmationModal.vue";
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
    epicId: {
      projectId: "",
      title: "",
      id: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    acceptanceCriteria: {
      type: String,
      default: "",
    },
    font: {
      type: String,
      default: "font-bold",
    },
    size: {
      type: String,
      default: "text-xl",
    },
    button: {
      type: Boolean,
      default: false,
    },
    descriptionCard: {
      type: Boolean,
      default: false,
    },
    hover: {
      type: String,
      default: "",
    },
    justify: {
      type: String,
      default: "justify-start",
    },
  },
  methods: {
    displayInfo(id, description, epicId, acceptanceCriteria, title) {
      this.$emit(
        "display",
        id,
        description,
        epicId.title,
        acceptanceCriteria,
        title
      );
    },
    getArrays() {
      this.$emit("updateArray");
    },
  },
  components: {
    RequirementInputModal,
    RequirementCardDropdown,
    ConfirmationModal,
  },
};
</script>