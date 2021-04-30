<template>
  <main class="container">
    <article class="vital_input row justify-content-center">
      <section class="mt-4 col-md-12">
        <ProgressBar :progress="progress"></ProgressBar>
      </section>
      <VitalInputStep1
        v-if="page === 1"
        :vital-data="vitalData[0]"
        :vital-validate="vitalValidate"
      ></VitalInputStep1>
      <VitalInputStep2 v-if="page === 2" :vital-data="vitalData"></VitalInputStep2>
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
import InputButton from '@/components/Common/InputButton.vue'

export default {
  name: 'VitalInput',
  components: {
    ProgressBar,
    VitalInputStep1,
    VitalInputStep2,
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
      page: 1,
      progress: [
        { active: true, state: 'バイタル記録' },
        { active: false, state: '排泄記録' },
        { active: false, state: '状態' },
        { active: false, state: '確認' },
      ],
    }
  },
  computed: {
    vitalData() {
      return this.$store.getters['vital/vitalData']
    },
    vitalValidate() {
      return this.$store.getters['vital/vitalValidate']
    },
  },
  watch: {
    vitalData: {
      handler: function () {
        if (Object.keys(this.vitalValidate).length) {
          this.$store.dispatch('vital/Validate', this.page - 1)
        }
      },
      deep: true,
    },
  },
  methods: {
    pageBack() {
      this.page--
      this.progressMove()
    },
    pageNext() {
      // バリデーションを開始してvitalValidateにプロパティを付与する
      this.$store.dispatch('vital/Validate', this.page - 1)
      // vitalValidateのプロパティの値がすべて空の時、次のページへ移る
      if (Object.values(this.vitalValidate).every((value) => value === '')) {
        this.page++
        this.progressMove()
      }
    },
    // VitalInputButtonのdecisionが発火したときの処理
    decision() {
      this.$store.dispatch('vital/' + this.inputType)
      this.$store.dispatch('vital/resetData')
      // モーダルが指定されていない場合、閉じる処理を行わない
      !!this.modelId && this.$bvModal.hide(this.modelId)
    },
    // プログレスバーをページ通りに進める
    progressMove() {
      // progress配列からactiveを全てfalseに変更
      this.progress = this.progress.map((data) => ({ active: false, state: data.state }))
      // progress配列の頭からpage分だけ、activeをtrueに変更
      for (let i = 0; i < this.page; i++) {
        this.progress[i].active = true
      }
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
.vital_input section section > ul {
  padding: 0 1rem;
}
@media (max-width: 767px) {
  .vital_input section section ul ul {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: #6c757d 1px dashed;
  }
}
</style>
