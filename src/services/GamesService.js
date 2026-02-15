import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL + "/games";

class GamesService {
    
    async getAll(query) {
        try {
            let games;
            
            const response = await axios.get(baseUrl + "/", {
                params: { ...query},
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

    async removeDuplicate() {
        try {
            const response = await axios.delete(baseUrl + '/');

            let games = response.data;
            return games;
        } catch (erro) {
            console.error(erro);
        }
    }

    async getDashboardData() {
        try {
            const response = await axios.get(baseUrl + '/dashboard');

            if (response.status == 200)
                return response.data;

            return null;
        } catch (erro) {
            console.error(erro);
        }
    }

    async getByStatus(query = null) {
        try {
            if (!query) {
                query = {
                    statusCompra: '',
                    status: '',
                }
            }
            const response = await axios.get(baseUrl + '/status', { params: { ...query } });

            if (response.status == 200)
                return response.data;

            return null;
        } catch (erro) {
            console.error(erro);
        }
    }

    async getPausedGames() {

    }
}

export default new GamesService();