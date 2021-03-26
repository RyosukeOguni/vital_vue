<template>
  <main class="container">
    <article class="user_show row justify-content-center">
      <section class="mt-4 col-md-12">
        <h2 class="border-bottom border-secondary pb-2 mb-3">利用者一覧(全000件)</h2>
        <ul class="list-unstyled d-flex">
          <li class="border-secondary pr-3">
            <router-link to="/user_input" class="btn btn-primary fs14"
              >利用者登録
            </router-link>
          </li>
        </ul>
        <!-- <b-table striped hover :items="usersList"></b-table> -->
        <UserTable :users-list="usersList"></UserTable>
      </section>
    </article>
  </main>
</template>
<script>
import UserTable from '@/components/UserTable'
export default {
  name: 'User',
  components: {
    UserTable,
  },
  computed: {
    usersList() {
      return this.$store.getters['users/usersList']
    },
  },
  created() {
    this.$store.dispatch('users/usersDataSet')
  },
}
</script>
