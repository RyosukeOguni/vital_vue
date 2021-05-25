import moment from 'moment'
import axios from 'axios'
moment.locale('ja')

const weatherDate = () => ({
  day: '',
  weather: '',
  temp: '',
  humidity: '',
  room_temp: '',
  room_humidity: '',
})
// OpenWeatherAPIから受け取った天気状態とDB管理するための数値の対応
const wheatherEn = {
  Clear: 1,
  Clouds: 2,
  Rain: 3,
  Snow: 4,
}
// OpenWeatherAPIから受け取った天気状態をDB管理するための数値に置き換える
const wheatherTranslate = (main) => {
  return wheatherEn[main]
}

// dayをmomentに変換し、formatで文字列化
const alrtMsg = (day) => {
  return moment(day).format('YYYY年MM月DD日(ddd)')
}

// 小数点以下の、.0000の桁数を表示
const getDecimalLength = (number) => {
  var numbers = String(number).split('.')
  return numbers[1] ? numbers[1].length : 0
}

const url = process.env.VUE_APP_API_URL + 'weather_records'

export default {
  namespaced: true,
  state: {
    weatherData: {}, // DBから取得した天候情報
    weatherInputData: {}, // OpenWeatherAPIから取得した天候情報と入力用
    weatherValidate: {},
  },

  getters: {
    weatherData: (state) => state.weatherData,
    weatherInputData: (state) => state.weatherInputData,
    weatherValidate: (state) => state.weatherValidate,
  },

  mutations: {
    weatherDataSet(state, payload) {
      state.weatherData = payload
    },
    weatherInputDataSet(state, payload) {
      state.weatherInputData = payload
    },
    // ▼ weatherInputDataの各プロパティに、Inputされた値を入力する
    inputFormWeatherData(state, { name, value }) {
      state.weatherInputData[name] = value
    },
    // ▼ weatherInputData、weatherValidateオブジェクトをリセット
    resetData(state) {
      state.weatherInputData = {}
      state.weatherValidate = {}
    },
    // ▼ weatherDataオブジェクトをリセット
    resetWeatherData(state) {
      state.weatherData = {}
    },
    // ▼ weatherValidateにプロパティと値を追加する
    inputValidate(state, e) {
      state.weatherValidate = e
    },
    // ▼ DBから取得したweatherDataをweatherInputDataにディープコピー
    dataToInput(state) {
      state.weatherInputData = { ...state.weatherData }
    },
  },

  actions: {
    // ▼ 非同期通信で天候情報を登録
    postTodayWeather({ state, commit }) {
      var json = state.weatherInputData
      axios
        .post(url, json)
        .then((response) => {
          console.log(response)
          alert(alrtMsg(response.data.data.attribute.day) + 'の天候情報を登録しました')
          commit('weatherDataSet', response.data.data.attribute)
          commit('resetData')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // ▼ 非同期通信で天候情報を変更
    putTodayWeather({ state, commit }) {
      var json = state.weatherInputData
      axios
        .put(url + '/' + json.id, json)
        .then((response) => {
          console.log(response)
          alert(alrtMsg(response.data.data.attribute.day) + 'の天候情報を変更しました')
          commit('weatherDataSet', response.data.data.attribute)
          commit('resetData')
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // ▼ DBから取得した天候情報をweatherDateに入れる
    async showWeather({ commit }, day) {
      await axios
        .get(url + '?day=' + day)
        .then((response) => {
          console.log(response)
          commit('weatherDataSet', response.data.data.attribute)
        })
        .catch(() => {})
    },

    // ▼ OpenWeatherAPIから今日の天候情報を取得してweatherInputDataに入れる
    inputTodayWeather({ commit }, today) {
      axios
        .get(
          'http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ja&lat=34.6834327&lon=135.5122527&APPID=69007bdad58e58af7e51e0ff3e768857'
        )
        .then((response) => {
          console.log(response)
          let attribute = weatherDate()
          attribute.day = today.format('YYYY-MM-DD')
          attribute.weather = wheatherTranslate(response.data.weather[0].main)
          attribute.temp = Math.round(response.data.main.temp * 10) / 10
          attribute.humidity = response.data.main.humidity
          commit('weatherInputDataSet', attribute)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // ▼ フォームに入力があった場合、weatherInputData{}の対応するキーに値を入れる
    inputForm({ commit }, e) {
      commit('inputFormWeatherData', e)
    },
    // ▼ weatherInputDataの対応する状態に対し、weatherValidateにの対応するキーにエラーメッセージを追加する
    Validate({ commit, state }) {
      let e = {}
      // 内気温のバリデーション
      if (!state.weatherInputData.room_temp) {
        e.room_temp = '内気温を入力してください'
      } else if (getDecimalLength(state.weatherInputData.room_temp) > 1) {
        e.room_temp = '小数点第1位までで入力して下さい'
      } else {
        e.room_temp = ''
      }
      // 内湿度のバリデーション
      if (!state.weatherInputData.room_humidity) {
        e.room_humidity = '内湿度を入力してください'
      } else if (getDecimalLength(state.weatherInputData.room_humidity) > 1) {
        e.room_humidity = '小数点第1位までで入力して下さい'
      } else {
        e.room_humidity = ''
      }
      commit('inputValidate', e)
    },
    // ▼ weatherInputData、weatherValidateをstateから削除
    resetData({ commit }) {
      commit('resetData')
    },
    // ▼ 入力したweatherDateをstateから削除
    resetWeatherData({ commit }) {
      commit('resetWeatherData')
    },
    // ▼ DBから取得したweatherDataをweatherInputDataにディープコピー
    dataToInput({ commit }) {
      commit('dataToInput')
    },
  },
}
