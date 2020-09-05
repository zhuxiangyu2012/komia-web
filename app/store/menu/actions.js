import Axios from 'axios';
export default {
	async getResources(context,uid){
		// (async function getResources(){
			await Axios.get("/common/resource/getResourcesByUid", {params:{uid:uid}})
			.then((response) => {
				let resources = response.data;
				context.commit("processResources",resources);
			})
			.catch((error) => {
				console.log(error);
			});
		
		// })();
		
	}
}