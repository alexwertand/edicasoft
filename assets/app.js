import Vue from 'vue';
import store from './store';
import Vuelidate from 'vuelidate';
import { BootstrapVue } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Vuelidate);
Vue.use(BootstrapVue);

Vue.component('users-list', require('./components/UsersList.vue').default);

window.app = new Vue({
    el: '#app',
    store,
});