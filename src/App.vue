<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <RouterLink to="/">
      <h2>FindMoovy</h2>
    </RouterLink>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
*,
::after,
::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}
body {
  background-color: #000000;
}
header {
  display: flex;
  font-weight: 600;
  background-color: #0a1128;
  height: 4em;
  justify-content: center;
  align-items: center;
}
header h2 {
  color: #da4167;
}
a {
  text-decoration: none;
}
</style>
