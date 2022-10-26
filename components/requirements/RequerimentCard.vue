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
              displayInfo(
                id,
                description,
                epicId,
                acceptanceCriteria,
                title,
                timestamp
              ),
          }
        : {}
    "
  >
    <RequirementCardDropdown
      v-if="descriptionCard"
      class="absolute right-2 top-2"
      :for-modal="'requirementUpdate'"
      :for-modal-c="'confirmationModalR'"
      :modal-button="true"
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
    <p v-if="descriptionCard && timestamp" :class="[font, size, justify]">
      Encontrado en el audio: {{ timestamp.audioId.title }}, en el minuto:
      {{ timestamp.timestamp }}
    </p>
    <div v-if="descriptionCard && timestamp">
      <PlayerModalPlayer
        :url="`http://localhost:3080/${timestamp.audioId.music.path}`"
        :new-position="timestamp.timestamp"
      />
    </div>
    <label
      v-if="descriptionCard && length > 0"
      class="type:btn indicator absolute bottom-2 right-2 p-2"
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
      <span
        class="indicator-item indicator-top indicator-end badge badge-accent"
        >{{ length }}</span
      >
    </label>
    <label
      v-if="descriptionCard && onUserRole === 'leader'"
      :class="
        descriptionCard && length == 0
          ? 'absolute bottom-2 right-2'
          : 'absolute bottom-2 right-10'
      "
      class="type:btn p-2"
      @click="inputToggle(showInputBox)"
      ><svg
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 3a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V3Zm2.5 1a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6Zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6ZM5.25 3H11v6a3 3 0 0 0 3 3h7c.35 0 .687-.06 1-.17v2.92A3.25 3.25 0 0 1 18.75 18h-5.785l-5.387 3.817A1 1 0 0 1 6 21.002V18h-.75A3.25 3.25 0 0 1 2 14.75v-8.5A3.25 3.25 0 0 1 5.25 3Z"
          fill="evenodd"
        />
      </svg>
    </label>
    <ConfirmationModal
      v-if="descriptionCard"
      :id="this.id"
      :for-modal="'confirmationModalR'"
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
    timestamp: {
      default: false,
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
    showInputBox: {
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
  computed: {
    onUserRole() {
      return this.$store.getters["teams/getRole"];
    },
  },
  methods: {
    async displayInfo(
      id,
      description,
      epicId,
      acceptanceCriteria,
      title,
      timestamp
    ) {
      this.$emit(
        "display",
        id,
        description,
        epicId.title,
        acceptanceCriteria,
        title,
        timestamp
      );
    },
    getArrays() {
      this.$emit("updateArray");
    },
    commentToggle(showComments) {
      this.$emit("showComments", !showComments);
    },
    inputToggle(showInputBox) {
      this.$emit("showInputBox", !showInputBox);
    },
  },

  components: {
    RequirementInputModal,
    RequirementCardDropdown,
    ConfirmationModal,
  },
};
</script>