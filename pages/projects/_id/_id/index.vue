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
    <div class="row-start-7 col-span-3 col-start-3" ref="ee">
      <div class="text-lg font-medium text-neutral-content">
        <!-- {{ audioTitle }} {{ bookmark }}{{ audioId }} -->
        {{ totalTime }}|| {{ bookmark }}||{{ flag }}
        <AppModalButton :forModal="'addAudioModal'" :width="18" :height="18" />
      </div>
      <div :style="flagPositioning">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2C15.9 2 19 5.1 19 9C19 14.2 12 22 12 22S5 14.2 5 9C5 5.1 8.1 2 12 2M11 6V12H13V6H11M11 14V16H13V14H11Z"
          />
        </svg>
      </div>
      <Test
        v-if="audios.length > 0"
        :url="url"
        :subtitle="audioTitle"
        class="row-start-8 mt-2"
        @nextAudio="nextAudio"
        @prevAudio="prevAudio"
        @bookmark="addBookmark"
      ></Test>
    </div>

    <div class="row-start-7 col-span-3 col-start-10"></div>
    <AudioModal :room-id="this.$route.params.id" @updateAudios="onGetAudios" />
  </div>
</template>

<script>
import AudioModal from "../../../../components/rooms/audioModal.vue";
import Test from "../../../../components/player/test.vue";
export default {
  layout: "projects",
  data: () => ({
    room: [],
    audioIndex: 0,
    audios: [],
    url: "",
    audioTitle: "No hay audio",
    bookmark: {
      time: 0,
      color: "",
    },
    audioId: "",
    sliderWidth: 0,
    flag: 0,
    totalTime: 0,
  }),
  async fetch() {
    this.startLoading();
    await this.onGetRoom();
    await this.onGetAudios();
    this.finishLoading();
  },
  computed: {
    flagPositioning() {
      return {
        "margin-left": `${this.flag}px`,
        width: 20,
        height: 20,
      };
    },
  },
  methods: {
    calculate() {
      this.sliderWidth = this.$refs.ee.clientWidth;
      const temp = (this.bookmark.time / this.totalTime) * 100;
      console.log(temp);
      this.flag = Math.round((this.sliderWidth * temp) / 100) -12;
    },
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
    async onGetRoom() {
      this.room = await this.$api.room.getRoom(this.$route.params.id);
    },
    async onGetAudios() {
      this.audios = await this.$api.audio.getAudios(this.$route.params.id);
      if (this.audios.length > 0) {
        this.audioTitle = this.audios[this.audioIndex].title;
        this.url =
          "http://localhost:3080/" + this.audios[this.audioIndex].music.path;
      }
    },
    nextAudio() {
      this.audioIndex = this.audioIndex + 1;
      if (!this.audios[this.audioIndex]) this.audioIndex = 0;
      this.audioTitle = this.audios[this.audioIndex].title;
      this.url =
        "http://localhost:3080/" + this.audios[this.audioIndex].music.path;
    },
    prevAudio() {
      this.audioIndex = this.audioIndex - 1;
      if (!this.audios[this.audioIndex])
        this.audioIndex = this.audios.length - 1;
      this.audioTitle = this.audios[this.audioIndex].title;
      this.url =
        "http://localhost:3080/" + this.audios[this.audioIndex].music.path;
    },
    addBookmark(bookmark, audioDuration) {
      this.bookmark = bookmark;
      this.totalTime = audioDuration;
      this.audioId = this.audios[this.audioIndex].id;
      this.calculate();
    },
  },

  components: { AudioModal, Test },
};
</script>