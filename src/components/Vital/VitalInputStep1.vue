<template>
  <section class="col-md-12">
    <section class="mt-4">
      <h3>利用者</h3>
      <ul class="row list-unstyled">
        <li class="col-md-4">
          <InputForm
            :selectlist="userNameList"
            name="user_id"
            :value="vitalData.user_id"
            :validate="vitalValidate.user_id"
            @inputForm="inputForm"
            >利用者</InputForm
          >
        </li>
        <li class="col-md-2 col-6">
          <InputForm type="number" :value="userData.age" fill>年齢</InputForm>
        </li>
        <li class="col-md-2 col-6">
          <InputForm :selectlist="selectList('sex')" name="sex" :value="userData.sex" fill
            >性別</InputForm
          >
        </li>
        <li class="col-md-4">
          <InputForm type="text" name="diagnosis" :value="userData.diagnosis" fill
            >診断名</InputForm
          >
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>記録日／天候</h3>
      <ul class="row list-unstyled">
        <li class="col-md-4">
          <InputForm
            type="date"
            name="weather_record_id"
            :value="weatherSelect.day"
            :validate="vitalValidate.weather_record_id"
            @inputForm="selectDays"
            >日付</InputForm
          >
        </li>
        <li class="col-md-4">
          <InputForm
            :selectlist="selectList('weather')"
            name="weather"
            :value="weatherSelect.weather"
            fill
            >天気</InputForm
          >
        </li>
        <li class="w-100"></li>
        <li class="col-md-3 col-6">
          <InputForm type="number" name="temp" :value="weatherSelect.temp" fill
            >外気温(℃)</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm type="number" name="room_temp" :value="weatherSelect.room_temp" fill
            >内気温(℃)</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm type="number" name="humidity" :value="weatherSelect.humidity" fill
            >外湿度(％)</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            type="number"
            name="room_humidity"
            :value="weatherSelect.room_humidity"
            fill
            >内湿度(％)</InputForm
          >
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>バイタル</h3>
      <ul class="row list-unstyled">
        <li class="col-md-3 col-6">
          <InputForm
            type="number"
            name="body_temp"
            :value="vitalData.body_temp"
            :validate="vitalValidate.body_temp"
            @inputForm="inputForm"
            >体温(℃)</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            type="number"
            name="pulse"
            :value="vitalData.pulse"
            :validate="vitalValidate.pulse"
            @inputForm="inputForm"
            >脈拍(bpm)</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="selectList('breath')"
            name="breath"
            :value="vitalData.breath"
            :validate="vitalValidate.breath"
            @inputForm="inputForm"
            >呼吸頻度</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            type="number"
            name="spo2"
            :value="vitalData.spo2"
            :validate="vitalValidate.spo2"
            @inputForm="inputForm"
            >SPO2(％)</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            type="number"
            name="dbp"
            :value="vitalData.dbp"
            :validate="vitalValidate.dbp"
            @inputForm="inputForm"
            >血圧(拡張)</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            type="number"
            name="sbp"
            :value="vitalData.sbp"
            :validate="vitalValidate.sbp"
            @inputForm="inputForm"
            >血圧(収縮)</InputForm
          >
        </li>
        <li class="w-100"></li>
        <li class="col-md-12">
          <InputForm
            type="text"
            name="vital_note"
            :value="vitalData.vital_note"
            :validate="vitalValidate.vital_note"
            @inputForm="inputForm"
            >バイタル備考</InputForm
          >
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>生活記録</h3>
      <ul class="row list-unstyled">
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="selectList('mood')"
            name="condition"
            :value="vitalData.condition"
            :validate="vitalValidate.condition"
            @inputForm="inputForm"
            >体調</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="selectList('mood')"
            name="mood"
            :value="vitalData.mood"
            :validate="vitalValidate.mood"
            @inputForm="inputForm"
            >機嫌</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="selectList('sleep')"
            name="sleep"
            :value="vitalData.sleep"
            :validate="vitalValidate.sleep"
            @inputForm="inputForm"
            >睡眠</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="selectList('breakfast')"
            name="breakfast"
            :value="vitalData.breakfast"
            :validate="vitalValidate.breakfast"
            @inputForm="inputForm"
            >朝食</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="bool"
            name="lunch"
            :value="vitalData.lunch"
            :validate="vitalValidate.lunch"
            @inputForm="inputForm"
            >昼食</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="selectList('lunchAmount')"
            name="lunch_amount"
            :value="vitalData.lunch_amount"
            :validate="vitalValidate.lunch_amount"
            :fill="!vitalData.lunch"
            @inputForm="inputForm"
            >昼食量</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="daytime"
            name="lunch_start"
            :value="vitalData.lunch_start"
            :validate="vitalValidate.lunch_start"
            :fill="!vitalData.lunch"
            @inputForm="inputForm"
            >昼食開始時間</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="daytime"
            name="lunch_end"
            :value="vitalData.lunch_end"
            :validate="vitalValidate.lunch_end"
            :fill="!vitalData.lunch"
            @inputForm="inputForm"
            >昼食終了時間</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="bool"
            name="snack"
            :value="vitalData.snack"
            :validate="vitalValidate.snack"
            @inputForm="inputForm"
            >おやつ</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="daytime"
            name="snack_time"
            :value="vitalData.snack_time"
            :validate="vitalValidate.snsnack_timeack"
            :fill="!vitalData.snack"
            @inputForm="inputForm"
            >おやつ時間</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="selectList('waterIntake')"
            name="water_intake"
            :value="vitalData.water_intake"
            :validate="vitalValidate.water_intake"
            @inputForm="inputForm"
            >摂取水分量</InputForm
          >
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import InputForm from '@/components/Common/InputForm.vue'
import SelectModule from '@/mixins/select'
import axios from 'axios'

