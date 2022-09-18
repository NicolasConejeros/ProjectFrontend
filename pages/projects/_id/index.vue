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
    <div class="row-start-7 col-start-3 col-end-6">
      <div class="text-lg font-medium items-center pb-4">
        Requerimientos
        <button
          for="addRequirementModal"
          type="btn"
          class="
            text-blue-700
            border border-blue-700
            rounded-md
            text-center
            inline-flex
            items-center
            dark:border-blue-500
          "
          :class="hover"
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
        <RequirementInputModal
          :epics="epics"
          @updateArray="fetchRequirements"
        />
      </div>
      <RequerimentCard
        class="mb-2 w-3/4"
        v-for="(requirement, index) in requirements"
        :key="index"
        :id="requirement.id"
        :epic-id="requirement.epicId"
        :title="requirement.title"
        :description="requirement.description"
        :button="true"
        :hover="hover"
        :justify="'justify-center'"
        @display="displayInfo"
      />
    </div>
    <div class="row-start-7 col-start-5 col-end-8 items-start ml-12">
      <div class="text-lg font-medium sticky top-0 pb-4">
        Descripción
        <RequerimentCard
          class="mt-4"
          :font="'font-medium'"
          :size="'text-base'"
          :title="this.id"
        />
      </div>
    </div>
    <div class="row-start-7 col-start-8 col-end-11 items-start ml-0">
      <div class="text-lg font-medium sticky top-0 pb-4">
        Épica
        <AppModalButton :forModal="'addEpicModal'" :hover="hover" />
        <EpicsModal :epics="epics" @updateEpics="onGetEpics" />
        <RequerimentCard
          class="mt-4"
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
export default {
  data: () => ({
    name: "",
    description: "",
    requirements: [],
    epics: [],
    id: "",
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
      const loadedProject = await this.$api.project.getProject(
        this.$route.params.id
      );
      this.name = loadedProject.name;
      this.description = loadedProject.description;
      this.requirements = loadedProject.requirements;
    },
    async fetchRequirements() {
      this.requirements = await this.$api.requirement.getRequirements(
        this.$route.params.id
      );
    },
    async onGetEpics() {
      console.log("entra");
      this.epics = await this.$api.epic.getEpics(this.$route.params.id);
    },
    async displayInfo(id, epicId) {
      this.id = id;
      this.epic = epicId;
    },
  },
  components: { RequirementInputModal, RequerimentCard, EpicsModal },
};
</script>
    