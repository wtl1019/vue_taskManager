import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../App';
import MenuList from '../components/menuList/menuList';
import TaskChk from '../components/taskChk/taskChk';
import TaskXJ from '../components/taskXJ/taskXJ';
import navigation from '../components/map/navigation';
import dingwei from '../components/map/dingwei';
import taskMonitor from '../components/taskMonitor/taskMonitor';
import devPosition from '../components/map/devPosition';
import taskComplet from '../components/taskComplet/taskComplet';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {path: '/menuList', name: 'MenuList', component: MenuList},
      {path: '/taskChk/:taskTypFlg', name: 'TaskChk', component: TaskChk},
      {path: '/taskXJ/:taskTypFlg', name: 'TaskXJ', component: TaskXJ},
      {path: '/navigation/:name,:lon,:lat', name: 'navigation', component: navigation},
      {path: '/dingwei/:taskId,:lon,:lat', name: 'dingwei', component: dingwei},
      {path: '/taskMonitor', name: 'taskMonitor', component: taskMonitor},
      {path: '/devPosition', name: 'devPosition', component: devPosition},
      {path: '/taskComplet/:taskId', name: 'taskComplet', component: taskComplet}
    ]
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
