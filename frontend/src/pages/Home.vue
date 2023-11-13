<!-- Home.vue -->
<script setup>
import { ref } from 'vue';
import SignIn from '../components/SignIn.vue';

const isSignInModalOpen = ref(false);
const connected = ref(false); // Added 'connected' variable
const open = ref(false); // Added 'connected' variable
const myClose = ()=>{
  open.value = false ; 
}
const MyOpen = ()=>{
  open.value = true ;
  console.log(open.value);
}

const bienConnecte = ()=>{
  connected.value = true ; 
}
</script>

<template>
  <div id="truc">
    <h1>Home Page</h1>
    <h6>Welcome to our Project Manager</h6>
    <b-button  variant="outline-secondary" @click="MyOpen">Sign In</b-button>
    <div class="signin" v-if="open">
      <SignIn @close-it="myClose" @bien-connecte="bienConnecte" />
    </div>
    <div v-if="connected"> coool </div>
  </div>
</template>
  

  
<style>
/* Add your styles here */
</style>
  