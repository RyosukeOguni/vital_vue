<template>
  <main class="container">
    <article class="vital_menu row justify-content-center">
      <section class="mt-4 col-md-10">
        <h2 class="border-bottom border-secondary pb-2 mb-3">バイタル登録</h2>
        <div
          v-if="!Object.values(weatherData).length"
          class="alert alert-danger"
          role="alert"
        >
          本日の天候情報を登録しないとバイタル新規登録はできません
        </div>
        <ul class="list-unstyled d-flex">
          <li class="border-secondary pr-3" style="border-right: 1px dotted">
            <button
              type="button"
              class="btn btn-primary fs14"
              :disabled="!Object.values(weatherData).length"
              @click="openModel('modal-vital-post')"
            >
              バイタル新規登録
            </button>
          </li>
          <li class="ml-3">
            <router-link to="/vital" class="btn btn-outline-secondary fs14"
              >バイタル一覧表示／編集</router-link
            >
          </li>
        </ul>
      </section>
      <section class="mt-4 col-md-10">
        <h2 class="border-bottom border-secondary pb-2 mb-3">天候情報</h2>
        <p>
          本日は<u class="mx-2 font-weight-bold fs18">{{
            today.format('YYYY年MM月DD日(ddd)')
          }}</u
          >です。
        </p>
        <!-- DBから取得した天候情報が無ければ天候登録ボタンを表示する -->
        <ul
          v-if="!Object.keys(weatherData).length && showbutton"
          class="list-unstyled d-flex"
        >
          <li class="border-secondary pr-3">
            <button
              type="button"
              class="btn btn-primary fs14"
              @click="openModel('modal-weather-post')"
            >
              天候登録
            </button>
          </li>
        </ul>
        <!-- DBから取得した天候情報が有れば情報を表示する -->
        <div v-else-if="!!Object.values(weatherData).length && showbutton" class="row">
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline-block">天　候：</dt>
            <dd class="d-inline-block">
              <u class="font-weight-bold fs18">{{
                selectStr({ weather: weatherData.weather })
              }}</u>
            </dd>
          </dl>
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline-block">外気温：</dt>
            <dd class="d-inline-block">
              <u class="font-weight-bold fs18">{{ weatherData.temp }} ℃</u>
            </dd>
          </dl>
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline-block">内気温：</dt>
            <dd class="d-inline-block">
              <u class="font-weight-bold fs18">{{ weatherData.room_temp }} ℃</u>
            </dd>
          </dl>
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline-block">外湿度：</dt>
            <dd class="d-inline-block">
              <u class="font-weight-bold fs18">{{ weatherData.humidity }} ％</u>
            </dd>
          </dl>
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline">内湿度：</dt>
            <dd class="d-inline-block">
              <u class="font-weight-bold fs18">{{ weatherData.room_humidity }} ％</u>
            </dd>
          </dl>
          <ul class="col-12 list-unstyled d-flex">
            <li class="border-secondary pr-3">
              <button
                type="button"
                class="btn btn-warning fs14"
                @click="openModel('modal-weather-put')"
              >
                天候編集
              </button>
            </li>
          </ul>
        </div>
      </section>
    </article>
    <!-- 天候登録ボタンを押下したときに展開する天候登録モーダル -->
    <WeatherModal id="modal-weather-post">
      <template #input>
        <WeatherInput
          input-type="weatherRegist"
          model-id="modal-weather-post"
          :today="today"
        ></WeatherInput></template
    ></WeatherModal>
    <!-- 天候登録ボタンを押下したときに展開する天候登録モーダル -->
    <WeatherModal id="modal-weather-put">
      <template #input>
        <WeatherInput
          input-type="weatherEdit"
          model-id="modal-weather-put"
          :today="today"
        ></WeatherInput></template
    ></WeatherModal>
    <!-- バイタル新規登録ボタンを押下したときに展開するバイタル新規登録モーダル -->
    <VitalModal id="modal-vital-post"
      >バイタル登録
      <template #input>
        <VitalInput
          input-type="vitalRegist"
          model-id="modal-vital-post"
          @scrollTop="scrollTop"
          ><template #button>登録</template></VitalInput
        ></template
      ></VitalModal
    >
  </main>
</template>

<script>
import VitalModal from '@/components/Vital/VitalModal.vue'
import VitalInput from '@/components/Vital/VitalInput.vue'
import WeatherModal from '@/components/Weather/WeatherModal.vue'
import WeatherInput from '@/components/Weather/WeatherInput.vue'
import SelectModule from '@/mixins/select'
import moment from 'moment'
import axios from 'axios'
moment.locale('ja')
export default {
  name: 'Weather',
  components: {
    WeatherModal,
    WeatherInput,
    VitalModal,
    VitalInput,
  },
  mixins: [SelectModule], //ミックスインでcomputedを共通化
  data() {
    return {
      today: moment(),
      showbutton: false,
    }
  },
  computed: {
    weatherData() {
      return this.$store.getters['weather/weatherData']
    },
  },
  async created() {
    // 今日の日付を取得
    var day = this.today.format('YYYY-MM-DD')
    if (this.weatherData.day !== day) {
      this.$store.dispatch('weather/resetWeatherData')
    }
    // コンポーネントが読み込まれた際、DBから今日の天候情報を取得し、無ければモーダルを開く
    await axios
      .get('http://localhost:8000/api/weather_records?day=' + day)
      .then((response) => {
        console.log(response)
        this.$store.dispatch('weather/showTodayWeather', response)
      })
      .catch(() => {
        this.openModel('modal-weather-post')
      })
    // 天候情報を読み込み中に、天候情報登録ボタンを表示させない
    this.showbutton = true
    // バイタル入力画面で選択する利用者一覧をあらかじめ読み込んでおく
    this.$store.dispatch('user/usersListSet')
  },
  methods: {
    openModel(modelid) {
      this.$bvModal.show(modelid)
    },
    // 進行ボタンが押される度にモーダルスクロールを上部に移動
    scrollTop(e) {
      document.getElementById(e).scrollTo({
        top: 0,
        behavior: 'instant',
      })
    },
  },
}
</script>
