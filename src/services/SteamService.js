import axios from 'axios';

const baseUrl = "http://localhost:3000/api/steam";


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
}

export default new SteamService();