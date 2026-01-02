import axios from 'axios';

const baseUrl = "http://localhost:3000/api/games";

class GamesService {
    
    async getAll(query) {
        try {

            console.log("[GamesService] query:", query);
            let games;
            
            const response = await axios.get(baseUrl + "/", {
                params: {
                    limit: query.limit,
                    page: query.page,
                    q: query.search
                }
            });
            
            console.log(response);
            
            games = response.data.games;
            
            query.lastPage = response.data.pageInfo.lastPage;
            query.totalCount = response.data.pageInfo.totalCount;

            return {games: games, queryReturn: query};
        }
        catch (erro) {
            console.error(erro);
        }
    }

    async getById(id) {
        try {
            const response = await axios.get(baseUrl + `/${id}`);
            
            let games = response.data;
            return games;
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
}

export default new GamesService();