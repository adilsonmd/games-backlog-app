import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL + "/auth";

class AuthService {

    async login(username, password) {
        try {
            const response = await axios.post( baseUrl + '/login', {
                username: username,
                password: password
            });

            // Retorna a resposta completa para a página
            return response;
        }
        catch (erro) {
            console.error(erro);
        }
    }
}

export default new AuthService();