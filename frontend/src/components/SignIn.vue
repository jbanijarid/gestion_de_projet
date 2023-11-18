<script setup>
import { api } from '../../http-api';
import { reactive } from 'vue';
import { useUserStore } from "../stores/userConection";
import MyModal from './MyModal.vue';
const store = useUserStore();

const emit = defineEmits(['closeIt']);
const data = reactive({
  username: '',
  password: '',
  errorMessage: ''
});

const login = async () => {
  const userData = {
    username: data.username,
    password: data.password
  };
  try {
    // Logique de connexion
    const response = await api.login(userData);
    // userList.value = data.data ;
    console.log(response);

    // Reset error message on successful login
    data.errorMessage = '';
    closeModal();
    connect();
    setUserData(response.data);
  } catch (error) {
    console.error(error.message);
    data.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
  }
  console.log('Connexion avec', data.username, data.password);
};

const closeModal = () => {
  emit('closeIt');

}
const closeSigninAndOpenSginup = () => {
  closeModal();
  emit("openSignup");
}

const connect = () => {
  store.connecte();
};

const setUserData = (data) => {
  store.setUser(data);
}

// const disconnect = () => {
//   store.deConnecte();
// };

</script>

<template>
  <my-modal title="Sign In" @close-it="closeModal">
    <div class="signin-container">
      <form @submit.prevent="login" class="signin-form">
        <div class="form-group">
          <label for="username">Nom d'utilisateur:</label>
          <input type="text" id="username" v-model="data.username" required />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" v-model="data.password" required />
        </div>

        <b-button type="submit">Se connecter</b-button>

        <h5 class="creatCompte" @click="closeSigninAndOpenSginup"> Vous n'avez pas un compte ? </h5>
        <p v-if="data.errorMessage" class="error-message">{{ data.errorMessage }}</p>
      </form>
    </div>
  </my-modal>
</template>

<style scoped>


.signin-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  align-self: flex-start;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
}



.error-message {
  color: red;
  margin-top: 10px;
}

.creatCompte {
  color: rgb(9, 68, 68);
  cursor: pointer;
}

.creatCompte:hover {
  color: rgba(9, 68, 68, 0.455);
}
</style>
