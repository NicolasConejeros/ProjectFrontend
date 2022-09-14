 <template>
  <div>
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <label
          for="my-modal"
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

          <label
            for="my-modal"
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
      await this.$api.project.createProject(project);
      this.$emit("updateArray");
    },
  },
};
</script>