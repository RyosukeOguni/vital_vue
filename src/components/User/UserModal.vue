<template>
  <b-modal :id="$attrs.id" hide-footer　no-close-on-backdrop>
    <template #modal-header="{ close }">
      <h5 class="modal-title"><slot></slot></h5>
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
</template>
<script>
import UserInput from './UserInput.vue'

export default {
  name: 'UserModal',
  components: {
    UserInput,
  },
  methods: {
    resetData() {
      this.$store.dispatch('users/resetData')
    },
  },
}
</script>
