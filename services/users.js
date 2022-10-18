export default (axios) => ({
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