<template>
  <div class="container">
    <input type="checkbox" id="addRequirementModal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
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
          "
        >
          Añadir Requerimiento
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

            <input
              type="text"
              v-model="description"
              placeholder="Ej: el siguiente proyecto se basa en.."
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
              Criterios de aceptación
            </div>
            <input
              type="text"
              v-model="acceptanceCriteria"
              placeholder="Ej: Cuando el usuario.. entonces.."
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
        </form>
        <!-- <div class="w-full"> -->
          <!-- <div
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
            Agregar Épica
          </div>
          <input
            type="text"
            v-model="newEpic"
            placeholder="Ej: Compras"
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
          /> -->
          <RequirementsRequirementDropdown  :epics="test" />
        <!-- </div> -->

        <label
          for="addRequirementModal"
          type="btn"
          class="btn btn-primary btn-block"
          @click="onSubmit"
        >
          crear</label
        >
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data: () => ({
    projectId: "",
    epicId: "",
    newEpic: "",
    title: "",
    description: "",
    acceptanceCriteria: "",
    epicSelected: "",
    epics: [],
    test: ["usuario", "servicio", "internet", "carrito", "pago"],
  }),
  methods: {
    async onSubmit() {
      const requirement = {
        projectId: this.$route.params.id,
        epicId: this.epicId,
        title: this.title,
        description: this.description,
        acceptanceCriteria: this.acceptanceCriteria,
      };
      console.log(requirement);
      await this.$api.requirement.createRequirement(requirement);
      this.$emit("updateArray");
    },
  },
};
</script>