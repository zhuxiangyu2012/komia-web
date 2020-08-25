import Home from '@p/home.vue'
import Login from '@p/login.vue'
import Sub from '@p/sub.vue'

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
					path: '',redirect:'sub'
		        },
		        {
					path: 'sub',component:Sub
				}
		      ]
	}
];
export default routers;