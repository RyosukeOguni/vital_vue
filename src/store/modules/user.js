import axios from 'axios'

// userDateオブジェクトを返す
const userDate = () => ({
  name: '',
  age: '',
  sex: '',
  diagnosis: '',
  note: '',
})

const sexList = [
  { value: '1', name: '男' },
  { value: '2', name: '女' },
  { value: '9', name: '適用不能' },
]

const url = 'http://localhost:8000/api/users'

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
    usersList: (state) =>
      // ライブラリMomentのインスタンスcreated_atを比較して降順に並び替え
      state.usersList.sort((a, b) => {
        return b.created_at - a.created_at
      }),
    userData: (state) => state.userData,
    sexList: () => sexList,
    userValidate: (state) => state.userValidate,
  },

  mutations: {
    // ▼ DBから取得した利用者一覧をstateに反映
    usersListSet(state, payload) {
      state.usersList = payload.data.map((data) => {
        // jsonからattribute項目を抽出
        let attribute = data.data.attribute
        // timedate型の文字列created_atをMomentインスタンスに変換
        attribute.created_at = moment(attribute.created_at)
        // DBから取得したUser情報に、管理画面で使用するcheckの状態を与える
        attribute = { ...attribute, check: false }
        return attribute
      })
    },

    // ▼ DBから取得した利用者１件をstateに反映
    userDataSet(state, payload) {
      let attribute = payload.data.attribute
      delete attribute.created_at
      state.userData = attribute
    },

    // ▼ チェックボタン押下の状態をstate.usersListに反映
    deleteCheck(state, { user, check }) {
      state.usersList = state.usersList.map((data) => {
        // payloadされたuserオブジェクトをリストと比較して、同じであればチェック状態を変更
        if (data === user) {
          data.check = check
        }
        return data
      })
    },

    // ▼ userDataの各プロパティに、Inputされた値を入力する
    inputUserData(state, { name, value }) {
      state.userData[name] = value
    },

    // ▼ userValidateにプロパティと値を追加する
    inputValidate(state, e) {
      state.userValidate = e
    },

    // ▼ userData、userValidateオブジェクトをリセット
    resetData(state) {
      // userDataオブジェクトを初期化する
      state.userData = userDate()
      // userValidateオブジェクトを空にする
      state.userValidate = {}
    },
  },

  actions: {
    // ▼ 削除チェックボックスの動作
    deleteCheck({ commit }, e) {
      commit('deleteCheck', e)
    },

    // ▼ 非同期通信でDBから利用者一覧データを取得
    async usersListSet({ commit }) {
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

    // ▼ 非同期通信でapiから利用者１件を取得
    async showUser({ commit }, id) {
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

    // ▼ フォームに入力があった場合、UserData{}の対応するキーに値を入れる
    inputForm({ commit }, e) {
      commit('inputUserData', e)
    },

    // ▼ 入力したuserDataをstateから削除
    resetData({ commit }) {
      commit('resetData')
    },

    // ▼ stateのuserDataの対応する状態に対し、userValidateにの対応するキーにエラーメッセージを追加する
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
