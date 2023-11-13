<template>
  <div class="container">
    <div class="sidenav">
      <router-link class="link" to="/">home</router-link>
      <router-link class="link" to="/test">test</router-link>
      <router-link class="link" to="/sprints">sprints</router-link>
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
  background-color: #c3c1c1;
  border-right: 1px solid #a9a8a8;
  padding-top: 12em;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  box-shadow: 5px 0 5px rgba(0, 0, 0, 0.1); /* Add a subtle shadow to the right side */
}

.link {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #000000;
  display: block;
}

.link:hover {
  color: #f1f1f1;
}

.main {
  margin-left: 12vw; /* Adjusted to match the sidebar width */
  font-size: 28px;
  padding: 0px 10px;
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

