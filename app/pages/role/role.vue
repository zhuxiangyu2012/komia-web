<template>
	<div class="main-content">
		<div class="search-area">
			<Row class="krow">
			        <Col span="2">
						<label>用户名:</label>
					</Col>
					<Col span="6">
						<Input v-model="search.username" placeholder="输入用户名搜索" style="width: 85%" />
					</Col>
			        <Col span="2">
						<label>昵称:</label>
					</Col>
					<Col span="6">
						<Input v-model="search.username" placeholder="输入用户名搜索" style="width: 85%" />
					</Col>
					<Col span="2">
						<label>状态:</label>
					</Col>
					<Col span="6">
						<Input v-model="search.username" placeholder="输入用户名搜索" style="width: 85%" />
					</Col>
			</Row>
		</div>
		<div class="search-buttons" >
			<div class="bleft" >共10条</div>
			<div class="bright">
				<Button>Default</Button>
				<Button type="primary" icon="ios-search">Search</Button>
			</div>
		</div>
		<div class="search-data">
			<div class="search-data-table">
				<Table border :columns="columns12" :data="data6" size="small" >
				        <template slot-scope="{ row }" slot="name">
				            <strong>{{ row.name }}</strong>
				        </template>
				        <template slot-scope="{ row, index }" slot="persons">
				           <a @click="modal10 = true">{{index}}</a>
				        </template>
				    </Table>
			</div>
			<div class="search-data-pager">
				 <Page :total="100" show-sizer />
			</div>
		</div>
		
		<Modal
			title="Title"
			v-model="modal10"
			:mask-closable="false"
			class-name="vertical-center-modal  km-vertical-center-modal">
			<p>Content of dialog</p>
			<p>Content of dialog</p>
			<p>Content of dialog</p>
		</Modal>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				modal10:false,
				search:{
					username:""
				},
				columns12: [
									{
										type: 'selection',
										width: 60,
										align: 'center'
									},
				                    {
				                        title: 'Name',
				                        slot: 'name',
										width: 160,
				                    },
				                    {
				                        title: 'Age',
				                        key: 'age',
										width: 100,
				                    },
				                    {
				                        title: 'Address',
				                        key: 'address',
										width: 200,
				                    },
				                    {
				                        title: 'Action',
				                        slot: 'persons',
				                        // width: 150,
										// width: 60,
				                        align: 'center'
				                    }
				                ],
				                data6: [
				                    {
				                        name: 'John Brown',
				                        age: 18,
				                        address: 'New York No. 1 Lake Park'
				                    },
				                    {
				                        name: 'Jim Green',
				                        age: 24,
				                        address: 'London No. 1 Lake Park'
				                    },
				                    {
				                        name: 'Joe Black',
				                        age: 30,
				                        address: 'Sydney No. 1 Lake Park'
				                    },
				                    {
				                        name: 'Jon Snow',
				                        age: 26,
				                        address: 'Ottawa No. 2 Lake Park'
				                    },
									{
									    name: 'Jon Snow',
									    age: 26,
									    address: 'Ottawa No. 2 Lake Park'
									},
									{
									    name: 'Joe Black',
									    age: 30,
									    address: 'Sydney No. 1 Lake Park'
									},
									{
									    name: 'Jon Snow',
									    age: 26,
									    address: 'Ottawa No. 2 Lake Park'
									},
									{
									    name: 'Jon Snow',
									    age: 26,
									    address: 'Ottawa No. 2 Lake Park'
									},
				                ]
			
			}
		},
		mounted() {
			
		},
		methods:{
			 show (index) {
			                this.$Modal.info({
			                    title: 'User Info',
			                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
			                })
			            },
			            remove (index) {
			                this.data6.splice(index, 1);
			            }
		}
	}
	
</script>

<style>
	
</style>
