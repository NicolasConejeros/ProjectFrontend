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
              v-model="title"
              placeholder="Ej: Proyecto 1"
              class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
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
              class="
                textarea textarea-primary
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
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
              class="
                textarea textarea-primary
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
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
    };
  },
  created() {
    this.title = this.requirementTitle;
    this.description = this.requirementDescription;
    this.acceptanceCriteria = this.requirementAcceptanceCriteria;
  },
  methods: {
    async onSubmitEdit(id) {
      if (!this.epicId) this.addEpic("Sin asignar");
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
    },
    addEpic(epic) {
      if (epic == "Sin asignar") {
        const temp = this.epics.find(
          (epic) =>
            epic.title == "Sin asignar" &&
            epic.projectId == this.$route.params.id
        );
        this.epicId = temp.id;
      } else {
        this.epicId = epic;
      }
    },
  },
  components: { RequirementDropdown },
};
</script>