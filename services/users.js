export default (axios) => ({
    async createUser(user) {
        try {
            console.log('creando usuario ' + user);
            const { data } = await axios.post("/users", user)
            return data;
        } catch (error) {
            console.log(error);
        }
    },

});