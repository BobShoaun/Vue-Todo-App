<template>
  <div id="app">
    <div id="nav" class="px-8 py-5 ">
      <router-link to="/">home</router-link> |
      <router-link to="/about">about</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @apply text-left;
  @apply text-white;
}

#nav a {
  @apply font-bold;
  @apply text-gray-700;
}

#nav a.router-link-exact-active {
  @apply text-green-500;
}
</style>
