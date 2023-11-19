<script setup>
import { onMounted, ref,computed } from 'vue';
import { useUserStore } from '../stores/userConection';
import { api } from '../../http-api';

const store = useUserStore();
const userId = store.getUseeId ; 
const userProjectsList = ref([]);
const searchQuery = ref('');

onMounted(async () => {
  try {
    const response = await api.getAllProjectsByUserId(userId);
    userProjectsList.value = response.data;
  } catch (error) {
    console.log("Error: " + error);
  }
});

const filteredProjects = computed(() => {
  if(searchQuery.value === '') 
    return userProjectsList.value;
  return userProjectsList.value.filter(project =>
    project.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

</script>
<template>
  <div class="project-container">
    <h2 class="header">Your Projects</h2>

    <!-- Search Bar -->
    <input v-model="searchQuery" type="text" placeholder="Search projects..." class="search-bar" />

    <!-- Project List -->
    <ul class="project-list" v-if="filteredProjects.length > 0">
      <li v-for="project in filteredProjects" :key="project._id" class="project-item">
        <div class="project-info">
          <span class="project-name">{{ project.name }}</span>
          <span class="owner-info">
            {{ project.owner === userId ? 'Owner' : 'Team Member' }}
          </span>
        </div>
      </li>
    </ul>

    <!-- Display a message if no projects are found -->
    <div v-if="filteredProjects.length === 0" class="no-projects-message">No projects found.</div>
  </div>
</template>

<style scoped>
.project-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  font-size: 24px;
  margin-bottom: 15px;
}

.search-bar {
  width: 100%;
  height: 2rem;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  color: var(--text-light);
}

.project-list {
  list-style: none;
  padding: 0;
  transition: 2ms;
}

.project-item {
  background-color: var(--background-light);
  border: 1px solid var(--border-light);
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  transition: background-color 0.4s ease,transform 0.4s ease;
  cursor: pointer;
}

.project-item:hover {
  background-color: #e0e0e0;
  transform: scale(1.02); /* Optional: Add a slight scale effect on hover */}
.project-info {
  display: flex;
  flex-direction: column;
}

.project-name {
  font-size: var(--font-size-max);
  font-weight: bold;
}

.owner-info {
  font-size: var(--font-size-min);
  color: var(--text-light);
}

.no-projects-message {
  margin-top: var(--font-size-min);
  color: var(--text-light);
}
</style>

