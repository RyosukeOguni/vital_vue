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
    <td>{{ user.created_at }}</td>
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
    sexString() {
      let sex = ''
      switch (this.user.sex) {
        case '0':
          sex = '不明'
          break
        case '1':
          sex = '男'
          break
        case '2':
          sex = '女'
          break
        case '9':
          sex = '適用不能'
          break
        default:
          break
      }
      return sex
    },
  },
  methods: {
    deleteCheck(e) {
      this.$store.dispatch('users/deleteCheck', e)
    },
  },
}
</script>

<style></style>
