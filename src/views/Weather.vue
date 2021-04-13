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
            today.format('YYYY年MM月DD日(ddd)')
          }}</u
          >です。
        </p>
        <ul v-if="!!Object.values(weatherData).length" class="list-unstyled d-flex">
          <li class="border-secondary pr-3">
            <button type="button" class="btn btn-primary fs14">天候登録</button>
          </li>
        </ul>
        <div v-else class="row">
          <dl class="col-6 col-sm-4 col-md-15">
            <dt class="font-weight-normal d-inline-block">天　候：</dt>
            <dd class="d-inline-block">
              <u class="font-weight-bold fs18">{{ weatherType[weatherData.weather] }}</u>
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
        </div>
      </section>
    </article>
    <!-- 利用者登録ボタンを押下したときに展開する利用者登録モーダル -->
    <WeatherModal id="modal-post">
      <template #input>
        <WeatherInput
          input-type="weatherRegist"
          model-id="modal-post"
          :today="today"
        ></WeatherInput></template
    ></WeatherModal>
  </main>
</template>

<script>
import WeatherModal from '@/components/Weather/WeatherModal.vue'
import WeatherInput from '@/components/Weather/WeatherInput.vue'
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'Weather',
  components: {
    WeatherModal,
    WeatherInput,
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
    weatherType() {
      return this.$store.getters['weather/weatherType']
    },
  },
  async created() {
    var day = moment()
    await axios
      .get('http://localhost:8000/api/weather_records?day=' + day.format('YYYY-MM-DD'))
      .then((response) => {
        console.log(response)
        this.$store.dispatch('weather/showTodayWeather', response)
      })
      .catch(() => {
        this.$store.dispatch('weather/getTodayWeather', day)
        this.$bvModal.show('modal-post')
      })
  },
}
</script>
