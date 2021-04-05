import axios from 'axios'

const userData = {
  name: '',
  age: '',
  sex: '',
  diagnosis: '',
  note: '',
}

const sexList = [
  { value: '1', name: '男' },
  { value: '2', name: '女' },
  { value: '9', name: '適用不能' },
]

const url = 'http://localhost:8000/api/users'

import moment from 'moment'
export default {
  namespaced: true,

  state: {
    usersList: [],
    userData: userData,
    userValidate: userData,
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
    usersDataSet(state, payload) {
      state.usersList = payload.data.map((data) => {
        let attribute = data.data.attribute
        attribute.created_at = moment(attribute.created_at)
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
    // DBより削除したusersをstateから削除
    removeUsersList(state) {
      state.usersList = state.usersList.filter((data) => data.check !== true)
    },
    // userDateオブジェクトのプロパティに入力する
    inputUserData(state, { name, text }) {
      state.userData[name] = text
    },
    // userDateオブジェクトのプロパティを空にする
    resetUserData(state) {
      Object.keys(state.userData).forEach((key) => {
        state.userData[key] = ''
      })
      state.userValidate = {}
    },
    // userValidateに値を追加する
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
    async usersDataSet({ commit }) {
      // 非同期通信でapiからusersを取得
      await axios
        .get(url)
        .then((response) => {
          console.log(response)
          // usersをstateに反映
          commit('usersDataSet', response.data)
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
      // 非同期通信でapiにjsonで削除対象を送信
      await axios
        .post(url + '/selectdelete', delete_users)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      // DBより削除したuserをstateから削除
      commit('removeUsersList')
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
      dispatch('usersDataSet')
    },

    // ▼ 入力したしたuserDataをstateから削除
    resetUserData({ commit }) {
      commit('resetUserData')
    },
    // stateのuserDateの対応する状態に対し、userValidateにの対応するキーにエラーメッセージを追加する
    Validate({ commit, state }) {
      let e = {}
      if (!state.userData.name) {
        e.name = '名前を入力してください'
      } else {
        delete e.name
      }
      if (!state.userData.age) {
        e.age = '年齢を入力してください'
      } else {
        delete e.age
      }
      if (!state.userData.sex) {
        e.sex = '性別を選択してください'
      } else {
        delete e.sex
      }
      if (!state.userData.diagnosis) {
        e.diagnosis = '診断名を入力してください'
      } else {
        delete e.diagnosis
      }
      commit('inputValidate', e)
    },
  },
}
