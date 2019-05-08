
<template>

	<main>
		<div class="text-center">
			<h1>404</h1>
			<h3>Nothing Found.</h3>
			<p><router-link to="/">Homepage</router-link> | <a href="javascript:void();" v-on:click.prevent="$router.go(-1)">Go Back</a></p>
		</div>
	</main>

</template>

<script>
	export default {
	};
</script>

