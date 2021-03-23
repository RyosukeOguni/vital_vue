<template>
  <div id="app">
    <NaviBar></NaviBar>
    <router-view />
  </div>
</template>

<script>
import NaviBar from '@/components/NaviBar.vue'

export default {
  name: 'Top',
  components: {
    NaviBar,
  },
}
</script>
