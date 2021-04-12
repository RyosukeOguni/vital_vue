<template>
  <b-modal :id="$attrs.id" hide-header hide-footer　no-close-on-backdrop>
    <WeatherInput input-type="weatherRegist" model-id="modal-post"> </WeatherInput>
  </b-modal>
</template>
<script>
import WeatherInput from '@/components/Weather/WeatherInput.vue'

export default {
  name: 'WeatherModal',
  components: {
    WeatherInput,
  },
  methods: {
    resetData() {
      this.$store.dispatch('weather/resetData')
    },
  },
}
</script>
