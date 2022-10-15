<template>
  <div>
    <input type="checkbox" id="addRoomModal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box overflow-y-visible">
        <label
          for="addRoomModal"
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
          Añadir sala
        </div>
        <form>
          <div class="mb-6">
            <div
              class="
                block
                mb-2
                text-md
                font-medium
                text-gray-900
                dark:text-gray-300
                font-semibold
              "
            >
              Nombre
            </div>
            <input
              type="text"
              v-model="roomName"
              placeholder="Ej: Sala 1"
              class="input input-bordered input-primary bg-neutral w-full p-2.5"
            />
          </div>
        </form>
        <label
          for="addRoomModal"
          type="btn"
          class="btn btn-accent btn-block"
          @click="onSubmit"
        >
          crear</label
        >
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  data: () => ({
    roomName: "",
  }),
  methods: {
    async onSubmit() {
      const room = { projectId: this.$route.params.id, name: this.roomName };
      await this.$api.room.createRoom(room);
      this.$emit("updateRooms");
    },
  },
};
</script>