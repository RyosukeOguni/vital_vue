<template>
  <main class="container">
    <article class="vital_input row justify-content-center">
      <section class="mt-4 col-md-12">
        <ProgressBar :progress="progress" @pageSelect="pageSelect"></ProgressBar>
      </section>
      <VitalInputStep1 v-if="page === 0" ref="step_0"></VitalInputStep1>
      <VitalInputStep2 v-if="page === 1" ref="step_1"></VitalInputStep2>
      <VitalInputStep3 v-if="page === 2" ref="step_2"></VitalInputStep3>
      <VitalInputStep4 v-if="page === 3" ref="step_3"></VitalInputStep4>
      <InputButton
        :page="page"
        :progress="progress"
        @pageBack="pageBack"
        @pageNext="pageNext"
        @decision="decision"
        ><slot name="button"></slot
      ></InputButton>
    </article>
  </main>
</template>
<script>
import ProgressBar from '@/components/Common/ProgressBar.vue'
import VitalInputStep1 from '@/components/Vital/VitalInputStep1.vue'
import VitalInputStep2 from '@/components/Vital/VitalInputStep2.vue'
import VitalInputStep3 from '@/components/Vital/VitalInputStep3.vue'
import VitalInputStep4 from '@/components/Vital/VitalInputStep4.vue'
import InputButton from '@/components/Common/InputButton.vue'

export default {
  name: 'VitalInput',
  components: {
    ProgressBar,
    VitalInputStep1,
    VitalInputStep2,
    VitalInputStep3,
    VitalInputStep4,
    InputButton,
  },
  props: {
    inputType: {
      type: String,
      default: '',
    },
    modelId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      page: 0,
      progress: [
        { active: true, state: 'バイタル記録' },
        { active: false, state: '排泄記録' },
        { active: false, state: '状態' },
        { active: false, state: '確認' },
      ],
    }
  },
  computed: {
    vitalValidate() {
      return this.$store.getters['vital/vitalValidate']
    },
  },
  methods: {
    // ▼ プログレスバーから前の手順に戻るボタンが発火したときの処理
    pageSelect(e) {
      this.scrollTop()
      this.page = e
      this.progressMove()
    },
    // ▼ 戻るボタンが発火したときの処理
    pageBack() {
      this.scrollTop()
      this.page--
      this.progressMove()
    },
    // ▼ 次へボタンが発火したときの処理
    pageNext() {
      // 指定した子コンポーネントのバリデーションを実行してvitalValidateにプロパティを付与する
      this.$refs['step_' + this.page].Validate()
      // vitalValidateのプロパティの値がすべて空の時、Validateプロパティを削除して次のページへ移る
      if (Object.values(this.vitalValidate).every((value) => value === '')) {
        this.page++
        this.progressMove()
      }
      this.scrollTop()
    },
    // ▼ 最後のボタンが発火したときの処理
    decision() {
      this.$store.dispatch('vital/' + this.inputType)
      this.$store.dispatch('vital/resetData')
      // モーダル名が指定されている場合、閉じる処理を行う
      !!this.modelId && this.$bvModal.hide(this.modelId)
    },
    // ▼ プログレスバーをページ通りに進める
    progressMove() {
      // progress配列からactiveを全てfalseに変更
      this.progress = this.progress.map((data) => ({ active: false, state: data.state }))
      // progress配列の頭からpage分だけ、activeをtrueに変更
      for (let i = 0; i <= this.page; i++) {
        this.progress[i].active = true
      }
    },
    scrollTop() {
      this.$emit('scrollTop', this.modelId)
    },
  },
}
</script>
<style>
/* vital_input */
.vital_input h3 {
  padding: 0.2rem 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border-radius: 1.4rem;
  background: #dae8fc;
  color: #6c8ebf;
}
@media (max-width: 767px) {
  .vital_input section section ul ul {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: #6c757d 1px dashed;
  }
}
</style>
