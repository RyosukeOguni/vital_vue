import axios from 'axios'
export default {
  namespaced: true,
  state: {
    usersList: [],
    userData: {},
    paginationNUmber: 1,
  },
  getters: {
    usersList: (state) => state.usersList,
    userData: (state) => state.userData,
  },
  mutations: {
    usersDataSet(state, payload) {
      state.usersList = payload.data.map((data) => data.data.attribute)
    },
  },
  actions: {
    async usersDataSet(context) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users')
        context.commit('usersDataSet', response.data)
      } catch (reason) {
        console.log(reason.message)
      }
    },
  },
}
