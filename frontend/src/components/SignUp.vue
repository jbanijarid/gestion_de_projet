<!-- signin.vue -->

<template>
  <div class="signin-container">
    <h2>Page d'inscription</h2>
    <form @submit.prevent="register" class="signin-form">
      <label for="username">Nom d'utilisateur:</label>
      <input type="text" id="username" v-model="username" required />

      <label for="email">Adresse e-mail:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Mot de passe:</label>
      <input type="password" id="password" v-model="password" required />

      <div class="container">
        <h2>Choisissez une option :</h2>
        <div>
          <div v-for="(option, index) in options" :key="index" class="row">
            <input
              type="radio"
              :id="'option' + index"
              :value="option"
              v-model="selectedOption"
            />
            <label :for="'option' + index">{{ option }}</label>
          </div>
        </div>
      </div>

      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import {api} from '../../http-api';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      options: ['manager', "team member"],
      selectedOption: ''
    };
  },
  methods: {
    
    register() {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.selectedOption
      };

      api.addUSer(userData)
        .then((data) => {
      // userList.value = data.data ;
      console.log(data);
    })
    .catch(e => {
      console.log(e.message);
  });

    }
  }
};
</script>

<style scoped>
.signin-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.signin-form {
  display: grid;
  gap: 10px;
}

.signin-form label {
  font-weight: bold;
}

.signin-form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.signin-form button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.signin-form button:hover {
  background-color: #45a049;
}
</style>
