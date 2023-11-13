<!-- Home.vue -->
<script setup>
import { ref } from 'vue';
import SignIn from '../components/SignIn.vue';
import SignUpVue from '../components/SignUp.vue';                 
const userInfo = ref(null);

const open = ref({
  signin: false,
  signup: false,
});

const ablebtn = ref(true);

const openModal = (type) => {
  open.value[type] = true;
  ablebtn.value = false;
}

const closeModal = (type) => {
  open.value[type] = false;
  ablebtn.value = true;
}

</script>

<template>
  <div>
    <b-row>
      <b-col>
        <h1>Home Page </h1>
      </b-col>
      <b-col>
        <b-button-group>
          <b-button variant="outline-secondary" @click="openModal('signin')" :disabled="!ablebtn">Sign In</b-button>
          <b-button variant="outline-secondary" @click="openModal('signup')" :disabled="!ablebtn">Sign Up</b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <h6>Welcome to our Project Manager</h6>
    <div class="signin" v-if="open.signin">
      <SignIn @close-it="closeModal('signin')"/>
    </div>
    <div class="signup" v-if="open.signup">
      <SignUpVue @close-it="closeModal('signup')"/>
    </div>
  </div>
</template>
  

  
<style>
/* Add your styles here */
</style>
  