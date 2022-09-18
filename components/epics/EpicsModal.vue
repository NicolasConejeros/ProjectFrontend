<template>
  <div>
    <input type="checkbox" id="addEpicModal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box overflow-y-visible">
        <label
          for="addEpicModal"
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
          Añadir Épica
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
              placeholder="Ej: Usuarios"
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
        <label
          for="addEpicModal"
          type="btn"
          class="btn btn-primary btn-block"
          @click="onSubmit"
        >
          añadir</label
        >
      </div>
    </div>
  </div>
</template>
    
  <script>
export default {
  props: {
    epics: [],
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