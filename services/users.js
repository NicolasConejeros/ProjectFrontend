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
    async updateUser(user) {
        try {
            console.log('updating user' + user);
            const { data } = await axios.put("/users/me", user)
            return data;
        } catch (error) {
            console.log(error);
        }
    },

});