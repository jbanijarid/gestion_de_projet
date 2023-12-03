<!-- Home.vue -->
<script setup>
import { ref } from 'vue';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import { useUserStore } from "../stores/userConection";
import Presentation from "../components/Presentation.vue"

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
  <div class="animation-container" @click="startAnimation">
    <b-row>
      <b-col>
        <h1> JTAFN </h1>
      </b-col>
      <b-col>
        <dev class="inup" v-if="!store.isConnected">
          <b-button-group>
            <b-button class="button" variant="outline-secondary" @click="openModal('signin')" :disabled="!ablebtn">Sign In</b-button>
            <b-button class="button" variant="outline-secondary" @click="openModal('signup')" :disabled="!ablebtn">Sign Up</b-button>
          </b-button-group>
        </dev>
        <div class="signout" v-else>
          <b-button class="button" variant="outline-secondary" @click="signout">Sign Out</b-button>
        </div>
        </b-col>
    </b-row>
    <div class="signin" v-if="open.signin">
      <SignIn @close-it="closeModal('signin')" @open-signup="openModal('signup')"/>
    </div>
    <div class="signup" v-if="open.signup">
      <SignUp @close-it="closeModal('signup')" @open-signin="openModal('signin')"/>
    </div>
  </div>
  <Presentation />
</template>
  

  
<style scoped>
h1 {
  font-size: xx-large;
  color: #333; 
}

.button {
  color: black;
}

.animation-container {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  font-family: "Times New Roman", Times, serif;
  user-select: none;
  background: linear-gradient(to right, #ecf0f1, #6f7173, #ecf0f1); /* Fond de couleur dégradé */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
</style>
  