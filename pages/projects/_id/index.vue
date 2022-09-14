<template>
  <div>
    <div class="grid grid-cols-1">
      <ProjectsProjectCard :name="this.name" :description="this.description">
      </ProjectsProjectCard>
    </div>
  </div>
</template>
    
<script>
export default {
  data: () => ({
    name: "",
    description: "",
    requirements: [],
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
      const loadedProjects = await this.$api.project.getProject(this.$route.params.id);
      console.log(loadedProjects);
      this.name = loadedProjects.name;
      this.description = loadedProjects.description;
      this.requirements = loadedProjects.requirements;
    },
  },
};
</script>
    