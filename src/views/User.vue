<template>
  <main class="container">
    <article class="user_show row justify-content-center">
      <section class="mt-4 col-md-12">
        <h2 class="border-bottom border-secondary pb-2 mb-3">
          利用者一覧(全{{ usersLength }}件)
        </h2>
        <ul class="list-unstyled d-flex">
          <li class="border-secondary pr-3">
            <b-button v-b-modal.modal-post variant="primary" class="fs14"
              >利用者登録</b-button
            >
          </li>
        </ul>
        <UserTable v-if="usersList" :users-list="usersList"></UserTable>
      </section>
    </article>
    <!-- 利用者登録ボタンを押下したときに展開する利用者登録モーダル -->
    <UserModal id="modal-post"
      >利用者登録
      <template #input>
        <UserInput input-type="userRegist" model-id="modal-post">
          <template #button>登録</template>
        </UserInput>
      </template>
    </UserModal>
    <!-- テーブル行を押したときに展開する利用者変更モーダル -->
    <UserModal id="modal-put"
      >利用者変更
      <template #input>
        <UserInput input-type="userEdit" model-id="modal-put">
          <template #button>変更</template>
        </UserInput>
      </template>
    </UserModal>
  </main>
</template>
<script>
import UserTable from '@/components/User/UserTable'
import UserModal from '@/components/User/UserModal'
import UserInput from '@/components/User/UserInput.vue'

export default {
  name: 'User',
  components: {
    UserTable,
    UserModal,
    UserInput,
  },
  computed: {
    usersList() {
      let users = this.$store.getters['user/usersList']
      // ライブラリMomentのインスタンスcreated_atを比較して降順に並び替え
      return users.sort((a, b) => {
        return b.created_at - a.created_at
      })
    },
    usersLength() {
      return this.usersList.length
    },
  },
  created() {
    this.$store.dispatch('user/usersListSet')
  },
}
</script>