export default {
  name: 'VitalInputStep1',
  components: {
    InputForm,
  },
  mixins: [SelectModule], //ミックスインでcomputedを共通化
  data() {
    return {
      weatherSelect: {},
    }
  },
  computed: {
    userNameList() {
      return this.usersList.map((data) => ({
        value: data.id,
        name: data.id + '：' + data.name,
      }))
    },
    weatherData() {
      return this.$store.getters['weather/weatherData']
    },
    usersList() {
      return this.$store.getters['user/usersList']
    },
    vitalData() {
      return this.$store.getters['vital/vitalData'][0]
    },
    vitalValidate() {
      return this.$store.getters['vital/vitalValidate']
    },
    userData() {
      let a = this.usersList
      return !!this.vitalData.user_id
        ? a.find((data) => data.id == this.vitalData.user_id)
        : {}
    },
  },
  watch: {
    vitalData: {
      handler: function () {
        // 昼食がfalseの場合、storeのcommitにコールバック関数で処理を送り、stateの値を変更する
        if (this.vitalData.lunch === false) {
          this.$store.dispatch('vital/stateInput', (state) => {
            state.vitalData[0].lunch_amount = ''
            state.vitalData[0].lunch_start = ''
            state.vitalData[0].lunch_end = ''
          })
        }
        // おやつがfalseの場合、storeのcommitにコールバック関数で処理を送り、stateの値を変更する
        if (this.vitalData.snack === false) {
          this.$store.dispatch('vital/stateInput', (state) => {
            state.vitalData[0].snack_time = ''
          })
        }
        // バリデーションを監視する
        if (Object.keys(this.vitalValidate).length) {
          this.Validate()
        }
      },
      deep: true, // watch対象の下位プロパティが変更された場合でもwatchを起動させる
    },
  },
  created() {
    if (this.vitalData.weather_record_id === '') {
      // vitalDataのweather_record_idに値が無ければ本日の天候情報を取得
      this.weatherSelect = { ...this.weatherData }
      // 天候情報の初期idをvitalDataに登録する
      this.inputWeatherId()
    } else {
      axios
        .get(
          'http://localhost:8000/api/weather_records/' + this.vitalData.weather_record_id
        )
        .then((response) => {
          console.log(response)
          this.weatherSelect = response.data.data.attribute
        })
        .catch(() => {})
    }
  },
  methods: {
    inputForm(e) {
      this.$store.dispatch('vital/inputForm', { ...e, page: 0 })
    },
    // ▼ vitalDataのweather_record_idにweather_recordsのidを入力
    inputWeatherId() {
      this.$store.dispatch('vital/stateInput', (state) => {
        state.vitalData[0].weather_record_id = this.weatherSelect.id
      })
    },
    // ▼ 日付を選択した時、weather_recordsDBにレコードがあればweatherSelectに取得、無ければidに""を入れる
    async selectDays(e) {
      await axios
        .get('http://localhost:8000/api/weather_records?day=' + e.value)
        .then((response) => {
          console.log(response)
          this.weatherSelect = { ...response.data.data.attribute }
        })
        .catch(() => {
          this.weatherSelect = { id: '' }
        })
      await this.inputWeatherId()
    },
    // ▼ 実行するバリデーションルールを記述（親コンポーネント、自コンポーネントのwatchが使用）
    Validate() {
      this.$store.dispatch('vital/Validate', (state) => {
        let e = {}
        // 利用者のバリデーション
        !state.vitalData[0].user_id
          ? (e.user_id = '利用者を選択してください')
          : (e.user_id = '')
        // 天候情報のバリデーション
        !state.vitalData[0].weather_record_id
          ? (e.weather_record_id = '登録された日付を選択して下さい')
          : (e.weather_record_id = '')
        state.vitalValidate = e
      })
    },
  },
}
</script>
