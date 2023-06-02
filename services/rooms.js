export default (axios) => ({
    async getRooms(projectId) {
        try {
            console.log('obteniendo salas ' + projectId);
            const { data } = await axios.get(`/rooms/project/${projectId}`)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async getRoom(slug) {
        try {
            console.log('obteniendo sala ' + slug);
            const { data } = await axios.get(`/rooms/search?slug=${slug}`)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async createRoom(room) {
        try {
            console.log('creando sala ' + room);
            const { data } = await axios.post("/rooms/", room)
            return data;
        } catch (error) {
            console.log(error);
        }
    }
});