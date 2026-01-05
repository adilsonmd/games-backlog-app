import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL + "/auth";

class AuthService {

    async login(username, password) {
        try {
            const response = await axios.post( baseUrl + '/login', {
                username: username,
                password: password
            });

            // Salva o token para usar nas próximas requisições
            localStorage.setItem('token', response.data.token);

            // Redireciona para a home ou wishlist
            router.push('/biblioteca');
        }
        catch (erro) {
            console.error(erro);
        }
    }
}

export default new AuthService();