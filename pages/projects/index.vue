<template>
  <div class="grid grid-cols-10 grid-rows-9 gap-4">
    <div
      class="text-sm text-neutral-content row-start-4 row-end-4 col-span-2 col-start-3" 
    >
      <nuxt-link to="/main" class="hover:underline underline-offset-1"
        >Proyectos
      </nuxt-link>
      <a>\</a>
      <a>Mis Proyectos</a>
    </div>
    <div
      class="text-4xl font-semibold dark:text-white row-start-5 row-end-5 col-span-4 col-start-3 items-justify-center"
    >
      Mis Proyectos
      <AppModalButton :forModal="'addProjectModal'" :width="25" :height="25" />
      <ProjectsProjectInputModal @updateArray="fetchProjects" />
    </div>
    <div
      class="row-start-6 overflow-y-auto col-start-3 col-end-12 h-[42rem] w-full"
    >
      <ProjectsProjectCard
        v-for="(project, index) in projects"
        :key="index"
        :name="project.project.name"
        :description="project.project.description"
        :project-id="project.project.id"
      >
      </ProjectsProjectCard>
    </div>
  </div>
</template>
  
  <script>
import ProjectCard from "../../components/projects/ProjectCard.vue";
export default {
  data: () => ({
    name: "",
    description: "",
    projects: [],
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
      const loadedProjects = await this.$api.project.getAllProjects();
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
  