<template>
  <main class="container">
    <article class="vital_menu row justify-content-center">
      <section class="mt-4 col-md-10">
        <h2 class="border-bottom border-secondary pb-2 mb-3">バイタル登録</h2>
        <ul class="list-unstyled d-flex">
          <li class="border-secondary pr-3" style="border-right: 1px dotted">
            <button type="button" class="btn btn-primary fs14">バイタル新規登録</button>
          </li>
          <li class="ml-3">
            <button type="button" class="btn btn-outline-secondary fs14">
              バイタル一覧表示／編集
            </button>
          </li>
        </ul>
      </section>
      <section class="mt-4 col-md-10">
        <h2 class="border-bottom border-secondary pb-2 mb-3">気候情報</h2>
        <p>
          本日は<u class="mx-2 font-weight-bold fs18">{{
            today.format('YYYY年MM月DD日')
          }}</u
          >です。
        </p>
        <div v-show="!!Object.values(WeatherData).length" class="row">
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline-block">天　候：</dt>
            <dd class="d-inline-block">
              <u class="font-weight-bold fs18">{{ WeatherType[WeatherData.weather] }}</u>
            </dd>
          </dl>
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline-block">外気温：</dt>
            <dd class="d-inline-block">
              <u class="font-weight-bold fs18">{{ WeatherData.temp }} ℃</u>
            </dd>
          </dl>
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline-block">内気温：</dt>
            <dd class="d-inline-block">
              <u class="font-weight-bold fs18">{{ WeatherData.room_temp }} ℃</u>
            </dd>
          </dl>
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline-block">外湿度：</dt>
            <dd class="d-inline-block">
              <u class="font-weight-bold fs18">{{ WeatherData.humidity }} ％</u>
            </dd>
          </dl>
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline">内湿度：</dt>
            <dd class="d-inline-block">
              <u class="font-weight-bold fs18">{{ WeatherData.room_humidity }} ％</u>
            </dd>
          </dl>
        </div>
        <ul v-show="!!Object.values(WeatherData).length" class="list-unstyled d-flex">
          <li class="border-secondary pr-3">
            <button type="button" class="btn btn-primary fs14">天候登録</button>
          </li>
        </ul>
      </section>
    </article>
    <!-- 利用者登録ボタンを押下したときに展開する利用者登録モーダル -->
    <WeatherModal id="modal-post"></WeatherModal>
  </main>
</template>

<script>
import WeatherModal from '@/components/Weather/WeatherModal.vue'
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'Weather',
  components: {
    WeatherModal,
  },
  data() {
    return {
      today: moment(),
    }
  },
  computed: {
    WeatherData() {
      return this.$store.getters['weather/WeatherData']
    },
    WeatherType() {
      return this.$store.getters['weather/WeatherType']
    },
  },
  created() {
    // var date = '2021-03-07'
    var date = moment().format('YYYY-MM-DD')
    axios
      .get('http://localhost:8000/api/weather_records?day=' + date)
      .then((response) => {
        console.log(response)
        this.$store.dispatch('weather/showTodayWeather', response)
      })
      .catch((error) => {
        this.$store.dispatch('weather/showTodayWeather', null)
        this.$bvModal.show('modal-post')
      })
  },
}
</script>
