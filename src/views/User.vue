<template>
  <main class="container">
    <article class="user_show row justify-content-center">
      <section class="mt-4 col-md-12">
        <h2 class="border-bottom border-secondary pb-2 mb-3">
          利用者一覧(全{{ usersLength }}件)
        </h2>
        <ul class="list-unstyled d-flex">
          <li class="border-secondary pr-3">
            <b-button v-b-modal.modal-1 variant="primary" class="fs14"
              >利用者登録</b-button
            >
          </li>
        </ul>
        <UserTable v-if="usersList" :users-list="usersList"></UserTable>
      </section>
    </article>
    <b-modal id="modal-1" title="BootstrapVue" hide-footer　no-close-on-backdrop>
      <!-- <template #modal-title>利用者登録</template> -->
      <template #modal-header="{ close }">
        <h5>利用者登録</h5>
        <b-button
          size="sm"
          variant="outline-danger"
          @click="
            resetUserData()
            close()
          "
        >
          Close Modal
        </b-button>
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
    this.$store.dispatch('users/usersDataSet')
  },
  methods: {
    resetUserData() {
      this.$store.dispatch('users/resetUserData')
    },
  },
}
</script>
