export default {
	moveRoute(state,toUrl){
		//根据url获取menu
		let cmenu = state.menuUrlMap[toUrl];
		if(cmenu){
			let oneLevelKey = "";
			//如果获取到的是二级菜单
			if(cmenu.rlevel == 2){
				oneLevelKey = cmenu.pkey;
				state.currentSubMenuKey = cmenu.key;
			}else if(cmenu.rlevel == 1){
				oneLevelKey = cmenu.key;
				state.currentSubMenuKey = state.menuKeyMap[oneLevelKey][0].key;
			}
			
			state.currentSubTrees = state.menuKeyMap[oneLevelKey];
			state.currentMenuKey = oneLevelKey;
			state.currentMenuAuth = state.subMenuKeyAuth[state.currentMenuKey];
		}
	},
	processResources(state,resources){
		// 初始化menu信息
		let res = "";
		state.menuTrees = [];
		state.menuKeyMap = {};
		state.subMenuKeyAuth = {};
		state.currentMenuKey = "";
		state.menuUrlMap = {};
		
		//处理menu信息
		for(let i in resources){
			res = resources[i];
			if(res.rlevel == 1){
				state.menuTrees.push(res);
				state.menuKeyMap[res.key] = [];
				state.menuUrlMap[res.url] = res;
			}else if(res.rlevel == 2){
				state.menuKeyMap[res.pkey].push(res);
				state.subMenuKeyAuth[res.key] = {};
				state.menuUrlMap[res.url] = res;
			}else if(res.rlevel == 3){
				state.subMenuKeyAuth[res.pkey][res.key] = true;
			}
		}
		
		//如果一级菜单对应的二级菜单为空，则移除一级菜单
		let subMenus = "";
		for(let j = state.menuTrees.length-1; j>=0; j--){
			subMenus = state.menuKeyMap[state.menuTrees[j].key] || [];
			if(subMenus.length == 0){
				state.menuTrees.splice(j,1);
			}else{
				//更改一级菜单的url
				state.menuTrees[j].url = subMenus[0].url;
			}
		}
		
		state.currentSubTrees = state.menuKeyMap[state.menuTrees[0].key];
		state.currentMenuKey = state.menuTrees[0].key;
		state.currentSubMenuKey = state.currentSubTrees[0].key;
		state.currentMenuAuth = state.subMenuKeyAuth[state.currentMenuKey];
		
	}
}