<template>
  <main class="container">
    <article class="">
      <div class="row">
        <p class="col-md-12">
          本日は<u class="mx-2 font-weight-bold fs18">{{
            today.format('YYYY年MM月DD日(ddd)')
          }}</u
          >です。
        </p>
        <dl class="col-md-4">
          <dt class="font-weight-normal d-inline-block">天　候：</dt>
          <dd class="d-inline-block">
            <u class="font-weight-bold fs18">{{ wheatherJp[weatherData.weather] }}</u>
          </dd>
        </dl>
        <dl class="col-md-4">
          <dt class="font-weight-normal d-inline-block">外気温：</dt>
          <dd class="d-inline-block">
            <u class="font-weight-bold fs18">{{ weatherData.temp }}℃</u>
          </dd>
        </dl>
        <dl class="col-md-4">
          <dt class="font-weight-normal d-inline-block">外湿度：</dt>
          <dd class="d-inline-block">
            <u class="font-weight-bold fs18">{{ weatherData.humidity }}％</u>
          </dd>
        </dl>
      </div>
      <ul class="row list-unstyled">
        <li class="col-md-6">
          <InputForm
            type="number"
            name="room_temp"
            :value="weatherData.room_temp"
            :validate="weatherValidate.room_temp"
            @inputForm="inputForm"
            >内気温(℃)</InputForm
          >
        </li>
        <li class="col-md-6">
          <InputForm
            type="number"
            name="room_humidity"
            :value="weatherData.room_humidity"
            :validate="weatherValidate.room_humidity"
            @inputForm="inputForm"
            >内湿度(％)</InputForm
          >
        </li>
      </ul>
      <div class="form-footer text-right">
        <button type="button" class="btn btn-secondary fs14">戻る</button>
        <button
          type="button"
          class="btn btn-primary fs14"
          data-dismiss="modal"
          aria-label="Close"
        >
          登録
        </button>
      </div>
    </article>
  </main>
</template>
<script>
import InputForm from '@/components/Common/InputForm.vue'
export default {
  name: 'WeatherInput',
  components: {
    InputForm,
  },
  props: {
    inputType: {
      type: String,
      default: '',
    },
    modelId: {
      type: String,
      default: '',
    },
    today: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    weatherData() {
      return this.$store.getters['weather/weatherData']
    },
    weatherValidate() {
      return this.$store.getters['weather/weatherValidate']
    },
    wheatherJp() {
      return this.$store.getters['weather/wheatherJp']
    },
  },
  // weatherValidateに値が入っている間
  watch: {
    weatherData: {
      handler: function () {
        if (!!Object.keys(this.weatherValidate).length) {
          this.$store.dispatch('weather/Validate')
        }
      },
      // userDataの下位のプロパティが変更された場合でもwatchを起動させる
      deep: true,
    },
  },
  created() {
    this.$store.dispatch('weather/getTodayWeather')
  },
  methods: {
    inputForm(e) {
      this.$store.dispatch('weather/inputForm', e)
    },
  },
}
</script>
<style>
.form-footer > button {
  margin-left: 0.5rem;
}
</style>
