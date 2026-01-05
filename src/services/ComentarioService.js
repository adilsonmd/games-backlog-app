import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL + "/comentarios";

class ComentarioService {
    
    async getComentarios(gameId) {
        try {
            const response = await axios.get(baseUrl + "/" + gameId);
            
            return response.data;
        }
        catch (erro) {
            console.error(erro);
        }
    }

    async create(comentario) {
        try {
            const response = await axios.post(baseUrl, comentario);
            return response;
        } 
        catch (erro) {
            console.error(erro);
        }
    }

    async delete(id) {
        try {
            const response = await axios.delete(baseUrl + `/${id}`);
            return response;
        }
        catch (erro) {
            console.error(erro);
        }
    }
}

export default new ComentarioService();