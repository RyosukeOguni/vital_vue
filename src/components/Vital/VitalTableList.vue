<template>
  <tr @click="showVital(vital.id)">
    <td>{{ day }}</td>
    <td>{{ selectList({ weather: vital.weather }) }}</td>
    <td>{{ vital.body_temp }}℃</td>
    <td>{{ selectList({ mood: vital.condition }) }}</td>
    <td>{{ selectList({ mood: vital.mood }) }}</td>
    <td>{{ selectList({ sleep: vital.sleep }) }}</td>
    <td>{{ selectList({ breakfast: vital.breakfast }) }}</td>
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
    // セレクト項目の数値を文字に置き換えるモジュールを読み込む
    select() {
      return this.$store.getters['select']
    },
    // 算出プロパティの関数で、returnする関数に引数を入れると、算出プロパティが引数を受付けるようになる
    selectList() {
      return (v) => {
        return this.select.selectList(v)
      }
    },
  },
  methods: {
    // 非同期通信が終了するのを待って、モーダルを実行する
    async showVital(id) {
      await this.$store.dispatch('vital/showVital', id)
      await this.$bvModal.show('modal-put')
    },
  },
}
</script>
