import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL + "/steam";


class SteamService {
    
    async getOwnedGames(query) {
        try {            
            const response = await axios.get(baseUrl + "/games");
            let games = response.data.response.games;
            
            //query.lastPage = response.data.data.purchasedTitlesRetrieve.pageInfo.isLast;
            //query.totalCount = response.data.data.purchasedTitlesRetrieve.pageInfo.totalCount;
            
            return {games: games, queryReturn: query};
        }
        catch (erro) {
            console.error(erro);
        }
    }

    async getRecentPlayedGames() {
        try {
            const response = await axios.get(baseUrl + "/recent-games");
            let games = response.data;
            
            return {games: games, queryReturn: query};
        } catch (error) {
            console.error(erro);
        }
    }

    async getPlayerSummary() {
        try {
            const response = await axios.get(baseUrl + "/player");
            return response.data;

        }
        catch (erro) {
            console.error(erro);
        }
    }

    async getOwnedGameById(id) {
        try {            
            const response = await axios.get(baseUrl + "/games/" + id);
            
            if (response.status == 200) {
                let games = response.data.response.games;
                return games;
            }
            return null;
        }
        catch (erro) {
            console.error(erro);
        }
    }
}

export default new SteamService();