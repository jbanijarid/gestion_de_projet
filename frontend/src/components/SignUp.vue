
<script setup>
import { api } from '../../http-api';
import { reactive, defineEmits } from 'vue';
import { useUserStore } from "../stores/userConection";
import MyModal from './MyModal.vue';
const store = useUserStore();

const emit = defineEmits(['closeIt',"openSignin"]);

const data = reactive({
  username: '',
  email: '',
  password: '',
  options: ['manager', 'team member'],
  selectedOption: 'manager',
});

const register = async () => {
  const userData = {
    username: data.username,
    email: data.email,
    password: data.password,
    role: data.selectedOption,
  };
  try {
    const response = await api.addUSer(userData);
    closeModal();
    // setUserData(response.data)
    // connect();
    closeSignupAndOpenSginin();
  } catch (error) {
    console.log(error.message);
  }
};
const closeModal = () => {
  emit('closeIt');
}

const closeSignupAndOpenSginin = () => {
  closeModal();
  emit("openSignin");
}

</script>
<!-- SignUp.vue -->
<template>
  <my-modal title="Sign Up" @close-it="closeModal">
    <div class="signin-container">
      <form @submit.prevent="register" class="signin-form">
        <div class="form-group">
          <label for="username">Nom d'utilisateur:</label>
          <input type="text" id="username" v-model="data.username" required />
        </div>
        <div class="form-group">
          <label for="email">Adresse e-mail:</label>
          <input type="email" id="email" v-model="data.email" required />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" v-model="data.password" required />
        </div>

        <!-- <div class="form-group">
          <h2>Choisissez une option :</h2>
          <div class="options-container">
            <div v-for="(option, index) in data.options" :key="index" class="option">
              <input type="radio" :id="'option' + index" :value="option" v-model="data.selectedOption" />
              <label :for="'option' + index">{{ option }}</label>
            </div>
          </div>
        </div> -->
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </my-modal>
</template>


<style scoped>
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
  padding: 2px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.options-container {
  width: 60%;
  margin-left: 0;
  display: flex;
  flex-direction: column;
}

.option {
  margin-left: 0;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.option input {
  margin-right: 0;
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
