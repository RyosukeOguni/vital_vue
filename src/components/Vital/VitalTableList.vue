<template>
  <tr @click="showVital(vital.id)">
    <td>{{ day }}</td>
    <td>{{ weather }}</td>
    <td>{{ vital.body_temp }}℃</td>
    <td>{{ condition }}</td>
    <td>{{ mood }}</td>
    <td>{{ sleep }}</td>
    <td>{{ breakfast }}</td>
  </tr>
</template>

<script>
export default {
  name: 'VitalTableList',
  props: {
    vital: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    day() {
      // フォーマットでライブラリmomentのデータを整形表示
      let day = this.vital.day
      return day.format('YYYY年M月D日')
    },
    moduleList() {
      return this.$store.getters['vitalIndex/moduleList']
    },
    weather() {
      return this.moduleList.wheatherJp[this.vital.weather]
    },
    mood() {
      let mood = this.moduleList.mood.find((data) => data.value === this.vital.mood)
      return mood.name
    },
    condition() {
      let condition = this.moduleList.mood.find(
        (data) => data.value === this.vital.condition
      )
      return condition.name
    },
    sleep() {
      let sleep = this.moduleList.sleep.find((data) => data.value === this.vital.sleep)
      return sleep.name
    },
    breakfast() {
      let breakfast = this.moduleList.breakfast.find(
        (data) => data.value === this.vital.breakfast
      )
      return breakfast.name
    },
  },
  methods: {
    // チェックボックスに入力があればstoreのdeleteCheckを動かす
    deleteCheck(e) {
      this.$store.dispatch('vital/deleteCheck', e)
    },
    // 非同期通信が終了するのを待って、モーダルを実行する
    async showVital(id) {
      await this.$store.dispatch('vital/showVital', id)
      await this.$bvModal.show('modal-put')
    },
  },
}
</script>
