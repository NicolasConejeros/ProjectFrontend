//almacenamiento central
export const state = () => ({
    _team: ""
});

//getters, usualmente se llama desde computed
export const getters ={
    getTeam(state){
        return state._team;  
    }
}

//Acciones (métodos públicos) sirven para llamar a las mutaciones
//pueden ser async, a diferencia de las mutaciones
export const actions ={
    async loadTeam({commit},teamId){
        commit('setTeam',teamId)
    }
}

//mutadores, para modificar el almacenamiento central
export const mutations ={
    setTeam(state, teamId){
        return state._team = teamId;
    }
}