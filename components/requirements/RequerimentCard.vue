<template>
  <div
    class="
      card-body
      w-full
      type:btn
      flex
      text-neutral-content
      border border-primary
    "
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
    <h5 class="flex tracking-wide justify-center font-bold text-xl">
      {{ title }}
    </h5>
    <p
      v-if="descriptionCard"
      class="font-semibold grid place-content-start text-base"
    >
      Descripción
    </p>

    <p v-if="descriptionCard" class="text-clip" :class="[font, size, justify]">
      {{ description }}
    </p>
    <p
      v-if="descriptionCard"
      class="font-semibold grid place-content-start text-base"
    >
      Criterios de aceptación
    </p>

    <p v-if="descriptionCard" :class="[font, size, justify]">
      {{ acceptanceCriteria }}
    </p>
    <label
      v-if="descriptionCard && length > 0"
      class="type:btn absolute bottom-2 right-2 p-2"
      @click="commentToggle(showComments)"
      ><svg
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.042 19.003h5.916a3 3 0 0 1-5.916 0Zm2.958-17a7.5 7.5 0 0 1 7.5 7.5v4l1.418 3.16A.95.95 0 0 1 20.052 18h-16.1a.95.95 0 0 1-.867-1.338l1.415-3.16V9.49l.005-.25A7.5 7.5 0 0 1 12 2.004Z"
          fill="evenodd"
        />
      </svg>
    </label>
    <ConfirmationModal
      v-if="descriptionCard"
      :id="this.id"
      :element-to-delete="'requirement'"
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
    showComments: {
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
    length: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    color: "",
  }),
  methods: {
    async displayInfo(id, description, epicId, acceptanceCriteria, title) {
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
    commentToggle(showComments) {
      this.$emit("showComments", !showComments);
    },
  },

  components: {
    RequirementInputModal,
    RequirementCardDropdown,
    ConfirmationModal,
  },
};
</script>