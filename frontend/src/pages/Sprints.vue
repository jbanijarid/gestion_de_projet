<script setup>
import { onMounted, ref, computed } from 'vue';
import { api } from '../../http-api';
import { useProjectStore } from "../stores/project";
import router from '../router';

const projectStore = useProjectStore();
const projectId = projectStore.getProjectId();

const sprintsList = ref([]);
const searchQuery = ref('');
const isNewSprintMode = ref(false);
const newSprint = ref({
  name: '',
  start_date: '',
  end_date: '',
});

onMounted(async () => {
  await fetchSprints();
});

const fetchSprints = async () => {
  try {
    const resp = await api.getAllSprintsByProject(projectId);
    sprintsList.value = resp.data;
  } catch (error) {
    console.error('Error fetching sprints:', error);
  }
};

const filteredSprints = computed(() => {
  if (searchQuery.value === '')
    return sprintsList.value;
  return sprintsList.value.filter(sprint =>
    sprint.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const enterEditMode = () => {
  isNewSprintMode.value = true;
};

const exitEditMode = () => {
  isNewSprintMode.value = false;
  newSprint.value = { name: '', start_date: '', end_date: '' };
};

const createSprint = async () => {
  try {
    const response = await api.addSprint({
      name: newSprint.value.name,
      start_date: newSprint.value.start_date,
      end_date: newSprint.value.end_date,
      projectId: projectId,
    });

    // Add the new sprint to the local list
    sprintsList.value.push(response.data);
    // Reset the newSprint object for the next use
    newSprint.value = { name: '', start_date: '', end_date: '' };
  } catch (error) {
    console.error('Failed to create a new sprint:', error);
  } finally {
    exitEditMode();
  }
};

const goToSprint = (sprintId) => {
  router.push({ name: 'sprint', params: { sprintId: sprintId } });
};

const formatSprintDate = (date) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};
</script>

<template>
  <div class="sprints-container">
    <h2 class="header">Sprints</h2>

    <!-- Search Bar -->
    <div class="head">
      <input v-model="searchQuery" type="text" placeholder="Search sprints..." class="search-bar" />
      <b-button variant="outline-success" class="btn" @click="enterEditMode">New Sprint</b-button>
    </div>

    <!-- Sprint List -->
    <ul class="sprint-list" v-if="filteredSprints.length > 0">
      <li v-for="sprint in filteredSprints" :key="sprint.id" class="sprint-item" @click="goToSprint(sprint._id)">
        <div class="sprint-info">
          <span class="sprint-name">{{ sprint.name }}</span>
          <span class="sprint-date">{{ formatSprintDate(sprint.start_date) }} - {{ formatSprintDate(sprint.end_date) }}</span>
        </div>
      </li>
    </ul>

    <!-- Display a message if no sprints are found -->
    <div v-if="filteredSprints.length === 0 && !isNewSprintMode" class="no-sprints-message">No sprints found.</div>

    <!-- Editable Sprint Info for Creating New Sprint -->
    <div v-if="isNewSprintMode" class="new-sprint-section">
      <div class="sprint-info">
        <input v-model="newSprint.name" placeholder="Sprint Name" />
        <input v-model="newSprint.start_date" type="date" placeholder="Start Date" />
        <input v-model="newSprint.end_date" type="date" placeholder="End Date" />
      </div>
      <div class="button-container">
        <b-button variant="success" class="btn" @click="createSprint">Create Sprint</b-button>
        <b-button variant="outline-secondary" class="btn" @click="exitEditMode">Cancel</b-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sprints-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  font-size: 24px;
  margin-bottom: 15px;
}

.head {
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 15px;
}

.btn {
  width: 30%;
  margin-left: 1rem;
  padding: 0;
  font-size: 16px;
}

.search-bar {
  width: 100%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  color: var(--text-light);
}

.sprint-list {
  list-style: none;
  padding: 0;
  transition: 2ms;
}

.sprint-item {
  background-color: var(--background-light);
  border: 1px solid var(--border-light);
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  transition: background-color 0.4s ease, transform 0.4s ease;
  cursor: pointer;
}

.sprint-item:hover {
  background-color: #e0e0e0;
  transform: scale(1.02);
}

.sprint-info {
  display: flex;
  flex-direction: column;
}

.sprint-name {
  font-size: var(--font-size-max);
  font-weight: bold;
}

.sprint-date {
  font-size: var(--font-size-min);
  color: var(--text-light);
}

.no-sprints-message {
  margin-top: var(--font-size-min);
  color: var(--text-light);
}

.new-sprint-section {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: var(--font-size-min);
  background-color: #f9f9f9;
}

.new-sprint-section .sprint-info {
  margin-bottom: 10px;
}

.new-sprint-section input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.new-sprint-section .button-container {
  text-align: right;
}

.new-sprint-section .btn {
  margin-left: 10px;
}
</style>