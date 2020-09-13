<template>
	<div id="login-page">
		<div class="ribbon">
			 <a href="javascript:void(0)">Hello &nbsp;&nbsp;  Komia</a>  
		</div>
		<div id="good">
			<span>
				"When you walk forward the sunshine , the shadow will fall behind you !"
			</span>
		</div>
		<div id="login">
			<div id="login-container">
				<h1>酷米后台管理系统</h1>
				<Input v-model="username" prefix="md-contact" class="login-form" size="large" placeholder="Enter user name" />
				<br />
				<Input v-model="password" type="password" password  prefix="md-lock" class="login-form" size="large" placeholder="Enter password" />
				<br />
				<span class="error-msg">{{errorMsg}}</span>
				<br>
				<Button class="login-button" type="success" size="large" @click="doLogin">Sign In</Button>
			</div>
			
		</div>
		
		
	</div>
</template>
	
<script>
	import  JSEncrypt  from 'jsencrypt'
	export default {
		data(){
			return {
				username:"",
				password:"",
				errorMsg:" ",
				loginUrl:"/kmlogin"
			}
		},
		methods:{
			doLogin:function(){
				if(!this.username || !this.password){
					this.errorMsg = "请输入用户名和密码";
					return;
				}
				
				this.axios.get("/common/publickey").then((response) => {
					let publickey = response.data;
					// 新建JSEncrypt对象
					let encryptor = new JSEncrypt();
					// 设置公钥
					encryptor.setPublicKey(publickey);
					let password = encryptor.encrypt(this.password);
					
					this.axios.post(this.loginUrl, {username:this.username,password:password})
						.then(async (response) => {
							let user = response.data;
							this.$store.commit('setCurrentUser',user);
							await this.$store.dispatch('getResources',user.id);
							this.loginSuccess();
						})
						.catch((error) => {
							this.errorMsg = error.response.data.msg;
							console.log(error);
						});
				})
				.catch((error) => {
					console.log(error);
				});
			
			},
			loginSuccess:function(){
				let menuTrees = this.$store.state.menu.menuTrees;
				if(menuTrees&&menuTrees.length>0){
					this.$router.push(menuTrees[0].url);
				}else{
					this.$router.push("/home");
				}
			}
		}
	}
</script>
	
<style>
	.ribbon {  
	  background-color: #a00 !important; 
	  overflow: hidden;  
	  white-space: nowrap;  
	  /* top left corner */  
	  position: absolute;  
	  left: -50px;  
	  top: 30px;  
	  transform: rotate(-45deg);  
	}  
	.ribbon a {  
	  border: 1px solid #faa;  
	  color: #fff;  
	  display: block;  
	  font: bold 100% ‘Helvetica Neue‘, Helvetica, Arial, sans-serif;  
	  margin: 1px 0;  
	  padding: 10px 50px;  
	  text-align: center;  
	  text-decoration: none;  
	  /* for creating shadow */  
	  text-shadow: 0 0 5px #444;  
	}  
	#login {
		width:600px;
		height: 380px;
		border: 0.5px solid slateblue;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius:5px;
		box-shadow: 0px 0px 20px slateblue;
		background:rgba(255,255,255,0.3);
		margin-right: 20px;
	}
	
	#login-container{
		width:320px !important;
	}
	
	#good {
		width:400px;
		flex: 0 1 400px;
		margin-left: 20px;
	}
	
	#good span{
		margin-right: 30px;
		text-indent: 30px;
		line-height: 30px;
		display: inline-block;
		font-size: 16px;
	}
	
	#login h1 {
		margin-bottom: 10px;
		text-align: center;
	}
	
	#login-page {
		width:100%;
		height: 100%;
		background: url('~@s/img/login.jpg') no-repeat;
		background-size:100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.login-form {
		margin-top: 15px;
	}
	
	.error-msg {
		display: block;
		margin: 6px 0  -10px 0;
		color: orangered;
		height: 18px;
		width:100%;
		line-height: 18px;
	}
	.login-button{
		width:100% !important;
		margin-bottom: 15px;
	}
</style>
