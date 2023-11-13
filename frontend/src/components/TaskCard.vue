
<script setup>
import { ref, computed } from 'vue';
import projects from '../data/projects.js';
import users from '../data/users.js';
import { defineProps } from 'vue';

const props = defineProps({
    id: Number,
    name: String,
    description: String,
    projectId: Number,
    etat : String

});


const project = computed(() => {
    return projects.find((p) => p.id === props.projectId) || {};
});

const owner = computed(() => {
    return users.find((user) => user.id === project.value.ownerId) || {};
});

const teamMembers = computed(() => project.value.teamMembers || []);

const teamMembersNames = computed(() => {
    return teamMembers.value.map((userId) => {
        const user = users.find((u) => u.id === userId);
        return user ? user.name : '';
    });
});
</script>

<template>
    <div class="task-card">
        <div class="header">
            <h3>{{ props.name }}</h3>
        </div>
        <div class="content">
            <p>{{ props.description }}</p>
        </div>
        <div class="footer">
            <div class="info">
                <p>Project: {{ project.name }}</p>
                <p>Owner: {{ owner.name }}</p>
                <p>etat: {{ props.etat }}</p>

                
            </div>
            <!-- Uncomment the following line to display team members -->
            <!-- <p>Team Members: {{ teamMembersNames.join(', ') }}</p> -->
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
}

.task-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.header {
    background-color: #2c3e50;
    color: #fff;
    padding: 12px;
    border-bottom: 1px solid #2980b9;
}

.header h2 {
    margin: 0;
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

@media screen and (min-width: 600px) {
    .task-card {
        width: 300px;
    }
}
</style>
  