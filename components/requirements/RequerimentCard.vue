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
      w-80
      h-50
    "
  >
      <h5
        class="
          -mt-4
          mb-2
          text-2xl
          font-bold
          tracking-tight
          text-gray-900
          dark:text-white
        "
      >
        {{ title }}
      </h5>
  </div>
</template>
  
  <script>
export default {
  props: {
    title: {
      type: String,
      default: "Título del requerimiento",
    },
    description: {
      type: String,
      default: "Descripción",
    },
  },
  data: () => ({
  }),
};
</script>