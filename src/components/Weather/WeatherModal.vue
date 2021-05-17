<template>
  <b-modal :id="$attrs.id" hide-header hide-footer　no-close-on-backdrop centered>
    <slot name="input"> </slot>
  </b-modal>
</template>
<script>
export default {
  name: 'WeatherModal',
  methods: {
    resetData() {
      this.$store.dispatch('weather/resetData')
    },
  },
}
</script>
