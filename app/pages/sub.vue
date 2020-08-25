<template>
	<div style="display: block;height: 100%;">
		<button @click="showOrHide">Click Me66666666666666666666666666666666677</button>
		I am sub !77777777777777777777777777777777777777777777777777888888888888888888999991006666888
		<div  v-if="showFlag" class="abc">
			<ul>
				<li v-for="d in liDatas" name="abcd" style="list-style: none;">
					{{d}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				dataList:[
					1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
					1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
					1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
					1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
					1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
					1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
					1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
					1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
				],
				showFlag:false,
				liDatas:[],
				ddd:true,
				allList:[]
			}
		},
		methods:{
			showOrHide:function(){
				this.showFlag = !this.showFlag;
				let s = this.ddd;
				if(this.showFlag){
					this.liDatas = this.dataList;
				}else{
					this.liDatas = [];
					this.allList = [];
				}
				var that = this;
				this.$nextTick(function(){
					for(var li = 0; li<  document.getElementsByName("abcd").length; li ++){
						that.allList.push(document.getElementsByName("abcd")[li]);
					}
					
				})
			},
			showMsg:function(){
				alert(1);
			}
		}
	}
	
</script>

<style>
</style>
