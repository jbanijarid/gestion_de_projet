<script setup>
import Kanban from '../components/Kanban.vue';
import Draggable from 'vuedraggable';
import { ref } from 'vue';
import tasksData from '../data/tasks.js';

const tasks = ref(tasksData);
</script>

<template>
    <kanban :tasks="tasks"/>
</template>