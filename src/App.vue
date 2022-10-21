<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">TodoList</a>
        <form class="d-flex">
          <div class="p-2">
            <router-link to="/">Home</router-link>
          </div>
          <div class="p-2">
            <router-link to="/about">About</router-link>
          </div>
          <div class="p-2">
            <router-link to="/activity">Activity</router-link>
          </div>
        </form>
      </div>
    </nav>
  </div>
  <router-view title="ssudo"/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
