<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../../http-api';
import TaskCard from '../components/TaskCard.vue';
const taskList = ref(null);
onMounted(async () => {
    const resp = await api.getTasks();
    taskList.value = resp.data;
    console.log(taskList.value);
});
</script>

<template>
    <div class="allTasks">
        <TaskCard v-for="element in taskList" :key="element._id"
            :id="element._id" :name="element.name" :description="element.description"
            :project-id="element.project" :etat="element.state" />
    </div>
</template>

<style></style>