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
      <div class="grid" ref="playerSection">
        <div class="text-lg font-medium text-neutral-content">
          {{ audioTitle }}
        </div>
        <PlayerDropdown
          class="justify-self-end -mt-6"
          :transcription="audios.length > 0 ? true : false"
          :theres-audio="audios.length === 0 ? false : true"
          @onTranscribeAudio="onTranscribeAudio"
        />
        <span v-if="showBookmarks" class="mt-4">
          <svg
            v-for="(bookmark, index) in bookmarks"
            :key="index"
            :style="calculate(index)"
            style="width: 24px; height: 24px; position: absolute"
            viewBox="0 0 24 24"
            v-on="
              deleteM
                ? {
                    click: () => deleteMarker(bookmark._id),
                  }
                : {
                    click: () => goToBookmark(bookmark.time),
                  }
            "
          >
            <path
              d="M12 2C15.9 2 19 5.1 19 9C19 14.2 12 22 12 22S5 14.2 5 9C5 5.1 8.1 2 12 2M11 6V12H13V6H11M11 14V16H13V14H11Z"
            />
          </svg>
        </span>
        <Player
          v-if="audios.length > 0"
          :url="url"
          :subtitle="audioTitle"
          :new-position="bookmarkP"
          class="row-start-8 mt-6"
          @nextAudio="nextAudio"
          @prevAudio="prevAudio"
          @bookmark="addBookmark"
          @audioInfo="audioInfo"
          @bookmarkToggle="bookmarkToggle"
          @deleteOption="deleteOption"
          @stopDeleting="stopDeleting"
        ></Player>
      </div>
      <Chat :chatid="room.chatId" class="mt-8" />
    </div>

    <AudioModal :room-id="room.id" @updateAudios="onGetAudios" />

    <ConfirmationModal
      :for-modal="'deleteAudioModal'"
      :id="audioId"
      @updateAudios="onGetAudios"
    />
    <div
      class="
        row-start-7 row-span-5
        col-span-4 col-start-6
        border
        grid
        justify-items-stretch
        ml-4
      "
    >
      <div class="justify-self-center">Transcripción</div>
    </div>
  </div>
</template>

<script>
import AudioModal from "../../../../components/rooms/audioModal.vue";
import Player from "../../../../components/player/player.vue";
import PlayerDropdown from "../../../../components/projects/PlayerDropdown.vue";
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
  mounted: function () {
    this.$watch("showBookmarks", () => {
      if (this.showBookmarks) {
        this.calculate();
      }
    });
    this.$watch("audioIndex", () => {
      this.bookmarks = this.audios[this.audioIndex].bookmarks;
    });
    this.socket = this.$nuxtSocket({ persist: true });
  },
  async fetch() {
    this.startLoading();
    await this.onGetRoom();
    await this.onGetAudios();
    this.finishLoading();
  },
  methods: {
    //To calculate te positioning of the bookmarks
    calculate(index) {
      if (this.bookmarks.length > 0 && this.bookmarks[index]) {
        this.sliderWidth = this.$refs.playerSection.clientWidth;
        const temp = (this.bookmarks[index].time * 100) / this.totalTime;
        const approximatePosition = (this.sliderWidth * temp) / 100;
        return {
          "margin-left": `${approximatePosition}px`,
          fill: `${this.bookmarks[index].color}`,
        };
      }
    },
    goToBookmark(time) {
      this.bookmarkP = time;
    },

    //Get the  info of the room
    async onGetRoom() {
      try {
        const loadedRoom = await this.$api.room.getRoom(this.$route.params.slug);
        this.room = loadedRoom;
      } catch (error) {
        console.log(error);
      }
    },
    //Get the audios related to the room
    async onGetAudios() {
      this.audios = await this.$api.audio.getAudios(this.room.id);
      if (this.audios.length > 0) {
        this.audioTitle = this.audios[this.audioIndex].title;
        //defined path to the audio location
        this.url =
          "http://localhost:3080/" + this.audios[this.audioIndex].music.path;
        //loads the bookmarks
        this.bookmarks = this.audios[this.audioIndex].bookmarks;
        //Saves the id of the audio playing/in queue
        this.audioId = this.audios[this.audioIndex].id;
      }
    },
    //------------------------Audio controls------------------------------
    nextAudio() {
      this.audioIndex = this.audioIndex + 1;
      if (!this.audios[this.audioIndex]) this.audioIndex = 0;
      this.audioTitle = this.audios[this.audioIndex].title;
      this.url =
        "http://localhost:3080/" + this.audios[this.audioIndex].music.path;
      //loads the bookmarks of the next audio
      this.bookmarks = this.audios[this.audioIndex].bookmarks;
      //resets the icon and hides the bookmarks
      this.showBookmarks = !this.showBookmarks;
      //Stops the delete option
      this.deleteM = false;
      //Saves the id of the audio playing/in queue
      this.audioId = this.audios[this.audioIndex].id;
    },
    prevAudio() {
      this.audioIndex = this.audioIndex - 1;
      if (!this.audios[this.audioIndex])
        this.audioIndex = this.audios.length - 1;
      this.audioTitle = this.audios[this.audioIndex].title;
      this.url =
        "http://localhost:3080/" + this.audios[this.audioIndex].music.path;
      //loads the bookmarks of the next audio
      this.bookmarks = this.audios[this.audioIndex].bookmarks;
      //resets the icon and hides the bookmarks
      this.showBookmarks = !this.showBookmarks;
      //Stops the delete option
      this.deleteM = false;
      //Saves the id of the audio playing/in queue
      this.audioId = this.audios[this.audioIndex].id;
    },
    //-----------------------------------------------------------

    //Add bookmarks function
    async addBookmark(newBookmark) {
      const bookmark = newBookmark;

      this.audioId = this.audios[this.audioIndex].id;
      const newAudioBookmark = {
        id: this.audioId,
        bookmarks: this.audios[this.audioIndex].bookmarks.concat(bookmark),
      };
      await this.$api.audio.putAudio(newAudioBookmark);
      await this.onGetAudios();
    },
    //Get the info of the audio playing
    audioInfo(audioDuration) {
      this.totalTime = audioDuration;
    },

    //Flag to change the visibility of the bookmarks
    bookmarkToggle() {
      this.showBookmarks = !this.showBookmarks;
    },

    //Starts the bookmark removal option
    deleteOption() {
      this.deleteM = true;
    },

    //Deletes the selected bookmark
    async deleteMarker(id) {
      const remainingBookmarks = this.audios[this.audioIndex].bookmarks.filter(
        (data) => data._id != id
      );
      this.audioId = this.audios[this.audioIndex].id;
      const newBookmarksArray = {
        id: this.audioId,
        bookmarks: remainingBookmarks,
      };
      await this.$api.audio.putAudio(newBookmarksArray);
      await this.onGetAudios();
    },

    //Flag to stop the bookmark removal option
    stopDeleting() {
      this.deleteM = false;
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

  components: { AudioModal, Player, PlayerDropdown, ConfirmationModal },
};
</script>

