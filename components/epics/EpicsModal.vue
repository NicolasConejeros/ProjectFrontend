<template>
  <div>
    <input type="checkbox" id="addEpicModal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box overflow-y-visible">
        <label
          for="addEpicModal"
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
          Añadir Épica
        </div>
        <form>
          <div class="mb-6">
            <AppInputText
              v-model="title"
              label="Título"
              name="título"
              required
              placeholder="Ingrese una épica"
              :maxLength="40"
              :error-messages="titleErrors"
              @input="$v.title.$touch()"
              @blur="$v.title.$touch()"
            />
          </div>
        </form>
        <label
          for="addEpicModal"
          type="btn"
          class="btn btn-accent btn-block"
          @click="onSubmit"
        >
          añadir</label
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
    epics: [],
  },
  validations: {
    title: {
      required,
      maxLength: maxLength(40),
    },
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Es requerido un título");
      !this.$v.title.maxLength &&
        errors.push("El título debe tener menos de 40 caracteres");
      return errors;
    },
  },
  data: () => ({
    projectId: "",
    title: "",
  }),
  methods: {
    async onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Error en el formulario de épicas");
      } else {
        const epic = {
          projectId: this.$route.params.id,
          title: this.title,
        };
        await this.$api.epic.createEpic(epic);
        this.$emit("updateEpics");
      }
    },
  },
  components: {},
};
</script>