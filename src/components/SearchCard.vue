<script setup>
defineProps({
  imgSrc: String,
});
</script>
<template>
  <n-image
    class="m-0 p-0 rounded-lg"
    preview-disabled
    :src="imgSrc"
    fallback-src="https://i.imgur.com/yT9EQzK_d.webp?maxwidth=760&fidelity=grand"
  />
</template>
