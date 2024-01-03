
<script setup>
import { ref, onMounted ,toRefs} from 'vue';
import { useUserStore } from "./stores/userConection";
const store = useUserStore();
const { isConnected } = toRefs(store);
const {userInfo} = toRefs(store);

</script>

<template>
  <div class="container">
    <div class="sidenav">
      <div class="userName">{{ isConnected ?  "&#128125; "+ userInfo.username : "" }}</div>
      <router-link class="link" to="/"> &#127968; home</router-link>
      <router-link v-if="isConnected" class="link" to="/projects"> &#128203; Projects</router-link>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.container {
  /* display: flex; */
  height: 100%;
}

.sidenav {
  width: 12vW;
  height: 100%;
  background-color: var(--background-light);
  /* color: rgba(25, 23, 17, 0.6); */
  color: inherit;
  border-right: 1px solid var(--border-light);
  padding-top: 12em;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  box-shadow: 5px 0 5px rgba(0, 0, 0, 0.1);
  /* Add a subtle shadow to the right side */
}

.sidenav .active {
  color: var(--text-primary);
}

.link,
.userName {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: var(--font-size-max) ;
  color: var(--text-light) ;
  display: block;
}
.link {
  font-weight: bold;
}

.link:hover {
  color: var(--text-primary);
}

.main {
  margin-left: 3vw;
  /* Adjusted to match the sidebar width */
  font-size: 28px;
  padding: 0px 10px;
  width: auto;
  height: 100%;
}

/* Media query for smaller screens */
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }

  .sidenav .link {
    font-size: 18px;
  }
}
</style>

