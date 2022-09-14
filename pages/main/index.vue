<template>
  <div>
    <h2 class="text-4xl font-extrabold dark:text-white">Proyectos</h2>
    <div
      class="font-medium cursor-pointer hover:underline"
      @click="onChangeModalStatus"
    >
      asdf
    </div>
    <ProjectsProjectModal
      @click="onChangeModalStatus"
      :show-modal="showModal"
    />
    <svg
      width="50"
      height="50"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 5a.75.75 0 0 0-.743.648l-.007.102v3.5h-3.5a.75.75 0 0 0-.102 1.493l.102.007h3.5v3.5a.75.75 0 0 0 1.493.102l.007-.102v-3.5h3.5a.75.75 0 0 0 .102-1.493l-.102-.007h-3.5v-3.5A.75.75 0 0 0 12 7Z"
        fill="#01579b"
      />
    </svg>
    <div
      class="
        grid grid-flow-col
        auto-cols-4
        flex flex-wrap
        gap-x-6
        justify-start
        content-center
      "
    >
      <ProjectsProjectCard
        v-for="(project, index) in projects"
        :key="index"
        :name="project.name"
        :description="project.description"
      ></ProjectsProjectCard>
      <nuxt-link to="/projects">
        <svg
          width="50"
          height="50"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="mt-12"
        >
          <path
            d="M12 2.001c5.524 0 10 4.477 10 10s-4.476 10-10 10c-5.522 0-10-4.477-10-10s4.478-10 10-10Zm.781 5.469-.084-.073a.75.75 0 0 0-.883-.007l-.094.08-.072.084a.75.75 0 0 0-.007.883l.08.094 2.719 2.72H7.75l-.102.006a.75.75 0 0 0-.641.642L7 12l.007.102a.75.75 0 0 0 .641.641l.102.007h6.69l-2.72 2.72-.073.085a.75.75 0 0 0 1.05 1.05l.083-.073 4.002-4 .072-.085a.75.75 0 0 0 .008-.882l-.08-.094-4-4.001-.085-.073.084.073Z"
            fill="#01579b"
          />
        </svg>
      </nuxt-link>
    </div>
    <form>
      <div class="mb-6">
        <label
          for="default-input"
          class="
            block
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-300
          "
          >Default input</label
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
      <button
        class="btn btn-primary btn-block"
        v-on:click="onSubmit"
        type="button"
      >
        submit
      </button>
    </form>
    <div>{{ name }},{{ description }}</div>
  </div>
</template>

<script>
import ProjectCard from "../../components/projects/ProjectCard.vue";
export default {
  data: () => ({
    name: "",
    description: "",
    projects: [],
    showModal: false,
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
    async onSubmit() {
      const project = {
        name: this.name,
        description: this.description,
      };
      console.log(project);
      await this.$api.project.createProject(project);
    },
    async fetchProjects() {
      const loadedProjects = await this.$api.project.getProjects();
      console.log(loadedProjects);
      if (loadedProjects?.length > 0) {
        this.projects = loadedProjects;
      } else {
        this.projects = [];
      }
    },
    onChangeModalStatus() {
      console.log("here! " + this.showModal);
      this.showModal = !this.showModal;
    },
  },
  components: { ProjectCard },
};
</script>
