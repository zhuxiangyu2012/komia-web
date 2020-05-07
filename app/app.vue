<template>
	<div>
		<div id="text">{{text}}</div>
		<div id="img"></div>
	</div>
	
</template>
<script>
	export default {
		data(){
			return {
				text:"Hello My Vue"
			}
		}
	}
</script>
<style>
	#img {
		display: block;
		width: 800px;
		height:800px;
		background: url('~@s/img/宝宝.PNG') no-repeat;
	}
</style>
