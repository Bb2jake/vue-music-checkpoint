<template>
	<div class="home">
		<!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
		<!-- <my-tunes></my-tunes> -->
		
		<search></search>
	</div>
</template>

<script>
	import search from './Search'
	export default {
		name: 'home',
		components: {
			search
		},
		data() {
			return {

			}
		}
	}
</script>

<style scoped>
	.home {
		margin-top: 50px;
	}
</style>