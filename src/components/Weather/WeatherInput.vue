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
            <u class="font-weight-bold fs18">{{
              selectStr({ weather: weatherInputData.weather })
            }}</u>
          </dd>
        </dl>
        <dl class="col-md-4">
          <dt class="font-weight-normal d-inline-block">外気温：</dt>
          <dd class="d-inline-block">
            <u class="font-weight-bold fs18">{{ weatherInputData.temp }}℃</u>
          </dd>
        </dl>
        <dl class="col-md-4">
          <dt class="font-weight-normal d-inline-block">外湿度：</dt>
          <dd class="d-inline-block">
            <u class="font-weight-bold fs18">{{ weatherInputData.humidity }}％</u>
          </dd>
        </dl>
      </div>
      <ul class="row list-unstyled">
        <li class="col-md-6">
          <InputForm
            type="number"
            name="room_temp"
            :value="weatherInputData.room_temp"
            :validate="weatherValidate.room_temp"
            @inputForm="inputForm"
            >内気温(℃)</InputForm
          >
        </li>
        <li class="col-md-6">
          <InputForm
            type="number"
            name="room_humidity"
            :value="weatherInputData.room_humidity"
            :validate="weatherValidate.room_humidity"
            @inputForm="inputForm"
            >内湿度(％)</InputForm
          >
        </li>
      </ul>
      <div class="form-footer text-right">
        <button type="button" class="btn btn-secondary fs14" @click="closeModel()">
          {{ inputType === 'weatherRegist' ? '後で登録' : 'キャンセル' }}
        </button>
        <button
          v-if="inputType === 'weatherRegist'"
          type="button"
          class="btn btn-primary fs14"
          @click="weatherRegist()"
        >
          登録
        </button>
        <button v-else type="button" class="btn btn-primary fs14" @click="weatherEdit()">
          変更
        </button>
      </div>
    </article>
  </main>
</template>
<script>
import InputForm from '@/components/Common/InputForm.vue'
import SelectModule from '@/mixins/select'

export default {
  name: 'WeatherInput',
  components: {
    InputForm,
  },
  mixins: [SelectModule], //ミックスインでcomputedを共通化
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
    weatherInputData() {
      return this.$store.getters['weather/weatherInputData']
    },
    weatherValidate() {
      return this.$store.getters['weather/weatherValidate']
    },
  },
  watch: {
    // weatherValidateからプロパティが無くなるまでweatherInputDataをバリデーションする
    weatherInputData: {
      handler: function () {
        if (!!Object.keys(this.weatherValidate).length) {
          this.$store.dispatch('weather/Validate')
        }
      },
      deep: true, // watch対象の下位プロパティが変更された場合でもwatchを起動させる
    },
  },
  created() {
    this.inputType === 'weatherRegist'
      ? this.$store.dispatch('weather/inputTodayWeather', this.today)
      : this.$store.dispatch('weather/dataToInput')
  },
  methods: {
    closeModel() {
      this.$bvModal.hide(this.modelId)
      this.$store.dispatch('weather/resetData')
    },
    inputForm(e) {
      this.$store.dispatch('weather/inputForm', e)
    },
    weatherRegist() {
      // バリデーションを開始してweatherValidateにプロパティを付与する
      this.$store.dispatch('weather/Validate')
      // weatherValidateのプロパティの値がすべて空の時、DBに天候情報を登録しモーダルを閉じる
      if (Object.values(this.weatherValidate).every((value) => value === '')) {
        this.$store.dispatch('weather/postTodayWeather')
        this.$bvModal.hide(this.modelId)
      }
    },
    weatherEdit() {
      // バリデーションを開始してweatherValidateにプロパティを付与する
      this.$store.dispatch('weather/Validate')
      // weatherValidateのプロパティの値がすべて空の時、DBに天候情報を登録しモーダルを閉じる
      if (Object.values(this.weatherValidate).every((value) => value === '')) {
        this.$store.dispatch('weather/putTodayWeather', this.weatherInputData.id)
        this.$bvModal.hide(this.modelId)
      }
    },
  },
}
</script>
<style>
.form-footer > button {
  margin-left: 0.5rem;
}
</style>
