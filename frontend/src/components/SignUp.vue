
<script setup>
import { api } from '../../http-api';
import { reactive } from 'vue';

const emit = defineEmits(['closeIt', 'bienConnecte'])

const data = reactive({
  username: '',
  email: '',
  password: '',
  options: ['manager', 'team member'],
  selectedOption: '',
});

const register = () => {
  const userData = {
    username: data.username,
    email: data.email,
    password: data.password,
    role: data.selectedOption,
  };

  api.addUSer(userData)
    .then((data) => {
      // userList.value = data.data ;
      // console.log(data);
      emit("closeIt");
      emit('bienConnecte');
    })
    .catch((e) => {
      console.log(e.message);
    });
};
const closeModal = () => {
  emit('closeIt');
}
</script>

<template>
  <div class="signin-container">
    <div class="header">
      <h5>Inscription</h5>
      <button @click="closeModal" class="exit-button">X</button>
    </div>
    <form @submit.prevent="register" class="signin-form">
      <div class="form-group">
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" v-model="username" required />
      </div>

      <div class="form-group">
        <label for="email">Adresse e-mail:</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <div class="form-group">
        <h2>Choisissez une option :</h2>
        <div class="options-container">
          <div v-for="(option, index) in data.options" :key="index" class="option">
            <input type="radio" :id="'option' + index" :value="option" v-model="data.selectedOption" />
            <label :for="'option' + index">{{ option }}</label>
          </div>
        </div>
      </div>

      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<style scoped>
.signin-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  display: grid;
  gap: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.options-container {
  display: flex;
  flex-direction: column;
}

.option {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.option input {
  margin-right: 8px;
}

form button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
}

form button:hover {
  background-color: #45a049;
}
</style>
