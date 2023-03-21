 <template>
  <div>
    <input type="checkbox" id="addProjectModal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <label
          for="addProjectModal"
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
          Añadir proyecto
        </div>
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
            <AppInputText
              v-model="name"
              name="título"
              required
              placeholder="Ingrese una título"
              :maxLength="30"
              :error-messages="nameErrors"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            />
            <!-- <input
              type="text"
              v-model="name"
              :maxlength="30"
              class="input input-bordered input-primary bg-neutral w-full p-2.5"
            /> -->
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
            <AppInputText
              v-model="description"
              name="description"
              required
              placeholder="Ingrese una descripción"
              :maxLength="135"
              :error-messages="descriptionErrors"
              @input="$v.description.$touch()"
              @blur="$v.description.$touch()"
            />
            <!-- <input
              type="text"
              :required="required"
              v-model="description"
              :maxlength="135"
              class="input input-bordered input-primary bg-neutral w-full p-2.5"
            /> -->
          </div>

          <label
            for="addProjectModal"
            type="btn"
            class="btn btn-primary btn-block"
            @click="onSubmit"
          >
            crear</label
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
export default {
  mixins: [validationMixin],
  validations: {
    description: {
      required,
      maxLength: maxLength(135),
    },
    name: {
      required,
      maxLength: maxLength(30),
    },
  },
  computed: {
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required &&
        errors.push("Es requerida una descripción");
      !this.$v.description.maxLength &&
        errors.push("La descripción debe tener menos de 135 carácteres");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Es requerido un título");
      !this.$v.name.maxLength &&
        errors.push("El título debe tener menos de 30 caracteres");
      return errors;
    },
  },
  data: () => ({
    name: "",
    description: "",
  }),
  methods: {
    async onSubmit() {
      try {
        this.$v.$touch();
        if (this.$v.$invalid) {
          alert("Se ha generado un error al crear el proyecto");
        } else {
          const project = {
            name: this.name,
            description: this.description,
            userId: this.$auth.user.id,
          };
          console.log(project);
          const newProject = await this.$api.project.createProject(project);
          const epic = {
            projectId: newProject.id,
            title: "Sin asignar",
          };
          await this.$api.epic.createEpic(epic);
          this.$emit("updateArray");
        }
      } catch (error) {
        console.log("Error en el formulario de proyectos");
        console.log(error);
      }
    },
  },
};
</script>