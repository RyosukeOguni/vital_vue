<template>
  <tr @click="showVital(vital.id)">
    <td>{{ vital.day }}</td>
    <td>{{ vital.weather }}</td>
    <td>{{ vital.body_temp }}歳</td>
    <td>{{ vital.condition }}</td>
    <td>{{ vital.mood }}</td>
    <td>{{ vital.sleep }}</td>
    <td>{{ vital.breakfast }}</td>
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
    // 数字から性別文字に変換
    sexString() {
      // storeから性別リスト（配列）を取得
      let sexList = this.$store.getters['vital/sexList']
      // 性別リスト（配列）から数字の対応するものをひとつだけ取得して、値をreturn
      let sexString = sexList.find((data) => data.value === this.vital.sex)
      return sexString.name
    },
    createDate() {
      // フォーマットでライブラリmomentのデータを整形表示
      let date = this.vital.created_at
      return date.format('YYYY年MM月DD日')
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
