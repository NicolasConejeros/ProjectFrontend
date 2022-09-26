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
        {{ subtitle }}
        <AppModalButton :forModal="'addAudioModal'" :width="18" :height="18" />
      </div>
    </div>
    <div class="row-start-7 col-span-4 col-start-6"></div>
    <div class="row-start-7 col-span-3 col-start-10"></div>
    <AudioModal :room-id="this.$route.params.id" />
  </div>
</template>

<script>
import AudioModal from "../../../../components/rooms/audioModal.vue";
export default {
  layout: "projects",
  data: () => ({
    room: [],
    audios: [],
    subtitle: "Añadir audio",
  }),
  async fetch() {
    this.startLoading();
    await this.onGetRoom();
    await this.onGetAudios();
    if (this.audios.lenght > 0) {
      this.subtitle = "otra cosa";
    }
    console.log(JSON.stringify(this.audios, null, 2));
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
    },
  },
  components: { AudioModal },
};
</script>