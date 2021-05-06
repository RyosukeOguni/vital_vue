// 時間に関するパッケージをインポート
import moment from 'moment'
import axios from 'axios'

const url = 'http://localhost:8000/api/index/vitals'

// vitalDateオブジェクトを返す
const vitalDate = () => [
  {
    user_id: '',
    weather_record_id: '',
    body_temp: '',
    pulse: '',
    breath: '',
    spo2: '',
    dbp: '',
    sbp: '',
    vital_note: '',
    condition: '',
    mood: '',
    sleep: '',
    breakfast: '',
    lunch: '',
    lunch_amount: '',
    lunch_start: '',
    lunch_end: '',
    snack: '',
    snack_time: '',
    water_intake: '',
    life_note: '',
  },
  {
    voiding_vol1: '',
    voiding_time1: '',
    voiding_memo1: '',
    voiding_vol2: '',
    voiding_time2: '',
    voiding_memo2: '',
    voiding_vol3: '',
    voiding_time3: '',
    voiding_memo3: '',
    defecation_vol1: '',
    defecation_time1: '',
    defecation_memo1: '',
    defecation_vol2: '',
    defecation_time2: '',
    defecation_memo2: '',
    defecation_vol3: '',
    defecation_time3: '',
    defecation_memo3: '',
    total_defecation: '',
    excretion_note: '',
  },
  {
    medicine: '',
    medicine_time: '',
    vomiting: '',
    vomiting_time: '',
    attack1: '',
    attack_time1: '',
    attack_duration1: '',
    attack_memo1: '',
    attack2: '',
    attack_time2: '',
    attack_duration2: '',
    attack_memo2: '',
    attack3: '',
    attack_time3: '',
    attack_duration3: '',
    attack_memo3: '',
    aspiration: '',
    aspiration_time: '',
    aspiration_point: '',
    aspiration_color: '',
    aspiration_type: '',
    aspiration_note: '',
    injection: '',
    injection_start: '',
    injection_end: '',
    injection_point: '',
    injection_vol: '',
    injection_note: '',
    choke: '',
    step: '',
    total_vital_note: '',
  },
]

// jsonからidと名前を抽出して文字列に変換
const alrtMsg = (data) => {
  let msg = ''
  if (Array.isArray(data)) {
    data.forEach((vital) => {
      msg += '【' + vital.id + '：' + vital.name + '】'
    })
  } else {
    let json = data.data.attribute
    msg += '【' + json.id + '：' + json.name + '】'
  }
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
    inputVitalData(state, { name, value, page }) {
      state.vitalData[page][name] = value
    },

    // ▼ vitalValidateにプロパティと値を追加する
    inputValidate(state, e) {
      state.vitalValidate = e
    },

    // ▼ vitalData、vitalValidateオブジェクトをリセット
    resetData(state) {
      // vitalsListオブジェクトを初期化する
      state.vitalsList = []
      // vitalDataオブジェクトを初期化する
      state.vitalData = vitalDate()
      // vitalValidateオブジェクトを空にする
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
        .get(url + '?user_id=' + input.user_id + '&month=' + input.year_month)
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
    async vitalRegist({ dispatch, state }) {
      // jsonで送るデータをオブジェクトのまま取得
      var json = state.vitalData
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
      dispatch('vitalsListSet')
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

    // ▼ 入力したvitalDataをstateから削除
    resetData({ commit }) {
      commit('resetData')
    },

    // ▼ stateのvitalDataの対応する状態に対し、vitalValidateにの対応するキーにエラーメッセージを追加する
    Validate({ commit, state }, page) {
      let e = {}
      // 利用者のバリデーション
      !state.vitalData[page].user_id
        ? (e.user_id = '利用者を選択してください')
        : (e.user_id = '')
      // 天候情報のバリデーション
      !state.vitalData[page].weather_record_id
        ? (e.weather_record_id = '登録された日付を選択して下さい')
        : (e.weather_record_id = '')

      commit('inputValidate', e)
    },

    // ▼ コールバック関数で受け取った処理をそのままmutationsに送る
    stateInput({ commit }, callback) {
      commit('stateInput', callback)
    },
  },
}
