<script setup>
import { onMounted, defineProps, ref } from 'vue';
import { api } from '../../http-api';

const props = defineProps(['projectId']);
const project = ref(null);

onMounted(async () => {
    try {
        const response = await api.getProjectById(props.projectId);
        project.value = response.data;
    } catch (error) {
        console.error('Failed to fetch project details:', error);
        // Handle error (e.g., show a notification to the user)
    }
});
</script>

<template>
    <div class="project-details" v-if="project">
        <h1>{{ project.name }}</h1>
        <div class="details">
            <!-- <p><strong>Owner:</strong> {{ project.owner }}</p> -->
            <p><strong>Description:</strong> {{ project.description }}</p>
            <!-- Add more details as needed -->
        </div>
        <h1>Ici le Kanban de Project &#128520; </h1>
    </div>
    <div v-else>
        <!-- Handle loading or error state -->
        <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
</template>

<style scoped>
.project-details {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.details {
    margin-top: 20px;
}
</style>
