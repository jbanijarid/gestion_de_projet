<script setup>
import { ref, onMounted } from 'vue';
import emitter from '../eventBus';

const userInfo = ref(null);
onMounted(() => {
  emitter.on('set-user-info', (user) => {
    userInfo.value = user;
  });
});
</script>

<template>
    Project 
<!-- //TODO : display all the project that has userInfo.userName as an owner or teamMembers -->
</template>

<style>
</style>