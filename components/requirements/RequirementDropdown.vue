<template>
  <div class="dropdown dropdown-top mb-6 w-full">
    <div
      class="
        block
        mb-2
        text-md
        font-medium
        text-gray-900
        dark:text-gray-300
        font-semibold
        w-full
      "
    >
      Épica
    </div>
    <label tabindex="0" class="btn w-full">{{ epicSelected }}</label>
    <ul
      tabindex="0"
      class="dropdown-content menu shadow bg-base-100 rounded-box w-full"
    >
      <li v-for="(Epic, index) in epic1" :key="index">
        <a @click="changeSelected(Epic.title)">{{ Epic.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    epics: [],
  },
  data: () => ({
    epic1: [],
    epicSelected: "Seleccionar",
    default: {
      title: "seleccionar",
    },
  }),
  async fetch() {
    await this.startLoading();
    console.log('asdf');
    this.epic1 = this.epics;
    await this.finishLoading();
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
    changeSelected(epic) {
      console.log("here2 " + JSON.stringify(this.epic1, null, 2));
      this.epicSelected = epic;
    },
  },
};
</script>
