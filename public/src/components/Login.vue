<template>
	<div class="login">
		<div id="login-parent" class="panel panel-default">
			<h3>Login</h3>
			<form id="login-form" @submit.prevent="login">
				<input type="text" maxlength="16" placeholder="username" v-model="loginInfo.username" required>
				<input type="password" maxlength="16" placeholder="password" v-model="loginInfo.password" required>
				<button class="btn">Login</button>
			</form>
			<h3>Register</h3>
			<form id="register-form" @submit.prevent="register">
				<input type="text" maxlength="16" placeholder="username" v-model="registerInfo.username" required>
				<input type="email" placeholder="email" v-model="registerInfo.email" required>
				<input type="password" maxlength="16" placeholder="password" v-model="registerInfo.password" required>
				<input type="password" maxlength="16" placeholder="re-enter password" v-model="registerInfo.passwordVerif" required>
				<button class="btn">Register</button>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				loginInfo: {
					username: '',
					password: '',
				},
				registerInfo: {
					username: '',
					password: '',
					passwordVerif: '',
					email: ''
				}
			}
		},
		methods: {
			login() {
				// this.loginInfo.username = this.loginInfo.username.trim();
				// this.loginInfo.password = this.loginInfo.password.trim();
				this.trimInputs(this.loginInfo)
				if (this.loginInfo.username) {
					if (this.loginInfo.password.length < 8)
						alert('password must be at least 8 characters')
					else
						this.$store.dispatch('login', this.loginInfo)
				} else {
					alert('must enter user name to login')
				}

				this.clearInputs();
			},
			register() {
				this.trimInputs(this.registerInfo);
				if (this.registerInfo.username && this.registerInfo.email && this.registerInfo.password && this.registerInfo.passwordVerif) {
					if (this.registerInfo.password == this.registerInfo.passwordVerif) {
						this.$store.dispatch('register', this.registerInfo)
					} else {
						alert('passwords must match')
					}
				} else {
					alert('please fill out all fields in the registration form')
				}
				this.clearInputs();
			},
			trimInputs(obj) {
				for (let key in obj) {
					obj[key] = obj[key].trim();
				}
			},
			clearInputs() {
				this.loginInfo.username = '';
				this.loginInfo.password = '';
				this.registerInfo.username = '';
				this.registerInfo.email = '';
				this.registerInfo.password = '';
				this.registerInfo.passwordVerif = '';
			}
		}
	}
</script>

<style scoped>
	.login {
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#login-parent {
		padding: 10px;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	form {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	input {
		margin-bottom: 10px;
	}
</style>