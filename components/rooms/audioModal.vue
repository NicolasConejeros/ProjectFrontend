<template>
  <div>
    <input type="checkbox" id="addAudioModal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box overflow-y-visible">
        <label
          for="addAudioModal"
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
          Subir recurso de audio
        </div>
        <form>
          <div class="mb-6">
            <AppInputText
              v-model="title"
              label="Título"
              name="título"
              required
              placeholder="Ej: Primera reunión"
              :maxLength="40"
              :error-messages="titleErrors"
              @input="$v.title.$touch()"
              @blur="$v.title.$touch()"
            />
          </div>
          <label class="block">
            <span class="sr-only">Choose profile photo</span>
            <input
              type="file"
              id="customFile"
              ref="file"
              v-on:change="handleFileUpload()"
              class="
                block
                w-full
                text-sm text-slate-500
                file:mr-4
                file:py-2
                file:px-4
                file:rounded-full
                file:border-0
                file:text-sm
                file:font-semibold
                file:bg-violet-50
                file:text-violet-700
                hover:file:bg-violet-100
                p-2
              "
            />
          </label>
        </form>
        <label
          for="addAudioModal"
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
  props: {
    roomId: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    title: "",
    musicDetails: {
      roomId: "",
      title: "",
      artist: "",
      audio: "",
    },
    data: {},
  }),
  validations: {
    title: {
      required,
      maxLength: maxLength(40),
    },
  },
  computed: {
    isDisabled: function () {
      if (
        this.musicDetails.title === "" ||
        this.musicDetails.artist === "" ||
        this.musicDetails.audio === ""
      ) {
        return !this.isValid;
      }
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Es requerido un título");
      !this.$v.title.maxLength &&
        errors.push("El título debe tener menos de 40 caracteres");
      return errors;
    },
  },
  methods: {
    handleFileUpload() {
      this.musicDetails.audio = this.$refs.file.files[0];
      // console.log(this.musicDetails.music.type)
    },
    async addNewMusic() {
      let types = /(\.|\/)(mp3|wav)$/i;
      if (
        types.test(this.musicDetails.audio.type) ||
        types.test(this.musicDetails.audio.name)
      ) {
        this.musicDetails.roomId = this.roomId;
        this.musicDetails.title = this.title;
        this.musicDetails.artist = "user";
        let formData = new FormData();
        formData.append("roomId", this.musicDetails.roomId);
        formData.append("title", this.musicDetails.title);
        formData.append("artist", this.musicDetails.artist);
        formData.append("audio", this.musicDetails.audio);
        this.data = await this.$api.audio.postAudio(formData);
      } else {
        alert("Invalid file type");
        return !this.isValid;
      }
    },
    async onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Error en el formulario de audios");
      } else {
        await this.addNewMusic();
        this.$emit("updateAudios");
      }
    },
  },
};
</script>