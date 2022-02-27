<template>
  <main>
    <div class="text-center">
      <h2>404 Not Found</h2>

      <router-link :to="{ name: 'Home' }" class="btn btn-sm btn-primary">Home</router-link>
      <span>&ensp;</span>
      <a href="javascript:void();" class="btn btn-sm btn-outline-primary" @click="$router.back()">Go Back</a>
    </div>
  </main>
</template>

<script>
export default {
}
</script>
