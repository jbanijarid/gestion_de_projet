<script setup>
import TaskCard from '../components/TaskCard.vue';
import tasks from '../data/tasks.js'; // Replace with the correct path

</script>

<template>
<div class="title">
    <task-card v-for="task in tasks" 
    :key="task.id" 
    :id="task.id" 
    :name="task.name" 
    :description="task.description" 
    :project-id="task.projectId" />
</div>

</template>

<style>
</style>