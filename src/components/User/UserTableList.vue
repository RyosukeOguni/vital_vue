<template>
  <tr>
    <td class="text-center">
      <div class="form-check text-center">
        <input
          type="checkbox"
          class="form-check-input position-static"
          :value="user.check"
          :checked="user.check"
          @input="deleteCheck({ user: user, check: !user.check })"
        />
      </div>
    </td>
    <td>{{ user.id }}</td>
    <td>{{ user.name }}</td>
    <td>{{ user.age }}歳</td>
    <td>{{ sexString }}</td>
    <td>{{ user.diagnosis }}</td>
    <td>{{ createDate }}</td>
  </tr>
</template>

<script>
export default {
  name: 'UserTableList',
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    // 数字から性別文字に変換
    sexString() {
      // storeから性別リスト（配列）を取得
      let sexList = this.$store.getters['users/sexList']
      // 性別リスト（配列）から数字の対応するものをひとつだけ取得して、値をreturn
      let sexString = sexList.find((data) => data.value === this.user.sex)
      return sexString.name
    },
    createDate() {
      // フォーマットでライブラリmomentのデータを整形表示
      let date = this.user.created_at
      return date.format('YYYY年MM月DD日')
    },
  },
  methods: {
    // チェックボックスに入力があればstoreのdeleteCheckを動かす
    deleteCheck(e) {
      this.$store.dispatch('users/deleteCheck', e)
    },
  },
}
</script>
