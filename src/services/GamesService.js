import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL + "/games";

class GamesService {
    
    async getAll(query) {
        console.log("base url:", baseUrl);
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

    async update(id, game) {
        try {
            const response = await axios.put(baseUrl + `/${id}`, game);
            return response;
        } 
        catch (erro) {
            console.error(erro);
        }
    }

    async getWishlist() {
        try {
            const response = await axios.get(baseUrl + `/wishlist/`);

            let games = response.data;
            return games;
        }
        catch (erro) {
            console.error(erro);
        }
    }
}

export default new GamesService();