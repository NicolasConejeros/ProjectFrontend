export default (axios) => ({
    async getAudios(roomId) {
        try {
            const { data } = await axios.get(`/audios/${roomId}`);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async postAudio(audio) {
        try {
            const { data } = await axios.post("/audios/", audio);
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async putAudio(audio) {
        try {
            const { data } = await axios.put("/audios/", audio);
            return data;
        } catch (error) {
            console.log(error);
        }
    },
});