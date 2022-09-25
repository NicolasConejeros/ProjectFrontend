export default (axios) => ({
    async getCommentsR(requirementId) {
        try {
            console.log('obteniendo comentarios ' + requirementId);
            const { data } = await axios.get(`/comments/${requirementId}`)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async createComment(comment) {
        try {
            console.log('creando comentario ' + comment);
            const { data } = await axios.post("/comments/", comment)
            return data;
        } catch (error) {
            console.log(error);
        }
    }
});