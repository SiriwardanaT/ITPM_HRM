import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CURRUNT_USER_OBJ : ""
  },
  mutations: {
    ToStoreCurrentUser : (state , value) =>{
        state.CURRUNT_USER_OBJ = value;
    } 
  },
  actions: {
  },
  modules: {
  }
})
