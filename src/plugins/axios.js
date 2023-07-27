import Vue from 'vue'
import axios from 'axios'
import config from '@/config'

const myAxios = axios.create({
    baseURL:config.apiRootUrl+'/api'
})

Vue.axios = Vue.prototype.$http = myAxios;

export default myAxios;