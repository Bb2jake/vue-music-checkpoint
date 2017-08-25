<template>
	<div class="app">
		<nav class="navbar navbar-default navbar-fixed-top">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-header-collapse">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a @click="" class="navbar-brand action">
						<p>Sportify</p>
					</a>
				</div>

				<div class="collapse navbar-collapse navbar-right" id="navbar-header-collapse">
					<ul class="nav navbar-nav">
						<li class="active"><a class="action" @click=""><router-link :to="{name: 'Home'}">Home</router-link><span class="sr-only">(current)</span></a></li>
						<li><a class="action"><router-link :to="{name: 'MyTunes.Playlists'}">MyTunes</router-link></a></li>
						<li v-if="!loggedIn"><a class="action" @click="toggleLoginBox">Login/Register</a></li>
						<li v-if="loggedIn"><a class="action">{{username}}</a></li>
						<li v-if="loggedIn"><a class="action" @click="logout">Logout</a></li>
					</ul>
				</div>
			</div>
		</nav>

		<router-view class="router-view"></router-view>
		<Login v-if="showLogin && !loggedIn"></Login>
	</div>
</template>

<script>
	import Login from './components/Login'
	export default {
		name: 'app',
		components: {
			Login
		},
		data() {
			return {
				showLogin: false
			}
		},
		mounted() {
			this.$store.dispatch('checkForSession')
		},
		methods: {
			toggleLoginBox() {
				this.showLogin = !this.showLogin;
			},
			logout() {
				this.$store.dispatch('logout')
			}
		},
		computed: {
			loggedIn() {
				return this.$store.state.loggedIn;
			},
			username() {
				return this.$store.state.username;
			}
		}
	}

</script>

<style>
	/* .my-tunes {
		display: inline-block;
		min-height: 500px;
		min-width: 50%;
		background: green;
	}

	.itunes {
		display: inline-block;
		background: red;
		min-height: 500px;
		min-width: 45%;
	} */

	.panel {
		margin: 0 0 20px 0;
	}

	.action {
		cursor: pointer;
	}

	.muted {
		opacity: 0.8;
	}

	.muted:hover {
		opacity: 1;
	}
</style>

<style scoped>
	.app {
		background: url(./assets/music-background.jpg);
		background-size: 100vw auto;
		min-height: 100vh;
	}
	.router-view {
		margin-top: 50px;
	}
</style>