export default (axios) => ({

    async getChatRoom(chatId) {
        try {
            console.log('obteniendo chat ' + chatId);
            const { data } = await axios.get(`/chats/${chatId}`)
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
    async postMessage(message){
        try{ 
            console.log('sending message ' + JSON.stringify(message,null,2));
            const { data } = await axios.post("/chats/", message);
            return data;
        } catch(error){
            console.log(error);
        }
    }
});