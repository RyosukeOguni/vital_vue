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
    <UserModal id="modal-post">利用者登録</UserModal>
    <UserModal id="modal-put">利用者変更</UserModal>
  </main>
</template>
<script>
import UserTable from '@/components/User/UserTable'
import UserModal from '@/components/User/UserModal'
export default {
  name: 'User',
  components: {
    UserTable,
    UserModal,
  },
  computed: {
    usersList() {
      return this.$store.getters['users/usersList']
    },
    usersLength() {
      return this.usersList.length
    },
  },
  created() {
    this.$store.dispatch('users/usersListSet')
  },
}
</script>
