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
            @inputForm="selectUser"
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
      <h3>記録日／気候</h3>
      <ul class="row list-unstyled">
        <li class="col-md-4">
          <label class="text-field">
            <span class="text-field-label">日付</span>
            <input class="text-field-input" type="date" name="weather_record_id" />
          </label>
        </li>
        <li class="col-md-4">
          <label class="text-field fill">
            <span class="text-field-label">天気</span>
            <p class="text-field-input">曇り</p>
          </label>
        </li>
        <li class="w-100"></li>
        <li class="col-md-3 col-6">
          <label class="text-field fill">
            <span class="text-field-label">外気温(℃)</span>
            <p class="text-field-input">31</p>
          </label>
        </li>
        <li class="col-md-3 col-6">
          <label class="text-field fill">
            <span class="text-field-label">内気温(℃)</span>
            <p class="text-field-input">31</p>
          </label>
        </li>
        <li class="col-md-3 col-6">
          <label class="text-field fill">
            <span class="text-field-label">外湿度(％)</span>
            <p class="text-field-input">70</p>
          </label>
        </li>
        <li class="col-md-3 col-6">
          <label class="text-field fill">
            <span class="text-field-label">内湿度(％)</span>
            <p class="text-field-input">60</p>
          </label>
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>バイタル</h3>
      <ul class="row list-unstyled">
        <li class="col-md-3 col-6">
          <label class="text-field">
            <span class="text-field-label">体温(℃)</span>
            <input class="text-field-input" type="number" name="body_temp" />
          </label>
        </li>
        <li class="col-md-3 col-6">
          <label class="text-field">
            <span class="text-field-label">脈拍(bpm)</span>
            <input class="text-field-input" type="number" name="pulse" />
          </label>
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
          <label class="text-field">
            <span class="text-field-label">SPO2(％)</span>
            <input class="text-field-input" type="number" name="spo2" />
          </label>
        </li>
        <li class="col-md-3 col-6">
          <label class="text-field">
            <span class="text-field-label">血圧(拡張)</span>
            <input class="text-field-input" type="number" name="dbp" />
          </label>
        </li>
        <li class="col-md-3 col-6">
          <label class="text-field">
            <span class="text-field-label">血圧(収縮)</span>
            <input class="text-field-input" type="number" name="sbp" />
          </label>
        </li>
        <li class="w-100"></li>
        <li class="col-md-12">
          <label class="text-field">
            <span class="text-field-label">バイタル備考</span>
            <input class="text-field-input" type="text" name="vital_note" />
          </label>
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
            :value="vitalData.lunchAmount"
            :validate="vitalValidate.lunchAmount"
            @inputForm="inputForm"
            >昼食量</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <label class="text-field fill">
            <span class="text-field-label">昼食開始時間</span>
            <input
              type="time"
              class="timselect ui-timepicker-input text-field-input"
              step="600"
              name="lunch_start"
              disabled
            />
          </label>
        </li>
        <li class="col-md-3 col-6">
          <label class="text-field">
            <span class="text-field-label">昼食終了時間</span>
            <input
              type="time"
              class="timeselect ui-timepicker-input text-field-input"
              step="600"
              name="lunch_end"
            />
          </label>
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
          <label class="text-field">
            <span class="text-field-label">おやつ時間</span>
            <input
              type="time"
              class="timeselect ui-timepicker-input text-field-input"
              step="600"
              name="snack_time"
            />
          </label>
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="selectList('waterIntake')"
            name="water_intake"
            :value="vitalData.waterIntake"
            :validate="vitalValidate.waterIntake"
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
  props: {
    vitalData: {
      type: Object,
      default: () => {},
    },
    vitalValidate: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      userNameList: [],
      userData: {},
    }
  },
  computed: {},
  created() {
    axios
      .get('http://localhost:8000/api/users')
      .then((response) => {
        console.log(response)
        this.userNameList = response.data.data.map((data) => ({
          value: data.data.id,
          name: data.data.id + '：' + data.data.attribute.name,
        }))
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    inputForm(e) {
      this.$store.dispatch('vital/inputForm', { ...e, page: 0 })
    },
    selectUser(e) {
      axios
        .get('http://localhost:8000/api/users/' + e.value)
        .then((response) => {
          console.log(response)
          this.userData = response.data.data.attribute
        })
        .catch((error) => {
          console.log(error)
        })
      this.$store.dispatch('vital/inputForm', { ...e, page: 0 })
    },
  },
}
</script>
