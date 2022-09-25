<template>
  <div>
    <input type="checkbox" id="confirmationModal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <label
          for="confirmationModal"
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
        <div
          class="
            block
            text-xl
            font-medium
            text-gray-900
            dark:text-gray-300
            font-semibold
            grid
            place-content-center
          "
        >
          Estás seguro/a?
        </div>
        <label
          for="confirmationModal"
          type="btn"
          class="modal-button btn btn-accent px-4 mt-12"
          @click="onDelete(id,elementToDelete)"
        >
          Eliminar
        </label>
        <label
          for="confirmationModal"
          type="btn"
          class="modal-button btn btn-primary px-4 absolute right-5 mt-12"
        >
          Cancelar
        </label>
      </div>
    </div>
  </div>
</template>
      
<script>
export default {
  props: {
    id: "",
    elementToDelete: "",
  },
  data: () => ({}),
  methods: {
    async onDelete(id,elementToDelete) {
      if(elementToDelete === 'requirement')
        await this.$api.requirement.deleteRequirements(id);
        this.$emit("updateArray");
    },
  },
  components: {},
};
</script>