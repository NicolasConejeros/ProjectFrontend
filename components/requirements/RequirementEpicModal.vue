<template>
  <div class="dropdown mb-6 w-full">
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
    <label tabindex="0" class="btn w-full" >{{ epicSelected }}</label>
    <ul
      tabindex="0"
      class="dropdown-content menu shadow bg-base-100 rounded-box w-full"
    >
      <li v-for="(Epic, index) in epics" :key="index">
        <a @click="changeSelected(Epic.title, Epic.id)">{{ Epic.title }}</a>
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
    id: "",
    epicSelected: "Seleccionar",
    default: {
      title: "seleccionar",
    },
  }),
  async mounted(){
    await this.startLoading();
    this.epics.push(this.epicSelected);
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
    changeSelected(epic,id) {
      this.epicSelected = epic;
      this.$emit('dropdownSelection',id);
    },
  },
};
</script>
