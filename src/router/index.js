import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../App';
import MenuList from '../components/menuList/menuList';
import taskChk from '../components/taskChk/taskChk';
import taskXJ from '../components/taskXJ/taskXJ';
import navigation from '../components/map/navigation';
import dingwei from '../components/map/dingwei';
import taskMonitor from '../components/taskMonitor/taskMonitor';
import devPosition from '../components/map/devPosition';
import taskXJComplete from '../components/taskComplet/taskXJComplete';
import taskChckComplete from '../components/taskComplet/taskChckComplete';
import faultPhotoUp from '../components/faultPhotoUp';
import tasksQry from '../components/tasksQry/tasksQry';

import User from '../components/User/User';
import UserTask from '../components/User/UserTask';
import TaskDetail from '../components/User/TaskDetail';

import Terminal from '../components/Terminal/Terminal';
import TerDetail from '../components/Terminal/TerDetail';
import location from '../components/Terminal/location';

// 引入子路由
import Frame from '../components/frame/subroute.vue'

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    component: faultPhotoUp
  },
  {
    name: 'MenuList',
    path: '/menuList',
    component: Frame,
    children: [
      {path: '/', name: 'MenuList', component: MenuList},
      {path: '/taskChk', name: 'taskChk', component: taskChk},
      {path: '/taskXJ/:enterMenuFlg', name: 'taskXJ', component: taskXJ},
      {path: '/navigation/:name,:lon,:lat', name: 'navigation', component: navigation},
      {path: '/dingwei/:taskId,:devId,:lon,:lat,:taskType', name: 'dingwei', component: dingwei},
      {path: '/taskXJComplete/:taskId,:devId', name: 'taskXJComplete', component: taskXJComplete},
      {path: '/taskChckComplete/:taskId', name: 'taskChckComplete', component: taskChckComplete},
      {path: '/faultPhotoUp', name: 'faultPhotoUp', component: faultPhotoUp},
      {path: '/taskMonitor', name: 'taskMonitor', component: taskMonitor}
    ]
  },
  {
    name: 'taskMonitor',
    path: '/taskMonitor',
    component: taskMonitor
  },
  {
    name: 'tasksQry',
    path: '/tasksQry',
    component: tasksQry
  },
  {path: '/Terminal', component: Terminal},
  {path: '/UserTask', component: UserTask},
  {path: '/TaskDetail/:id', component: TaskDetail,name:'TaskDetail'},
  {path: '/TerDetail/:id', component: TerDetail,name:'TerDetail'},
  {path: '/location/:id', component: location,name:'location'},
  {path: '/User', component: User, name: 'User'}
  /*{
    name: 'User',
    path: '/User',
    component: User
  },
  {
    name: 'UserTask',
    path: '/UserTask',
    component: Frame,
    children: [
    {path: '/', name: 'UserTask', component: UserTask},
    {path: '/TaskDetail/:id', component: TaskDetail,name:'TaskDetail'}
    ]
  },
  {
    name: 'Terminal',
    path: '/Terminal',
    component: Frame,
    children: [
    {path: '/', name: 'Terminal', component: Terminal},
    {path: '/TerDetail/:id', component: TerDetail,name:'TerDetail'},
    {path: '/location/:id', component: location,name:'location'}
    ]
  }*/
];
const router = new VueRouter({
  routes: routes, // short for routes: routes
  linkActiveClass: 'active',  // router-link的选中状态的class，也有一个默认的值
  history: true
});

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

export default router;
