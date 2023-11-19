<!-- Home.vue -->
<script setup>
import { ref } from 'vue';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import { useUserStore } from "../stores/userConection";

const store = useUserStore();

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

const signout = ()=>{
  store.deConnecte();
  store.setUser(null);
}
</script>

<template>
  <div>
    <b-row>
      <b-col>
        <h1>Home Page </h1>
      </b-col>
      <b-col>
        <dev class="inup" v-if="!store.isConnected">
          <b-button-group>
            <b-button variant="outline-secondary" @click="openModal('signin')" :disabled="!ablebtn">Sign In</b-button>
            <b-button variant="outline-secondary" @click="openModal('signup')" :disabled="!ablebtn">Sign Up</b-button>
          </b-button-group>
        </dev>
        <div class="signout" v-else>
          <b-button variant="outline-secondary" @click="signout">Sign Out</b-button>
        </div>
        </b-col>
    </b-row>
    <h6>Welcome to our Project Manager</h6>
    <div class="signin" v-if="open.signin">
      <SignIn @close-it="closeModal('signin')" @open-signup="openModal('signup')"/>
    </div>
    <div class="signup" v-if="open.signup">
      <SignUp @close-it="closeModal('signup')" @open-signin="openModal('signin')"/>
    </div>
  </div>
</template>
  

  
<style>
/* Add your styles here */
</style>
  