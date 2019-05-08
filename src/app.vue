<template>
  <div id="app">

    <nav class="navbar navbar-light bg-light">
      <router-link to="/" class="navbar-brand">Vales Tools</router-link>
    </nav>

    <div class="container mt-4">
      <transition name="fade">
        <router-view :key="$route.path" />
      </transition>
    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
#app {
  .disabled,
  [disabled] {
    opacity: .65;
    filter: alpha(opacity=65);
    cursor: not-allowed;
    pointer-events: none;
  }
  // vue transition
  .fade-enter-active, .fade-leave-active {
    transition: opacity .6s ease;
  }
  .fade-enter {
    opacity: 0;
  }
  .fade-leave-active {
    display: none;
  }
}
</style>
