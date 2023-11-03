<script setup>

</script>

<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <router-link to="/" > Home</router-link>
        </li>
        <li>
          <router-link to="/user">User</router-link>
        </li>
        <li>
          <router-link to="/docs">Docs</router-link>
        </li>
      </ul>
    </nav>

    <div>
      <h1>Conduite de projet</h1>
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  color: #2c3e50;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}
li {
  float: left;
}
li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
.error {
  color: red;
  font-weight: bold;
  list-style-type: none;
  margin-top: 1em;
}
</style>

