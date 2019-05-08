
<template>

	<div>
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<router-link to="/" class="navbar-brand">
						{{ ($route.meta.title ? $route.meta.title : 'Vales Online Tools') }}
					</router-link>
				</div>
			</div>
		</nav>
		<div class="container-fluid">
			<transition name="fade">
				<router-view v-bind:key="$route.path"></router-view>
			</transition>
		</div>
	</div>

</template>

<script>
	export default {
	}
</script>

