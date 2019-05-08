<template>
  <main>

    <div class="text-center">

      <h3>404 Not Found</h3>

      <p>
        <router-link to="/">Homepage</router-link>
        <span>&ensp;&middot;&ensp;</span>
        <a href="javascript:void();" @click="$router.back()">Go Back</a>
      </p>

    </div>

  </main>
</template>

<script>
export default {
  metaInfo: {
    title: 'Not Found'
  }
}
</script>
