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
      {{ room.name }}
    </div>
    <div class="row-start-7 col-span-3 col-start-3" ref="playerSection">
      <div class="text-lg font-medium text-neutral-content">
        {{ audioTitle }}
        <AppModalButton :forModal="'addAudioModal'" :width="18" :height="18" />
      </div>
      <span v-if="showBookmarks" class="mb-4">
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
      ></Player>
    </div>

    <div class="row-start-7 col-span-3 col-start-10"></div>
    <AudioModal :room-id="this.room.id" @updateAudios="onGetAudios" />
  </div>
</template>

<script>
import AudioModal from "../../../../components/rooms/audioModal.vue";
import Player from "../../../../components/player/player.vue";
export default {
  layout: "projects",
  data: () => ({
    bookmarkP: 0,
    room: [],
    audios: [],
    bookmarks: [],
    audioIndex: 0,
    url: "",
    audioTitle: "No hay audio",
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
  },
  async fetch() {
    this.startLoading();
    await this.onGetRoom();
    await this.onGetAudios();
    this.finishLoading();
  },
  computed: {
    //Calculates the positions of the bookmarks
  },
  methods: {
    //To calculate te positioning of the bookmarks
    calculate(index) {
      if (this.bookmarks.length > 0 && this.bookmarks[index]) {
        this.sliderWidth = this.$refs.playerSection.clientWidth;
        const temp = (this.bookmarks[index].time * 100) / this.totalTime;
        const approximatePosition = Math.round((this.sliderWidth * temp) / 100);
        return {
          "margin-left": `${approximatePosition}px`,
          fill: `${this.bookmarks[index].color}`,
        };
      }
    },
    goToBookmark(time) {
      this.bookmarkP = time;
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

    //Get the  info of the room
    async onGetRoom() {
      this.room = await this.$api.room.getRoom(this.$route.params.slug);
    },
    //Get the audios related to the room
    async onGetAudios() {
      this.audios = await this.$api.audio.getAudios(this.room.id);
      if (this.audios.length > 0) {
        this.audioTitle = this.audios[this.audioIndex].title;
        this.url =
          "http://localhost:3080/" + this.audios[this.audioIndex].music.path;
        this.bookmarks = this.audios[this.audioIndex].bookmarks;
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
    bookmarkToggle() {
      this.showBookmarks = !this.showBookmarks;
    },
    deleteOption() {
      this.deleteM = true;
    },
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
      this.deleteM = false;
    },
  },

  components: { AudioModal, Player },
};
</script>

