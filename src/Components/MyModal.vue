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
    <dialog ref="dialogRef" @close="handleClose" class="custom-modal">
        <div v-if="isOpen" class="modal-content">

            <header class="modal-header">
                <slot name="header">
                    <h3>{{ title || 'Atenção' }}</h3>
                </slot>
                <button @click="handleClose" class="close-btn">&times;</button>
            </header>

            <section class="modal-body">
                <slot></slot>
            </section>

            <footer class="modal-footer">
                <slot name="footer">
                    <button @click="handleClose">Fechar</button>
                </slot>
            </footer>

        </div>
    </dialog>
</template>

<style scoped>
.custom-modal {
    border: none;
    border-radius: 8px;
    padding: 0;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Estiliza o fundo escuro (backdrop) nativo */
.custom-modal::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
}

.modal-content {
    display: flex;
    flex-direction: column;
}

.modal-header {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8f9fa;
}

.modal-body {
    padding: 1.5rem;
}

.modal-footer {
    padding: 1rem;
    border-top: 1px solid #eee;
    text-align: right;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>