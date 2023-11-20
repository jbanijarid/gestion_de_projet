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


const getRandomEmoji = () => {
    // TODO: Get a random number between 128512 and 129488
    const min = 128512;
    const max = 128567;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return `&#${randomNum}`;
};
</script>


<template>
    <div class="project-details" v-if="project">
        <h1>{{ project.name }}</h1>
        <div class="details">
            <!-- <p><strong>Owner:</strong> {{ project.owner }}</p> -->
            <p><strong>Description:</strong> {{ project.description }}</p>
            <!-- Add more details as needed -->
        </div>
        <!-- Display all teamMembers with a random emoji -->
        <div v-for="member in project.teamMembers" :key="member._id" >
            <div class="userInf">
                <p v-html="getRandomEmoji()"> </p> {{ member.username }}
            </div>
        </div>
        <h1>Ici le Kanban de Project &#128520;</h1>
    </div>
    <div v-else>
        <!-- Handle loading or error state -->
        <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
</template>

<style scoped>
.project-details {
    margin: 0 auto;
    /* max-width: 600px; */
    /* padding: 20px; */
}

.details {
    margin-top: 20px;
}
.userInf {
    display: flex;
    flex-direction: row;
}
</style>
