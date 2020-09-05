<template>
	<div class="layout">
	        <Layout>
	            <Header>
	                <Menu mode="horizontal" theme="light" :active-name="currentMenuKey" >
						<div class="header-container">
							<div class="header-logo">Komia</div>
							<div class="header-nav">
								<MenuItem :name="item.key" v-for="item in menus" :key="item.key" :to="item.url">
								    {{item.name}}
								</MenuItem>
							</div>
							<div class="header-user">
								 <Dropdown transfer @on-click="me">
									<a href="javascript:void(0)">
									     <Icon type="md-contact" size="28"/>
										 {{username}}
									</a>
									<DropdownMenu slot="list">
										<DropdownItem name="info">个人信息</DropdownItem>
										<DropdownItem name="logout">退出系统</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</div>
						</div>
	                </Menu>
	            </Header>
	            <Layout>
	                <Sider hide-trigger style="background: #fff;">
	                    <Menu :active-name="currentSubMenuKey" theme="light" width="auto">
							<MenuItem :name="item.key" v-for="item in currentSubTrees" :key="item.key" :to="item.url">
								{{item.name}}
							</MenuItem>
	                    </Menu>
	                </Sider>
	                <Layout>
	                    <Content >
							<router-view></router-view>
	                    </Content>
	                </Layout>
	            </Layout>
	        </Layout>
	    </div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		mounted() {
			
		},
		computed:{
			username: function() {
				return this.$store.state.login.currentUser.nickname;
			},
			menus: function() {
				return this.$store.state.menu.menuTrees;
			},
			currentSubTrees: function(){
				return this.$store.state.menu.currentSubTrees;
			},
			currentMenuKey: function(){
				return this.$store.state.menu.currentMenuKey;
				
			}, 
			currentSubMenuKey: function(){
				return this.$store.state.menu.currentSubMenuKey;
			}
		},
		methods:{
			me: function(v){
				if(v == "logout"){
					this.axios.get("/logout").then((response) => {
						this.$store.commit('setCurrentUser',{});
						this.$router.push("/login");
					})
					.catch((error) => {
						console.log(error);
					});
				}else{
					this.axios.get("/user/users").then((response) => {
						console.log("test session out")
					})
					.catch((error) => {
						console.log(error);
					});
				}
			}
		}
	}
</script>

<style>
	.layout{
	    border: 1px solid #d7dde4;
	    background: #f5f7f9;
	    position: relative;
	    border-radius: 4px;
	    overflow: hidden;
		height: 100%;
	}
	.layout div.ivu-layout-header {
		padding: 0 10px;
		overflow-y:auto;
		background-color: #fff;
	}
	.layout div.ivu-layout {
		padding-left: 5px;
		height: calc(100% - 5px);
	}
	.layout div.ivu-layout-sider{
		height: calc(100% - 5px);
		overflow-y:hidden;
		 /*IE下隐藏滚动条，仍然可以滚动*/
		-ms-overflow-style:none;
	}
	.layout div.ivu-layout-sider::-webkit-scrollbar{width:0px}
	.layout div.ivu-layout .ivu-layout-content{
		overflow: hidden;
		word-break: break-all;
		padding: 15px 15px 10px 15px;
		background: #fff;
	}
	.ivu-menu-vertical.ivu-menu-light:after{
		width: 0px !important;
	}
	.header-container {
		display: flex;
	}
	.header-logo{
	    width: 170px;
		font-size: 26px;
		margin-left: 40px;
	}
	.header-nav{
		flex:1;
	    margin: 0 20px;
	}
	.header-user{
		right: 20px;
		width: 120px;
		display: inline-block;
		text-align: right;
		padding-right: 20px;
	}
	.header-user i {
		vertical-align: middle;
	}
</style>
