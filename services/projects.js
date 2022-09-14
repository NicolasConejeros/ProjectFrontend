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
    async getProjects(idUser) {
        try {
            console.log(idUser);
            const { data } = await axios.get("/projects");
            return data;
        } catch (error) {
            console.log(error);
        }

    },
    async getAllProjects(idUser) {
        try {
            console.log(idUser);
            const { data } = await axios.get("/projects/myprojects");
            return data;
        } catch (error) {
            console.log(error);
        }

    },
});