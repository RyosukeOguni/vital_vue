<template>
  <tr>
    <td class="text-center">
      <div class="form-check text-center">
        <input type="checkbox" class="form-check-input position-static" />
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
      return this.user.sex == 1 ? '男' : '女'
    },
  },
}
</script>

<style></style>
