<template>
  <div>
    <input type="checkbox" id="requirementUpdate" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box overflow-y-visible">
        <label
          for="requirementUpdate"
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
          "
        >
          Editar requisito
        </div>
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
              :value="requirementTitle"
              @input="(event) => (title = event.target.value)"
              placeholder="Ej: Proyecto 1"
              class="input input-bordered input-primary bg-neutral w-full p-2.5"
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
              :value="requirementDescription"
              @input="(event) => (description = event.target.value)"
              placeholder="Ej: el siguiente proyecto se basa en.."
              class="textarea textarea-primary bg-neutral w-full p-2.5"
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
              :value="requirementAcceptanceCriteria"
              @input="(event) => (acceptanceCriteria = event.target.value)"
              placeholder="Ej: Cuando el usuario.. entonces.."
              class="textarea textarea-primary bg-neutral w-full p-2.5"
            />
          </div>
        </form>
        <RequirementDropdown @dropdownSelection="addEpic" :epics="epics" />
        <label
          for="requirementUpdate"
          type="btn"
          class="btn btn-primary btn-block"
          @click="onSubmitEdit(id)"
        >
          editar</label
        >
      </div>
    </div>
  </div>
</template>
    
<script>
import RequirementDropdown from "./RequirementDropdown.vue";
export default {
  mounted: function () {
    this.title = this.requirementTitle;
    this.description = this.requirementDescription;
    this.acceptanceCriteria = this.requirementAcceptanceCriteria;
  },
  props: {
    epics: [],
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
  data: function () {
    return {
      projectId: "",
      epicId: "",
      title: "",
      description: "",
      acceptanceCriteria: "",
      epicName: "",
    };
  },
  methods: {
    async onSubmitEdit(id) {
      if (!this.epicId) this.addEpic("Sin asignar");
      if (!this.title) this.title = this.requirementTitle;
      if (!this.description) this.description = this.requirementDescription;
      if (!this.acceptanceCriteria)
        this.acceptanceCriteria = this.requirementAcceptanceCriteria;
      const requirement = {
        projectId: this.$route.params.id,
        epicId: this.epicId,
        title: this.title,
        description: this.description,
        acceptanceCriteria: this.acceptanceCriteria,
        epicId: this.epicId,
      };
      console.log(requirement);
      await this.$api.requirement.updateRequirements(requirement, id);
      this.$emit("updateArray");
      this.$emit(
        "displayInfo",
        id,
        requirement.description,
        this.epicName,
        requirement.acceptanceCriteria,
        requirement.title
      );
    },
    addEpic(epicSelected) {
      const temp = this.epics.find(
        (epic) =>
          epic.title == epicSelected && epic.projectId == this.$route.params.id
      );
      this.epicId = temp.id;
      this.epicName = temp.title;
    },
  },
  components: { RequirementDropdown },
};
</script>