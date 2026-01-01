import axios from 'axios';

const baseUrl = "http://localhost:3000/api/psn";

class PsnService {
    
    async getOwnedGames(query) {
        try {
            let games;
            
            const response = await axios.get(baseUrl + "/games/owned", {
                params: {
                    limit: query.limit,
                    page: query.page,
                }
            });
            
            games = response.data.data.purchasedTitlesRetrieve.games;
            
            query.lastPage = response.data.data.purchasedTitlesRetrieve.pageInfo.isLast;
            query.totalCount = response.data.data.purchasedTitlesRetrieve.pageInfo.totalCount;
            
            console.log("PsnService", query);
            return {games: games, queryReturn: query};
        }
        catch (erro) {
            console.error(erro);
        }
    }
}

export default new PsnService();