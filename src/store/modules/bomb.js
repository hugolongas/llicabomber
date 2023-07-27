import Vue from 'vue'

const state = {
    bombs: [],
    wrongCode: 0
}

const getters = {
    getBombs: state => state.bombs,
    wrongCode: state => state.wrongCode
}
const actions = {
    async getBombs({ commit }) {
        let response = await Vue.axios.get("/bombs");
        let bombs = response.data;
        commit('getBombs', bombs)
    },
    async checkCode({ commit, getters }, code) {
        var user = getters.getUser;        
        return new Promise((resolve, reject) => {
            Vue.axios.post("/bombs/checkCode?code=" + code + "&user_id=" + user.colla_id).then((response) => {
                window.console.log(response)
                if (response !== null) {
                    if (response.status == 200) {
                        let result = response.data;
                        window.console.log(result)
                        if (result.type == "error") {
                           /* if (result.message == "NO EXISTEIX EL CODI") {
                               if (getters.wrongCode < 4) {
                                   // commit("updateWrongCode");
                                    resolve(result)
                                }
                                else {
                                    Vue.axios.post("/bombs/setBomb?code=A8C4K&colla_id=" + user.colla_id+ "&user_id=organitzacio&sign=resta").then((response) => {                                    
                                        window.console.log(response)
                                        commit("resetWrongCode");
                                        result.message = "HAS INTRODUIT UN CODI ERRONI MES DE 3 VEGADES, AIXÍ QUE SE T'HAN RESTAT 60 MINUTS, FIXAT MES O NO INTENTIS FER TRAMPES TOTIL!!"
                                        resolve(result)
                                    })
                                }
                            }
                            else {
                                resolve(result)
                            }    */
                                 
                            resolve(result)             
                        }
                        else{
                            commit("resetWrongCode");
                            resolve(result)
                        }
                    }
                    else {
                        resolve('Error');
                    }
                }
            }).catch(error => {
                window.console.log("error:", error);
                reject(error);
            });
        });
    },
    async insertCode({commit, getters},payload){
        var colla_id = payload.colla_id;
        var code = payload.code;
        var sign = payload.sign;
        var user = getters.getUser;
        return new Promise((resolve, reject) => {
            Vue.axios.post("/bombs/setBomb?code=" + code + "&colla_id=" + colla_id+ "&user_id=" + user.colla_id+ "&sign=" + sign).then((response) => {
                window.console.log(response)
                if (response !== null) {
                    if (response.status == 200) {
                        let result = response.data;
                        window.console.log(result)
                        if (result.type == "error") {
                         /*   if (result.message == "NO EXISTEIX EL CODI") {
                                if (getters.wrongCode < 4) {
                                    commit("updateWrongCode");
                                    resolve(result)
                                }
                                else {
                                    Vue.axios.post("/bombs/setBomb?code=A8C4K&colla_id=" + user.colla_id+ "&user_id=organitzacio&sign=resta").then((response) => {
                                        window.console.log(response)
                                        commit("resetWrongCode");
                                        result.message = "HAS INTRODUIT UN CODI ERRONI MES DE 3 VEGADES, AIXÍ QUE SE T'HAN RESTAT 60 MINUTS, FIXAT MES O NO INTENTIS FER TRAMPES TOTIL!!"
                                        resolve(result)
                                    })
                                }
                            }
                            else {
                                resolve(result)
                            }          */   
                            resolve(result)               
                        }
                        else{
                            commit("resetWrongCode");
                            resolve(result)
                        }
                    }
                    else {
                        resolve('Error');
                    }
                }
            }).catch(error => {
                window.console.log("error:", error);
                reject(error);
            });
        });
    }
}

const mutations = {
    getBombs(state, bombs) {
        state.bombs = bombs
    },
    updateWrongCode(state) {
        state.wrongCode = state.wrongCode + 1
    },
    resetWrongCode(state) {
        state.wrongCode = 0
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}