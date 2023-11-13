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
import axios from "axios";

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      options: ['Manager', "Membre d'equipe"],
      selectedOption: ''
    };
  },
  methods: {
    async postData(url, data) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('La requête a échoué');
        }

        const responseData = await response.json();
        console.log('Réponse du serveur:', responseData);
        return responseData;
      } catch (error) {
        console.error('Erreur lors de la requête:', error.message);
        throw error;
      }
    },
    register() {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.selectedOption
      };

      let url="@/api/users";
      this.postData(url, userData);

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
