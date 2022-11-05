<template>
  <div class="w-full" ref="playerArea">
    <div class="text-lg font-semibold text-neutral-content">
      {{ audioTitle }}
    </div>
    <div class="relative">
      <player-dropdown
        class="absolute right-0 -mt-6"
        :transcription="audios.length > 0 ? true : false"
        :theres-audio="audios.length === 0 ? false : true"
        @onTranscribeAudio="onTranscribeAudio"
      />
    </div>

    <span v-if="showBookmarks" class="mt-4 flex items-start grow-0">
      <div class="relative">
        <svg
          v-for="(bookmark, index) in bookmarks"
          :key="index"
          :style="calculate(index)"
          style="width: 24px; height: 24px; position: absolute"
          viewBox="0 0 24 24"
          v-on="
            deleteM
              ? {
                  click: () => deleteMarker(bookmark.time),
                }
              : {
                  click: () => goToBookmark(bookmark),
                }
          "
        >
          <path
            d="M12 2C15.9 2 19 5.1 19 9C19 14.2 12 22 12 22S5 14.2 5 9C5 5.1 8.1 2 12 2M11 6V12H13V6H11M11 14V16H13V14H11Z"
          />
        </svg>
      </div>
    </span>
    <player
      v-if="audios.length > 0"
      :url="url"
      :new-position="bookmarkP"
      class="row-start-8 mt-6"
      @nextAudio="nextAudio"
      @prevAudio="prevAudio"
      @bookmark="addBookmark"
      @audioInfo="audioInfo"
      @bookmarkToggle="bookmarkToggle"
      @deleteOption="deleteOption"
      @stopDeleting="stopDeleting"
    />
  </div>
</template>

<script>
import player from "./player.vue";
export default {
  components: { player },
  props: {
    //room data
    roomProp: [],
    //array of audios
    audiosProp: [],
  },
  data: () => ({
    room: [],
    //bookmark position
    bookmarkP: 0,
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
    //Id of the socket that we'll be using
    audioSocket: "",
    sliderWidth: 0,
    flag: 0,
    totalTime: 0,
    showBookmarks: false,
    deleteM: false,
  }),
  mounted: function () {
    this.audioIndex = 0;
    this.$watch("showBookmarks", () => {
      if (this.showBookmarks) {
        this.calculate();
      }
    });
    this.socket = this.$nuxtSocket({
      persist: true,
    });

    this.$watch("roomProp", () => {
      this.room = this.roomProp;
    });

    this.$watch("audiosProp", () => {
      if (this.audiosProp.length > 0) {
        this.audios = this.audiosProp;
        this.url =
          "http://localhost:3080/" +
          this.audiosProp[this.audioIndex].music.path;

        //loads the bookmarks
        this.bookmarks = this.audios[this.audioIndex].bookmarks;

        //Saves the id of the audio playing/in queue
        this.audioId = this.audios[this.audioIndex].id;
        this.audioSocket = this.audioId;
        this.audioTitle = this.audios[this.audioIndex].title;
        
        this.joinSocket(this.audioId);

        this.socket.on("room", (received, index) => {

          this.audios[index].bookmarks = received;
          if (index == this.audioIndex) this.bookmarks = received;
        });
      }
    });
    this.$watch("audioIndex", () => {
      if (this.audiosProp) {
        this.bookmarks = this.audios[this.audioIndex].bookmarks;
      }
    });
  },

  methods: {
    joinSocket(id) {
      this.socket.emit("room", id);
    },

    //To calculate te positioning of the bookmarks
    calculate(index) {
      if (this.bookmarks.length > 0 && this.bookmarks[index]) {
        this.sliderWidth = this.$refs.playerArea.clientWidth;
        const temp = (this.bookmarks[index].time * 100) / this.totalTime;
        const approximatePosition = (this.sliderWidth * temp) / 100;
        return {
          "margin-left": `${approximatePosition}px`,
          fill: `${this.bookmarks[index].color}`,
        };
      }
    },

    //Syncs the time of the player with the time on the bookmark
    goToBookmark(bookmark) {
      this.bookmarkP = bookmark.time;
    },

    //------------------------Audio controls------------------------------
    nextAudio() {
      // this.oldId = this.audios[this.audioIndex].id;
      this.audioIndex = this.audioIndex + 1;

      if (!this.audios[this.audioIndex]) this.audioIndex = 0;

      this.audioTitle = this.audios[this.audioIndex].title;
      this.url =
        "http://localhost:3080/" + this.audios[this.audioIndex].music.path;

      // //loads the bookmarks of the next audio
      this.bookmarks = this.audios[this.audioIndex].bookmarks;

      //resets the icon and hides the bookmarks
      this.showBookmarks = !this.showBookmarks;

      //Stops the delete option
      this.deleteM = false;

      //Saves the id of the audio playing/in queue
      this.audioId = this.audios[this.audioIndex].id;
    },
    prevAudio() {
      // this.oldId = this.audios[this.audioIndex].id;
      this.audioIndex = this.audioIndex - 1;

      if (!this.audios[this.audioIndex])
        this.audioIndex = this.audios.length - 1;

      this.audioTitle = this.audios[this.audioIndex].title;
      this.url =
        "http://localhost:3080/" + this.audios[this.audioIndex].music.path;

      //loads the bookmarks of the previous audio
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
        bookmarks: this.bookmarks.concat(bookmark),
        index: this.audioIndex,
        audioSocket: this.audioSocket,
      };
      await this.$api.audio.putAudio(newAudioBookmark);
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
    async deleteMarker(time) {

      const remainingBookmarks = this.bookmarks.filter(
        (bookmark) => bookmark.time !== time
      );

      this.audioId = this.audios[this.audioIndex].id;
      const newBookmarksArray = {
        id: this.audioId,
        bookmarks: remainingBookmarks,
        index: this.audioIndex,
        audioSocket: this.audioSocket,
      };

      await this.$api.audio.putAudio(newBookmarksArray);
    },

    //Flag to stop the bookmark removal option
    stopDeleting() {
      this.deleteM = false;
    },

    //Starts the Transcribe Audio process
    async onTranscribeAudio() {
      const saveIndex = this.audioIndex;
      const transcribedAudio = await this.$api.audio.transcribeAudio({ id: this.audios[this.audioIndex].id });
      this.audios[saveIndex] = transcribedAudio;
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
};
</script>
  
  