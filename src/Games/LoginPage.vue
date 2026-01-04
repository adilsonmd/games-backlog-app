<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
    isLoading.ref = true;
    error.value = '';
    
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            username: username.value,
            password: password.value
        });

        // Salva o token para usar nas próximas requisições
        localStorage.setItem('token', response.data.token);
        
        // Redireciona para a home ou wishlist
        router.push('/biblioteca');
    } catch (err) {
        error.value = err.response?.data?.error || 'Erro ao conectar ao servidor';
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
        <div class="w-full max-w-md bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 shadow-2xl">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-white mb-2">GameLog</h1>
                <p class="text-gray-500 text-sm">Entre para gerenciar sua coleção</p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-6">
                <div>
                    <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Usuário</label>
                    <input 
                        v-model="username"
                        type="text" 
                        required
                        class="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-3 text-gray-200 outline-none focus:border-blue-500 transition-colors"
                        placeholder="Seu nome de usuário"
                    />
                </div>

                <div>
                    <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Senha</label>
                    <input 
                        v-model="password"
                        type="password" 
                        required
                        class="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-3 text-gray-200 outline-none focus:border-blue-500 transition-colors"
                        placeholder="••••••••"
                    />
                </div>

                <div v-if="error" class="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                    {{ error }}
                </div>

                <button 
                    type="submit"
                    :disabled="isLoading"
                    class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all transform active:scale-[0.98]"
                >
                    {{ isLoading ? 'Entrando...' : 'Entrar' }}
                </button>
            </form>
        </div>
    </div>
</template>