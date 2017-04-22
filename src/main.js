// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';
import store from './vuex/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import router from './router';
import AMap from 'vue-amap';
Vue.config.productionTip = false;

import MyPlugin from './common/js/exit-vue.js'
Vue.use(MyPlugin)

Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(AMap);

AMap.initAMapApiLoader({
  key: '28966b6be8e4fa0e4c4f4c9b4bf8d3ce',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.Geolocation'
    ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
