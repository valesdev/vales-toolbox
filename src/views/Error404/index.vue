<template>
  <main>
    <div class="text-center">
      <h2>404 Not Found</h2>

      <RouterLink :to="{ name: 'Home' }" class="btn btn-sm btn-primary">首页</RouterLink>
      <span>&ensp;</span>
      <a href="javascript:void();" class="btn btn-sm btn-outline-primary" @click="$router.back()">返回</a>
    </div>
  </main>
</template>

<script lang="ts" setup>
</script>
