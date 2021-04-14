import axios from 'axios'

const weatherDate = () => ({
  day: '',
  weather: '',
  temp: '',
  humidity: '',
  room_temp: '',
  room_humidity: '',
})

const wheatherEn = {
  Clear: 1,
  Clouds: 2,
  Rain: 3,
  Snow: 4,
}

const wheatherJp = {
  1: '晴れ',
  2: '曇り',
  3: '雨',
  4: '雪',
}

const wheatherTranslate = (main) => {
  return wheatherEn[main]
}

export default {
  namespaced: true,
  state: {
    weatherData: {},
    weatherValidate: {},
  },

  getters: {
    weatherData: (state) => state.weatherData,
    weatherValidate: (state) => state.weatherValidate,
    wheatherJp: () => wheatherJp,
  },

  mutations: {
    weatherDataSet(state, payload) {
      state.weatherData = payload
    },
    // ▼ weatherDataの各プロパティに、Inputされた値を入力する
    inputweatherData(state, { name, text }) {
      state.weatherData[name] = text
    },
    // ▼ weatherValidateにプロパティと値を追加する
    weatherValidate(state, e) {
      state.weatherValidate = e
    },
    // ▼ weatherDate、weatherValidateオブジェクトをリセット
    resetData(state) {
      // weatherDateオブジェクトを初期化する
      state.weatherDate = {}
      // weatherValidateオブジェクトを空にする
      state.weatherValidate = {}
    },
    // ▼ weatherValidateにプロパティと値を追加する
    inputValidate(state, e) {
      state.weatherValidate = e
    },
  },

  actions: {
    showTodayWeather({ commit }, response) {
      response !== null
        ? commit('weatherDataSet', response.data.data.attribute)
        : commit('weatherDataSet', weatherDate())
    },
    getTodayWeather({ commit }) {
      axios
        .get(
          'http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ja&lat=34.6834327&lon=135.5122527&APPID=69007bdad58e58af7e51e0ff3e768857'
        )
        .then((response) => {
          console.log(response)
          let attribute = weatherDate()
          attribute.day = moment().format()
          attribute.weather = wheatherTranslate(response.data.weather[0].main)
          attribute.temp = Math.round(response.data.main.temp * 10) / 10
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
    // ▼ stateのweatherDateの対応する状態に対し、weatherValidateにの対応するキーにエラーメッセージを追加する
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
    // ▼ 入力したweatherDateをstateから削除
    resetData({ commit }) {
      commit('resetData')
    },
  },
}
