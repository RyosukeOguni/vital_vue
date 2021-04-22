<template>
  <main class="container">
    <article class="vital_menu row justify-content-center">
      <section class="mt-4 col-md-10">
        <h2 class="border-bottom border-secondary pb-2 mb-3">バイタル登録</h2>
        <div
          v-show="!Object.values(weatherData).length"
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
        <ul v-if="!Object.values(weatherData).length" class="list-unstyled d-flex">
          <li class="border-secondary pr-3">
            <button
              type="button"
              class="btn btn-primary fs14"
              @click="openModel('modal-post')"
            >
              天候登録
            </button>
          </li>
        </ul>
        <!-- DBから取得した天候情報が有れば情報を表示する -->
        <div v-else class="row">
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline-block">天　候：</dt>
            <dd class="d-inline-block">
              <u class="font-weight-bold fs18">{{
                selectList({ weather: weatherData.weather })
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
                @click="openModel('modal-put')"
              >
                天候編集
              </button>
            </li>
          </ul>
        </div>
      </section>
    </article>
    <!-- 天候登録ボタンを押下したときに展開する天候登録モーダル -->
    <WeatherModal id="modal-post">
      <template #input>
        <WeatherInput model-id="modal-post" :today="today"></WeatherInput></template
    ></WeatherModal>
    <!-- 天候登録ボタンを押下したときに展開する天候登録モーダル -->
    <WeatherModal id="modal-put">
      <template #input>
        <WeatherUpdate model-id="modal-put" :today="today"></WeatherUpdate></template
    ></WeatherModal>
  </main>
</template>

<script>
import WeatherModal from '@/components/Weather/WeatherModal.vue'
import WeatherInput from '@/components/Weather/WeatherInput.vue'
import WeatherUpdate from '@/components/Weather/WeatherUpdate.vue'
import moment from 'moment'
import axios from 'axios'
moment.locale('ja')
export default {
  name: 'Weather',
  components: {
    WeatherModal,
    WeatherInput,
    WeatherUpdate,
  },
  data() {
    return {
      today: moment(),
    }
  },
  computed: {
    weatherData() {
      return this.$store.getters['weather/weatherData']
    },
    // セレクト項目の数値を文字に置き換えるモジュールを読み込む
    select() {
      return this.$store.getters['select']
    },
    // 算出プロパティの関数で、returnする関数に引数を入れると、算出プロパティが引数を受付けるようになる
    selectList() {
      return (v) => {
        return this.select.selectList(v)
      }
    },

    // wheatherJp() {
    //   return this.$store.getters['weather/wheatherJp']
    // },
    // weatherDefalut() {
    //   return this.$store.getters['weather/weatherDefalut']
    // },

    wheatherTranslate() {
      return this.$store.getters['weather/wheatherTranslate']
    },
  },
  created() {
    // 今日の日付を取得
    var day = this.today.format('YYYY-MM-DD')
    if (this.weatherData.day !== day) {
      this.$store.dispatch('weather/resetWeatherData')
    }
    // コンポーネントが読み込まれた際、DBから今日の天候情報を取得し、無ければモーダルを開く
    axios
      .get('http://localhost:8000/api/weather_records?day=' + day)
      .then((response) => {
        console.log(response)
        this.$store.dispatch('weather/showTodayWeather', response)
      })
      .catch(() => {
        this.openModel('modal-post')
      })
  },
  methods: {
    openModel(modelid) {
      this.$bvModal.show(modelid)
    },
  },
}
</script>
