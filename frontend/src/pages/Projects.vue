<script setup>
import ProjectCard from '../components/ProjectCard.vue';
import userProject from '../data/projects.js'; 
import { ref} from 'vue';


const userProjects = ref(userProject);


console.log(userProjects);

</script>

<template>
  <div>
    <h2>Your Projects</h2>
    <!-- <div v-if="userProjects.value.length === 0">No projects found.</div> -->
    <!-- <div v-else> -->
      <div v-for="project in userProjects" :key="project._id">
        <project-card :id="project._id" :name="project.name" :description="project.description" :projectId="project.owner" :etat="project.etat" />
      </div>
    <!-- </div> -->
  </div>
</template>

<style>

</style>

