<template>
  <div class="container grid grid-cols-12 grid-rows-12 gap-4">
    <div
      class="
        text-4xl
        font-semibold
        dark:text-white
        row-start-4
        col-span-1 col-start-3
      "
    >
      {{ name }}
    </div>
    <div class="row-start-7 col-span-3 col-start-3 items-start">
      <div class="text-lg font-medium">
        Requisitos
        <AppModalButton
          :forModal="'addRequirementModal'"
          :hover="hover"
          :width="18"
          :height="18"
        />
      </div>
      <RequirementInputModal :epics="epics" @updateArray="fetchRequirements" />
      <RequerimentCard
        class="card text-primary-content mt-4 w-9/10"
        v-for="(requirement, index) in requirements"
        :key="index"
        :id="requirement.id"
        :epic-id="requirement.epicId"
        :title="requirement.title"
        :description="requirement.description"
        :acceptance-criteria="requirement.acceptanceCriteria"
        :button="true"
        :hover="hover"
        :justify="'justify-center'"
        @display="displayInfo"
      />
    </div>
    <div class="row-start-7 col-span-3 col-start-6">
      <div class="text-lg font-medium sticky top-0">
        Resumen
        <RequerimentCard
          class="card text-primary-content mt-4 w-9/10"
          :font="'font-sans'"
          :size="'text-base'"
          :id="this.id"
          :title="this.title"
          :description="this.description"
          :acceptance-criteria="this.acceptanceCriteria"
          :description-card="true"
          @updateArray="fetchRequirements"
        />
      </div>
      <RequirementInputUpdate
        :epics="epics"
        :requirement-title="this.title"
        :requirement-description="this.description"
        :requirement-acceptance-criteria="this.acceptanceCriteria"
        :id="id"
        @updateArray="fetchRequirements"
      />
    </div>
    <div class="row-start-7 col-span-3 col-start-9">
      <div class="text-lg font-medium">
        Épica
        <AppModalButton
          :forModal="'addEpicModal'"
          :hover="hover"
          :width="18"
          :height="18"
        />
        <EpicsModal :epics="epics" @updateEpics="onGetEpics" />
      </div>
      <div>
        <RequerimentCard
          class="card mt-4 w-3/4"
          :justify="'justify-center'"
          :title="this.epic"
        />
      </div>
    </div>
  </div>
</template>
    
<script>
import RequirementInputModal from "../../../components/requirements/RequirementInputModal.vue";
import RequerimentCard from "../../../components/requirements/RequerimentCard.vue";
import EpicsModal from "../../../components/epics/EpicsModal.vue";
import RequirementInputUpdate from "../../../components/requirements/RequirementInputUpdate.vue";
export default {
  data: () => ({
    name: "",
    description: "",
    requirements: [],
    epics: [],
    id: "",
    title: "",
    acceptanceCriteria: "",
    epic: "",
    hover:
      "hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800",
  }),
  async created() {
    await this.onGetEpics();
  },
  async fetch() {
    await this.startLoading();
    await this.fetchProject();
    await this.fetchRequirements();
    await this.finishLoading();
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
      const loadedProject = await this.$api.project.getProject(
        this.$route.params.id
      );
      this.name = loadedProject.name;
      this.requirements = loadedProject.requirements;
    },
    async fetchRequirements() {
      this.requirements = await this.$api.requirement.getRequirements(
        this.$route.params.id
      );
      console.log(this.requirements);
    },
    async onGetEpics() {
      this.epics = await this.$api.epic.getEpics(this.$route.params.id);
    },
    async displayInfo(id, description, epicName, acceptanceCriteria, title) {
      this.id = id;
      this.description = description;
      this.title = title;
      this.epic = epicName;
      this.acceptanceCriteria = acceptanceCriteria;
      console.log("id: " + this.id);
      console.log("description: " + this.description);
      console.log("title: " + this.title);
      console.log("epic: " + this.epic);
      console.log("acceptanceCriteria: " + this.acceptanceCriteria);
    },
  },
  components: {
    RequirementInputModal,
    RequerimentCard,
    EpicsModal,
    RequirementInputUpdate,
  },
};
</script>
    