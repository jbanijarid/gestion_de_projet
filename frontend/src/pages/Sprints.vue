<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../../http-api';
import Sprint from '../components/Sprint.vue';

const sprintsList = ref([]);

const props = defineProps(['idProject']);

onMounted(async () => {
  await fetchSprints();
});

const fetchSprints = async () => {
  try {
    console.log(props.idProject);
    const resp = await api.getAllSprintsByProject(props.idProject);
    sprintsList.value = resp.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des sprints:', error);
  }
};


</script>

<template>
    <div class="sprints" v-for="sprint in sprintsList">
    <Sprint 
        :id="sprint.id"
        :name="sprint.name" 
        :project-id="sprint.projectId" 
        :start_date="sprint.start_date" 
        :end_date="sprint.end_date" 
        :tasks="sprint.tasks"
    />
    </div>
</template>

<style>
</style>