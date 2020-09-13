import Home from '@p/home.vue'
import Login from '@p/login.vue'
import Welcome from '@p/welcome.vue'
import User from '@p/user/user.vue'
import Resource from '@p/resource/resource.vue'
import Role from '@p/role/role.vue'
import Visit from '@p/visit/visit.vue'

const routers = [
    {
        path: '/', redirect:'/home'
    },
	{
		path: '/login',component: Login
	},
	{
		path: '/home',component: Home,
		children: [
			{
				path: '',redirect:'welcome'
			},
			{
				path: 'welcome',component:Welcome
			}
		]
	},
	{
		path: '/sysmgt',component: Home,
		children: [
			{
				path: '',redirect:'user'
			},
			{
				path: 'user',component:User
			},
			{
				path: 'role',component:Role
			},
			{
				path: 'resouce',component:Resource
			}
		]
	},
	{
		path: '/analysis',component: Home,
		children: [
			{
				path: '',redirect:'visit'
			},
			{
				path: 'visit',component:Visit
			}
		]
	}
];
export default routers;