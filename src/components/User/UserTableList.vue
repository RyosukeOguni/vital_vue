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
    <td @click="showModal(user.id)">{{ user.id }}</td>
    <td @click="showModal(user.id)">{{ user.name }}</td>
    <td @click="showModal(user.id)">{{ user.age }}歳</td>
    <td @click="showModal(user.id)">{{ selectStr({ sex: user.sex }) }}</td>
    <td @click="showModal(user.id)">{{ user.diagnosis }}</td>
    <td @click="showModal(user.id)">{{ createDate }}</td>
  </tr>
</template>

<script>
import SelectModule from '@/mixins/select'

export default {
  name: 'UserTableList',
  mixins: [SelectModule], //ミックスインでcomputedを共通化
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    createDate() {
      let date = this.user.created_at
      return date.format('YYYY年MM月DD日')
    },
  },
  methods: {
    // チェックボックスに入力があればstoreのdeleteCheckを動かす
    deleteCheck(e) {
      this.$store.dispatch('user/stateInput', (state) => {
        state.usersList = state.usersList.map((data) => {
          // payloadされたuserオブジェクトをリストと比較して、同じであればチェック状態を変更
          if (data === e.user) {
            data.check = e.check
          }
          return data
        })
      })
    },

    // async/awaitで非同期通信が終了するのを待って、モーダルを開く
    async showModal(id) {
      await this.$store.dispatch('user/showUser', id)
      await this.$bvModal.show('modal-put')
    },
  },
}
</script>
