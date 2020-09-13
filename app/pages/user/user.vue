<template>
	<div class="main-content">
		<div class="search-area">
			<Row class="krow">
			        <Col span="2">
						<label>用户名:</label>
					</Col>
					<Col span="6">
						<Input clearable v-model="search.username" placeholder="输入用户名搜索" style="width: 85%" />
					</Col>
			        <Col span="2">
						<label>昵称:</label>
					</Col>
					<Col span="6">
						<Input clearable v-model="search.nickname" placeholder="输入昵称搜索" style="width: 85%" />
					</Col>
					<Col span="2">
						<label>状态:</label>
					</Col>
					<Col span="6">
						<Select clearable v-model="search.status" style="width: 85%" transfer>
						        <Option  v-for="item in userStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</Col>
			</Row>
		</div>
		<div class="search-buttons" >
			<div class="bleft" >共{{pageInfo.totalCount}}条</div>
			<div class="bright">
				<Button @click="addUserDialog = true">添加</Button>
				<Button type="primary" icon="ios-search"  @click="searchUser">Search</Button>
			</div>
		</div>
		<div class="search-data">
			<div class="search-data-table">
				<Table :loading="userLoading" border :columns="columns" :data="users" size="small">
				        <template slot-scope="{ row }" slot="status">
				            {{ row.status==1?'正常':'锁定' }}
				        </template>
				        <template slot-scope="{ row, index }" slot="action">
				            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
				            <Button type="error" size="small" @click="remove(index)">Delete</Button>
				        </template>
				    </Table>
			</div>
			<div class="search-data-pager">
				 <Page  :total="pageInfo.totalCount" :current="pageInfo.currentPage" :page-size="pageInfo.pageSize" show-sizer :page-size-opts="pageInfo.pageOptions" @on-change="pageChange" @on-page-size-change="pageSizeChange"/>
			</div>
		</div>
		
		<!-- 添加用户 -->
		<add-user v-if="addUserDialog" @close="addUserClose"/>
	</div>
</template>

<script>
	import addUser from './addUser.vue';
	export default {
		components: {
		    addUser
		},
		data(){
			return {
				addUserDialog:false,
				pageInfo:{
					currentPage:1,
					totalCount:0,
					pageSize:8,
					pageOptions:[]
				},
				userLoading:false,
				search:{
					username:"",
					nickname:"",
					status:""
				},
				url:{
					searchUser:"/user/users",
					userAdd:"/user/add"
				},
				userStatus:[
					{
						value:1,
						label:"正常"
					},
					{
						value:0,
						label:"锁定"
					},
				],
				columns: [
					{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '用户名',
						sortable:true,
						key:'username'
					},
					{
						title: '昵称',
						sortable:true,
						key: 'nickname'
					},
					{
						title: '状态',
						slot: 'status'
					},
					{
						title: '操作',
						slot: 'action',
						width: 150,
						align: 'center'
					}
				],
				users: [
					
				],
				
			}
		},
		mounted() {
			this.pageInfo.pageOptions = this.$store.state.login.pageOptions;
			this.searchUser();
		},
		methods:{
			searchUser:function(){
				this.userLoading = true;
				this.search.currentPage = this.pageInfo.currentPage;
				this.search.pageSize = this.pageInfo.pageSize;
				console.log(this.search);
				this.axios.get(this.url.searchUser,{params:this.search}).then((response) => {
					let pages = response.data;
					this.users = pages.pdata;
					this.pageInfo.totalCount = pages.totalCount;
					this.userLoading = false;
				})
				.catch((error) => {
					this.userLoading = false;
					this.$Message.error({
						background: true,
						content: '查询失败'
					});
					console.log(error);
				});
			},
			pageChange:function(index){
				this.pageInfo.currentPage = index;
				this.searchUser();
			},
			pageSizeChange:function(size){
				this.pageInfo.pageSize = size;
				this.searchUser();
			},
			addUserClose:function(flag){
				this.addUserDialog = flag;
				this.searchUser();
			},
			show:function (index) {
				this.$Modal.info({
					title: 'User Info',
					content: `Name：${this.users[index].name}<br>Age：${this.users[index].age}<br>Address：${this.users[index].address}`
				})
			},
			remove:function (index) {
				this.users.splice(index, 1);
			}
		}
	}
	
</script>

<style>
	
</style>
