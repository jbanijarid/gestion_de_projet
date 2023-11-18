<script setup>
import ProjectCard from '../components/ProjectCard.vue';
// import userProject from '../data/projects.js'; 
import { onMounted, ref} from 'vue';
import { useUserStore } from '../stores/userConection';
import {api} from '../../http-api';


const store = useUserStore();

const userProjects = ref(null);

onMounted ( 
  async () =>{
    try {
      const reponse = await api.getAllProjectsByUsername(store.getUserName);
      userProjects.value = reponse.data; 
    } catch (error) {
      console.error(error);
    }
  }
) ;

</script>

<template>
  <div>
    <h2>Your Projects</h2>
    <!-- <div v-if="userProjects.value.length === 0">No projects found.</div> -->
    <!-- <div v-else> -->
      <div v-for="project in userProjects" :key="project._id">
        <project-card :id="project._id" :name="project.name" :description="project.description" :owner="project.owner" />
      </div>
    <!-- </div> -->
  </div>
</template>

<style>

</style>

