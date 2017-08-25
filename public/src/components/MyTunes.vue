<template>
	<div class="my-tunes">
		<!-- <div class="container">
			<div class="row grid">
				<div class="grid-item" v-for="(song, index) in myTunes">
					<Song :song="song" class="col-xs-12 col-sm-6 col-md-4"></Song>
					<div v-if="(index + 1) % 3 == 0" class="clearfix hidden-sm hidden-xs"></div>
					<div v-if="(index + 1) % 2 == 0" class="clearfix visible-sm"></div>
				</div>
			</div>
		</div> -->
		<router-view></router-view>
	</div>
</template>

<script>
	import Song from './Song'
	export default {
		name: "myTunes",
		components: {
			Song
		},
		mounted() {
			this.$store.dispatch('getMyTunes');
		},
		data() {
			return {

			}
		},
		computed: {
			myTunes() {
				return this.$store.state.myTunes;
			}
		}
	}

</script>

<style scoped>
	.row {
		margin-top: 30px;
	}
</style>