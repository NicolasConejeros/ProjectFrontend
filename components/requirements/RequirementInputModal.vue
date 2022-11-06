<template>
  <div>
    <input type="checkbox" id="addRequirementModal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box max-w-5xl overflow-y-visible">
        <label
          for="addRequirementModal"
          type="btn"
          class="
            modal-button
            btn btn-sm btn-primary btn-circle
            absolute
            right-2
            top-2
          "
        >
          ✕
        </label>
        <div
          class="
            block
            text-xl
            font-medium
            text-gray-900
            dark:text-gray-300
            font-semibold
            grid
            place-content-center
            pb-2
          "
        >
          Añadir Requisito
        </div>
        <div class="w-1/2">
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
                Título
              </div>
              <input
                type="text"
                v-model="title"
                placeholder="Ej: Proyecto 1"
                class="
                  input input-bordered input-primary
                  bg-neutral
                  w-full
                  p-2.5
                "
                required="true"
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
                Descripción
              </div>

              <textarea
                type="text"
                v-model="description"
                placeholder="Ej: el siguiente proyecto se basa en.."
                style="resize: none; overflow: auto"
                class="textarea textarea-primary bg-neutral w-full h-40 p-2.5"
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
                Criterios de aceptación
              </div>
              <textarea
                type="text"
                v-model="acceptanceCriteria"
                placeholder="Ej: Cuando el usuario.. entonces.."
                style="resize: none; overflow: auto"
                class="textarea textarea-primary bg-neutral w-full p-2.5 h-40"
              />
            </div>
          </form>
          <RequirementDropdown
            class="w-2/5 absolute right-12 top-14 justify-self-end mt-1"
            @dropdownSelection="addEpic"
            :epics="tempEpics"
          />
        </div>
        <label
          for="addRequirementModal"
          type="btn"
          class="btn btn-accent btn-block"
          @click="onSubmit"
        >
          crear</label
        >
        <a
          class="
            absolute
            right-40
            top-40
            justify-self-end
            text-md
            font-medium
            text-gray-900
            dark:text-gray-300
            font-semibold
            mt-1
          "
          >Seleccionar marca para adjuntar al audio</a
        >
        <ModalPlayerSection
          class="w-2/5 absolute right-12 top-48 justify-self-end"
          :audios-prop="audiosProp"
          :room-prop="roomProp"
          @Timestamp="saveTimestamp"
        />
      </div>
    </div>
  </div>
</template>
  
<script>
import RequirementDropdown from "./RequirementDropdown.vue";
import ModalPlayerSection from "../player/ModalPlayerSection.vue";
export default {
  props: {
    epics: [],
    audiosProp: [],
    roomProp: [],
    requirementTitle: {
      type: String,
      default: "",
    },
    requirementDescription: {
      type: String,
      default: "",
    },
    requirementAcceptanceCriteria: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    projectId: "",
    epicId: "",
    title: "",
    description: "",
    acceptanceCriteria: "",
    tempEpics: [],
    bookmarkP: 0,
    audioId: ""
  }),
  async mounted() {
    if (!this.epics) {
      this.tempEpics = await this.$api.epic.getEpics(this.$route.params.id);
    } else {
      this.tempEpics = this.epics;
    }
  },
  methods: {
    async onSubmit() {
      if (!this.epicId) this.addEpic("Sin asignar");

      let requirement = {
        projectId: this.$route.params.id,
        epicId: this.epicId,
        title: this.title,
        description: this.description,
        acceptanceCriteria: this.acceptanceCriteria,
        epicId: this.epicId,
      };

      this.audioId == ""
        ? {}
        : (requirement = {
            ...requirement,
            timestamp: {
              audioId: this.audioId,
              timestamp: this.bookmarkP,
            },
          });

      await this.$api.requirement.createRequirement(requirement);
      this.$emit("updateArray");
    },
    addEpic(epicSelected) {
      const temp = this.tempEpics.find(
        (epic) =>
          epic.title == epicSelected && epic.projectId == this.$route.params.id
      );
      this.epicId = temp.id;
      this.epicName = temp.title;
    },
    saveTimestamp(seconds, audioId) {
      this.bookmarkP = seconds;
      this.audioId = audioId;
    },
  },
  components: { RequirementDropdown, ModalPlayerSection },
};
</script>