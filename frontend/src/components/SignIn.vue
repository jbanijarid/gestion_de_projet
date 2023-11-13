<script setup>
import { api } from '../../http-api';
import { reactive } from 'vue';

const emit = defineEmits(['closeIt', 'bienConnecte'])
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
    emit('closeIt');
    emit('bienConnecte');
  } catch (error) {
    console.error(error.message);
    data.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
  }
  console.log('Connexion avec', data.username, data.password);
};

const closeModal =()=>{
  emit('closeIt');
}
</script>

<template>
  <div class="signin-container">
    <div class="header">
      <h5>Connexion</h5>
      <button @click="closeModal" class="exit-button">X</button>
    </div>
    <form @submit.prevent="login" class="signin-form">
      <div class="form-group">
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" v-model="data.username" required />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="data.password" required />
      </div>

      <button type="submit">Se connecter</button>

      <router-link to="/signup">Vous n'avez pas un compte ?</router-link>
      <p v-if="data.errorMessage" class="error-message">{{ data.errorMessage }}</p>
    </form>
  </div>
</template>

<style scoped>
.signin-container {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 40%;
  width: 30%;
  margin-left: -150px;
  max-width: 20%;
  /* margin: auto; */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exit-button {
  background: none;
  border: none;
  color: rgb(57, 57, 57);
  font-size: 1em;
  cursor: pointer;
}
.exit-button:hover {
  color: rgb(245, 110, 110);

}
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

form button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

form button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
