<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { Sun, Moon, Bookmark, Github, ExternalLinkAlt } from "@vicons/fa";
import { Icon } from "@vicons/utils";
import { darkTheme } from "naive-ui";

const darkMode = ref(true);

const railStyle = ({ focused, checked }) => {
  const style = {};
  if (checked) {
    style.background = "#d03050";
    if (focused) {
      style.boxShadow = "0 0 0 2px #da4163";
    }
  } else {
    style.background = "#2080f0";
    if (focused) {
      style.boxShadow = "0 0 0 2px #2080f040";
    }
  }
  return style;
};
</script>

<template>
  <div :class="darkMode ? 'dark' : ''">
    <n-config-provider :theme="darkMode ? darkTheme : ''">
      <n-space vertical class="bg-white dark:bg-background">
        <n-space class="h-16 bg-navbar" justify="space-between" align="center">
          <RouterLink to="/">
            <div class="text-title ml-4 text-xl font-bold">🎬 FindMoovy</div>
          </RouterLink>
          <n-space justify="space-around" align="center">
            <n-switch v-model:value="darkMode" size="large" :rail-style="railStyle">
              <template #checked-icon>
                <Icon color="#808080">
                  <Moon />
                </Icon>
              </template>
              <template #unchecked-icon>
                <Icon color="#da4163">
                  <Sun />
                </Icon>
              </template>
            </n-switch>
            <RouterLink to="/watchlist">
              <n-button aria-label="Bookmark" secondary type="error">
                <Icon>
                  <Bookmark />
                </Icon>
              </n-button>
            </RouterLink>
            <a
              href="https://github.com/amkhrjee/findmoovy"
              alt="Link to github repo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <n-button aria-label="Link to Github Repo" class secondary type="info">
                <Icon size="1.2rem" color="white">
                  <Github />
                </Icon>
              </n-button>
            </a>
          </n-space>
        </n-space>

        <n-space
          vertical
          justify="space-between"
          align="center"
          class="h-screen dark:bg-background"
        >
          <n-space class="dark:bg-background">
            <n-message-provider>
              <RouterView />
            </n-message-provider>
          </n-space>
          <n-space justify="center" class="w-screen text-center dark:bg-background">
            <n-p depth="3" class="dark:bg-background">
              Made with
              <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">
                <n-text type="success">
                  Vue3
                  <Icon size="0.6rem">
                    <ExternalLinkAlt />
                  </Icon>
                </n-text>
              </a>

              <n-text class="ml-1" depth="3">& 🍵 by</n-text>
              <a
                href="https://www.twitter.com/amkhrjee"
                target="_blank"
                rel="noopener noreferrer"
              >
                <n-text depth="3" type="info">
                  amkrjee
                  <Icon size="0.6rem">
                    <ExternalLinkAlt />
                  </Icon>
                </n-text>
              </a>
            </n-p>
          </n-space>
        </n-space>
      </n-space>
    </n-config-provider>
  </div>
</template>

<style>
*,
::after,
::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Rubik", sans-serif;
  -webkit-tap-highlight-color: transparent;
}
</style>
