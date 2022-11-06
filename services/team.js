export default (axios) => ({

    async addMember(newMember) {
        try {
            console.log('adding user' + newMember);
            const { data } = await axios.put("/team", newMember)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async getTeam(projectId) {

        try {
            const { data } = await axios.get(`/team/${projectId}`);
            return data;
        } catch (error) {
            console.log(error)
        }
    },
    async removeMember(projectId, userToRemove) {
        try {
            const { data } = await axios.put(`/team/${projectId}`, { userToRemove });
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async updateTeam(projectId, team) {
        try {
            const { data } = await axios.put(`/team/update/${projectId}`, { members: team });
            return data;
        } catch (error) {
            console.log(error);
        }
    }

});