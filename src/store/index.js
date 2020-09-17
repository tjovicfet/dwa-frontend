import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    korisnik: {},
  },
  mutations: {
    postaviKorisnika (state, payload) {
      state.korisnik = payload
    }
  },
  getters: {
    dohvatiKorisnika: state => {
      return state.korisnik
    }
  }
})
