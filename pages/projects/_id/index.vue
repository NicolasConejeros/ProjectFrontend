<template>
  <div class="container grid grid-cols-12 grid-rows-12 gap-4">
    <div
      class="
        text-4xl
        font-semibold
        text-neutral-content
        row-start-4
        col-span-1 col-start-3
      "
    >
      {{ name }}
    </div>
    <div class="row-start-7 col-span-3 col-start-3 items-start">
      <div class="text-lg font-medium text-neutral-content">
        Requisitos
        <AppModalButton
          :forModal="'addRequirementModal'"
          :hover="hover"
          :width="18"
          :height="18"
        />
      </div>
      <RequerimentCard
        class="card mt-4 w-9/10"
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
      <RequirementInputModal :epics="epics" @updateArray="fetchRequirements" />
    </div>
    <div class="row-start-7 col-span-4 col-start-6">
      <div
        v-if="showInfo"
        class="text-lg font-medium sticky text-neutral-content top-0"
      >
        Resumen
        <RequerimentCard
          class="card bg-base-100 mt-4 w-full"
          :font="'font-sans'"
          :size="'text-base'"
          :id="this.id"
          :title="this.title"
          :description="this.description"
          :acceptance-criteria="this.acceptanceCriteria"
          :description-card="true"
          :show-comments="this.showComments"
          :show-input-box="this.showInputBox"
          :length="length"
          @updateArray="fetchRequirements"
          @showComments="commentsToggle"
          @showInputBox="inputToggle"
        />

        <CommentInput
          v-if="showInputBox"
          :id="this.id"
          class="w-full"
          @updateComments="onGetComments(id)"
        />
        <p
          v-if="showComments && this.length > 0"
          class="
            text-gray-900
            dark:text-gray-300
            font-semibold
            grid
            place-content-start
            text-base
            py-4
            ml-2
          "
        >
          Observaciones
        </p>
        <div
          v-if="showComments && this.length > 0"
          class="overflow-auto hover:overflow-y-auto h-96"
        >
          <Comment
            v-for="(comment, index) in comments"
            :key="index"
            :id="comment.id"
            :comment-content="comment.content"
            @updateComments="onGetComments"
          />
        </div>
      </div>

      <RequirementInputUpdate
        :epics="epics"
        :requirement-title="this.title"
        :requirement-description="this.description"
        :requirement-acceptance-criteria="this.acceptanceCriteria"
        :id="id"
        @updateArray="fetchRequirements"
        @displayInfo="displayInfo"
      />
    </div>
    <div class="row-start-7 col-span-3 col-start-10">
      <div v-if="showInfo" class="text-lg font-medium text-neutral-content">
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
import Comment from "../../../components/app/Comment.vue";
import CommentInput from "../../../components/app/CommentInput.vue";
export default {
  layout: "projects",
  data: () => ({
    name: "",
    length: 0,
    description: "",
    requirements: [],
    epics: [],
    comments: [],
    id: "",
    title: "",
    acceptanceCriteria: "",
    epic: "",
    hover: "hover:text-neutral-content hover:bg-primary",
    showComments: true,
    showInputBox: false,
    showInfo: false,
    timer: null,
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
  mounted: function () {
    this.timer = setInterval(() => {
      this.onGetComments(this.id);
    }, 30000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
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
    },
    async onGetEpics() {
      this.epics = await this.$api.epic.getEpics(this.$route.params.id);
    },
    async onGetComments(requirementId) {
      if (!requirementId) {
        this.comments = await this.$api.comment.getCommentsR(this.id);
        this.length = this.comments.length;
      } else {
        this.comments = await this.$api.comment.getCommentsR(requirementId);
        this.length = this.comments.length;
      }
    },
    async displayInfo(id, description, epicName, acceptanceCriteria, title) {
      this.id = id;
      this.description = description;
      this.title = title;
      this.epic = epicName;
      this.acceptanceCriteria = acceptanceCriteria;
      await this.onGetComments(this.id);
      this.showComments = true;
      this.showInputBox = false;
      this.showInfo = true;
    },
    commentsToggle(value) {
      this.showComments = value;
    },
    inputToggle(value) {
      this.showInputBox = value;
    },
  },
  components: {
    RequirementInputModal,
    RequerimentCard,
    EpicsModal,
    RequirementInputUpdate,
    Comment,
    CommentInput,
  },
};
</script>
    