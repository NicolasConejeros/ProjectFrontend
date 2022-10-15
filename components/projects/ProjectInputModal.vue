 <template>
  <div>
    <input type="checkbox" id="addProjectModal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <label
          for="addProjectModal"
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
          Añadir proyecto
        </div>
        <form>
          <div class="mb-6">
            <label
              for="text"
              class="
                block
                mb-2
                text-sm
                font-medium
                text-gray-900
                dark:text-gray-300
                font-semibold
              "
              >Título del proyecto</label
            >
            <input
              type="text"
              v-model="name"
              :maxlength="30"
              class="input input-bordered input-primary bg-neutral w-full p-2.5"
            />
          </div>
          <label
            for="text"
            class="
              block
              mb-2
              text-sm
              font-medium
              text-gray-900
              dark:text-gray-300
              font-semibold
            "
            >Descripción del proyecto</label
          >
          <div class="mb-6">
            <input
              type="text"
              v-model="description"
              :maxlength="135"
              class="input input-bordered input-primary bg-neutral w-full p-2.5"
            />
          </div>

          <label
            for="addProjectModal"
            type="btn"
            class="btn btn-primary btn-block"
            @click="onSubmit"
          >
            crear</label
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: "",
    description: "",
  }),
  methods: {
    async onSubmit() {
      const project = {
        name: this.name,
        description: this.description,
      };
      console.log(project);
      const newProject = await this.$api.project.createProject(project);
      const epic = {
        projectId: newProject.id,
        title: "Sin asignar",
      };
      await this.$api.epic.createEpic(epic);
      this.$emit("updateArray");
    },
  },
};
</script>