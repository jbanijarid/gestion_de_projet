<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import { api } from '../../http-api.js';

const props = defineProps({
    id: Number,
    name: String,
    description: String,
    projectId: Number,
    state: String
});
const states = ref([
    { text: 'todo', value: 'todo' },
    { text: 'progress', value: 'progress' },
    { text: 'done', value: 'done' }
])
const isEditMode = ref(false);
const editedName = ref(props.name);
const editedDescription = ref(props.description);
const editedState = ref(props.state);

const enterEditMode = () => {
    isEditMode.value = true;
};

const exitEditMode = async () => {
    isEditMode.value = false;
    // Update the task in the database
    try {
        await api.updateTask(props.id, {
            name: editedName.value,
            description: editedDescription.value,
            state: editedState.value
        });
        // Optional: You can emit an event or perform other actions after a successful update
    } catch (error) {
        console.error('Failed to update task:', error);
        // Handle the error (e.g., show a notification to the user)
    }
};

</script>

<template>
    <div class="task-card">
        <div class="header">
            <p v-if="!isEditMode" @click="enterEditMode" class="icon">
                <font-awesome-icon icon="pen-to-square" size="xs" />
            </p>
            <b-row>
                <b-col cols="9">
                    <h3 v-if="!isEditMode">{{ editedName }}</h3>
                    <input v-else v-model="editedName" />
                </b-col>
                <b-col cols="3">
                    <p v-if="isEditMode" @click="exitEditMode" class="icon">
                        <font-awesome-icon icon="floppy-disk" size="xs" />
                    </p>
                </b-col>
            </b-row>
        </div>
        <div class="content">
            <p v-if="!isEditMode">{{ editedDescription }}</p>
            <textarea v-else v-model="editedDescription"></textarea>
        </div>
        <div class="footer">
            <div class="info">
                <p v-if="!isEditMode">{{ editedState }}</p>
                <select v-else v-model="editedState">
                    <option v-for="option in states" :value="option.value">
                        {{ option.text }}
                    </option>
                </select>

            </div>
        </div>
    </div>
</template>

<style scoped>
.task-card {
    background-color: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    position: relative;
}

.task-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.header {
    background-color: #2c3e50;
    color: #fff;
    padding: 12px;
    border-bottom: 1px solid #2980b9;
    position: relative;
}

.icon {
    cursor: pointer;
    font-size: 1.2rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
}

.header h3 {
    margin: 0;
    font-size: 1.5rem;
}

.content {
    padding: 16px;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-top: 1px solid #e2e2e2;
}

.info p {
    margin: 0;
    font-size: 14px;
    color: #555;
}

input,
textarea,select {
    width: 100%;
    height: 3em;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    margin-top: 8px;
    font-size: 16px;
    background-color: #ffffff;
    color: #2c3e50;
}

@media screen and (min-width: 600px) {
    .task-card {
        width: 300px;
    }
}
</style>

