// 引入axios实例文件
import http from "./axios"

// 封装接口


/* -----菜单接口------ */
// 1 菜单添加接口
export function getMenuAdd(data) {
    return http.post("/api/menuadd", data)
}
// 2 菜单列表接口
export function getMenuList(params) {
    return http.get("/api/menulist", {
        params
    })
}
// 3 菜单获取（一条）
export function getMenuInfo(params) {
    return http.get("/api/menuinfo", {
        params
    })
}
// 4 菜单修改
export function getMenuEdit(data) {
    return http.post("/api/menuedit", data)
}
// 5 菜单删除
export function getMenuDelete(data) {
    return http.post("/api/menudelete", data)
}



/* -----角色接口------ */
//添加角色
export function getRoleAdd(data) {
    return http.post('/api/roleadd', data)
}
//角色列表接口
export function getRoleList() {
    return http.get('/api/rolelist')
}
//角色获取
export function getRoleInfo(params) {
    return http.get('/api/roleinfo', {
        params
    })
}
//角色编辑事件
export function getRoleEdit(data) {
    return http.post('/api/roleedit', data)
}
//角色删除事件
export function getRoleDel(data) {
    return http.post('/api/roledelete', data)
}


/* -----管理员接口------ */
// 管理员添加接口
export function getUserAdd(data) {
    return http.post('/api/useradd', data)
}
// 管理员总数（用于计算分页）
export function getUserCont() {
    return http.get('/api/usercount')
}
// 管理员列表（分页）
export function getUserList(params) {
    return http.get('/api/userlist', {
        params
    })
}
// 管理员获取（一条）
export function getUserInfo(params) {
    return http.get('/api/userinfo', {
        params
    })
}
// 管理员修改
export function getUserEdit(data) {
    return http.post('/api/useredit', data)
}
// 管理员删除
export function getUserDel(data) {
    return http.post('/api/userdelete', data)
}
// 管理员登录
export function getLogin(data) {
    return http.post('/api/userlogin', data)
}