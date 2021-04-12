<template>
  <div>
    <paginate name="paginate-items" tag="div" :list="usersList" :per="10">
      <table class="table table-hover table-striped mt-3 fs14">
        <thead>
          <tr>
            <th class="border-top-0 text-center">
              <button
                type="button"
                class="btn py-1 px-2 btn-danger fs14"
                @click="removeUsersList"
              >
                削除
              </button>
            </th>
            <th class="border-top-0">ID</th>
            <th class="border-top-0">名前</th>
            <th class="border-top-0">年齢</th>
            <th class="border-top-0">性別</th>
            <th class="border-top-0">診断名</th>
            <th class="border-top-0">登録日</th>
          </tr>
        </thead>
        <tbody>
          <tr
            is="user-table-list"
            v-for="user in paginated('paginate-items')"
            :key="user.id"
            :user="user"
          ></tr>
        </tbody>
      </table>
    </paginate>
    <paginate-links
      for="paginate-items"
      class="pagination justify-content-center"
      :limit="3"
      :show-step-links="true"
      :step-links="{
        next: '>',
        prev: '<',
      }"
      :classes="{
        'ul.paginate-links > li': 'page-item',
        'ul.paginate-links > li > a': 'page-link',
      }"
    ></paginate-links>
  </div>
</template>

<script>
import UserTableList from './UserTableList.vue'
export default {
  name: 'UserTable',
  components: {
    UserTableList,
  },
  props: {
    usersList: {
      type: Array,
      default: () => [],
    },
  },
  data: () => {
    return {
      paginate: ['paginate-items'],
    }
  },
  methods: {
    removeUsersList() {
      this.$store.dispatch('user/removeUsersList')
    },
  },
}
</script>
<style>
table tbody tr {
  cursor: pointer;
}
</style>
