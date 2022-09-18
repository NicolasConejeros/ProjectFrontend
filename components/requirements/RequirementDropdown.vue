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
        overflow-auto
      "
    >
      Épica
    </div>
    <label tabindex="0" class="btn w-full ">{{ epicSelected }}</label>
    <ul
      tabindex="0"
      class="dropdown-content menu shadow bg-base-100 rounded-box w-full h-40 overflow-y-auto"
    >
      <li v-for="(Epic, index) in epics" :key="index" >
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
    epicSelected: "Sin asignar",
  }),
  methods: {
    changeSelected(epic, id) {
      this.epicSelected = epic;
      this.$emit("dropdownSelection", id);
    },
  },
};
</script>
