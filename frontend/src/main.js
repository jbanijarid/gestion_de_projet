import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'

import AOS from "aos";
import "aos/dist/aos.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import {BootstrapVue3} from "bootstrap-vue-3";
import FontAwesomeIcon from "./fontawesome-icons.js";

const app = createApp(App)
    .use(router)
    .use(BootstrapVue3)
    .component('font-awesome-icon',FontAwesomeIcon);


app.AOS = new AOS.init();
//{ disable: "phone" }
app.mount('#app')
