<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../stores/userConection';
import { api } from '../../http-api';


const store = useUserStore();

const userProjectsList = ref(null);

onMounted(
  async () => {
    try {
      const reponse = await api.getAllProjectsByUserId(store.getUseeId);
      userProjectsList.value = reponse.data;
    } catch (error) {
      console.log("error : " + error);
    }
  }
);

</script>

<template>
  <div>
    <h2>Your Projects</h2>
    <!-- <div v-if="userProjectsList.value.length === 0">No projects found.</div> -->
    <!-- <div v-else> -->
      {{userProjectsList}}
    <!-- </div> -->
  </div>
</template>

<style></style>

