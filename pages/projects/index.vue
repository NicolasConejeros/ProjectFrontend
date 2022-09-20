<template>
  <div class="grid grid-cols-12 grid-rows-12 gap-4">
    <div class=" row-start-7 col-start-3">
      <ProjectsProjectCard
        v-for="(project, index) in projects"
        :key="index"
        :name="project.name"
        :description="project.description"
        :project-id="project.id"
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
      console.log(loadedProjects);
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
  