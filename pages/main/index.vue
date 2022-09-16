<template>
  <div class="grid grid-cols-12 grid-rows-12 gap-4">
    <div class="text-4xl font-semibold dark:text-white row-start-4 col-span-4 col-start-3">
      Proyectos
      <button
        for="addProjectModal"
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
        <label for="addProjectModal" class="modal-button">
          <svg
            width="25"
            height="25"
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
      <ProjectsProjectInputModal @updateArray="fetchProjects" />
    </div>

    <div
      class="
        grid grid-flow-col
        auto-cols-4
        flex flex-wrap
        gap-x-6
        justify-start
        content-center
        mt-12
        row-start-4
        col-start-3
      "
      :key="updateCard"
    >
      <ProjectsProjectCard
        v-for="(project, index) in projects"
        :key="index"
        :name="project.name"
        :description="project.description"
        :project-id="project.id"
      ></ProjectsProjectCard>
      <nuxt-link to="/projects">
        <button
          type="button"
          class="
            text-blue-700
            border border-blue-700
            hover:bg-blue-700 hover:text-white
            focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium
            rounded-full
            text-sm
            p-2.5
            text-center
            inline-flex
            items-center
            dark:border-blue-500
            dark:text-blue-500
            dark:hover:text-white
            dark:focus:ring-blue-800
            mt-12
          "
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import ProjectCard from "../../components/projects/ProjectCard.vue";
export default {
  data: () => ({
    projects: [],
    updateCard: 0,
  }),
  async fetch() {
    this.startLoading();
    await this.fetchProjects();
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
    async fetchProjects() {
      const loadedProjects = await this.$api.project.getProjects();
      this.updateCard = this.updateCard + 1;
      if (loadedProjects?.length > 0) {
        this.projects = loadedProjects;
      } else {
        this.projects = [];
      }
    },
  },
  components: { ProjectCard },
};
</script>
