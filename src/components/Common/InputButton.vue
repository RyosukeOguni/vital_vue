<template>
  <div class="form-footer mt-2 mb-2 text-center">
    <button v-if="page > 0" class="btn btn-secondary fs14" @click="pageBack">戻る</button>
    <button
      v-if="page < progress.length - 1"
      class="btn btn-primary fs14"
      @click="pageNext"
    >
      次へ
    </button>
    <!-- @clickイベントを複数持たせる場合、methodsの関数名に()をつけて、スペース区切りで記述 -->
    <button v-else class="btn btn-primary fs14" @click="decision"><slot></slot></button>
  </div>
</template>
<script>
export default {
  name: 'UserInputButton',
  props: {
    page: {
      type: Number,
      default: 0,
    },
    progress: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    pageBack() {
      this.$emit('pageBack')
    },
    pageNext() {
      this.$emit('pageNext')
    },
    decision() {
      this.$emit('decision')
    },
  },
}
</script>
<style>
.form-footer > button {
  margin-right: 0.5rem;
}
</style>
