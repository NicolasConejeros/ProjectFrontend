<template>
  <div
    class="
      p-6
      bg-white
      rounded-lg
      border border-gray-200
      shadow-md
      dark:bg-gray-800 dark:border-gray-700
      flex-none
      w-full
      type:btn
    "
    :class="[hover]"
    v-on="button ? { click: () => displayInfo(description, epicId) } : {}"
  >
    <h5
      class="
        flex
        mb-2
        tracking-tight
        text-gray-900
        dark:text-white
      "
      :class="[font, size, justify]"
    >
      {{ title }}
    </h5>
  </div>
</template>
  
  <script>
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
    epicId: {
      projectId: "",
      title: "",
      id: "",
    },
    title: {
      type: String,
      default: "Título del requerimiento",
    },
    description: {
      type: String,
      default: "Descripción",
    },
    font: {
      type: String,
      default: "font-bold",
    },
    size: {
      type: String,
      default: "text-xl",
    },
    button: {
      type: Boolean,
      default: false,
    },
    hover: {
      type: String,
      default: "",
    },
    justify: {
      type: String,
      default: "justify-start",
    }
  },
  methods: {
    displayInfo(description, epicId) {
      this.$emit("display", description, epicId.title);
    },
  },
};
</script>