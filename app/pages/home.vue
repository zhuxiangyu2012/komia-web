<template>
	<div class="layout">
	        <Layout>
	            <Header>
	                <Menu mode="horizontal" theme="light" active-name="1" >
						<div class="header-container">
							<div class="header-logo">Komia</div>
							<div class="header-nav">
							    <MenuItem name="1">
							        <Icon type="ios-navigate"></Icon>
							        系统管理
							    </MenuItem>
							    <MenuItem name="2">
							        <Icon type="ios-keypad"></Icon>
							        统计分析
							    </MenuItem>
							    <MenuItem name="3">
							        <Icon type="ios-analytics"></Icon>
							        微信管理
							    </MenuItem>
							    <MenuItem name="4">
							        <Icon type="ios-paper"></Icon>
							        其他
							    </MenuItem>
							</div>
							<div class="header-user">{{username}}</div>
						</div>
	                </Menu>
	            </Header>
	            <Layout>
	                <Sider hide-trigger style="background: #fff;">
	                    <Menu active-name="1-2" theme="light" width="auto">
							<MenuItem name="1-1">用户管理</MenuItem>
							<MenuItem name="1-2">角色管理</MenuItem>
							<MenuItem name="1-3">资源管理</MenuItem>
							<MenuItem name="1-4">菜单管理</MenuItem>
							<MenuItem name="1-5">系统备份</MenuItem>
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
				text:"Hello My Vue"
			}
		},
		computed:{
			username: function() {
				return this.$store.state.login.currentUser.nickname;
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
		height: calc(100% - 20px);
	}
	.layout div.ivu-layout-sider{
		height: calc(100% - 20px);
		overflow-y:auto;
		 /*IE下隐藏滚动条，仍然可以滚动*/
		-ms-overflow-style:none;
	}
	.layout div.ivu-layout-sider::-webkit-scrollbar{width:0px}
	.layout div.ivu-layout .ivu-layout-content{
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
		width: 120px;
		display: inline-block;
	}
</style>
