<template>
  <div class="grid grid-cols-12 grid-rows-12 gap-4">
    <div
      class="text-sm text-neutral-content row-start-4 col-span-2 col-start-3"
    >
      <a
        class="hover:underline underline-offset-1"
        @click="$router.push(`/projects/${routeId}`)"
        >Proyecto
      </a>
      <a>\</a>
      <a>{{ room.name }}</a>
    </div>
    <div
      class="text-4xl font-semibold text-neutral-content row-start-5 row-end-5 col-span-1 col-start-3"
    >
      {{ room.name }}
    </div>
    <div class="row-start-7 row-span-5 col-span-3 col-start-3">
      <player-section
        :room-prop="room"
        :audios-prop="audios"
        @displayTranscription="getText"
        @updateId="updateId"
      />
      <Chat :chatid="room.chatId" class="mt-8" />
    </div>

    <RoomsAudioModal :room-id="room.id" @updateAudios="onGetAudios" />

    <ConfirmationModal
      :for-modal="'deleteAudioModal'"
      :id="audioId"
      @updateAudios="onGetAudios"
    />
    <div
      class="row-start-7 row-span-5 col-span-4 col-start-6 ml-4 h-96 shadow-xl"
    >
      <div
        class="sticky top-0 h-12 drop-shadow-lg bg-base-300 grid justify-items-stretch"
      >
        <a class="font-semibold text-lg justify-self-center mt-2 text-secondary"
          >Transcripción</a
        >
      </div>
      <p
        class="indent-8 text-justify p-3 font-medium text-lg text-secondary overflow-y-auto bg-neutral-focus h-full"
        style="white-space: pre-wrap"
      >
        {{ this.text ? this.text : "No hay transcripción" }}
      </p>
    </div>
    <label
      v-if="onUserRole === 'leader'"
      for="addRequirementModal"
      type="btn"
      class="modal-button font-semibold ml-4 text-neutral-content row-start-6 col-span-2 col-start-10 hover:text-primary"
    >
      Añadir requisito
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
    text: "",
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
    routeId() {
      return this.$route.params.id;
    },
  },

  methods: {
    updateId(newId) {
      this.audioId = newId;
    },
    getText(transcription) {
      transcription ? (this.text = transcription.text) : (this.text = "");
    },
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
      if (this.audios[0]) {
        if (this.audios[0].transcription) {
          this.text = this.audios[0].transcription.text;
        } else {
          this.text = "";
        }

        this.audioId = this.audios[0].id;
      } else {
        this.text = "";
        this.audioId = "";
      }
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

