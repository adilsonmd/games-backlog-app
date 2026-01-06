import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL + "/setting";

class SettingService {
    
    async getAll() {
        try {
            const response = await axios.get(baseUrl + "/");
            
            return response;
        }
        catch (erro) {
            console.error(erro);
        }
    }
}

export default new SettingService();