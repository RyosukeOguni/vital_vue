import axios from 'axios'

// userDateオブジェクトを返す
const userDate = () => ({
  name: '',
  age: 0,
  sex: null,
  diagnosis: '',
  note: '',
})

const url = process.env.VUE_APP_API_URL + 'users'

// jsonからidと名前を抽出して文字列に変換
const alrtMsg = (data) => {
  let msg = ''
  if (Array.isArray(data)) {
    data.forEach((user) => {
      msg += '【' + user.id + '：' + user.name + '】'
    })
  } else {
    let json = data.data.attribute
    msg += '【' + json.id + '：' + json.name + '】'
  }
  return msg
}

// 時間に関するパッケージをインポート
import moment from 'moment'
export default {
  namespaced: true,

  state: {
    usersList: [],
    userData: userDate(),
    userValidate: {},
  },

  getters: {
    usersList: (state) => state.usersList,
    userData: (state) => state.userData,
    userValidate: (state) => state.userValidate,
  },

  mutations: {
    // ▼ userData、userValidateオブジェクトをリセット
    resetData(state) {
      state.userData = userDate()
      state.userValidate = {}
    },
    // ▼ コールバック関数で受け取った処理をstateに行う
    stateInput(state, callback) {
      callback(state)
    },
  },

  actions: {
    // ▼ 非同期通信でDBから利用者一覧データを取得
    async usersListSet({ commit }) {
      await axios
        .get(url)
        .then((response) => {
          console.log(response)
          // userをstateに反映
          commit('stateInput', (state) => {
            state.usersList = response.data.data.map((data) => {
              let attribute = data.data.attribute
              // timedate型の文字列created_atをMomentインスタンスに変換
              attribute.created_at = moment(attribute.created_at)
              // DBから取得したUser情報に、管理画面で使用するcheckの状態を与える
              attribute = { ...attribute, check: false }
              return attribute
            })
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // ▼ 非同期通信でapiから利用者１件を取得
    async showUser({ commit }, id) {
      await axios
        .get(url + '/' + id)
        .then((response) => {
          console.log(response)
          // usersをstateに反映
          commit('stateInput', (state) => {
            let attribute = response.data.data.attribute
            delete attribute.created_at
            state.userData = attribute
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // ▼ 非同期通信でDBからチェックを付けたUserを削除
    async removeUsersList({ dispatch, state }) {
      // stateのusersListから、checkが付いているuserのみをdelete_usersに抽出
      let delete_users = state.usersList.filter((data) => data.check === true)
      // delete_usersから、idと名前のみをオブジェクトリテラルで配列に入れる
      let json = delete_users.map((user) => ({ id: user.id, name: user.name }))
      // 非同期通信でapiにjsonで削除対象を送信
      !!json.length &&
        (await axios
          .post(url + '/selectdelete', json)
          .then((response) => {
            console.log(response)
            // DBへの削除が完了したら、新しいDB情報をstateに再取得する
            dispatch('usersListSet')
            alert(alrtMsg(json) + 'を削除しました')
          })
          .catch((error) => {
            console.log(error)
          }))
    },

    // ▼ 非同期通信でUserDataをDBに登録
    async userRegist({ dispatch, state }) {
      // jsonで送るデータをオブジェクトのまま取得
      var json = state.userData
      // 非同期通信でapiにjsonで送信
      await axios
        .post(url, json)
        .then((response) => {
          console.log(response)
          alert(alrtMsg(response.data) + 'を登録しました')
        })
        .catch((error) => {
          console.log(error)
        })
      // DBへの登録が完了したら、新しいDB情報をstateに再取得する
      dispatch('usersListSet')
    },

    // ▼ 非同期通信でDBからUserDataを更新
    async userEdit({ dispatch, state }) {
      // jsonで送るデータをオブジェクトのまま取得
      var json = state.userData
      // 非同期通信でapiにjsonで送信
      await axios
        .put(url + '/' + json.id, json)
        .then((response) => {
          console.log(response)
          alert(alrtMsg(response.data) + 'を変更しました')
        })
        .catch((error) => {
          console.log(error)
        })
      // DBへの登録が完了したら、新しいDB情報をstateに再取得する
      dispatch('usersListSet')
    },

    // ▼ 入力したuserDataをstateから削除
    resetData({ commit }) {
      commit('resetData')
    },

    // ▼ コールバック関数で受け取った処理をそのままmutationsに送る
    stateInput({ commit }, callback) {
      commit('stateInput', callback)
    },
  },
}
