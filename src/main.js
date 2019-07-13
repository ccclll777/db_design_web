import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import '../theme/theme/index.css'
import ElementUI from 'element-ui'

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
