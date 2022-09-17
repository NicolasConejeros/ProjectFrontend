export default (axios) => ({
    async getEpic(epicId) {
        try {
            console.log('obteniendo Épica');
            const { data } = await axios.get(`/epics/${epicId}`)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async getEpics(projectId) {
        try {
            console.log('obteniendo Épicas ' + projectId);
            const { data } = await axios.get(`/epics/project/${projectId}`)
            return data;
        } catch (error) {
            console.log(error);
        }
    }
});