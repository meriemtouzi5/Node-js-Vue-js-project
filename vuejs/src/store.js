import axios from 'axios';
import { createStore } from 'vuex';

export default new createStore({
  state: {
    message: ''
  },
  mutations: {
    setMessage(state, message) {
      state.message = message;
    }
  },
  actions: {
    fetchMessage({ commit }) {
      axios.get('http://localhost:3000/api/data')
        .then(response => {
          commit('setMessage', response.data.message);
        })
        .catch(error => {
          console.error("There was an error fetching data:", error);
        });
    }
  },
  getters: {
    message: state => state.message
  }
});
