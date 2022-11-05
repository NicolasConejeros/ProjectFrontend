<template>
  <div class="grid grid-cols-12 grid-rows-12 gap-4">
    <div
      class="
        text-4xl
        font-semibold
        text-neutral-content
        row-start-4 row-end-4
        col-span-1 col-start-3
      "
    >
      {{ room.name }}
    </div>
    <div class="row-start-7 row-span-5 col-span-3 col-start-3">
      <player-section :room-prop="room" :audios-prop="audios" />
      <Chat :chatid="room.chatId" class="mt-8" />
    </div>

    <RoomsAudioModal :room-id="room.id" @updateAudios="onGetAudios" />

    <ConfirmationModal
      :for-modal="'deleteAudioModal'"
      :id="audioId"
      @updateAudios="onGetAudios"
    />
    <div
      class="
        row-start-7 row-span-5
        col-span-4 col-start-6
        bg-base-300
        grid
        justify-items-stretch
        ml-4
      "
    >
      <div class="justify-self-center">Transcripción</div>
    </div>
    <label
      for="addRequirementModal"
      type="btn"
      class="
        modal-button
        font-semibold
        ml-4
        text-neutral-content
        row-start-6
        col-span-2 col-start-10
      "
    >
      Añadir requerimiento
    </label>
    <RequirementsRequirementInputModal
      class="overflow-y-visible"
      :audios-prop="audios"
      :room-prop="room"
    />
  </div>
</template>

<script>
import Player from "../../../../components/player/player.vue";
import ConfirmationModal from "../../../../components/app/ConfirmationModal.vue";
export default {
  layout: "projects",
  data: () => ({
    //bookmark position
    bookmarkP: 0,
    //room data
    room: [],
    //array of audios
    audios: [],
    //array of bookmarks
    bookmarks: [],
    //to keep track on wich audio is playing
    audioIndex: 0,
    //the url needed to play the audio
    url: "",
    //if there isnt any audio uploaded
    audioTitle: "No hay audio",
    //audio id
    audioId: "",
    sliderWidth: 0,
    flag: 0,
    totalTime: 0,
    showBookmarks: false,
    deleteM: false,
  }),
  async fetch() {
    this.startLoading();
    await this.onGetRoom();
    await this.getTeam();
    await this.onGetAudios();
    this.finishLoading();
  },
  computed: {
    onUserTeam() {
      return this.$store.getters["teams/getTeam"];
    },
    onUserRole() {
      return this.$store.getters["teams/getRole"];
    },
  },
  created() {},
  methods: {
    async getTeam() {
      if (this.onUserTeam == "") {
        const team = await this.$api.team.getTeam(this.room.projectId);
        this.$store.dispatch("teams/loadTeam", team.members);
        const user = team.members.find(
          ({ user }) => user.id === this.$auth.user.id
        );
        this.$store.dispatch("teams/loadRole", user.role);
      }
    },

    //Get the  info of the room
    async onGetRoom() {
      try {
        const loadedRoom = await this.$api.room.getRoom(
          this.$route.params.slug
        );
        this.room = loadedRoom;
      } catch (error) {
        console.log(error);
      }
    },

    //Get the audios related to the room
    async onGetAudios() {
      this.audios = await this.$api.audio.getAudios(this.room.id);
    },

    //Starts the Transcribe Audio process
    async onTranscribeAudio() {
      this.$api.audio.transcribeAudio({ id: this.audios[this.audioIndex].id });
    },
    //-------------------Nuxt loading stuff-----------------------
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
    //-----------------------------------------------------------
  },

  components: { Player, ConfirmationModal },
};
</script>

