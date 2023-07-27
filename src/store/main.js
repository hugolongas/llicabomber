import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'

import user from './modules/user'
import bomb from './modules/bomb'

const vuexPerist = new VuexPersistence({
    storage:window.sessionStorage,
    key:"__llicabomber"
})

Vue.use(Vuex)

const vuex = new Vuex.Store({
    modules:{
        user,
        bomb,
    },
    plugins:[vuexPerist.plugin]
});

export default vuex