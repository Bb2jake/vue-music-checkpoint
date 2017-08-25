<template>
	<div class="home">
		<!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
		<!-- <my-tunes></my-tunes> -->
		
		<Search></Search>
	</div>
</template>

<script>
	import Search from './Search'
	export default {
		name: 'home',
		components: {
			Search
		},
		data() {
			return {

			}
		}
	}
</script>

<style scoped>
	
</style>