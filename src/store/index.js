import { doLogin } from '@/fake/user'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        role: null,
    },
    getters: {
        getRole: (state) => state.role,
        isLogin: (state) => {
            if (!state.role) {
                state.role = localStorage.getItem('abc/role')
            }

            return !!state.role
        },
    },
    mutations: {
        setRole(state, role) {
            localStorage.setItem('abc/role', role)
            state.role = role
        },
    },
    actions: {
        login({ commit }, { username, password }) {
            console.log(username, password)
            const user = doLogin(username, password)
            if (!user) return false
            commit('setRole', user.role)
            return true
        },
    },
})

export default store
