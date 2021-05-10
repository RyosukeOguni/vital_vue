<template>
  <section class="col-md-12">
    <section class="mt-4">
      <h3>排尿記録</h3>
      <ul class="row list-unstyled">
        <li class="col-md-12 no-gutters">
          <ul class="row list-unstyled">
            <li class="col-md-3 col-6">
              <InputForm
                :selectlist="selectList('vol')"
                name="voiding_vol1"
                :value="vitalData.voiding_vol1"
                :validate="vitalValidate.voiding_vol1"
                @inputForm="inputForm"
                >排尿量１</InputForm
              >
            </li>
            <li class="col-md-3 col-6">
              <InputForm
                :selectlist="daytime"
                name="voiding_time1"
                :value="vitalData.voiding_time1"
                :validate="vitalValidate.voiding_time1"
                @inputForm="inputForm"
                >排尿時間１</InputForm
              >
            </li>
            <li class="col-md-6">
              <InputForm
                type="text"
                name="voiding_memo1"
                :value="vitalData.voiding_memo1"
                :validate="vitalValidate.voiding_memo1"
                @inputForm="inputForm"
                >排尿その他１</InputForm
              >
            </li>
          </ul>
          <ul class="row list-unstyled">
            <li class="col-md-3 col-6">
              <InputForm
                :selectlist="selectList('vol')"
                name="voiding_vol2"
                :value="vitalData.voiding_vol2"
                :validate="vitalValidate.voiding_vol2"
                @inputForm="inputForm"
                >排尿量２</InputForm
              >
            </li>
            <li class="col-md-3 col-6">
              <InputForm
                :selectlist="daytime"
                name="voiding_time2"
                :value="vitalData.voiding_time2"
                :validate="vitalValidate.voiding_time2"
                @inputForm="inputForm"
                >排尿時間２</InputForm
              >
            </li>
            <li class="col-md-6">
              <InputForm
                type="text"
                name="voiding_memo2"
                :value="vitalData.voiding_memo2"
                :validate="vitalValidate.voiding_memo2"
                @inputForm="inputForm"
                >排尿その他２</InputForm
              >
            </li>
          </ul>
          <ul class="row list-unstyled">
            <li class="col-md-3 col-6">
              <InputForm
                :selectlist="selectList('vol')"
                name="voiding_vol3"
                :value="vitalData.voiding_vol3"
                :validate="vitalValidate.voiding_vol3"
                @inputForm="inputForm"
                >排尿量３</InputForm
              >
            </li>
            <li class="col-md-3 col-6">
              <InputForm
                :selectlist="daytime"
                name="voiding_time3"
                :value="vitalData.voiding_time3"
                :validate="vitalValidate.voiding_time3"
                @inputForm="inputForm"
                >排尿時間３</InputForm
              >
            </li>
            <li class="col-md-6">
              <InputForm
                type="text"
                name="voiding_memo3"
                :value="vitalData.voiding_memo3"
                :validate="vitalValidate.voiding_memo3"
                @inputForm="inputForm"
                >排尿その他３</InputForm
              >
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>排便記録</h3>
      <ul class="row list-unstyled">
        <li class="col-md-12 no-gutters">
          <ul class="row list-unstyled">
            <li class="col-md-3 col-6">
              <InputForm
                :selectlist="selectList('vol')"
                name="defecation_vol1"
                :value="vitalData.defecation_vol1"
                :validate="vitalValidate.defecation_vol1"
                @inputForm="inputForm"
                >排便量１</InputForm
              >
            </li>
            <li class="col-md-3 col-6">
              <InputForm
                :selectlist="daytime"
                name="defecation_time1"
                :value="vitalData.defecation_time1"
                :validate="vitalValidate.defecation_time1"
                @inputForm="inputForm"
                >排便時間１</InputForm
              >
            </li>
            <li class="col-md-6">
              <InputForm
                type="text"
                name="defecation_memo1"
                :value="vitalData.defecation_memo1"
                :validate="vitalValidate.defecation_memo1"
                @inputForm="inputForm"
                >排便その他１</InputForm
              >
            </li>
          </ul>
          <ul class="row list-unstyled">
            <li class="col-md-3 col-6">
              <InputForm
                :selectlist="selectList('vol')"
                name="defecation_vol2"
                :value="vitalData.defecation_vol2"
                :validate="vitalValidate.defecation_vol2"
                @inputForm="inputForm"
                >排便量２</InputForm
              >
            </li>
            <li class="col-md-3 col-6">
              <InputForm
                :selectlist="daytime"
                name="defecation_time2"
                :value="vitalData.defecation_time2"
                :validate="vitalValidate.defecation_time2"
                @inputForm="inputForm"
                >排便時間２</InputForm
              >
            </li>
            <li class="col-md-6">
              <InputForm
                type="text"
                name="defecation_memo2"
                :value="vitalData.defecation_memo2"
                :validate="vitalValidate.defecation_memo2"
                @inputForm="inputForm"
                >排便その他２</InputForm
              >
            </li>
          </ul>
          <ul class="row list-unstyled">
            <li class="col-md-3 col-6">
              <InputForm
                :selectlist="selectList('vol')"
                name="defecation_vol3"
                :value="vitalData.defecation_vol3"
                :validate="vitalValidate.defecation_vol3"
                @inputForm="inputForm"
                >排便量３</InputForm
              >
            </li>
            <li class="col-md-3 col-6">
              <InputForm
                :selectlist="daytime"
                name="defecation_time3"
                :value="vitalData.defecation_time3"
                :validate="vitalValidate.defecation_time3"
                @inputForm="inputForm"
                >排便時間３</InputForm
              >
            </li>
            <li class="col-md-6">
              <InputForm
                type="text"
                name="defecation_memo3"
                :value="vitalData.defecation_memo3"
                :validate="vitalValidate.defecation_memo3"
                @inputForm="inputForm"
                >排便その他２</InputForm
              >
            </li>
          </ul>
        </li>
        <li class="col-md-3">
          <InputForm
            type="number"
            name="total_defecation"
            :value="vitalData.total_defecation"
            :validate="vitalValidate.total_defecation"
            @inputForm="inputForm"
            >排便量合計(g)</InputForm
          >
        </li>
        <li class="w-100"></li>
        <li class="col-md-12">
          <InputForm
            type="text"
            name="excretion_note"
            :value="vitalData.excretion_note"
            :validate="vitalValidate.excretion_note"
            @inputForm="inputForm"
            >排泄備考</InputForm
          >
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import InputForm from '@/components/Common/InputForm.vue'
import SelectModule from '@/mixins/select'

export default {
  name: 'VitalInputStep2',
  components: {
    InputForm,
  },
  mixins: [SelectModule], //ミックスインでcomputedを共通化
  computed: {
    vitalData() {
      return this.$store.getters['vital/vitalData'][1]
    },
    vitalValidate() {
      return this.$store.getters['vital/vitalValidate']
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
  methods: {
    inputForm(e) {
      this.$store.dispatch('vital/inputForm', { ...e, page: 1 })
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
