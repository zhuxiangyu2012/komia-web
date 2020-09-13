<template>
	<div class="leftAndRight" >
		<div class="left">
			<div style="margin-left: 15px;margin-bottom: 15px;">角色</div>
			<Table highlight-row border ref="currentRowTable" :columns="columns3" :data="data1" size="small"></Table>
		</div>
		<div class="center">	
		</div>
		<div class="right">
			<div style="margin-bottom: 15px;">
				<div style="margin-left: 15px;display: inline-block;">资源</div>
				<div style="float: right;">
					<Tooltip content="添加">
					    <Icon type="md-add"  size="24" :color="treeBtnColor" style="cursor: pointer;" @click="addTreeNode"/>
					</Tooltip>
					<Tooltip content="修改">
					    <Icon type="md-create" size="24" :color="treeBtnColor" style="cursor: pointer;"/>
					</Tooltip>
					<Tooltip content="删除">
					    <Icon type="md-remove" size="24" :color="treeBtnColor" style="cursor: pointer;"/>
					</Tooltip>
				</div>
			</div>
			<Tree :data="data2" show-checkbox @on-select-change="treeSelect" @on-check-change="treeCheck"></Tree>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				treeBtnColor:"",
				resources:"Hello, Resource!",
				columns3: [
				                    {
				                        title: 'Name',
				                        key: 'name'
				                    },
				                    {
				                        title: 'Address',
				                        key: 'address',
										ellipsis:true,
										tooltip:true
				                    }
				                ],
				                data1: [
				                    {
				                        name: 'John Brown',
				                        address: 'New York No. 1 Lake Park',
				                    },
				                    {
				                        name: 'Jim Green',
				                        address: 'London No. 1 Lake Park',
				                    },
				                    {
				                        name: 'Joe Black',
				                        address: 'Sydney No. 1 Lake Park',
				                    },
				                    {
				                        name: 'Jon Snow',
				                        address: 'Ottawa No. 2 Lake Park',
				                    },
									
				                ],
				data2: [
				                    {
				                        title: 'parent 1',
				                        expand: true,
				                        children: [
				                            {
				                                title: 'parent 1-1',
				                                expand: true,
				                                children: [
				                                    {
				                                        title: 'leaf 1-1-1'
				                                    },
				                                    {
				                                        title: 'leaf 1-1-2'
				                                    }
				                                ]
				                            },
				                            {
				                                title: 'parent 1-2',
				                                expand: true,
				                                children: [
				                                    {
				                                        title: 'leaf 1-2-1',
														a:"a",
														b:"ddd"
				                                    },
				                                    {
				                                        title: 'leaf 1-2-1'
				                                    }
				                                ]
				                            },
											
				                        ]
				                    }
				                ]
			}
		},
		methods:{
			treeSelect: function(data){
				if(!data||data.length==0){
					this.treeBtnColor = "";
				}else{
					this.treeBtnColor = "#2D8CF0";
				}
				
				console.log(data)
			},
			treeCheck: function(datas,current){
				console.log("---check-----");
				console.log(current)
			},
			addTreeNode:function(){
				console.log("Try to create !")
			}
		}
	}
</script>

<style>
	.leftAndRight {
		display: flex;
		justify-content: center;
		height: 100%;
	}
	.leftAndRight .center {
		display:block; 
		border-left: 0px;
		border-right:1px solid lightblue;
		flex-grow:0;
		margin: 0 3px;
	}
	.left {
		flex-grow:0;
		flex-basis:40%;
		overflow: auto;
	}
	.right {
		margin-left: 5px;
		flex-grow:1;
		overflow: auto;
	}
</style>
