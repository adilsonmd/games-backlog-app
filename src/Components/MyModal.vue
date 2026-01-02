<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    title: String
});

const emit = defineEmits(['close']);
const dialogRef = ref(null);

watch(() => props.isOpen, (newValue) => {
    if (newValue) {
        dialogRef.value?.showModal(); // Abre como modal (com backdrop)
    } else {
        dialogRef.value?.close();
    }
});

const handleClose = () => {
    emit('close');
};

</script>
<template>
    <dialog 
        ref="dialogRef" 
        @close="handleClose" 
        class="rounded-xl shadow-2xl p-0 m-auto bg-[#1a1a1a] border border-gray-800 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
        <div v-if="isOpen" class="w-full max-w-md flex flex-col text-gray-200">
            
            <header class="flex justify-between items-center px-5 py-4 border-b border-gray-800 bg-[#1a1a1a]">
                <slot name="header">
                    <h3 class="text-sm uppercase tracking-widest font-bold text-gray-400">
                        {{ title || 'Atenção' }}
                    </h3>
                </slot>
                <button 
                    @click="handleClose" 
                    class="text-gray-500 hover:text-white transition-colors leading-none text-2xl"
                >
                    &times;
                </button>
            </header>

            <section class="p-6 overflow-y-auto max-h-[70vh]">
                <slot></slot>
            </section>

            <footer class="flex justify-end items-center gap-3 px-5 py-4 border-t border-gray-800">
                <slot name="footer">
                    <button 
                        @click="handleClose" 
                        class="px-4 py-2 rounded-md text-xs font-semibold text-gray-400 hover:bg-gray-800 transition-all"
                    >
                        Fechar
                    </button>
                </slot>
            </footer>
        </div>
    </dialog>
</template>

<style scoped>
/* Reset para o Dialog */
dialog {
    border: 1px solid rgba(255, 255, 255, 0.1);
    outline: none;
    min-width: 400px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Estilização do Backdrop (Fundo escurecido) */
dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(4px); /* Efeito de vidro fosco no fundo */
}

/* Animação simples de entrada */
dialog[open] {
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}
</style>