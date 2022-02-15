<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <RouterLink to="/">
      <h1>FindMoovy</h1>
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
h1 {
  color: #da4167;
}
a {
  text-decoration: none;
}
</style>
