<script setup>
import { defineProps, defineEmits } from 'vue';

const { title } = defineProps(['title']);
const emit = defineEmits(['close-it']);

const closeModal = () => {
    emit('close-it');
};

</script>

<template>
    <div class="my-modal">
        <div class="header">
            <h5>{{ title }}</h5>
            <button @click="closeModal" class="exit-button">X</button>
        </div>
        <slot></slot>
    </div>
</template>

<style scoped>
/* Add your modal styling here */
.my-modal {
    position: fixed;
    z-index: 999;
    top: 5%;
    left: 40%;
    margin-left: -150px;
    max-width: 40%;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #e2e2e2;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.exit-button {
    background: none;
    border: none;
    color: rgb(57, 57, 57);
    font-size: 1em;
    cursor: pointer;
}

.exit-button:hover {
    color: rgb(245, 110, 110);
}

</style>
  