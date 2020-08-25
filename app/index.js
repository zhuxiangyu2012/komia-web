import Vue from 'vue';
import App from './app.vue';
import '@s/css/common.css';
import VueRouter from 'vue-router';
import Routers from './router';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Axios from 'axios';
import store from './store';

Vue.use(VueRouter);
Vue.use(ViewUI);

//全局配置Axios
Axios.defaults.baseURL = "http://127.0.0.1:80/komia";
Axios.defaults.withCredentials = true;

// 添加响应拦截器
Axios.interceptors.response.use(response => {
    // 对响应数据做点什么
    const res = response.data;
    //对错误代码做处理
    return res;
}, error => {
    // 对响应错误做点什么
    console.log('err' + error)// for debug
	console.log('errcode' + error.response.status)// for debug
    return Promise.reject(error);
});

Vue.prototype.axios = Axios;

//检测用户是否已经登录，已经登录的话，自动获取用户信息
(async function getCurrentUser(){
	let currentUserUrl = "/currentUser"
	await Axios.get(currentUserUrl)
		.then((response) => {
			let user = response.data;
			if(user){
				store.commit('setCurrentUser',user);
			}
		})
		.catch((error) => {
			console.log(error);
		});
			
	const router = new VueRouter({
		routes: Routers
	});
	
	router.beforeEach((to, from, next) => {
		console.log("from " + from.path  + " to " + to.path);
		let user = store.state.login.currentUser;
		console.log("--+++");
		console.log(user);
		if(!user.username){
			if(to.path != "/login"){
				next("/login");
			}else{
				next();
			}
		}else{
			if(to.path == "/" || to.path == "/login"){
				next("/home");
			}else{
				next();
			}
		}
	});
	
	
	const root = document.createElement("div")
	document.body.appendChild(root)
	
	new Vue({
		router: router,
		store: store,
		render:(h) => h(App)
	}).$mount(root)
})()

