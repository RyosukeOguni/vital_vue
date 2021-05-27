<template>
  <main class="container">
    <article class="top_menu row justify-content-center">
      <section class="mt-4 col-md-12">
        <h2 class="border-bottom border-secondary pb-2 mb-3">メニュー</h2>
        <ul class="row g-0 list-unstyled">
          <li class="col-md-6">
            <router-link
              to="/vital"
              class="position-relative d-block border border-white rounded-pill"
              style="background: #9aadd3"
            >
              <span class="position-absolute h3 text-white text-center w-100 d-block"
                >バイタル管理</span
              >
            </router-link>
          </li>
          <li class="col-md-6">
            <router-link
              to="/user"
              class="position-relative d-block border border-white rounded-pill"
              style="background: #f19c99"
            >
              <span class="position-absolute h3 text-white text-center w-100 d-block">
                利用者管理
              </span>
            </router-link>
          </li>
        </ul>
      </section>
      <section class="mt-4 col-md-12">
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
  </main>
</template>
<script>
import WeatherModal from '@/components/Weather/WeatherModal.vue'
import WeatherInput from '@/components/Weather/WeatherInput.vue'
import SelectModule from '@/mixins/select'
import moment from 'moment'
moment.locale('ja')
export default {
  name: 'Top',
  components: {
    WeatherModal,
    WeatherInput,
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
    this.$store.dispatch('weather/createWeather', day)

    // 非同期通信の終了を待ってボタンを表示させる
    this.showbutton = true
    // バイタル入力画面で選択する利用者一覧をあらかじめ読み込んでおく
    this.$store.dispatch('user/usersListSet')
  },
  methods: {
    openModel(modelid) {
      this.$bvModal.show(modelid)
    },
  },
}
</script>
<style>
/* top_menu */
.top_menu ul a {
  padding-top: 4rem;
}
.top_menu ul a:hover {
  text-decoration: transparent;
  opacity: 0.6;
}
.top_menu ul a span {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
