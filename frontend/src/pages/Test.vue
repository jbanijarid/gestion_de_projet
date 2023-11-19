<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../../http-api';
import TaskCard from '../components/TaskCard.vue';

const taskList = ref([]);

onMounted(async () => {
  await fetchTasks();
});

const fetchTasks = async () => {
  const resp = await api.getTasks();
  taskList.value = resp.data;
};

const handleTaskDeleted = (taskId) => {
  // Update the local taskList by filtering out the deleted task
  taskList.value = taskList.value.filter(task => task._id !== taskId);
};
</script>

<template>
  <div class="allTasks">
    <TaskCard
      v-for="element in taskList"
      :key="element._id"
      :id="element._id"
      :name="element.name"
      :description="element.description"
      :project-id="element.project"
      :state="element.state"
      @taskDeleted="handleTaskDeleted"
    />
  </div>
</template>

<style scoped>
.allTasks {
  margin: 0;
}
</style>
