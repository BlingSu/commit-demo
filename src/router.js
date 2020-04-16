
const Login = resolve => require(['@/views/login'], resolve)// 登录页
const Index = resolve => require(['@/views/index'], resolve)// 首页
// 首页
const Main = resolve => require(['@/views/main'], resolve)// 首页
// 系统
const SysUser = resolve => require(['@/views/sysManager/sysUser/index'], resolve) // 用户
const SysLog = resolve => require(['@/views/sysManager/sysLog/index'], resolve) // 日志

const routes = [
  {
    path: '/',
    component: Index,
    redirect: '/login',
    children: [
      { path: '/main', component: Main, name: '测试管理' },
      {
        path: '/sysUser',
        component: SysUser,
        name: '成绩管理'
      },
      {
        path: '/sysLog',
        component: SysLog,
        name: '成绩查询'
      },
      {
        path: '/sysLog',
        component: SysLog,
        name: '评估意见'
      },
      {
        path: '/sysLog',
        component: SysLog,
        name: '基础信息管理'
      },
      {
        path: '/sysLog',
        component: SysLog,
        name: '统计分析'
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]
export default routes
