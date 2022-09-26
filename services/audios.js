export default (axios) => ({
    async getAudios(roomId) {
        try {
            console.log('obteniendo audios ' + roomId);
            const { data } = await axios.get(`/audios/${roomId}`)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async postAudio(audio) {
        try {
            console.log('obteniendo audios ');
            var object = {};
            audio.forEach((value, key) => object[key] = value);
            var json = JSON.stringify(object);
            console.log(json);
            // console.log(audio);
            const { data } = await axios.post("/audios/", audio)
            return data;
        } catch (error) {
            console.log(error);
        }
    },
});