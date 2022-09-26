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
              class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
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