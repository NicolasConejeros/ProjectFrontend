<template>
  <div>
    <input type="checkbox" id="ManageTeamModal" class="modal-toggle" />
    <div class="modal overflow-hidden">
      <div class="modal-box w-11/12 max-w-4xl h-11/12">
        <label
          for="ManageTeamModal"
          type="btn"
          class="
            modal-button
            btn btn-sm btn-primary btn-circle
            absolute
            right-2
            top-2
            z-40
          "
        >
          ✕
        </label>
        <div
          class="
            text-xl
            font-medium
            text-gray-300
            font-semibold
            grid
            place-content-center
            pb-4
            bg-base-100
            top-0
            z-40
          "
        >
          Manejar equipo
        </div>

        <div>
          <table class="table w-full ">
            <!-- head -->
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="(user, index) in teamMembers" :key="index" >
              <!-- row 1 -->
              <tr>
                <th></th>
                <!-- col 1 -->
                <td>
                  <div class="flex items-center space-x-3">
                    <div>
                      <div class="font-bold">{{ user.user.name }}</div>
                    </div>
                  </div>
                </td>
                <!-- col 2 -->
                <td>
                  {{ user.user.email }}
                  <br />
                </td>
                <!-- col 3 -->
                <td class="w-6">
                  <select class="select select-primary w-18">
                    <option
                      @click="
                        updateRole(
                          user.role == 'leader' ? 'member' : 'leader',
                          index
                        )
                      "
                    >
                      {{ translatedRole(user.role) }}
                    </option>
                    <option
                      @click="
                        updateRole(
                          user.role == 'leader' ? 'member' : 'leader',
                          index
                        )
                      "
                    >
                      {{ user.role == "leader" ? "Colaborador" : "Líder" }}
                    </option>
                  </select>
                </td>
                <!-- col 4 -->
                <th>
                  <div tabindex="0" class="collapse">
                    <div class="btn btn-sm btn-ghost collapse-title">
                      Quitar
                    </div>
                    <div
                      class="collapse-content grid content-center bg-base-100"
                    >
                      <div class="justify justify-self-center">
                        Estás seguro/a?
                      </div>
                      <label
                        type="btn"
                        class="btn btn-outline btn-sm btn-accent"
                        @click="onRemoveMember(index)"
                        >Quitar</label
                      >
                    </div>
                  </div>
                </th>
              </tr>
            </tbody>
            <!-- foot -->
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
        
<script>
export default {
  props: {
    team: [],
  },
  data: () => ({
    email: "",
    teamMembers: [],
  }),
  created() {
    this.teamMembers = this.team;
  },
  methods: {
    async onRemoveMember(index) {
      this.teamMembers = await this.$api.team.removeMember(
        this.$route.params.id,
        this.teamMembers[index].user.id
      );
    },
    updateRole(role, index) {
      this.teamMembers[index].user.role = role;
    },
    translatedRole(role) {
      if (role === "leader") return "Líder";
      else return "Colaborador";
    },
    async onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Error en el formulario de usuario");
      } else {
        try {
          this.teamMembers = await this.$api.team.addMember({
            userEmail: this.email,
            userRole: this.onUserRole,
            teamId: this.onTeamId.id,
          });
          //Acá añadir el usuario al store en teams
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  components: {},
};
</script>