<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <RouterLink :to="{ name: 'Home' }" class="navbar-brand">Vales Toolbox</RouterLink>
        <span class="navbar-text">
          <a href="https://github.com/valesdev/vales-toolbox" rel="external nofollow" target="_blank">
            <i class="bi bi-github" role="img" aria-label="GitHub" />
          </a>
        </span>
      </div>
    </nav>

    <div class="container mt-4">
      <router-view :key="$route.path" />
    </div>

    <div class="container mt-4">
      <p class="text-muted">
        <small>
          Made with &hearts; by <a href="https://valesdigital.com/" rel="external" target="_blank">Vales Digital</a> in China &middot; <a href="https://github.com/valesdev/vales-toolbox" rel="external nofollow" target="_blank">{{ appName }} v{{ appVersion }}</a> &middot; <a href="https://beian.miit.gov.cn/" rel="external nofollow" target="_blank">粤ICP备15083658号-1</a>
        </small>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const appName = computed(() => import.meta.env.VITE_APP_NAME)
const appVersion = computed(() => import.meta.env.VITE_APP_VERSION)
</script>

<style lang="scss">
body {
  font-feature-settings: 'liga', 'clig', 'ccmp';
}

a {
  color: inherit;
  text-decoration: underline;
}
</style>
