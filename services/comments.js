export default (axios) => ({
    async getCommentsR(requirementId) {
        try {
            const { data } = await axios.get(`/comments/${requirementId}`)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async createComment(comment) {
        try {
            const { data } = await axios.post("/comments/", comment)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteComment(commentId) {
        try {
            const { data } = await axios.delete(`/comments/${commentId}`)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
});