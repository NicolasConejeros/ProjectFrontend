//almacenamiento central
export const state = () => ({
    _team: "",
    _role: ""
});

//getters, usualmente se llama desde computed
export const getters = {
    getTeam(state) {
        return state._team;
    },
    getRole(state) {
        return state._role;
    }
}

//Acciones (métodos públicos) sirven para llamar a las mutaciones
//pueden ser async, a diferencia de las mutaciones
export const actions = {
    async loadTeam({ commit }, teamId) {
        commit('setTeam', teamId)
    },
    async loadRole({ commit }, role) {
        commit('setRole', role)
    }
}

//mutadores, para modificar el almacenamiento central
export const mutations = {
    setTeam(state, teamId) {
        return state._team = teamId;
    },
    setRole(state, role) {
        return state._role = role;
    }
}