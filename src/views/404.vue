<template>
  <n-result
    status="404"
    title="404 Not Found"
    description="The page you are looking for doesn't exist."
  >
    <template #footer>
      <n-button @click="router.push('/')">
        Go back to Home
        <template #icon>
          <Icon>
            <ArrowCircleRight />
          </Icon>
        </template>
      </n-button>
    </template>
  </n-result>
</template>
<script setup>
import { Icon } from "@vicons/utils";
import { ArrowCircleRight } from "@vicons/fa";
import router from "../router";
</script>
