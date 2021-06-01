<template>
  <section class="col-lg-12">
    <section class="mt-4">
      <h3>利用者</h3>
      <ul class="row list-unstyled">
        <li class="col-lg-4">
          <InputForm
            :selectlist="userNameList"
            name="user_id"
            :value="vitalData.user_id"
            fill
            >利用者</InputForm
          >
        </li>
        <li class="col-lg-2 col-6">
          <InputForm type="number" :value="vitalData.user_data.age" fill>年齢</InputForm>
        </li>
        <li class="col-lg-2 col-6">
          <InputForm
            :selectlist="selectList('sex')"
            name="sex"
            :value="vitalData.user_data.sex"
            fill
            >性別</InputForm
          >
        </li>
        <li class="col-lg-4">
          <InputForm
            type="text"
            name="diagnosis"
            :value="vitalData.user_data.diagnosis"
            fill
            >診断名</InputForm
          >
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>記録日／天候</h3>
      <ul class="row list-unstyled">
        <li class="col-lg-4">
          <InputForm
            type="date"
            name="weather_record_id"
            :value="vitalData.weather_data.day"
            fill
            >日付</InputForm
          >
        </li>
        <li class="col-lg-4">
          <InputForm
            :selectlist="selectList('weather')"
            name="weather"
            :value="vitalData.weather_data.weather"
            fill
            >天気</InputForm
          >
        </li>
        <li class="w-100"></li>
        <li class="col-lg-3 col-6">
          <InputForm type="number" name="temp" :value="vitalData.weather_data.temp" fill
            >外気温(℃)</InputForm
          >
        </li>
        <li class="col-lg-3 col-6">
          <InputForm
            type="number"
            name="room_temp"
            :value="vitalData.weather_data.room_temp"
            fill
            >内気温(℃)</InputForm
          >
        </li>
        <li class="col-lg-3 col-6">
          <InputForm
            type="number"
            name="humidity"
            :value="vitalData.weather_data.humidity"
            fill
            >外湿度(％)</InputForm
          >
        </li>
        <li class="col-lg-3 col-6">
          <InputForm
            type="number"
            name="room_humidity"
            :value="vitalData.weather_data.room_humidity"
            fill
            >内湿度(％)</InputForm
          >
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>バイタル</h3>
      <ul class="row list-unstyled">
        <li class="col-lg-3 col-md-6">
          <InputForm type="number" name="body_temp" :value="vitalData.body_temp" fill
            >体温(℃)</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm type="number" name="pulse" :value="vitalData.pulse" fill
            >脈拍(bpm)</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm
            :selectlist="selectList('breath')"
            name="breath"
            :value="vitalData.breath"
            fill
            >呼吸頻度</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm type="number" name="spo2" :value="vitalData.spo2" fill
            >SPO2(％)</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm type="number" name="dbp" :value="vitalData.dbp" fill
            >血圧(拡張)</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm type="number" name="sbp" :value="vitalData.sbp" fill
            >血圧(収縮)</InputForm
          >
        </li>
        <li class="w-100"></li>
        <li class="col-lg-12">
          <InputForm type="text" name="vital_note" :value="vitalData.vital_note" fill
            >バイタル備考</InputForm
          >
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>生活記録</h3>
      <ul class="row list-unstyled">
        <li class="col-lg-3 col-md-6">
          <InputForm
            :selectlist="selectList('mood')"
            name="condition"
            :value="vitalData.condition"
            fill
            >体調</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm
            :selectlist="selectList('mood')"
            name="mood"
            :value="vitalData.mood"
            fill
            >機嫌</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm
            :selectlist="selectList('sleep')"
            name="sleep"
            :value="vitalData.sleep"
            fill
            >睡眠</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm
            :selectlist="selectList('breakfast')"
            name="breakfast"
            :value="vitalData.breakfast"
            fill
            >朝食</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm :selectlist="bool" name="lunch" :value="vitalData.lunch" fill
            >昼食</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm
            :selectlist="selectList('lunchAmount')"
            name="lunch_amount"
            :value="vitalData.lunch_amount"
            fill
            >昼食量</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm
            :selectlist="daytime"
            name="lunch_start"
            :value="vitalData.lunch_start"
            fill
            >昼食開始時間</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm
            :selectlist="daytime"
            name="lunch_end"
            :value="vitalData.lunch_end"
            fill
            >昼食終了時間</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm :selectlist="bool" name="snack" :value="vitalData.snack" fill
            >おやつ</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm
            :selectlist="daytime"
            name="snack_time"
            :value="vitalData.snack_time"
            fill
            >おやつ時間</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm
            :selectlist="selectList('waterIntake')"
            name="water_intake"
            :value="vitalData.water_intake"
            fill
            >摂取水分量</InputForm
          >
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>排尿記録</h3>
      <ul class="row list-unstyled">
        <li class="col-lg-12 no-gutters">
          <ul class="row list-unstyled">
            <li class="col-lg-3 col-md-6">
              <InputForm
                :selectlist="selectList('vol')"
                name="voiding_vol1"
                :value="vitalData.voiding_vol1"
                fill
                >排尿量１</InputForm
              >
            </li>
            <li class="col-lg-3 col-md-6">
              <InputForm
                :selectlist="daytime"
                name="voiding_time1"
                :value="vitalData.voiding_time1"
                fill
                >排尿時間１</InputForm
              >
            </li>
            <li class="col-lg-6">
              <InputForm
                type="text"
                name="voiding_memo1"
                :value="vitalData.voiding_memo1"
                fill
                >排尿その他１</InputForm
              >
            </li>
          </ul>
          <ul class="row list-unstyled">
            <li class="col-lg-3 col-md-6">
              <InputForm
                :selectlist="selectList('vol')"
                name="voiding_vol2"
                :value="vitalData.voiding_vol2"
                fill
                >排尿量２</InputForm
              >
            </li>
            <li class="col-lg-3 col-md-6">
              <InputForm
                :selectlist="daytime"
                name="voiding_time2"
                :value="vitalData.voiding_time2"
                fill
                >排尿時間２</InputForm
              >
            </li>
            <li class="col-lg-6">
              <InputForm
                type="text"
                name="voiding_memo2"
                :value="vitalData.voiding_memo2"
                fill
                >排尿その他２</InputForm
              >
            </li>
          </ul>
          <ul class="row list-unstyled">
            <li class="col-lg-3 col-md-6">
              <InputForm
                :selectlist="selectList('vol')"
                name="voiding_vol3"
                :value="vitalData.voiding_vol3"
                fill
                >排尿量３</InputForm
              >
            </li>
            <li class="col-lg-3 col-md-6">
              <InputForm
                :selectlist="daytime"
                name="voiding_time3"
                :value="vitalData.voiding_time3"
                fill
                >排尿時間３</InputForm
              >
            </li>
            <li class="col-lg-6">
              <InputForm
                type="text"
                name="voiding_memo3"
                :value="vitalData.voiding_memo3"
                fill
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
        <li class="col-lg-12 no-gutters">
          <ul class="row list-unstyled">
            <li class="col-lg-3 col-md-6">
              <InputForm
                :selectlist="selectList('vol')"
                name="defecation_vol1"
                :value="vitalData.defecation_vol1"
                fill
                >排便量１</InputForm
              >
            </li>
            <li class="col-lg-3 col-md-6">
              <InputForm
                :selectlist="daytime"
                name="defecation_time1"
                :value="vitalData.defecation_time1"
                fill
                >排便時間１</InputForm
              >
            </li>
            <li class="col-lg-6">
              <InputForm
                type="text"
                name="defecation_memo1"
                :value="vitalData.defecation_memo1"
                fill
                >排便その他１</InputForm
              >
            </li>
          </ul>
          <ul class="row list-unstyled">
            <li class="col-lg-3 col-md-6">
              <InputForm
                :selectlist="selectList('vol')"
                name="defecation_vol2"
                :value="vitalData.defecation_vol2"
                fill
                >排便量２</InputForm
              >
            </li>
            <li class="col-lg-3 col-md-6">
              <InputForm
                :selectlist="daytime"
                name="defecation_time2"
                :value="vitalData.defecation_time2"
                fill
                >排便時間２</InputForm
              >
            </li>
            <li class="col-lg-6">
              <InputForm
                type="text"
                name="defecation_memo2"
                :value="vitalData.defecation_memo2"
                fill
                >排便その他２</InputForm
              >
            </li>
          </ul>
          <ul class="row list-unstyled">
            <li class="col-lg-3 col-md-6">
              <InputForm
                :selectlist="selectList('vol')"
                name="defecation_vol3"
                :value="vitalData.defecation_vol3"
                fill
                >排便量３</InputForm
              >
            </li>
            <li class="col-lg-3 col-md-6">
              <InputForm
                :selectlist="daytime"
                name="defecation_time3"
                :value="vitalData.defecation_time3"
                fill
                >排便時間３</InputForm
              >
            </li>
            <li class="col-lg-6">
              <InputForm
                type="text"
                name="defecation_memo3"
                :value="vitalData.defecation_memo3"
                fill
                >排便その他２</InputForm
              >
            </li>
          </ul>
        </li>
        <li class="col-lg-3">
          <InputForm
            type="number"
            name="total_defecation"
            :value="vitalData.total_defecation"
            fill
            >排便量合計(g)</InputForm
          >
        </li>
        <li class="w-100"></li>
        <li class="col-lg-12">
          <InputForm
            type="text"
            name="excretion_note"
            :value="vitalData.excretion_note"
            fill
            >排泄備考</InputForm
          >
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>服薬／嘔吐</h3>
      <ul class="row list-unstyled">
        <li class="col-lg-3 col-md-6">
          <InputForm :selectlist="bool" name="medicine" :value="vitalData.medicine" fill
            >服薬</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm
            :selectlist="daytime"
            name="medicine_time"
            :value="vitalData.medicine_time"
            fill
            >服薬時間</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm :selectlist="bool" name="vomiting" :value="vitalData.vomiting" fill
            >嘔吐</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm
            :selectlist="daytime"
            name="vomiting_time"
            :value="vitalData.vomiting_time"
            fill
            >嘔吐時間</InputForm
          >
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>発作</h3>
      <ul class="row list-unstyled">
        <li class="col-lg-12 no-gutters">
          <ul class="row list-unstyled">
            <li class="col-lg-3">
              <InputForm
                :selectlist="selectList('vol')"
                name="attack1"
                :value="vitalData.attack1"
                fill
                >発作１</InputForm
              >
            </li>
            <li class="col-lg-2 col-md-6">
              <InputForm
                :selectlist="daytime"
                name="attack_time1"
                :value="vitalData.attack_time1"
                fill
                >発作時間１</InputForm
              >
            </li>
            <li class="col-lg-3 col-md-6">
              <InputForm
                :selectlist="selectList('attackDuration')"
                name="attack_duration1"
                :value="vitalData.attack_duration1"
                fill
                >発作継続時間１</InputForm
              >
            </li>
            <li class="col-lg-4">
              <InputForm
                type="text"
                name="attack_memo1"
                :value="vitalData.attack_memo1"
                fill
                >その他１</InputForm
              >
            </li>
          </ul>
          <ul class="row list-unstyled">
            <li class="col-lg-3">
              <InputForm
                :selectlist="selectList('vol')"
                name="attack2"
                :value="vitalData.attack2"
                fill
                >発作２</InputForm
              >
            </li>
            <li class="col-lg-2 col-md-6">
              <InputForm
                :selectlist="daytime"
                name="attack_time2"
                :value="vitalData.attack_time2"
                fill
                >発作時間２</InputForm
              >
            </li>
            <li class="col-lg-3 col-md-6">
              <InputForm
                :selectlist="selectList('attackDuration')"
                name="attack_duration2"
                :value="vitalData.attack_duration2"
                fill
                >発作継続時間２</InputForm
              >
            </li>
            <li class="col-lg-4">
              <InputForm
                type="text"
                name="attack_memo2"
                :value="vitalData.attack_memo2"
                fill
                >その他２</InputForm
              >
            </li>
          </ul>
          <ul class="row list-unstyled">
            <li class="col-lg-3">
              <InputForm
                :selectlist="selectList('vol')"
                name="attack3"
                :value="vitalData.attack3"
                fill
                >発作３</InputForm
              >
            </li>
            <li class="col-lg-2 col-md-6">
              <InputForm
                :selectlist="daytime"
                name="attack_time3"
                :value="vitalData.attack_time3"
                fill
                >発作時間３</InputForm
              >
            </li>
            <li class="col-lg-3 col-md-6">
              <InputForm
                :selectlist="selectList('attackDuration')"
                name="attack_duration3"
                :value="vitalData.attack_duration3"
                fill
                >発作継続時間３</InputForm
              >
            </li>
            <li class="col-lg-4">
              <InputForm
                type="text"
                name="attack_memo3"
                :value="vitalData.attack_memo3"
                fill
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
        <li class="col-lg-15">
          <InputForm
            :selectlist="bool"
            name="aspiration"
            :value="vitalData.aspiration"
            fill
            >吸引</InputForm
          >
        </li>
        <li class="col-lg-15 col-md-6">
          <InputForm
            :selectlist="daytime"
            name="aspiration_time"
            :value="vitalData.aspiration_time"
            fill
            >吸引時間</InputForm
          >
        </li>
        <li class="col-lg-15 col-md-6">
          <InputForm
            :selectlist="selectList('aspirationPoint')"
            name="aspiration_point"
            :value="vitalData.aspiration_point"
            fill
            >吸引場所</InputForm
          >
        </li>
        <li class="col-lg-15 col-md-6">
          <InputForm
            :selectlist="selectList('aspirationColor')"
            name="aspiration_color"
            :value="vitalData.aspiration_color"
            fill
            >吸引物色</InputForm
          >
        </li>
        <li class="col-lg-15 col-md-6">
          <InputForm
            :selectlist="selectList('aspirationType')"
            name="aspiration_type"
            :value="vitalData.aspiration_type"
            fill
            >吸引質</InputForm
          >
        </li>
        <li class="col-lg-12">
          <InputForm
            type="text"
            name="aspiration_note"
            :value="vitalData.aspiration_note"
            fill
            >吸引備考</InputForm
          >
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>注入</h3>
      <ul class="row list-unstyled">
        <li class="col-lg-15">
          <InputForm :selectlist="bool" name="injection" :value="vitalData.injection" fill
            >注入</InputForm
          >
        </li>
        <li class="col-lg-15 col-md-6">
          <InputForm
            :selectlist="daytime"
            name="injection_start"
            :value="vitalData.injection_start"
            fill
            >注入開始時間</InputForm
          >
        </li>
        <li class="col-lg-15 col-md-6">
          <InputForm
            :selectlist="daytime"
            name="injection_end"
            :value="vitalData.injection_end"
            fill
            >注入終了時間</InputForm
          >
        </li>
        <li class="col-lg-15 col-md-6">
          <InputForm
            :selectlist="selectList('injectionPoint')"
            name="injection_point"
            :value="vitalData.injection_point"
            fill
            >注入場所</InputForm
          >
        </li>
        <li class="col-lg-15 col-md-6">
          <InputForm
            :selectlist="selectList('waterIntake')"
            name="injection_vol"
            :value="vitalData.injection_vol"
            fill
            >注入量</InputForm
          >
        </li>
        <li class="col-lg-12">
          <InputForm
            type="text"
            name="injection_note"
            :value="vitalData.injection_note"
            fill
            >注入備考</InputForm
          >
        </li>
      </ul>
    </section>
    <section class="mt-4">
      <h3>むせ／歩数</h3>
      <ul class="row list-unstyled">
        <li class="col-lg-3 col-md-6">
          <InputForm type="number" name="choke" :value="vitalData.choke" fill
            >むせ(回数)</InputForm
          >
        </li>
        <li class="col-lg-3 col-md-6">
          <InputForm
            :selectlist="selectList('step')"
            name="step"
            :value="vitalData.step"
            fill
            >歩数</InputForm
          >
        </li>
        <li class="col-lg-12">
          <InputForm type="text" name="medical_note" :value="vitalData.medical_note" fill
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
  name: 'VitalInputStep4',
  components: {
    InputForm,
  },
  mixins: [SelectModule], //ミックスインでcomputedを共通化
  computed: {
    vitalData() {
      return this.$store.getters['vital/vitalData']
    },
    usersList() {
      return this.$store.getters['user/usersList']
    },
    userNameList() {
      return this.usersList.map((data) => ({
        value: data.id,
        name: data.id + '：' + data.name,
      }))
    },
  },
}
</script>
