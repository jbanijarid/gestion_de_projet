<script setup>
import { onMounted, ref, computed } from 'vue';
import { useUserStore } from '../stores/userConection';
import { api } from '../../http-api';
import router from '../router';
const store = useUserStore();
const userId = store.getUseeId;
const userProjectsList = ref([]);
const searchQuery = ref('');
const isNewProjectMode = ref(false);
const newProject = ref({
  name: '',
  description: '',
});

onMounted(async () => {
  try {
    const response = await api.getAllProjectsByUserId(userId);
    userProjectsList.value = response.data;
    store.setOwner(false);
  } catch (error) {
    console.log("Error: " + error);
  }
});

const filteredProjects = computed(() => {
  if (searchQuery.value === '')
    return userProjectsList.value;
  return userProjectsList.value.filter(project =>
    project.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const enterEditMode = () => {
  isNewProjectMode.value = true;
};
const exitEditMode = async () => {
  isNewProjectMode.value = false;
  newProject.value.name = '';
  newProject.value.description ='';
}

const creatProject = async () => {

  // Create a new project using the provided API endpoint
  try {
    const response = await api.addProject({
      name: newProject.value.name,
      description: newProject.value.description,
      owner: userId,
      teamMembers: [],
    });

    // Add the new project to the local list
    userProjectsList.value.push(response.data);
    // Reset the newProject object for the next use
    newProject.value = { name: '', description: '' };
  } catch (error) {
    console.error('Failed to create a new project:', error);
  }finally {
    exitEditMode();
  }
};
const goToProject = (id)=>{
  // console.log(id);
  router.push ({name: 'project', params: {projectId: id}});
}



</script>

<template>
  <div class="project-container">
    <h2 class="header">Your Projects</h2>

    <!-- Search Bar -->
    <div class="head">
      <input v-model="searchQuery" type="text" placeholder="Search projects..." class="search-bar" />
      <b-button variant="outline-success" class="btn" @click="enterEditMode"> new project </b-button>
    </div>
  <ul class="project-list" v-if="filteredProjects.length > 0">
    <li v-for="project in filteredProjects" :key="project._id" class="project-item" @click="goToProject(project._id)">
        <div class="project-info" >
          <span class="project-name">{{ project.name }}</span>
          <span class="owner-info">
            {{ project.owner === userId ? 'Owner' : 'Team Member' }}
          </span>
        </div>
    </li>
  </ul>
  </div>

    <!-- Display a message if no projects are found -->
    <div v-if="filteredProjects.length === 0 && !isNewProjectMode" class="no-projects-message">No projects found.</div>
    <!-- Editable Project Info for Creating New Project -->
    <div v-if="isNewProjectMode" class="new-project-section">
      <div class="project-info">
        <input v-model="newProject.name" placeholder="Project Name" />
        <textarea v-model="newProject.description" placeholder="Project Description"></textarea>
      </div>
      <div class="button-container">
        <b-button variant="success" class="btn" @click="creatProject">Create Project</b-button>
        <b-button variant="outline-secondary" class="btn" @click="exitEditMode()">Cancel</b-button>
      </div>
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
  transition: background-color 0.4s ease, transform 0.4s ease;
  cursor: pointer;
}

.project-item:hover {
  background-color: #e0e0e0;
  transform: scale(1.02);
  /* Optional: Add a slight scale effect on hover */
}

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

.new-project-section {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: var(--font-size-min);
  background-color: #f9f9f9;
}

.new-project-section .project-info {
  margin-bottom: 10px;
}

.new-project-section input,
.new-project-section textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.new-project-section .button-container {
  text-align: right;
}


.new-project-section .button-container {
  text-align: right;
}

.new-project-section .btn {
  margin-left: 10px;
}
</style>

