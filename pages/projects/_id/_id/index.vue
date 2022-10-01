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
    <div class="row-start-7 col-span-3 col-start-3 items-start">
      <div class="text-lg font-medium text-neutral-content">
        Añadir audio
        <AppModalButton :forModal="'addAudioModal'" :width="18" :height="18" />
      </div>
      <Test
        :url="url"
        :subtitle="audioTitle"
        class="row-start-8 col-span-4"
        @nextAudio="nextAudio"
        @prevAudio="prevAudio"
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
    audioTitle: "",
  }),
  async fetch() {
    this.startLoading();
    await this.onGetRoom();
    await this.onGetAudios();
    this.finishLoading();
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
    async onGetRoom() {
      this.room = await this.$api.room.getRoom(this.$route.params.id);
    },
    async onGetAudios() {
      this.audios = await this.$api.audio.getAudios(this.$route.params.id);
      this.audioTitle = this.audios[this.audioIndex].title;
      this.url =
        "http://localhost:3080/" + this.audios[this.audioIndex].music.path;
    },
    nextAudio() {
      this.audioIndex = this.audioIndex + 1;
      this.audioTitle = this.audios[this.audioIndex].title;
      this.url =
        "http://localhost:3080/" + this.audios[this.audioIndex].music.path;
    },
    prevAudio() {
      this.audioIndex = this.audioIndex - 1;
      this.audioTitle = this.audios[this.audioIndex].title;
      this.url =
        "http://localhost:3080/" + this.audios[this.audioIndex].music.path;
    },
  },

  components: { AudioModal, Test },
};
</script>