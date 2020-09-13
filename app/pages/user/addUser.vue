<template>
	<div>
		<Modal
			ref="addUserModal"
			title="Title"
			v-model="modalShowHide"
			:mask-closable="false"
			width="35%"
			min-width="150px"
			@on-visible-change="visibleChange"
			@on-ok="handleSubmit('formValidate')"
			class-name="vertical-center-modal  km-vertical-center-modal">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
			        <FormItem label="User Name" prop="username">
			            <Input v-model="formValidate.username" placeholder="Enter your username"></Input>
			        </FormItem>
			        <FormItem label="Nick Name" prop="nickname">
			            <Input v-model="formValidate.nickname" placeholder="Enter your nickname"></Input>
			        </FormItem>
			    </Form>
		</Modal>
	</div>
</template>

<script>
	export default {
		mounted() {
		},
		data(){
			return {
				modalShowHide:true,
				formValidate: {
					username: '',
					nickname: '',
				},
				ruleValidate: {
					username: [
						{ required: true, message: 'The name cannot be empty', trigger: 'blur' }
					],
					nickname: [
						{ required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
					]
				}
			}
		},
		methods:{
			visibleChange:function(flag){
				this.$emit("close",flag);
			},
			handleSubmit:function (name) {
				this.modalShowHide = true;
				this.$refs.addUserModal.visible = true;
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.axios.post("/user/add",this.formValidate).then((response) => {
							if(response.success==true){
								this.modalShowHide = false;
							}
						})
						.catch((error) => {
							this.$Message.error({
								background: true,
								content: '添加失败'
							});
							console.log(error);
						});
					} 
				})
			},
		}
	}
</script>

<style>
</style>
