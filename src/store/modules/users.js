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
    // DBから取得したusersをstateに反映
    usersDataSet(state, payload) {
      state.usersList = payload.data.map((data) => {
        let attribute = data.data.attribute
        // DBから取得したUser情報に対して、管理画面で使用するcheckの状態を与える
        attribute = { ...attribute, check: false }
        return attribute
      })
    },
    // チェックボタン押下の状態をstateに反映
    deleteCheck(state, { user, check }) {
      state.usersList = state.usersList.map((data) => {
        if (data === user) {
          data.check = check
        }
        return data
      })
    },
    // DBより削除したuserをstateから削除
    removeUser(state) {
      state.usersList = state.usersList.filter((data) => data.check !== true)
    },
  },
  actions: {
    // チェックボタンでstateの状態を変更
    deleteCheck(context, e) {
      context.commit('deleteCheck', e)
    },
    // 非同期通信でDBからUser一覧データを取得
    async usersDataSet(context) {
      try {
        // 非同期通信でapiからusersを取得
        const response = await axios.get('http://127.0.0.1:8000/api/users')
        // usersをstateに反映
        context.commit('usersDataSet', response.data)
      } catch (reason) {
        console.log(reason.message)
      }
    },
    // 非同期通信でDBからチェックを付けたUserを削除
    async removeUser(context) {
      // stateのusersListから、checkが付いているuserのみをdelete_usersに抽出
      let delete_users = context.state.usersList.filter((data) => data.check === true)
      //delete_usersから、idの値のみをオブジェクトリテラルで配列に入れる
      delete_users = delete_users.map((user) => ({ id: user.id }))
      // オブジェクトリテラルをJson形式に変換
      var json = JSON.stringify(delete_users)
      try {
        // 非同期通信でapiにjson付きで送信
        await axios.post('http://127.0.0.1:8000/api/users/selectdelete', json)
        // DBより削除したuserをstateから削除
        context.commit('removeUser')
      } catch (reason) {
        console.log(reason.message)
      }
    },
  },
}
