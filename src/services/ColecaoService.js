import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL + "/colecao";

class ColecaoService {

    async getId(colecaoId) {
        try {
            const response = await axios.get(baseUrl + "/" + colecaoId);

            return response.data;
        }
        catch (erro) {
            console.error(erro);
        }
    }
    async getAll(query) {
        try {
            const response = await axios.get(baseUrl + "/");

            return response.data;
        }
        catch (erro) {
            console.error(erro);
        }
    }
    async create(colecao) {
        try {
            const response = await axios.post(baseUrl, colecao);
            return response;
        }
        catch (erro) {
            console.error(erro);
        }
    }

    async update(id, colecao) {
        try {
            const response = await axios.put(baseUrl + `${id}`, colecao );
            return response;
        }
        catch (erro) {
            console.error(erro);
        }
    }
    async delete(id) {
        try {
            const response = await axios.delete(baseUrl + `/${id}`);
            return response;
        }
        catch (erro) {
            console.error(erro);
        }
    }
}

export default new ComentarioService();