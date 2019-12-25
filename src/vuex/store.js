import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  collapse: '',
  checkArea: [],
  checkDepart: [],
  clearTree: 0
}

const mutations = {
  changeTree (state) {
    state.clearTree++
  },
  ext (state, val) {
    state.collapse = val
  },
  C_checkArea (state, val) {
    let flag = true
    for (let i = 0; i < state.checkDepart.length; i++) {
      if (state.checkDepart[i].name === val.name) {
        flag = false
        state.checkDepart.splice(i, 1)
        break
      }
    }
    if (flag) {
      state.checkDepart.push(val)
    }
  },
  C_checkDepart (state, val) {
    let flag = true
    for (let i = 0; i < state.checkArea.length; i++) {
      if (state.checkArea[i].name === val.name) {
        flag = false
        state.checkArea.splice(i, 1)
        break
      }
    }
    if (flag) {
      state.checkArea.push(val)
    }
  }
}
const store = new Vuex.Store({
  state,
  mutations
})
export default store
