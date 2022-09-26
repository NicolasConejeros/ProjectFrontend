export default (axios) => ({
    async createRequirement(requirement) {
        try {
            const { data } = await axios.post("/requirements", requirement);
            return data;
        } catch (error) {
            console.log(error);
        }

    },
    async getRequirements(projectId) {
        try{
            const {data} = await axios.get(`/requirements/${projectId}`)
            return data;
        } catch(error){
            console.log(error);
        }
    },
    async updateRequirements(requirement,id) {
        try {
            const { data } = await axios.put(`/requirements/${id}`, requirement);
            return data;
        } catch (error) {
            console.log(error);
        }

    },
    async deleteRequirements(id) {
        try {
            const { data } = await axios.delete(`/requirements/${id}`);
            return data;
        } catch (error) {
            console.log(error);
        }

    },
});