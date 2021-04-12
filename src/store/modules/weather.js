import axios from 'axios'
import moment from 'moment'

const weatherDate = () => ({
  day: '',
  weather: '',
  temp: '',
  diagnosis: '',
  humidity: '',
  room_temp: '',
  room_humidity: '',
})

const WeatherType = {
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
    WeatherData: (state) => state.weatherData,
    WeatherValidate: (state) => state.weatherValidate,
    WeatherType: () => WeatherType,
  },
  mutations: {
    weatherDataSet(state, payload) {
      let attribute = payload
      attribute.day = moment(attribute.day)
      state.weatherData = attribute
    },
    // ▼ WeatherDataの各プロパティに、Inputされた値を入力する
    inputWeatherData(state, { name, text }) {
      state.WeatherData[name] = text
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
  },
  actions: {
    async showTodayWeather({ commit }, response) {
      response !== null
        ? commit('weatherDataSet', response.data.data.attribute)
        : commit('weatherDataSet', weatherDate())
    },
    // ▼ フォームに入力があった場合、UserData{}の対応するキーに値を入れる
    inputForm({ commit }, e) {
      commit('inputWeatherData', e)
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
