// 時間に関するパッケージをインポート
import moment from 'moment'
import axios from 'axios'

const indexurl = 'http://localhost:8000/api/index/vitals'
const url = 'http://localhost:8000/api/vitals'

// vitalDateオブジェクトを返す
const vitalDate = () => ({
  user_id: null,
  user_data: {
    name: null,
    age: null,
    sex: null,
    diagnosis: null,
  },
  weather_record_id: '',
  weather_data: {
    day: null,
    weather: null,
    temp: null,
    humidity: null,
    room_temp: null,
    room_humidity: null,
  },
  body_temp: 0,
  pulse: 0,
  breath: null,
  spo2: 0,
  dbp: 0,
  sbp: 0,
  vital_note: null,
  condition: null,
  mood: null,
  sleep: null,
  breakfast: null,
  lunch: null,
  lunch_amount: null,
  lunch_start: null,
  lunch_end: null,
  snack: null,
  snack_time: null,
  water_intake: null,
  life_note: null,
  voiding_vol1: null,
  voiding_time1: null,
  voiding_memo1: null,
  voiding_vol2: null,
  voiding_time2: null,
  voiding_memo2: null,
  voiding_vol3: null,
  voiding_time3: null,
  voiding_memo3: null,
  defecation_vol1: null,
  defecation_time1: null,
  defecation_memo1: null,
  defecation_vol2: null,
  defecation_time2: null,
  defecation_memo2: null,
  defecation_vol3: null,
  defecation_time3: null,
  defecation_memo3: null,
  total_defecation: 0,
  excretion_note: null,
  medicine: null,
  medicine_time: null,
  vomiting: null,
  vomiting_time: null,
  attack1: null,
  attack_time1: null,
  attack_duration1: null,
  attack_memo1: null,
  attack2: null,
  attack_time2: null,
  attack_duration2: null,
  attack_memo2: null,
  attack3: null,
  attack_time3: null,
  attack_duration3: null,
  attack_memo3: null,
  aspiration: null,
  aspiration_time: null,
  aspiration_point: null,
  aspiration_color: null,
  aspiration_type: null,
  aspiration_note: null,
  injection: null,
  injection_start: null,
  injection_end: null,
  injection_point: null,
  injection_vol: null,
  injection_note: null,
  choke: 0,
  step: null,
  total_vital_note: null,
})

// jsonからidと名前を抽出して文字列に変換
const alrtMsg = (data) => {
  let msg = ''
  let json = data.data.attribute
  msg += '【' + json.weather_data.day + '：' + json.user_data.name + '】'
  return msg
}

export default {
  namespaced: true,
  state: {
    vitalsList: [],
    vitalData: vitalDate(),
    vitalValidate: {},
  },

  getters: {
    vitalsList: (state) => state.vitalsList,
    vitalData: (state) => state.vitalData,
    vitalValidate: (state) => state.vitalValidate,
  },

  mutations: {
    // ▼ DBから取得したバイタル一覧をstateに反映
    vitalsListSet(state, payload) {
      state.vitalsList = payload.data.map((data) => {
        let attribute = data.data.attribute
        // timedate型の文字列dayをMomentインスタンスに変換
        attribute.day = moment(attribute.day)
        return attribute
      })
    },

    // ▼ DBから取得した利用者１件をstateに反映
    vitalDataSet(state, payload) {
      let attribute = payload.data.attribute
      delete attribute.created_at
      state.vitalData = attribute
    },

    // ▼ vitalDataの各プロパティに、Inputされた値を入力する
    inputVitalData(state, { name, value }) {
      state.vitalData[name] = value
    },

    // ▼ vitalValidateにプロパティと値を追加する
    inputValidate(state, callback) {
      callback(state)
    },

    // ▼ vitalData、vitalValidateオブジェクトを初期化
    resetData(state) {
      state.vitalsList = []
      state.vitalData = vitalDate()
      state.vitalValidate = {}
    },

    resetValidate(state) {
      state.vitalValidate = {}
    },

    // コールバック関数で受け取った処理をstateに行う
    stateInput(state, callback) {
      callback(state)
    },
  },

  actions: {
    // ▼ 非同期通信でDBからバイタル一覧データを取得
    vitalsListSet({ commit }, input) {
      axios
        .get(indexurl + '?user_id=' + input.user_id + '&month=' + input.year_month)
        .then((response) => {
          console.log(response)
          // vitalをstateに反映
          commit('vitalsListSet', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // ▼ 非同期通信でapiから利用者１件を取得
    async showVital({ commit }, id) {
      await axios
        .get(url + '/' + id)
        .then((response) => {
          console.log(response)
          // vitalsをstateに反映
          commit('vitalDataSet', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // ▼ 非同期通信でVitalDataをDBに登録
    async vitalRegist({ state }) {
      // jsonで送るデータをオブジェクトのまま取得
      var json = state.vitalData
      delete json.weather_data
      delete json.user_data
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
    },

    // ▼ 非同期通信でDBからVitalDataを更新
    async vitalEdit({ dispatch, state }) {
      // jsonで送るデータをオブジェクトのまま取得
      var json = state.vitalData
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
      dispatch('vitalsListSet')
    },

    // ▼ フォームに入力があった場合、VitalData{}の対応するキーに値を入れる
    inputForm({ commit }, e) {
      commit('inputVitalData', e)
    },

    // ▼ stateのvitalDataの対応する状態に対し、vitalValidateにの対応するキーにエラーメッセージを追加する
    Validate({ commit }, callback) {
      commit('inputValidate', callback)
    },

    // ▼ 入力したvitalDataをstateから削除
    resetData({ commit }) {
      commit('resetData')
    },

    // ▼ vitalValidateをstateから削除
    resetValidate({ commit }) {
      commit('resetValidate')
    },

    // ▼ コールバック関数で受け取った処理をそのままmutationsに送る
    stateInput({ commit }, callback) {
      commit('stateInput', callback)
    },
  },
}
