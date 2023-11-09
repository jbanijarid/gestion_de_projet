<script setup>

import {api} from '../../http-api';
import { ref} from 'vue';

const userList = ref([]);
const projectList = ref([]);
const taskList = ref([]);
const project = ref({});

api.getAllUsers()
  .then((data) => {
    // userList.value = data.data ;
    userList.value = data.data.map(user =>user._id) ;
    console.log(data.data);
  })
  .catch(e => {
    console.log(e.message);
});

api.getAllProjects()
  .then((data) => {
    projectList.value = data.data.map(user =>user._id) ;
    console.log(data.data);
  })
  .catch(e => {
    console.log(e.message);
});
//changer l'id :)
api.getAllTasksByProjectId("65441a05310be57018fc5922")
.then((data) => {
    taskList.value = data.data.map(task =>task.name) ;
    console.log(data.data);
  })
  .catch(e => {
    console.log(e.message);
});

api.getProjectById("65441a05310be57018fc5922")
.then((data) => {
    project.value = data.data;
    console.log(data.data);
  })
  .catch(e => {
    console.log(e.message);
});


</script>

<template>
  Hello user!!! <br>
  <p> Users : {{ userList }}</p>
  <p> Projects : {{ projectList }}</p>
  <p> Project By ID : {{ project }}</p>
  <p> Tasks : {{ taskList }}</p>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>