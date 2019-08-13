import Vue from 'vue'
import Vuex from 'vuex'
import api from "../api/index"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        examType: [],
        subjectType: [],
        questionsType: [],
        identity: [],
        user: [],
        apiauthorityFn: [],
        viewauthority: []
    },
    mutations: {
        //获取所有的考试类型
        examTypeFn(state, data) {
            state.examType = data
        },
        //获取所有的课程
        subjectFn(state, data) {
            state.subjectType = data
        },
         //获取所有的试题类型
        questionsFn(state, data) {
            state.questionsType = data
        },
        // 获取身份
        identityFn(state, data) {
            state.identity = data
        },
         //获取用户信息
        userFn(state, data) {
            state.user = data
        },
         //api接口权限
        apiauthorityFn(state, data) {
            let newArr = []
            data.forEach(item => {
                let flag = newArr.find(ele => ele.api_authority_text === item.api_authority_text)
                if(!flag){
                    newArr.push(item)
                }
            })
            state.apiauthorityFn = newArr
        },
        //视图接口权限
        viewauthorityFn(state,data){
            let newArr = []
            data.forEach(item => {
                let flag = newArr.find(ele => ele.view_authority_text === item.view_authority_text)
                if(!flag){
                    newArr.push(item)
                }
            })
            state.viewauthority = newArr
        }
    },
    actions: {
        //获取所有的考试类型
        getExam({ commit }) {
            api.examType().then(res => {
                commit('examTypeFn', res.data)
            })
        },
        //获取所有的课程
        getSub({ commit }) {
            api.subject().then(res => {
                commit('subjectFn', res.data)
            })
        },
        //获取所有的试题类型
        getQuestionsType({ commit }) {
            api.getQuestionsType().then(res => {
                commit('questionsFn', res.data)
            })
        },
        // 获取身份
        getIdentity({ commit }) {
            api.identity().then(res => {
                commit('identityFn', res.data)
            })
        },
        //获取用户信息
        getUser({ commit }) {
            api.user().then(res => {
                commit('userFn', res.data)
            })
        },
        //api接口权限
        getApiAuthority({ commit }) {
            api.identityApiAuthorityRelation().then(res => {
                commit('apiauthorityFn', res.data)
            })
        },
        //视图接口权限
        getViewAuthority({ commit }) {
            api.identityViewAuthorityRelation().then(res => {
                commit('viewauthorityFn', res.data)
            })
        }
    }
})