import axios from 'axios'
import moment from 'moment'

const weatherDate = () => ({
  day: '',
  weather: '',
  temp: '',
  humidity: '',
  room_temp: '',
  room_humidity: '',
})

const weatherType = {
  1: '晴れ',
  2: '曇りのち晴れ',
  3: '曇り',
  4: '小雨',
  5: '雨',
  6: '雪',
}

const url = 'http://localhost:8000/api/weather_records'

export default {
  namespaced: true,
  state: {
    weatherData: {},
    weatherValidate: {},
  },
  getters: {
    weatherData: (state) => state.weatherData,
    weatherValidate: (state) => state.weatherValidate,
    weatherType: () => weatherType,
  },
  mutations: {
    weatherDataSet(state, payload) {
      let attribute = payload
      attribute.day = moment(attribute.day)
      state.weatherData = attribute
    },
    // ▼ weatherDataの各プロパティに、Inputされた値を入力する
    inputweatherData(state, { name, text }) {
      state.weatherData[name] = text
    },
    // ▼ weatherValidateにプロパティと値を追加する
    weatherValidate(state, e) {
      state.weatherValidate = e
    },
    // ▼ userData、userValidateオブジェクトをリセット
    resetData(state) {
      // userDataオブジェクトを初期化する
      state.weatherDate = weatherDate()
      // userValidateオブジェクトを空にする
      state.weatherValidate = {}
    },
    // ▼ weatherValidateにプロパティと値を追加する
    inputValidate(state, e) {
      state.weatherValidate = e
    },
  },
  actions: {
    async showTodayWeather({ commit }, response) {
      response !== null
        ? commit('weatherDataSet', response.data.data.attribute)
        : commit('weatherDataSet', weatherDate())
    },
    async getTodayWeather({ commit }, day) {
      await axios
        .get(
          'http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ja&lat=34.6834327&lon=135.5122527&APPID=69007bdad58e58af7e51e0ff3e768857'
        )
        .then((response) => {
          console.log(response)
          let attribute = weatherDate()
          attribute.day = day.format('YYYY-MM-DD')
          attribute.weather = response.data.weather[0].description
          attribute.temp = response.data.main.temp
          attribute.humidity = response.data.main.humidity
          commit('weatherDataSet', attribute)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // ▼ フォームに入力があった場合、UserData{}の対応するキーに値を入れる
    inputForm({ commit }, e) {
      commit('inputweatherData', e)
    },
    // ▼ stateのuserDataの対応する状態に対し、userValidateにの対応するキーにエラーメッセージを追加する
    Validate({ commit, state }) {
      let e = {}
      !state.weatherData.room_temp
        ? (e.room_temp = '内気温を入力してください')
        : (e.room_temp = '')
      !state.weatherData.room_humidity
        ? (e.room_humidity = '内湿度を選択してください')
        : (e.room_humidity = '')
      commit('inputValidate', e)
    },
    // ▼ 入力したuserDataをstateから削除
    resetData({ commit }) {
      commit('resetData')
    },
  },
}
