<template>
  <div>
    <input type="checkbox" id="addMemberModal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box overflow-y-visible">
        <label
          for="addMemberModal"
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
          Añadir Miembro
        </div>
        <div class="mb-6">
          <AppInputText
            v-model="email"
            label="Email"
            name="email"
            placeholder="Ingrese un correo"
            required
            :error-messages="emailErrors"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          />
        </div>
        <label
          for="addMemberModal"
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
import { required, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
export default {
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email,
    },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("El email es requerido");
      !this.$v.email.email && errors.push("El email no es válido");
      return errors;
    },
    onTeamId() {
      return this.$store.getters["teams/getTeam"];
    },
    onUserRole() {
      return this.$store.getters["teams/getRole"];
    },
  },
  data: () => ({
    email: "",
  }),
  methods: {
    setMembers(newTeam) {
      this.$store.dispatch("teams/loadTeam", newTeam);
    },
    async onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Error en el formulario de usuario");
        alert("Error al añadir usuario");
      } else {
        try {
          const team = await this.$api.team.addMember({
            userEmail: this.email,
            userRole: this.onUserRole,
            teamId: this.onTeamId.id,
          });
          if(!team){
            alert("Error al añadir usuario");
          }
          else{
            //Acá añadir el usuario al store en teams
          // const temp = this.onTeamId;
          this.setMembers(team);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  components: {},
};
</script>