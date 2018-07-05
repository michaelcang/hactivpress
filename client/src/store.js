import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    articles: '',
    isLoggedIn: ''
  },
  mutations: {
    username (state, payload) {
      state.username = payload
    },
    articles (state, payload) {
      state.articles = payload
    },
    isLoggedIn (state, payload) {
      state.isLoggedIn = payload
    }
  },
  actions: {
    getLogin ({ commit }, payload) {
      axios
        .post('http://localhost:3000/login', payload)
        .then(({ data }) => {
          if (data.token) {
            commit('isLoggedIn', true)
            commit('username', data.username)
            localStorage.setItem('username', data.username)
            localStorage.setItem('token', data.token)
            router.push('/')
            swal({
              title: 'Login successful!',
              text: 'Please feel free to post an article',
              icon: 'success'
            })
          } else {
            swal({
              title: 'Error!',
              text: 'Wrong Username / Password',
              icon: 'error'})
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getRegister ({ commit }, payload) {
      axios
        .post('http://localhost:3000/register', payload)
        .then(({ data }) => {
          if (data.token) {
            commit('isLoggedIn', true)
            commit('username', data.username)
            localStorage.setItem('username', data.username)
            localStorage.setItem('token', data.token)
            router.push('/')
            swal({
              title: 'Register successful!',
              text: 'Please feel free to post an article',
              icon: 'success'
            })
          } else {
            swal({
              title: 'Error!',
              text: 'Please fill all boxes',
              icon: 'error'})
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      commit('isLoggedIn', false)
      commit('username', '')
      router.push('/login')
      swal({
        text: 'You are logged out!',
        icon: 'success'
      })
    }
  }
})
