<script setup>
defineProps({
  imgSrc: String,
});
</script>
<template>
  <n-image class="m-0 p-0" :src="imgSrc" fallback-src="../assets/imageNotFound.png" />
</template>
