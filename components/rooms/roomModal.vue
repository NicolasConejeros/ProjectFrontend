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
            <AppInputText
              v-model="roomName"
              label="Nombre"
              name="name"
              required
              placeholder="Ej: Sala 1"
              :error-messages="nameErrors"
              @input="$v.roomName.$touch()"
              @blur="$v.roomName.$touch()"
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
import { required, maxLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  mixins: [validationMixin],
  data: () => ({
    roomName: "",
  }),
  validations: {
    roomName: {
      required,
      maxLength: maxLength(40),
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.roomName.$dirty) return errors;
      !this.$v.roomName.required && errors.push("El título es requerido");
      !this.$v.roomName.maxLength &&
        errors.push("El título debe tener menos de 40 caracteres");
      return errors;
    },
    loadedTeam() {
      return this.$store.getters["teams/getTeam"];
    },
  },
  methods: {
    async onSubmit() {
      const room = { projectId: this.$route.params.id, name: this.roomName, teamId: this.loadedTeam};
      await this.$api.room.createRoom(room);
      this.$emit("updateRooms");
    },
  },
};
</script>