import App from '../App';
import Vue from 'vue';

const menuList = r => require.ensure([], () => r(require('../components/menuList/menuList')), 'menuList')

const taskChk = r => require.ensure([], () => r(require('../components/taskChk/taskChk')), 'taskChk')
const taskXJ = r => require.ensure([], () => r(require('../components/taskXJ/taskXJ')), 'taskXJ')
const taskMonitor = r => require.ensure([], () => r(require('../components/taskMonitor/taskMonitor')), 'taskMonitor')

const navigation = r => require.ensure([], () => r(require('../components/map/navigation')), 'navigation')
const dingwei = r => require.ensure([], () => r(require('../components/map/dingwei')), 'dingwei')
const dingwei_test = r => require.ensure([], () => r(require('../components/map/dingwei_test')), 'dingwei_test')

const taskXJComplete = r => require.ensure([], () => r(require('../components/taskComplet/taskXJComplete')), 'taskXJComplete')
const taskChckComplete = r => require.ensure([], () => r(require('../components/taskComplet/taskChckComplete')), 'taskChckComplete')

const User = r => require.ensure([], () => r(require('../components/User/User')), 'User')
const UserTask = r => require.ensure([], () => r(require('../components/User/UserTask')), 'UserTask')
const TaskDetail = r => require.ensure([], () => r(require('../components/User/TaskDetail')), 'TaskDetail')

const Terminal = r => require.ensure([], () => r(require('../components/Terminal/Terminal')), 'Terminal')
const TerDetail = r => require.ensure([], () => r(require('../components/Terminal/TerDetail')), 'TerDetail')
const location = r => require.ensure([], () => r(require('../components/Terminal/location')), 'location')

const routes = [
      //菜单页
      {
        name:'menuList',
        path: '/',
        component: menuList,
        children: [{
          name: 'taskChk',
          path: '/taskChk',
          component: taskChk
        }, {
          name: 'taskXJ',
          path: '/taskXJ',
          component: taskXJ
        }, {
          path: '/navigation/:name,:lon,:lat',
          name: 'navigation',
          component: navigation
        }, {
          name: 'dingwei',
          path: '/dingwei/:taskId,:devId,:lon,:lat,:taskType',
          component: dingwei
        }, {
          name: '/dingwei_test',
          path: '/dingwei_test',
          component: dingwei_test
        }, {
          name: 'taskXJComplete',
          path: '/taskXJComplete/:taskId,:devId',
          component: taskXJComplete
        }, {
          path: '/taskChckComplete/:taskId',
          component: taskChckComplete
        }, {
          name: 'taskMonitor',
          path: '/taskMonitor',
          component: taskMonitor
        }]
      },
      {
        name: 'taskMonitor',
        path: '/taskMonitor',
        component: taskMonitor
      }, 
      {
        name: 'Terminal',
        path: '/Terminal',
        component: Terminal
      }, 
      {
        name: 'UserTask',
        path: '/UserTask',
        component: UserTask
      }, 
      {
        name: 'TaskDetail',
        path: '/TaskDetail/:id',
        component: TaskDetail
      }, 
      {
        name: 'TerDetail',
        path: '/TerDetail/:id',
        component: TerDetail
      }, 
      {
        name: 'location',
        path: '/location/:id',
        component: location
      }, 
      {
        name: 'User',
        path: '/User',
        component: User
      }
    ]

export default routes;

// 判断用户是否已登陆，此时由 router 进行一个拦截
/* router.beforeEach(function (to, from, next) {
  var userMsg = localStorage.getItem('userMsg');
  if (to.path === '/menuList') {
    if (!userMsg) {
      next({ path: '/menuList' });
    }
  }
  next();
}); */
