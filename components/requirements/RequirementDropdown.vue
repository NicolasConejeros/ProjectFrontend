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
      class="dropdown-content menu shadow bg-base-300 rounded-box w-full max-h-40 overflow-y-auto"
    >
      <li v-for="(Epic, index) in epics" :key="index" >
        <a class="hover:bg-accent hover:text-base-300" @click="changeSelected(Epic.title, Epic.id)">{{ Epic.title }}</a>
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
      this.$emit("dropdownSelection", epic,id);
    },
  },
};
</script>
