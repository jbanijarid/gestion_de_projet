<template>
  <div class="signin-container">
    <h2>Page de connexion</h2>
    <form @submit.prevent="login" class="signin-form">
      <div class="form-group">
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" v-model="username" required />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit">Se connecter</button>

      <router-link to="/signup">Vous n'avez pas un compte ?</router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Logique de connexion
      console.log('Connexion avec', this.username, this.password);
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
  text-align: center;
}

.signin-form {
  display: flex;
  flex-direction: column; /* Aligner les éléments en colonne */
  gap: 10px;
}

.form-group {
  display: flex;
  flex-direction: column; /* Aligner les éléments en colonne */
}

.form-group label {
  align-self: flex-start; /* Aligner les labels à gauche */
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
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
