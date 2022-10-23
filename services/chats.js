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
    async getChatRoom(slug) {
        try {
            console.log('obteniendo sala ' + slug);
            const { data } = await axios.get(`/rooms/search?slug=${slug}`)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async createChatRoom(roomId) {
        try {
            console.log('creando chat ' + roomId);
            const { data } = await axios.post("/chats/", roomId)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
});