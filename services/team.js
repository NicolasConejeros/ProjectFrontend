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

});