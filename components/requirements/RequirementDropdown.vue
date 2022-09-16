<template>
  <div class="dropdown dropdown-top  mb-6 w-full">
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
      <li v-for="(Epic, index) in epics" :key="index">
        <a @click="changeSelected(Epic)">{{ Epic }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    updatedEpics: [],
  }),
  props: {
    epics: [],
  },
  data: () => ({
    epicSelected: "Seleccionar",
  }),
  created() {
    this.epics.push("Seleccionar");
  },
  methods: {
    changeSelected(epic) {
      this.epicSelected = epic;
    },
  },
};
</script>
