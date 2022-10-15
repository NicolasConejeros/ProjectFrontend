<template>
  <div
    class="
      card-body

      type:btn
      flex grow-0
      text-neutral-content
      border border-primary
      hover:text-neutral-content hover:bg-primary
      w-80
      h-56
    "
  >
    <nuxt-link :to="route">
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
        {{ name }}
      </h5>
    </nuxt-link>
    <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700" />
    <p class="mt-2 mb-4 font-normal text-gray-700 dark:text-gray-400 ">
      {{ description }}
    </p>
    <!-- <button
      for="my-modal"
      type="btn"
      class="
        inline-flex
        items-center
        py-2
        px-3
        text-sm
        font-medium
        text-center text-white
        bg-blue-700
        rounded-lg
        hover:bg-blue-800
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
      "
    >
      <label for="my-modal1" class="modal-button">
        <div>
          Read more<svg
            aria-hidden="true"
            class="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <ProjectsProjectModal :name="name" :description="description" />
      </label>
    </button> -->
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
    projectId: {
      type: String,
      default: "#",
    },
  },
  data: () => ({
    route: "/projects/",
  }),
  created() {
    this.route = this.route + this.projectId;
  },
};
</script>