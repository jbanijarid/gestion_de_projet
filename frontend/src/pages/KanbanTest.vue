<script setup>
import Kanban from '../components/Kanban.vue';
import Draggable from 'vuedraggable';
import { ref } from 'vue';
import tasksData from '../data/tasks.js';

const tasks = ref(tasksData);
const semitsks = tasksData.filter(task => task.id < 3);
</script>

<template>
    <kanban :tasks="semitsks"/>
</template>