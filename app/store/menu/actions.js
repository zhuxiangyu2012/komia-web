import Axios from 'axios';
export default {
	getResources(context,uid){
		(async function getResources(){
			Axios.get("/common/resource/getResourcesByUid", {params:{uid:uid}})
			.then((response) => {
				let resources = response.data;
				
				
				
			})
			.catch((error) => {
				console.log(error);
			});
		
		})();
	}
}