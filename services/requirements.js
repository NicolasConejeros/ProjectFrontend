export default (axios) => ({
    async createRequirement(requirement) {
        try {
            console.log("aca");
            const { data } = await axios.post("/requirements", requirement);
            return data;
        } catch (error) {
            console.log(error);
        }

    },
    async getRequirements(projectId) {
        try{
            console.log('obteniendo requerimientos');
            const {data} = await axios.get(`/requirements/${projectId}`)
            return data;
        } catch(error){
            console.log(error);
        }
    }
});