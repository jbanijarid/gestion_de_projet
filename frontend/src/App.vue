
<script setup>
import { ref, onMounted ,toRefs} from 'vue';
import { useUserStore } from "./stores/userConection";
const store = useUserStore();
const { isConnected } = toRefs(store);
const {userInfo} = toRefs(store);

const sidebarVisible = ref(true); // Default to showing the sidebar

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value; // Toggle the visibility
};
</script>

<template>
  <div class="container">
    <button v-if="isConnected" class="toggle-btn" @click="toggleSidebar">
  &#9776;
</button>
    <div v-if="isConnected && sidebarVisible" class="sidenav">
      <div class="userName">{{ isConnected ?  "&#128125; "+ userInfo.username : "" }}</div>
      <router-link class="link" to="/"> &#127968; home</router-link>
      <router-link v-if="isConnected" class="link" to="/projects"> &#128203; Projects</router-link>
    </div>
    <div class="main" :style="{ 'marginLeft': sidebarVisible ? '12vW' : '0' }">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.container {
  /* display: flex; */
  height: 100%;
}

.toggle-btn {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 2;
  cursor: pointer;
  background-color: transparent;
  color: #111;
  padding: 10px 15px;
  font-size: 1.5rem;
  border: none;
}

.sidenav {
  width: 12vW;
  height: 100%;
  background-color: var(--background-light);
  color: inherit;
  border-right: 1px solid var(--border-light);
  padding-top: 12em;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  box-shadow: 5px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}


.sidenav-closed {
  transform: translateX(-100%);
}

.sidenav-hidden {
  width: 0;
  padding-top: 0;
  overflow-x: hidden;
  box-shadow: none;
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
  transition: margin-left 0.3s ease;
  width: calc(100% - 12vW);
  height: 100%;
}

.main-full {
  width: 100%;
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

