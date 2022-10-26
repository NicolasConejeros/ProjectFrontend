<template>
  <div class="w-full" ref="playerArea">
    <div class="text-lg font-semibold text-neutral-content">
      {{ audioTitle }}
    </div>

    <span class="mt-4 flex items-start grow-0">
      <div class="relative">
        <svg
          v-for="(bookmark, index) in bookmarks"
          :key="index"
          :style="calculate(index)"
          style="width: 24px; height: 24px; position: absolute"
          viewBox="0 0 24 24"
          @click="goToBookmark(bookmark)"
        >
          <path
            d="M12 2C15.9 2 19 5.1 19 9C19 14.2 12 22 12 22S5 14.2 5 9C5 5.1 8.1 2 12 2M11 6V12H13V6H11M11 14V16H13V14H11Z"
          />
        </svg>
      </div>
    </span>
    <PlayerModalPlayer
      v-if="audios.length > 0"
      :url="url"
      :new-position="bookmarkP"
      class="row-start-8 mt-6"
      @nextAudio="nextAudio"
      @prevAudio="prevAudio"
      @audioInfo="audioInfo"
    />
    <div
      class="
        mt-12
        text-md
        font-medium
        text-gray-900
        dark:text-gray-300
        font-semibold
      "
    >
      Tiempo seleccionado: {{ convertTime(bookmarkP) }}
    </div>
  </div>
</template>
  
  <script>
export default {
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
    sliderWidth: 0,
    flag: 0,
    totalTime: 0,
  }),
  mounted: function () {
    this.$watch("audioIndex", () => {
      this.bookmarks = this.audios[this.audioIndex].bookmarks;
    });
    this.$watch("roomProp", () => {
      this.room = this.roomProp;
    });
    this.$watch("audiosProp", () => {
      if (this.audiosProp.length > 0) {
        this.audios = this.audiosProp;
        this.url =
          "http://localhost:3080/" + this.audios[this.audioIndex].music.path;
        //loads the bookmarks
        this.bookmarks = this.audios[this.audioIndex].bookmarks;
        //Saves the id of the audio playing/in queue
        this.audioId = this.audios[this.audioIndex].id;
        this.audioTitle = this.audios[this.audioIndex].title;
      }
    });
  },
  methods: {
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
      this.audioIndex = this.audioIndex + 1;
      if (!this.audios[this.audioIndex]) this.audioIndex = 0;
      this.audioTitle = this.audios[this.audioIndex].title;
      this.url =
        "http://localhost:3080/" + this.audios[this.audioIndex].music.path;
      // //loads the bookmarks of the next audio
      this.bookmarks = this.audios[this.audioIndex].bookmarks;
      //resets the icon and hides the bookmarks
      this.showBookmarks = !this.showBookmarks;
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
      //Saves the id of the audio playing/in queue
      this.audioId = this.audios[this.audioIndex].id;
    },
    //-----------------------------------------------------------

    //Get the info of the audio playing
    audioInfo(audioDuration) {
      this.totalTime = audioDuration;
    },
    convertTime(seconds) {
      const format = (val) => `0${Math.floor(val)}`.slice(-2);
      const hours = seconds / 3600;
      const minutes = (seconds % 3600) / 60;
      this.$emit("Timestamp", seconds, this.audioId);
      return [minutes, seconds % 60].map(format).join(":");
    },
  },
};
</script>
    
    