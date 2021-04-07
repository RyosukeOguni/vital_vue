import axios from 'axios'

// コンストラクター関数でuserDataのプロパティを定義
function User() {
  this.name = ''
  this.age = ''
  this.sex = ''
  this.diagnosis = ''
  this.note = ''
}

const sexList = [
  { value: '1', name: '男' },
  { value: '2', name: '女' },
  { value: '9', name: '適用不能' },
]

const url = 'http://localhost:8000/api/users'

// 時間に関するパッケージをインポート
import moment from 'moment'
export default {
  namespaced: true,

  state: {
    usersList: [],
    userData: new User(),
    userValidate: {},
    paginationNUmber: 1,
  },

  getters: {
    usersList: (state) =>
      // ライブラリmomentのcreated_atを比較して降順に並び替え
      state.usersList.sort((a, b) => {
        return b.created_at - a.created_at
      }),
    userData: (state) => state.userData,
    sexList: () => sexList,
    userValidate: (state) => state.userValidate,
  },

  mutations: {
    // DBから取得したusersをstateに反映
    usersListSet(state, payload) {
      state.usersList = payload.data.map((data) => {
        let attribute = data.data.attribute
        attribute.created_at = moment(attribute.created_at)
        // DBから取得したUser情報に対して、管理画面で使用するcheckの状態を与える
        attribute = { ...attribute, check: false }
        return attribute
      })
    },

    // DBから取得したuserをstateに反映
    userDataSet(state, payload) {
      let attribute = payload.data.attribute
      delete attribute.created_at
      state.userData = attribute
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

    // DBより削除したusersをstateから削除
    removeUsersList(state) {
      state.usersList = state.usersList.filter((data) => data.check !== true)
    },

    // userDataオブジェクトのプロパティに入力する
    inputUserData(state, { name, text }) {
      state.userData[name] = text
    },

    // userData、userValidateオブジェクトをリセット
    resetData(state) {
      // userDataオブジェクトのプロパティを空にする
      // Object.keys(state.userData).forEach((key) => {
      //   state.userData[key] = ''
      // })
      state.userData = new User()
      // userValidateオブジェクトを空にする
      state.userValidate = {}
    },

    // userValidateにプロパティと値を追加する
    inputValidate(state, e) {
      state.userValidate = e
    },
  },

  actions: {
    // ▼ チェックボタンでstateの状態を変更
    deleteCheck({ commit }, e) {
      commit('deleteCheck', e)
    },

    // ▼ 非同期通信でDBからUser一覧データを取得
    async usersListSet({ commit }) {
      // 非同期通信でapiからusersを取得
      await axios
        .get(url)
        .then((response) => {
          console.log(response)
          // userをstateに反映
          commit('usersListSet', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async showUser({ commit }, id) {
      // 非同期通信でapiからuser一件を取得
      await axios
        .get(url + '/' + id)
        .then((response) => {
          console.log(response)
          // usersをstateに反映
          commit('userDataSet', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // ▼ 非同期通信でDBからチェックを付けたUserを削除
    async removeUsersList({ commit, state }) {
      // stateのusersListから、checkが付いているuserのみをdelete_usersに抽出
      let delete_users = state.usersList.filter((data) => data.check === true)
      //delete_usersから、idの値のみをオブジェクトリテラルで配列に入れる
      delete_users = delete_users.map((user) => ({ id: user.id }))
      // DBより削除したuserをstateから削除
      commit('removeUsersList')
      // 非同期通信でapiにjsonで削除対象を送信
      await axios
        .post(url + '/selectdelete', delete_users)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // ▼ フォームに入力があった場合、UserData{}の対応するキーに値を入れる
    inputForm({ commit }, e) {
      commit('inputUserData', e)
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
    // stateのuserDataの対応する状態に対し、userValidateにの対応するキーにエラーメッセージを追加する
    Validate({ commit, state }) {
      let e = {}
      !state.userData.name ? (e.name = '名前を入力してください') : (e.name = '')
      !state.userData.age && state.userData.age !== 0
        ? (e.age = '年齢を入力してください')
        : (e.age = '')
      !state.userData.sex ? (e.sex = '性別を選択してください') : (e.sex = '')
      !state.userData.diagnosis
        ? (e.diagnosis = '診断名を入力してください')
        : (e.diagnosis = '')
      commit('inputValidate', e)
    },
  },
}
