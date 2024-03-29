<template>
  <div class="container grid grid-cols-12 grid-rows-12 gap-4">
    <div class="text-sm text-neutral-content row-start-4 col-span-2 col-start-3">
      <nuxt-link to="/main" class="hover:underline underline-offset-1"
        >Proyectos
      </nuxt-link>
      <a>\</a>
      <a>{{ name }}</a>
    </div>
    <div class="row-start-5 col-span-3 col-start-3 relative w-full">
      <div class="text-4xl font-semibold text-neutral-content truncate">
        {{ name }}
      </div>
      <div
        v-if="onUserRole === 'leader'"
        class="absolute inset-y-0 right-0 mt-2"
      >
        <ProjectDropdown />
      </div>
    </div>
    <div v-if="onUserRole === 'leader'">
      <AddMemberModal />
      <ProjectsEditTeamModal :team="onUserTeam.members" class="w-96" />
    </div>
    
    <div class="row-start-7 col-span-3 col-start-3 items-start">
      <div class="text-lg font-medium text-neutral-content">Requisitos</div>
      <RequerimentCard
        class="card mt-4 w-9/10"
        v-for="(requirement, index) in requirements"
        :key="index"
        :id="requirement.id"
        :epic-id="requirement.epicId"
        :title="requirement.title"
        :description="requirement.description"
        :acceptance-criteria="requirement.acceptanceCriteria"
        :timestamp="requirement.timestamp"
        :button="true"
        :hover="hover"
        :justify="'justify-center'"
        @display="displayInfo"
      />
      <!-- <RequirementInputModal :epics="epics" @updateArray="fetchRequirements" /> -->
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
          :timestamp="this.timestamp"
          :show-comments="this.showComments"
          :show-input-box="this.showInputBox"
          :length="length"
          @updateArray="fetchRequirements"
          @showComments="commentsToggle"
          @showInputBox="inputToggle"
        />

        <CommentInput
          v-if="showInputBox && onUserRole === 'leader'"
          :user-name="this.$auth.user.name"
          class="w-full"
          @onCreateComment="onCreateComment"
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
            :user-name="comment.userName"
            :user="comment.user.name"
            :comment-content="comment.content"

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
          v-if="showInfo"
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
import ProjectDropdown from "../../../components/projects/ProjectDropdown.vue";
import AddMemberModal from "../../../components/projects/AddMemberModal.vue";

export default {
  layout: "projects",
  middleware: "auth",
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
    showComments: false,
    showInputBox: false,
    showInfo: false,
    timer: null,
    team: "",
    oldId: "",
  }),
  async created() {
    await this.onGetEpics();
  },
  async fetch() {
    await this.startLoading();
    await this.fetchProject();
    await this.fetchRequirements();
    this.setTeam();
    await this.finishLoading();
  },
  mounted: function () {
    this.socket = this.$nuxtSocket({
      persist: false,
      teardown: true,
      reconnection: false,
    });

    //Opens the socket connection

    this.socket.emit("leave", this.oldId);
    this.socket.on("comments", (message) => {
      console.log(1);
      console.log(JSON.stringify(message, null, 2));
      this.comments.push(message);
      this.length += 1;
    });
    //-----------------------------
  },
  computed: {
    onUserRole() {
      return this.$store.getters["teams/getRole"];
    },
    onUserTeam() {
      return this.$store.getters["teams/getTeam"];
    },
  },
  methods: {
    //-----------------Nuxt loading stuff-------------------
    startLoading() {
      if (process.client) {
        this.$nextTick(() => {
          this.$nuxt.$loading.start();
        });
      }
    },
    joinSocket() {
      this.socket.emit("comments", this.id);
    },
    finishLoading() {
      if (process.client) {
        this.$nextTick(() => {
          this.$nuxt.$loading.finish();
        });
      }
    },
    //-----------------------------------------------------
    //-------------------get the team---------------------
    setTeam() {
      this.$store.dispatch("teams/loadTeam", this.team);
      const user = this.team.members.find(
        ({ user }) => user.id === this.$auth.user.id
      );

      //load user role to store
      this.$store.dispatch("teams/loadRole", user.role);
    },

    //-------------------fetch projects---------------------
    async fetchProject() {
      const loadedProject = await this.$api.project.getProject(
        this.$route.params.id
      );
      this.name = loadedProject.name;
      this.requirements = loadedProject.requirements;
      this.team = loadedProject.team;
    },

    //-------------------fetch requirements-----------------
    async fetchRequirements() {
      this.requirements = await this.$api.requirement.getRequirements(
        this.$route.params.id
      );
    },

    //-------------------fetch epics-----------------------
    async onGetEpics() {
      this.epics = await this.$api.epic.getEpics(this.$route.params.id);
    },

    //--------------------fetch comments-------------------
    async onGetComments(requirementId) {
      if (!requirementId) {
        this.comments = await this.$api.comment.getCommentsR(this.id);
        this.length = this.comments.length;
      } else {
        this.comments = await this.$api.comment.getCommentsR(requirementId);
        this.length = this.comments.length;
      }
    },
    async onCreateComment(value) {
      const newComment = {
        requirementId: this.id,
        user: this.$auth.user.id,
        userName:  this.$auth.user.name,
        content: value,
      };
      await this.$api.comment.createComment(newComment);
      this.commentsToggle(true);
    },

    //--------------------to display the info------------------------
    async displayInfo(
      id,
      description,
      epicName,
      acceptanceCriteria,
      title,
      timestamp
    ) {
      this.id = id;
      this.joinSocket();
      this.description = description;
      this.title = title;
      this.epic = epicName;
      this.acceptanceCriteria = acceptanceCriteria;
      this.timestamp = timestamp;
      await this.onGetComments(this.id);
      this.showComments = false;
      this.showInputBox = false;
      this.showInfo = true;
    },

    //--------------------toggle comment section--------------------
    commentsToggle(value) {
      this.showComments = value;
    },
    //---------------------toggle input section-----------------------
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
    ProjectDropdown,
    AddMemberModal,
  },
};
</script>
    