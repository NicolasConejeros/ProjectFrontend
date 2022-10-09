<template>
  <div class="container w-full">
    <audio v-if="url" style="display: none" controls ref="player" id="playerid">
      <source v-bind:src="url" type="audio/mpeg" />
    </audio>
    <input
      v-model="playbackTime"
      type="range"
      :min="0"
      :max="audioDuration"
      class="w-full range range-primary"
    />
    <div>
      <a class="justify-items-start">{{ elapsedTime() }}</a>
      <a class="grid justify-items-end -mt-6">{{
        convertTime(audioDuration)
      }}</a>
    </div>

    <player-buttons
      class="justify-items-center ml-6"
      @toggleAudio="toggleAudio"
      @nextAudio="nextAudio"
      @prevAudio="prevAudio"
      @bookmark="addBookmark"
      @bookmarkToggle="bookmarkToggle"
      @deleteMarker="deleteMarker"
      @stopDeleting="stopDeleting"
      :key="updateButtons"
    />
  </div>
</template>

<script>
import playerButtons from "./playerButtons.vue";
export default {
  components: { playerButtons },
  mounted: function () {
    var audio = this.$refs.player;

    //Wait for audio to load, then run initSlider() to get audio duration and set the max value of our slider
    // "loademetadata" Event https://www.w3schools.com/tags/av_event_loadedmetadata.asp
    audio.addEventListener(
      "loadedmetadata",
      function (e) {
        this.initSlider();
      }.bind(this)
    );
    this.$watch("url", () => {
      const audio = this.$refs.player;
      audio.load();
      this.initSlider();
    });
    this.$watch("newPosition", () => {
      this.playbackTime = this.newPosition;
    });
    this.$nextTick(function () {
      this.$watch("playbackTime", function () {
        const diff = Math.abs(
          this.playbackTime - this.$refs.player.currentTime
        );

        //Throttle synchronization to prevent infinite loop between playback listener and this watcher
        if (diff > 0.01) {
          this.$refs.player.currentTime = this.playbackTime;
        }
      });
      this.$watch("isPlaying", function () {
        if (this.isPlaying) {
          const audio = this.$refs.player;
          this.initSlider();
          //prevent starting multiple listeners at the same time
          if (!this.listenerActive) {
            this.listenerActive = true;
            audio.addEventListener("timeupdate", this.playbackListener);
          }
        }
      });
    });
  },
  props: {
    url: "",
    subtitle: {
      type: String,
      default: "sin seleccionar",
    },
    newPosition: 0,
  },
  data() {
    return {
      playbackTime: 0,
      isPlaying: false,
      audioDuration: 100,
      updateButtons: 0,
    };
  },
  methods: {
    initSlider() {
      const audio = this.$refs.player;
      if (audio) {
        this.audioDuration = Math.round(audio.duration);
        this.$emit("audioInfo", this.audioDuration);
      }
    },
    toggleAudio() {
      const audio = this.$refs.player;
      if (audio.paused) {
        audio.play();
        this.isPlaying = true;
      } else {
        audio.pause();
        this.isPlaying = false;
      }
    },
    nextAudio() {
      this.updateButtons += 1;
      this.$emit("nextAudio");
    },
    prevAudio() {
      this.updateButtons += 1;
      this.$emit("prevAudio");
    },
    playbackListener(e) {
      const audio = this.$refs.player;
      //Sync local 'playbackTime' var to audio.currentTime and update global state
      this.playbackTime = audio.currentTime;

      //console.log("update: " + audio.currentTime);
      //Add listeners for audio pause and audio end events
      audio.addEventListener("ended", this.endListener);
      //   audio.addEventListener("pause", this.pauseListener);
    },
    //Function to run when audio play reaches the end of file
    endListener() {
      this.isPlaying = false;
      this.listenerActive = false;
      this.updateButtons += 1;
      this.$emit("bookmarkToggle");
      this.cleanupListeners();
    },
    //Remove listeners after audio play stops
    cleanupListeners() {
      var audio = this.$refs.player;
      audio.removeEventListener("freqtimeupdate", this.playbackListener);
      audio.removeEventListener("ended", this.endListener);
      audio.removeEventListener("pause", this.pauseListener);
      //console.log("All cleaned up!");
    },
    convertTime(seconds) {
      const format = (val) => `0${Math.floor(val)}`.slice(-2);
      const hours = seconds / 3600;
      const minutes = (seconds % 3600) / 60;
      return [minutes, seconds % 60].map(format).join(":");
    },
    elapsedTime() {
      const audio = this.$refs.player;
      if (audio) {
        const seconds = audio.currentTime;
        return this.convertTime(seconds);
      } else {
        return "00:00";
      }
    },
    addBookmark(color) {
      const bookmark = {
        time: Math.round(this.playbackTime),
        color: color,
      };
      this.$emit("bookmark", bookmark);
    },
    bookmarkToggle() {
      this.$emit("bookmarkToggle");
    },
    deleteMarker() {
      this.$emit("deleteOption");
    },
    stopDeleting(){
      this.$emit("stopDeleting");
    }
  },
};
</script>
