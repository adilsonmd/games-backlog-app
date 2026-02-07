import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL + "/psn";

class PsnService {
    
    async getOwnedGames(query) {
        try {
            let games;
            
            const response = await axios.get(baseUrl + "/games/owned", {
                params: {
                    limit: query.limit,
                    page: query.page,
                },
                     
            });
            
            games = response.data.data.purchasedTitlesRetrieve.games;
            
            query.lastPage = response.data.data.purchasedTitlesRetrieve.pageInfo.isLast;
            query.totalCount = response.data.data.purchasedTitlesRetrieve.pageInfo.totalCount;
            
            return {games: games, queryReturn: query};
        }
        catch (erro) {
            console.error(erro);
        }
    }

    // TODO informação de 1 game específico pela PSN API
    async getPlayerSummary() {
        try {
            const response = await axios.get(baseUrl + "/player-basic/me");
            return response.data;
        }
        catch (erro) {
            console.error(erro);
        }
    }
}

export default new PsnService();