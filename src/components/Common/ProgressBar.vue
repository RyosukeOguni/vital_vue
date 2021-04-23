<template>
  <ul class="progressbar list-unstyled d-flex justify-content-center">
    <!-- step.activeがtureのとき、classにactiveを追加 -->
    <li
      v-for="(step, index) in progress"
      :key="index"
      :class="step.active && 'active'"
      class="w-50 position-relative text-center fs12"
    >
      {{ step.state }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progress: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style>
/* progressbar */
.progressbar {
  counter-reset: step;
}
.progressbar li:before {
  content: counter(step);
  counter-increment: step;
  width: 2rem;
  height: 2rem;
  display: block;
  margin: 0 auto 0.5rem auto;
  border-radius: 50%;
  line-height: 2rem;
  background: #d0e1f9;
  color: #ffffff;
  text-align: center;
  font-size: 1rem;
  position: relative;
  z-index: 1;
}
.progressbar li:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 3px;
  background: #d0e1f9;
  top: 1rem;
  left: -50%;
  z-index: 0;
}
.progressbar li:first-child:after {
  content: none;
}
.progressbar li.active:before {
  background: #4d648d;
  color: white;
}
.progressbar li.active:after {
  background: #4d648d;
}
</style>
