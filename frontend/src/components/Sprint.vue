<script setup>
import { ref, onMounted, defineProps} from 'vue';
import { api } from '../../http-api.js';
import Kanban from "./Kanban.vue";
import { useProjectStore } from '../stores/project';

const props = defineProps(['sprintId']);
const sprint = ref(null);
const projectStore = useProjectStore();


onMounted(async () => {
  try {
    await fetchSprintDetails ();
  } catch (error) {
    console.error('Failed to fetch sprint details:', error);
  }
});

const fetchSprintDetails = async () => {
  const response = await api.getSprintById(props.sprintId);
  sprint.value = response.data;
  console.log(sprint.value);
  await projectStore.setProjectId(props.sprintId);
  await projectStore.setIsSprint(true);
};

const formatSprintDate = (date) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};



</script>

<template>

  <div class="sprint-details-container">
      <div v-if="sprint" class="sprint-details">
        <h1>{{ sprint.name }}</h1>
        <div class="details">
          <p><strong>Date of creation:</strong> {{ formatSprintDate(sprint.created_at) }}</p>
          <p><strong>Start date:</strong> {{ formatSprintDate(sprint.start_date) }}</p>
          <p><strong>End date:</strong> {{ formatSprintDate(sprint.end_date) }}</p>
        </div>

        <div class="tasks">
          <p><strong>Tasks: </strong> </p>
          <div v-for="task in sprint.tasks" :key="task._id" class="task">
            <span class="task-name">Name: {{ task.name }}</span>
            <span class="task-des">Description: {{ task.description }}</span>
            <span class="task-state">State: {{ task.state }}</span>
          </div>
        </div>

        <Kanban :project-id="sprintId" :project="false" />
      </div>

  
      <div v-else>
        <!-- Handle loading or error state -->
        <b-spinner type="grow" label="Loading..."></b-spinner>
      </div>
  </div>

</template>
  
<style scoped>
.sprint-details-container {
  max-width: 10000px;
  margin: 0 auto;
  padding: 20px;
} 

.sprint-details {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.details {
  margin-bottom: 20px;
}


.tasks {
  display: flex;
  flex-wrap: wrap;
}

.task {
  margin: 0 10px 10px 0;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.task-name {
  font-weight: bold;
}

</style>
