export default {
	currentMenuKey:"", // 当前一级菜单的menuKey
	currentSubMenuKey:"", // 当前二级菜单的menukey
	menuUrlMap:{}, //根据url来查找menu
	menuKeyMap:{}, // 通过一级menukey获取其下面的二级菜单
	subMenuKeyAuth:{},//通过二级菜单menukey获取权限
	menuTrees:[], // 所有一级菜单
	currentSubTrees:[] ,// 当前一级菜单下的二级菜单
	currentMenuAuth:{} // 当前二级菜单的权限
}