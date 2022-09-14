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
    async getProjects() {
        try {
            // console.log(idUser);
            const { data } = await axios.get("/projects");
            return data;
        } catch (error) {
            console.log(error);
        }

    },
    async getAllProjects() {
        try {
            // console.log(idUser);
            const { data } = await axios.get("/projects/myprojects");
            return data;
        } catch (error) {
            console.log(error);
        }

    },
    async getProject(idProject) {
        try {
            console.log(idProject);
            const { data } = await axios.get(`/projects/${idProject}`);
            return data;
        } catch (error) {
            console.log(error);
        }

    },
});