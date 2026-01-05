import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL + "/images";

class ImageService {
    
    async getAll(query) {
        try {
            let games;
            
            const response = await axios.get(baseUrl + "/", {
                params: {
                    limit: query.limit,
                    page: query.page,
                    q: query.search
                },
            });
            
            games = response.data.games;
            
            query.lastPage = response.data.pageInfo.lastPage;
            query.totalCount = response.data.pageInfo.totalCount;

            return {games: games, queryReturn: query};
        }
        catch (erro) {
            console.error(erro);
        }
    }

    async create(game) {
        try {
            const response = await axios.post(baseUrl, game);
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

export default new ImageService();