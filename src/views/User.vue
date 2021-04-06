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

    <b-modal id="modal-post" hide-footer　no-close-on-backdrop>
      <template #modal-header="{ close }">
        <h5 class="modal-title">利用者登録</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="
            resetData()
            close()
          "
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </template>
      <UserInput></UserInput>
    </b-modal>

    <b-modal id="modal-put" hide-footer　no-close-on-backdrop>
      <template #modal-header="{ close }">
        <h5 class="modal-title">利用者変更</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="
            resetData()
            close()
          "
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </template>
      <UserInput></UserInput>
    </b-modal>
  </main>
</template>
<script>
import UserTable from '@/components/User/UserTable'
import UserInput from '@/components/User/UserInput'
export default {
  name: 'User',
  components: {
    UserTable,
    UserInput,
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
  methods: {
    resetData() {
      this.$store.dispatch('users/resetData')
    },
  },
}
</script>
