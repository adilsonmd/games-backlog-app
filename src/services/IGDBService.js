import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL + "/igdb";

class IGDBService {

    async searchGame(title, limit = 1) {
        try {
            const response = await axios.get(baseUrl + `/game?titulo=${title}&limit=${limit}`);

            // Retorna a resposta completa para a página
            return response.data;
        }
        catch (erro) {
            console.error(erro);
        }
    }
}

export default new IGDBService();