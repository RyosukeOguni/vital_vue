<template>
  <tr @click="showVital(vital.id)">
    <td>{{ day }}</td>
    <td>{{ selectStr({ weather: vital.weather }) }}</td>
    <td>{{ vital.body_temp }}℃</td>
    <td>{{ selectStr({ mood: vital.condition }) }}</td>
    <td>{{ selectStr({ mood: vital.mood }) }}</td>
    <td>{{ selectStr({ sleep: vital.sleep }) }}</td>
    <td>{{ selectStr({ breakfast: vital.breakfast }) }}</td>
  </tr>
</template>

<script>
import SelectModule from '@/mixins/select'

export default {
  name: 'VitalTableList',
  mixins: [SelectModule], //ミックスインでcomputedを共通化
  props: {
    vital: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    // フォーマットでライブラリmomentのデータを整形表示
    day() {
      let day = this.vital.day
      return day.format('YYYY年M月D日')
    },
  },
  methods: {
    // 非同期通信が終了するのを待って、モーダルを実行する
    async showVital(id) {
      await this.$store.dispatch('vital/showVital', id)
      await this.$bvModal.show('modal-vital-put')
    },
  },
}
</script>
