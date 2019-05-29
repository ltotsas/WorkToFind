<template>
  <div id="app" v-show="ready">
	<app-container-component v-if="loggedIn" :user="user">
	</app-container-component>
	<b-container class="bv-example-row bv-example-row-flex-cols">
		<b-row align-v="center" align-h="center">
	<section v-if="!loggedIn" id="home">	
		<div class="webpage">
			<div class="W">
				<div class="W1"></div>
				<div class="W2"></div>
				<div class="W3"></div>
				<div class="W4"></div>
			</div>	
			<h1 class="title" style="color:#5c4b50">W</h1>
				<h1 class="title" style="left:18%">ork</h1>
				<h1 class="title" style="color:#5c4b50; left:38%"> T</h1>
				<h1 class="title" style="left:43%">o</h1>
				<h1 class="title" style="color:#5c4b50; left:51%">F</h1>
				<h1 class="title" style="left:56%">ind</h1>
				<h4 class="subtitle" style="left:11%; top:17%;">Your daily Jobs</h4>
			<div>
				<b-btn v-if="!loggedIn" class="cta-button" v-b-modal.modalsm variant="primary">Login</b-btn>
			</div>
				<b-modal hide-header hide-footer id="modalsm" centered size="sm" title="Login">
				<login-component v-if="!loggedIn"></login-component>  </b-modal>
		</div>
	</section>
	</b-row>
	<notifications />
	</b-container>
  </div>
</template>

<script>
import loginComponent from './components/login'
import appContainerComponent from './components/app-container'
import * as settings from './settings'

export default {
	name: 'app',
	components : {
		loginComponent,
		appContainerComponent
	},
	data () {
		return {
			msg: 'Walecume to Work To Find',
			loggedIn : false,
			ready : false,
			user : null
		}
	},
	mounted() {
		let _this = this
		settings.getFirebase().auth().onAuthStateChanged(function(user) {
			_this.ready = true
			if (user) {
				_this.user = user
				_this.loggedIn = true
			} else {
				console.log("No user")
			}
		});
	},
}
</script>

<style>
	#app {
		position :absolute;
		top :0;
		bottom :0;
		left : 0;
		right :0;
	}
	.webpage {
		position: relative;
		margin: auto;
		display: block;
		margin-top: 35%;
		width: 600px;
		height: 420px;
		background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9)), url("https://images.pexels.com/photos/70232/pexels-photo-70232.jpeg?h=350&auto=compress");
		background-size: cover;
		z-index: 1;
		-webkit-box-shadow: 10px 10px 18px 0px rgba(0, 0, 0, 0.75);
		-moz-box-shadow: 10px 10px 18px 0px rgba(0, 0, 0, 0.75);
		box-shadow: 10px 10px 18px 0px rgba(0, 0, 0, 0.75);
		}

		.title {
		position: absolute;
		top: 5%;
		left: 10%;
		font-family: "Ubuntu";
		font-size: 48px;
		font-weight: 700;
		color: #f0605f;
		text-transform: uppercase;
		}
		.subtitle {
		position: absolute;
		top: 5%;
		left: 10%;
		font-family: "Ubuntu";
		font-size: 25px;
		font-weight: 700;		
		color: #5C4B51;
		text-transform: uppercase;
		}

		.cta-button {
		position: absolute;
		width: 15%;
		height: 10%;
		bottom: 25%;
		left: 10%;
		background: rgb(140, 190, 178);
		border-radius: 0%;
		border: none;
		padding: 10;
		font-family: "Ubuntu";
		font-size: 16px;
		font-weight: 700;
		color: #ffffff;
		text-transform: uppercase;
		}

		.W1 {
			display: inline-block;
			width: 70px;
			height: 300px;
			-webkit-transform: skew(20deg);
			-moz-transform: skew(20deg);
				-o-transform: skew(20deg);
			background-color: #5C4B51;
			margin-left: 60px;
		}

		.W2 {
			display: inline-block;
			width: 70px;
			height: 150px;
			-webkit-transform: skew(-20deg);
			-moz-transform: skew(-20deg);
				-o-transform: skew(-20deg);
			background: #5C4B51;
			margin-left: 8px
		}

		.W3 {
			display: inline-block;
			width: 70px;
			height: 150px;
			-webkit-transform: skew(20deg);
			-moz-transform: skew(20deg);
				-o-transform: skew(20deg);
			background: #8CBEB2;
			margin-left: -20px
		}

		.W4 {
			display: inline-block;
			width: 70px;
			height: 300px;
			-webkit-transform: skew(-20deg);
			-moz-transform: skew(-20deg);
				-o-transform: skew(-20deg);
			background: #F06060;
			margin-left: 8px;
		}
		.W {
			position: absolute;
			top: 28.5%;
			left: 32.6%;
			margin: 0 auto;
		}

		@media all and (max-width: 700px) {
		.webpage {
			position: relative;
			margin: auto;
			display: block;
			margin-top: 100%;
			width: 300px;
			height: 200px;
			z-index: 1;
		}

		.title {
			font-size: 24px;
		}

		.subtitle {
			font-size: 14px;
		}

		.cta-button {
			font-size: 6px;
		}

		.branding-logo {
			border: solid 3px #ffffff;
		}

		.W1 {
			display: inline-block;
			width: 35px;
			height: 150px;
			-webkit-transform: skew(20deg);
			-moz-transform: skew(20deg);
				-o-transform: skew(20deg);
			background-color: #5C4B51;
			margin-left: 26px;
		}

		.W2 {
			display: inline-block;
			width: 35px;
			height: 75px;
			-webkit-transform: skew(-20deg);
			-moz-transform: skew(-20deg);
				-o-transform: skew(-20deg);
			background: #5C4B51;
			margin-left: 2px
		}

		.W3 {
			display: inline-block;
			width: 35px;
			height: 75px;
			-webkit-transform: skew(20deg);
			-moz-transform: skew(20deg);
				-o-transform: skew(20deg);
			background: #8CBEB2;
			margin-left: -12px
		}

		.W4 {
			display: inline-block;
			width: 35px;
			height: 150px;
			-webkit-transform: skew(-20deg);
			-moz-transform: skew(-20deg);
				-o-transform: skew(-20deg);
			background: #F06060;
			margin-left: 3px;
		}

		.W {
			top : 25%;
			left: 33.5%;
		}
	}
</style>

