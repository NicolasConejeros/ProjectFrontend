<template>
  <div>
    <input type="checkbox" id="my-modal1" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <label
          for="my-modal1"
          type="btn"
          class="
            modal-button
            btn btn-sm btn-primary btn-circle
            absolute
            right-2
            top-2
          "
        >
          ✕
        </label>
        <form>
          <div class="mb-6">
            <label
              for="text"
              class="
                block
                mb-2
                text-sm
                font-medium
                text-gray-900
                dark:text-gray-300
                font-semibold
              "
              >Título del proyecto</label
            >
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              {{ name }}
            </p>
          </div>
          <label
            for="text"
            class="
              block
              mb-2
              text-sm
              font-medium
              text-gray-900
              dark:text-gray-300
              font-semibold
            "
            >Descripción del proyecto</label
          >
          <div class="mb-6">
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              {{ description }}
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  props: {
    name: {
      type: String,
      default: "Nombre del proyecto",
    },
    description: {
      type: String,
      default: "Descripción",
    },
  },
};
</script>