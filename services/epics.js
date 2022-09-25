export default (axios) => ({
    async getEpic(epicId) {
        try {
            const { data } = await axios.get(`/epics/${epicId}`)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async getEpics(projectId) {
        try {
            const { data } = await axios.get(`/epics/project/${projectId}`)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async createEpic(epic) {
        try {
            const { data } = await axios.post("/epics/",epic)
            return data;
        } catch (error) {
            console.log(error);
        }
    }
});