<template>
  <section class="col-md-12">
    <section class="mt-4">
      <h3>服薬／嘔吐</h3>
      <ul class="row list-unstyled">
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="bool"
            name="medicine"
            :value="vitalData.medicine"
            :validate="vitalValidate.medicine"
            @inputForm="inputForm"
            >服薬</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="daytime"
            name="medicine_time"
            :value="vitalData.medicine_time"
            :validate="vitalValidate.medicine_time"
            :fill="!vitalData.medicine"
            @inputForm="inputForm"
            >服薬時間</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="bool"
            name="vomiting"
            :value="vitalData.vomiting"
            :validate="vitalValidate.vomiting"
            @inputForm="inputForm"
            >嘔吐</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="daytime"
            name="vomiting_time"
            :value="vitalData.vomiting_time"
            :validate="vitalValidate.vomiting_time"
            :fill="!vitalData.vomiting"
            @inputForm="inputForm"
            >嘔吐時間</InputForm
          >
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>発作</h3>
      <ul class="row list-unstyled">
        <li class="col-md-12 no-gutters">
          <ul class="row list-unstyled">
            <li class="col-md-3">
              <InputForm
                :selectlist="selectList('vol')"
                name="attack1"
                :value="vitalData.attack1"
                :validate="vitalValidate.attack1"
                @inputForm="inputForm"
                >発作１</InputForm
              >
            </li>
            <li class="col-md-2 col-6">
              <InputForm
                :selectlist="daytime"
                name="attack_time1"
                :value="vitalData.attack_time1"
                :validate="vitalValidate.attack_time1"
                :fill="!vitalData.attack1 || vitalData.attack1 == 4"
                @inputForm="inputForm"
                >発作時間１</InputForm
              >
            </li>
            <li class="col-md-3 col-6">
              <InputForm
                :selectlist="selectList('attackDuration')"
                name="attack_duration1"
                :value="vitalData.attack_duration1"
                :validate="vitalValidate.attack_duration1"
                :fill="!vitalData.attack1 || vitalData.attack1 == 4"
                @inputForm="inputForm"
                >発作継続時間１</InputForm
              >
            </li>
            <li class="col-md-4">
              <InputForm
                type="text"
                name="attack_memo1"
                :value="vitalData.attack_memo1"
                :validate="vitalValidate.attack_memo1"
                :fill="!vitalData.attack1 || vitalData.attack1 == 4"
                @inputForm="inputForm"
                >その他１</InputForm
              >
            </li>
          </ul>
          <ul class="row list-unstyled">
            <li class="col-md-3">
              <InputForm
                :selectlist="selectList('vol')"
                name="attack2"
                :value="vitalData.attack2"
                :validate="vitalValidate.attack2"
                @inputForm="inputForm"
                >発作２</InputForm
              >
            </li>
            <li class="col-md-2 col-6">
              <InputForm
                :selectlist="daytime"
                name="attack_time2"
                :value="vitalData.attack_time2"
                :validate="vitalValidate.attack_time2"
                :fill="!vitalData.attack2 || vitalData.attack2 == 4"
                @inputForm="inputForm"
                >発作時間２</InputForm
              >
            </li>
            <li class="col-md-3 col-6">
              <InputForm
                :selectlist="selectList('attackDuration')"
                name="attack_duration2"
                :value="vitalData.attack_duration2"
                :validate="vitalValidate.attack_duration2"
                :fill="!vitalData.attack2 || vitalData.attack2 == 4"
                @inputForm="inputForm"
                >発作継続時間２</InputForm
              >
            </li>
            <li class="col-md-4">
              <InputForm
                type="text"
                name="attack_memo2"
                :value="vitalData.attack_memo2"
                :validate="vitalValidate.attack_memo2"
                :fill="!vitalData.attack2 || vitalData.attack2 == 4"
                @inputForm="inputForm"
                >その他２</InputForm
              >
            </li>
          </ul>
          <ul class="row list-unstyled">
            <li class="col-md-3">
              <InputForm
                :selectlist="selectList('vol')"
                name="attack3"
                :value="vitalData.attack3"
                :validate="vitalValidate.attack3"
                @inputForm="inputForm"
                >発作３</InputForm
              >
            </li>
            <li class="col-md-2 col-6">
              <InputForm
                :selectlist="daytime"
                name="attack_time3"
                :value="vitalData.attack_time3"
                :validate="vitalValidate.attack_time3"
                :fill="!vitalData.attack3 || vitalData.attack3 == 4"
                @inputForm="inputForm"
                >発作時間３</InputForm
              >
            </li>
            <li class="col-md-3 col-6">
              <InputForm
                :selectlist="selectList('attackDuration')"
                name="attack_duration3"
                :value="vitalData.attack_duration3"
                :validate="vitalValidate.attack_duration3"
                :fill="!vitalData.attack3 || vitalData.attack3 == 4"
                @inputForm="inputForm"
                >発作継続時間３</InputForm
              >
            </li>
            <li class="col-md-4">
              <InputForm
                type="text"
                name="attack_memo3"
                :value="vitalData.attack_memo3"
                :validate="vitalValidate.attack_memo3"
                :fill="!vitalData.attack3 || vitalData.attack3 == 4"
                @inputForm="inputForm"
                >その他３</InputForm
              >
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>吸引</h3>
      <ul class="row list-unstyled">
        <li class="col-md-15">
          <InputForm
            :selectlist="bool"
            name="aspiration"
            :value="vitalData.aspiration"
            :validate="vitalValidate.aspiration"
            @inputForm="inputForm"
            >吸引</InputForm
          >
        </li>
        <li class="col-md-15 col-6">
          <InputForm
            :selectlist="daytime"
            name="aspiration_time"
            :value="vitalData.aspiration_time"
            :validate="vitalValidate.aspiration_time"
            :fill="!vitalData.aspiration"
            @inputForm="inputForm"
            >吸引時間</InputForm
          >
        </li>
        <li class="col-md-15 col-6">
          <InputForm
            :selectlist="selectList('aspirationPoint')"
            name="aspiration_point"
            :value="vitalData.aspiration_point"
            :validate="vitalValidate.aspiration_point"
            :fill="!vitalData.aspiration"
            @inputForm="inputForm"
            >吸引場所</InputForm
          >
        </li>
        <li class="col-md-15 col-6">
          <InputForm
            :selectlist="selectList('aspirationColor')"
            name="aspiration_color"
            :value="vitalData.aspiration_color"
            :validate="vitalValidate.aspiration_color"
            :fill="!vitalData.aspiration"
            @inputForm="inputForm"
            >吸引物色</InputForm
          >
        </li>
        <li class="col-md-15 col-6">
          <InputForm
            :selectlist="selectList('aspirationType')"
            name="aspiration_type"
            :value="vitalData.aspiration_type"
            :validate="vitalValidate.aspiration_type"
            :fill="!vitalData.aspiration"
            @inputForm="inputForm"
            >吸引質</InputForm
          >
        </li>
        <li class="col-md-12">
          <InputForm
            type="text"
            name="aspiration_note"
            :value="vitalData.aspiration_note"
            :validate="vitalValidate.aspiration_note"
            :fill="!vitalData.aspiration"
            @inputForm="inputForm"
            >吸引備考</InputForm
          >
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>注入</h3>
      <ul class="row list-unstyled">
        <li class="col-md-15">
          <InputForm
            :selectlist="bool"
            name="injection"
            :value="vitalData.injection"
            :validate="vitalValidate.injection"
            @inputForm="inputForm"
            >注入</InputForm
          >
        </li>
        <li class="col-md-15 col-6">
          <InputForm
            :selectlist="daytime"
            name="injection_start"
            :value="vitalData.injection_start"
            :validate="vitalValidate.injection_start"
            :fill="!vitalData.injection"
            @inputForm="inputForm"
            >注入開始時間</InputForm
          >
        </li>
        <li class="col-md-15 col-6">
          <InputForm
            :selectlist="daytime"
            name="injection_end"
            :value="vitalData.injection_end"
            :validate="vitalValidate.injection_end"
            :fill="!vitalData.injection"
            @inputForm="inputForm"
            >注入終了時間</InputForm
          >
        </li>
        <li class="col-md-15 col-6">
          <InputForm
            :selectlist="selectList('injectionPoint')"
            name="injection_point"
            :value="vitalData.injection_point"
            :validate="vitalValidate.injection_point"
            :fill="!vitalData.injection"
            @inputForm="inputForm"
            >注入場所</InputForm
          >
        </li>
        <li class="col-md-15 col-6">
          <InputForm
            :selectlist="selectList('waterIntake')"
            name="injection_vol"
            :value="vitalData.injection_vol"
            :validate="vitalValidate.injection_vol"
            :fill="!vitalData.injection"
            @inputForm="inputForm"
            >注入量</InputForm
          >
        </li>
        <li class="col-md-12">
          <InputForm
            type="text"
            name="injection_note"
            :value="vitalData.injection_note"
            :validate="vitalValidate.injection_note"
            :fill="!vitalData.injection"
            @inputForm="inputForm"
            >注入備考</InputForm
          >
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>むせ／歩数</h3>
      <ul class="row list-unstyled">
        <li class="col-md-3 col-6">
          <InputForm
            type="number"
            name="choke"
            :value="vitalData.choke"
            :validate="vitalValidate.choke"
            @inputForm="inputForm"
            >むせ(回数)</InputForm
          >
        </li>
        <li class="col-md-3 col-6">
          <InputForm
            :selectlist="selectList('step')"
            name="step"
            :value="vitalData.step"
            :validate="vitalValidate.step"
            @inputForm="inputForm"
            >歩数</InputForm
          >
        </li>
        <li class="col-md-12">
          <InputForm
            type="text"
            name="medical_note"
            :value="vitalData.medical_note"
            :validate="vitalValidate.medical_note"
            @inputForm="inputForm"
            >状態備考</InputForm
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
  name: 'VitalInputStep3',
  components: {
    InputForm,
  },
  mixins: [SelectModule], //ミックスインでcomputedを共通化
  computed: {
    vitalData() {
      return this.$store.getters['vital/vitalData']
    },
    vitalValidate() {
      return this.$store.getters['vital/vitalValidate']
    },
  },
  watch: {
    vitalData: {
      handler: function () {
        // 服薬がfalseの場合、storeのcommitにコールバック関数で処理を送り、stateの値を変更する
        !this.vitalData.medicine &&
          this.$store.dispatch('vital/stateInput', (state) => {
            state.vitalData.medicine_time = ''
          })
        // 服薬がfalseの場合、storeのcommitにコールバック関数で処理を送り、stateの値を変更する
        !this.vitalData.vomiting &&
          this.$store.dispatch('vital/stateInput', (state) => {
            state.vitalData.vomiting_time = ''
          })
        // 発作１がないの場合、storeのcommitにコールバック関数で処理を送り、stateの値を変更する
        if (!this.vitalData.attack1 || this.vitalData.attack1 == 4) {
          this.$store.dispatch('vital/stateInput', (state) => {
            state.vitalData.attack_time1 = ''
            state.vitalData.attack_duration1 = ''
            state.vitalData.attack_memo1 = ''
          })
        }
        // 発作２がないの場合、storeのcommitにコールバック関数で処理を送り、stateの値を変更する
        if (!this.vitalData.attack2 || this.vitalData.attack2 == 4) {
          this.$store.dispatch('vital/stateInput', (state) => {
            state.vitalData.attack_time2 = ''
            state.vitalData.attack_duration2 = ''
            state.vitalData.attack_memo2 = ''
          })
        }
        // 発作３がないの場合、storeのcommitにコールバック関数で処理を送り、stateの値を変更する
        if (!this.vitalData.attack3 || this.vitalData.attack3 == 4) {
          this.$store.dispatch('vital/stateInput', (state) => {
            state.vitalData.attack_time3 = ''
            state.vitalData.attack_duration3 = ''
            state.vitalData.attack_memo3 = ''
          })
        }
        // 吸引がfalseの場合、storeのcommitにコールバック関数で処理を送り、stateの値を変更する
        !this.vitalData.aspiration &&
          this.$store.dispatch('vital/stateInput', (state) => {
            state.vitalData.aspiration_time = ''
            state.vitalData.aspiration_point = ''
            state.vitalData.aspiration_color = ''
            state.vitalData.aspiration_type = ''
            state.vitalData.aspiration_note = ''
          })
        // 注入がfalseの場合、storeのcommitにコールバック関数で処理を送り、stateの値を変更する
        !this.vitalData.injection &&
          this.$store.dispatch('vital/stateInput', (state) => {
            state.vitalData.injection_start = ''
            state.vitalData.injection_end = ''
            state.vitalData.injection_point = ''
            state.vitalData.injection_vol = ''
            state.vitalData.injection_note = ''
          })
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
      this.$store.dispatch('vital/inputForm', e)
    },
    // ▼ 実行するバリデーションルールを記述（親コンポーネント、自コンポーネントのwatchが使用）
    Validate() {
      this.$store.dispatch('vital/Validate', (state) => {
        let e = {}
        // 利用者のバリデーション
        !state.vitalData.user_id
          ? (e.user_id = '利用者を選択してください')
          : (e.user_id = '')
        // 天候情報のバリデーション
        !state.vitalData.weather_record_id
          ? (e.weather_record_id = '登録された日付を選択して下さい')
          : (e.weather_record_id = '')
        state.vitalValidate = e
      })
    },
  },
}
</script>
