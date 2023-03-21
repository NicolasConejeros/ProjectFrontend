<template>
  <div>
    <input type="checkbox" :id="forModal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <label
          :for="forModal"
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
          :for="forModal"
          type="btn"
          class="modal-button btn btn-accent px-4 mt-12"
          @click="onDelete(id)"
        >
          Eliminar
        </label>
        <label
          :for="forModal"
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
    forModal: "",
  },
  methods: {
    async onDelete(id) {
      if (this.forModal === "confirmationModalC") {
        await this.$api.comment.deleteComment(id);
        this.$emit("updateComments");
      }
      if (this.forModal === "confirmationModalR") {
        await this.$api.requirement.deleteRequirements(id);
        this.$emit("updateArray");
        window.location.reload(true);
      }
      if (this.forModal === "deleteAudioModal") {
        await this.$api.audio.deleteAudio(id);
        this.$emit("updateAudios");
        window.location.reload(true);
      }
      if (this.forModal === "removeMemberModal") {
        await this.$api.team.removeMember(id);
        this.$emit("updateAudios");
      }
    },
  },
  components: {},
};
</script>