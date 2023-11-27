<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import { api } from '../../http-api.js';

const props = defineProps({
  id: String,
  name: String,
  projectId: String,
  start_date: String,
  end_date: String, 
  tasks: Array
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
};

</script>

<template>
  <div class="sprint">
    <div class="sprint-info">
      <div class="name">
        <h3>{{ props.name }}</h3>
      </div>
      <div class="dates">
        <p>Start Date: {{ formatDate(props.start_date) }}</p>
        <p>End Date: {{ formatDate(props.end_date) }}</p>
      </div>
    </div>
    <div class="tasks">
      <div v-for="task in props.tasks" :key="task.id" class="task">
        {{ task.name }}
      </div>
    </div>
  </div>
</template>
  
<style>
.sprint {
  background-color: #8c1919;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  overflow: hidden;
}

.sprint-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.name h3 {
  margin: 0;
  color: #333;
}

.dates {
  color: #666;
  display: flex;
  flex-direction: column; /* Afficher les dates en colonne */
}

.tasks {
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
}

.task {
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 8px 16px;
  background-color: #f0f0f0;
  border-radius: 4px;
  border: 1px solid #ddd;
  color: #333;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.task:hover {
  background-color: #e0e0e0;
}
</style>
