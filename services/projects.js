export default (axios) => ({
    async createProject(project) {
        try {
            console.log(project);
            const { data } = await axios.post("/projects", project);
            return data;
        } catch (error) {
            console.log(error);
        }

    },
});