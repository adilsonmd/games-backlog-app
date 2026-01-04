<script setup>
import { ref, watch, nextTick, computed} from 'vue';

const props = defineProps({
    isOpen: Boolean,
    title: String,
    size: {
        type: String,
        default: 'medium',
        validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
});

const sizeClasses = computed(() => {
    const sizes = {
        small: 'max-w-sm',   // 384px
        medium: 'max-w-md',  // 448px
        large: 'max-w-2xl'   // 672px
    };

    return sizes[props.size] || sizes.medium;
});

const emit = defineEmits(['close']);
const dialogRef = ref(null);

const handleClose = () => {
    emit('close');
};

watch(() => props.isOpen, async (newValue) => {
    // Aguarda o Vue renderizar o DOM antes de acessar o ref
    await nextTick();

    if (!dialogRef.value) {
        console.error("Erro: dialogRef não encontrado no DOM");
        return;
    }

    if (newValue) {
        // Verifica se já não está aberto para evitar erro de sistema
        if (!dialogRef.value.open) {
            dialogRef.value.showModal();
        }
    } else {
        dialogRef.value.close();
    }
}, { immediate: true });


</script>
<template>
    <dialog 
        ref="dialogRef" 
        @close="handleClose" 
        class="rounded-xl p-0 m-auto backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
        <div 
            v-if="isOpen" 
            :class="[
                'flex flex-col text-gray-200 bg-[#1a1a1a] rounded-xl border border-gray-800 shadow-2xl overflow-hidden',
                'w-[95vw]', // Largura quase total no mobile
                sizeClasses // Aplica max-w-sm, max-w-md ou max-w-2xl
            ]"
        >
            <header class="flex justify-between items-center px-5 py-4 border-b border-gray-800">
                <slot name="header">
                    <h3 class="text-sm uppercase tracking-widest font-bold text-gray-400">{{ title }}</h3>
                </slot>
                <button @click="handleClose" class="text-gray-500 hover:text-white text-2xl">&times;</button>
            </header>

            <section class="p-6 overflow-y-auto max-h-[80vh]">
                <slot></slot>
            </section>

            <footer class="flex justify-end gap-3 px-5 py-4 border-t border-gray-800">
                <slot name="footer">
                    <button @click="handleClose" class="px-4 py-2 text-xs text-gray-400 hover:bg-gray-800 rounded">Fechar</button>
                </slot>
            </footer>
        </div>
    </dialog>
</template>

<style scoped>
/* Reset para o Dialog */
dialog {
    /* Reseta estilos nativos */
    border: none;
    padding: 0;
    background: transparent;
    
    /* Centralização absoluta */
    position: fixed;
    inset: 0;
    margin: auto; 
    
    /* Remove restrições de largura do navegador */
    max-width: none;
    max-height: none;
    width: fit-content;
    height: fit-content;
    
    outline: none;
    overflow: visible; /* Garante que sombras não cortem */
}

dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(4px);
}

/* Animação de entrada centralizada */
dialog[open] {
    animation: fadeInScale 0.3s ease-out forwards;
}

@keyframes fadeInScale {
    from { 
        opacity: 0; 
        transform: scale(0.95); 
    }
    to { 
        opacity: 1; 
        transform: scale(1); 
    }
}
</style>