<template>
  <select
    v-model="newText"
    class="text-field-input"
    :disabled="fill"
    @input="inputForm({ name: name, text: newText })"
  >
    <option v-for="select in selectlist" :key="select.value" :value="select.value">
      {{ select.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'InputSelect',
  props: {
    selectlist: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: '',
    },
    fill: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newText: '',
    }
  },
  methods: {
    inputForm(e) {
      this.$store.dispatch('users/inputForm', e)
    },
  },
}
</script>
