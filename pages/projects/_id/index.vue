<template>
  <div class="grid grid-cols-12 grid-rows-12 gap-4">
    <div
      class="
        text-4xl
        font-semibold
        dark:text-white
        row-start-4
        col-span-4 col-start-3
      "
    >
      {{ name }}
    </div>
    <div class="row-start-7 col-start-3 col-end-8">
      <div class="text-lg font-medium sticky top-0 items-center">
        Requerimientos
        <button
          for="addRequirementModal"
          type="btn"
          class="
            text-blue-700
            border border-blue-700
            hover:bg-blue-700 hover:text-white
            focus:ring-4 focus:outline-none focus:ring-blue-300
            rounded-md
            text-center
            inline-flex
            items-center
            dark:border-blue-500
            dark:text-blue-500
            dark:hover:text-white
            dark:focus:ring-blue-800
          "
        >
          <label for="addRequirementModal" class="modal-button">
            <svg
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 12 7Z"
                fill="evenodd"
              />
            </svg>
          </label>
        </button>
        <RequirementInputModal @updateArray="fetchProject" />
      </div>
      <RequerimentCard v-for="(requirement, index) in requirements" :key="index" :title="requirement.title" :description="requirement.description"/>
    </div>
  </div>
</template>
    
<script>
import RequirementInputModal from '../../../components/requirements/RequirementInputModal.vue';
import RequerimentCard from '../../../components/requirements/RequerimentCard.vue';
export default {
    data: () => ({
        name: "",
        description: "",
        requirements: [],
        updateCard: 0,
    }),
    async fetch() {
        this.startLoading();
        await this.fetchProject();
        await this.fetchRequeriments();
        this.finishLoading();
    },
    methods: {
        startLoading() {
            if (process.client) {
                this.$nextTick(() => {
                    this.$nuxt.$loading.start();
                });
            }
        },
        finishLoading() {
            if (process.client) {
                this.$nextTick(() => {
                    this.$nuxt.$loading.finish();
                });
            }
        },
        async fetchProject() {
            const loadedProject = await this.$api.project.getProject(this.$route.params.id);
            this.updateCard = this.updateCard + 1;
            console.log(loadedProject);
            this.name = loadedProject.name;
            this.description = loadedProject.description;
            this.requirements = loadedProject.requirements;
        },
        async fetchRequeriments() {
          this.requirements = await this.$api.requirement.getRequirements(this.$route.params.id);
        },
    },
    components: { RequirementInputModal, RequerimentCard }
};
</script>
    