import Vue from 'vue'
import App from './App'

// BootstrapVue add
import BootstrapVue from 'bootstrap-vue'
// Router & Store add
import router from './router'
import store from './store'
// Multi Language Add
import en from './locales/en.json'
import es from './locales/es.json'
import VueI18n from 'vue-i18n'
import { firebaseConfig } from './constants/config'
// Notification Component Add
import Notifications from './components/Common/Notification'
// Breadcrumb Component Add
import Breadcrumb from './components/Common/Breadcrumb'
// RefreshButton Component Add
import RefreshButton from './components/Common/RefreshButton'
// Colxx Component Add
import Colxx from './components/Common/Colxx'
// Perfect Scrollbar Add
import vuePerfectScrollbar from 'vue-perfect-scrollbar'
import contentmenu from 'v-contextmenu'
import VueLineClamp from 'vue-line-clamp'
import VueScrollTo from 'vue-scrollto'
import firebase from 'firebase/app'
import 'firebase/auth'
import { getCurrentLanguage } from './utils'
import moment from "moment";

import { ClientTable } from 'vue-tables-2';

Vue.use(ClientTable);



import { ValidationProvider, extend } from 'vee-validate';
//Vue.component('ValidationProvider', VeeValidate.ValidationProvider);

Vue.use(BootstrapVue);
Vue.use(VueI18n);
const messages = { en: en, es: es };
const locale = getCurrentLanguage();
const i18n = new VueI18n({
    locale: locale,
    fallbackLocale: 'en',
    messages
});
Vue.use(Notifications);
Vue.use(require('vue-shortkey'));
Vue.use(contentmenu);
Vue.use(VueScrollTo);
Vue.use(VueLineClamp, {
    importCss: true
});

//SweetAlert:
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);
import 'sweetalert2/dist/sweetalert2.min.css';

//VueDropZone
//import 'vue2-dropzone/dist/vue2Dropzone.min.css';


Vue.component('piaf-breadcrumb', Breadcrumb);
Vue.component('b-refresh-button', RefreshButton);
Vue.component('b-colxx', Colxx);
Vue.component('vue-perfect-scrollbar', vuePerfectScrollbar);
Vue.component('multiselect', Multiselect)
Vue.prototype.moment = moment;

// Vue-infinite-scroll (No estable)
import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll)

// Paginacion
import VuePaginate from 'vue-paginate';
Vue.use(VuePaginate)

//Vue-infinite-loading
import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading, { /* options */ });

//Tooltip
import VTooltip from 'v-tooltip'
//Multiselect
import Multiselect from 'vue-multiselect'

Vue.use(VTooltip)


import VCalendar from 'v-calendar'
Vue.use(VCalendar)


/*
2021-06-14 fg
*/
import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)

/*
2021-07-02 fg
*/
import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
/*
2021-08-16 fg
*/

import VueSpinners from 'vue-spinners'
Vue.use(VueSpinners)
Vue.use(BootstrapVueIcons)


// Mixins para roles y  permisos
import roles from "./mixins/roles/roles";
Vue.mixin(roles);
// *************************************** COMPONENTES GPS ***************************************

// Archivo que contiene todos los componentes de GPS. El archivo se llama imports.js
import Import from './imports';

// *************************************** FIN COMPONENTES GPS ***************************************

firebase.initializeApp(firebaseConfig);
Vue.config.productionTip = false

//  ------------------------------- Inyección global de token en APIS ------------------------------
import Axios from 'axios';
var token = localStorage.getItem('access_token');
Axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + token
};
//  ------------------------------- FinInyección global de token en APIS ------------------------------

export default new Vue({
    store,
    i18n,
    router,
    render: h => h(App)
}).$mount("#app");