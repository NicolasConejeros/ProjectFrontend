<template>
  <div
    class="
      card-body
      dark:bg-gray-800 dark:border-gray-700
      w-full
      type:btn
      flex
    "
    :class="[hover]"
    v-on="
      button
        ? {
            click: () =>
              displayInfo(description, epicId, acceptanceCriteria, title),
          }
        : {}
    "
  >
    <h5
      class="
        flex
        tracking-wide
        text-gray-900
        dark:text-white
        justify-center
        font-bold
        text-xl
      "
    >
      {{ title }}
    </h5>
    <p
      v-show="descriptionCard"
      class="
        text-gray-900
        dark:text-gray-300
        font-semibold
        grid
        place-content-start
        text-base
      "
    >
      Descripción
    </p>

    <p v-if="descriptionCard" class="text-clip" :class="[font, size, justify]">
      {{ description }}
    </p>
    <p
      v-show="descriptionCard"
      class="
        text-gray-900
        dark:text-gray-300
        font-semibold
        grid
        place-content-start
        text-base
      "
    >
      Criterios de aceptación
    </p>

    <p v-if="descriptionCard" :class="[font, size, justify]">
      {{ acceptanceCriteria }}
    </p>
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
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    acceptanceCriteria: {
      type: String,
      default: "",
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
    descriptionCard: {
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
    },
  },
  methods: {
    displayInfo(description, epicId, acceptanceCriteria, title) {
      this.$emit(
        "display",
        description,
        epicId.title,
        acceptanceCriteria,
        title
      );
    },
  },
};
</script>