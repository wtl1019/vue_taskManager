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

// 引入子路由
import Frame from '../components/frame/subroute.vue'

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    component: App
  },
  {
    name: 'MenuList',
    path: '/menuList',
    component: Frame,
    children: [
      {path: '/', name: 'MenuList', component: MenuList},
      {path: '/taskChk/:enterMenuFlg', name: 'taskChk', component: taskChk},
      {path: '/taskXJ/:enterMenuFlg', name: 'taskXJ', component: taskXJ},
      {path: '/navigation/:name,:lon,:lat', name: 'navigation', component: navigation},
      {path: '/dingwei/:taskId,:lon,:lat,:standard,:taskType', name: 'dingwei', component: dingwei},
      {path: '/taskXJComplete/:taskId', name: 'taskXJComplete', component: taskXJComplete},
      {path: '/taskChckComplete/:taskId,:standard', name: 'taskChckComplete', component: taskChckComplete},
      {path: '/faultPhotoUp', name: 'faultPhotoUp', component: faultPhotoUp}
    ]
  },
  {
    name: 'taskMonitor',
    path: '/taskMonitor',
    component: taskMonitor
  }
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
