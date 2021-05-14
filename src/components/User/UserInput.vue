<template>
  <main class="container">
    <article class="user_input row justify-content-center">
      <section class="mt-2 col-md-12">
        <ProgressBar :progress="progress" @pageSelect="pageSelect"></ProgressBar>
        <UserInputStep1 v-if="page === 0" ref="step1"></UserInputStep1>
        <UserInputStep2 v-if="page === 1"></UserInputStep2>
        <InputButton
          :page="page"
          :progress="progress"
          @pageBack="pageBack"
          @pageNext="pageNext"
          @decision="decision"
          ><slot name="button"></slot
        ></InputButton>
      </section>
    </article>
  </main>
</template>
<script>
import ProgressBar from '@/components/Common/ProgressBar.vue'
import UserInputStep1 from '@/components/User/UserInputStep1.vue'
import UserInputStep2 from '@/components/User/UserInputStep2.vue'
import InputButton from '@/components/Common/InputButton.vue'

export default {
  name: 'UserInput',
  components: {
    ProgressBar,
    UserInputStep1,
    UserInputStep2,
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
        { active: true, state: '基本情報入力' },
        { active: false, state: '確認' },
      ],
    }
  },
  computed: {
    userValidate() {
      return this.$store.getters['user/userValidate']
    },
  },
  methods: {
    // ▼ プログレスバーから前の手順に戻るボタンが発火したときの処理
    pageSelect(e) {
      this.page = e
      this.progressMove()
    },
    pageBack() {
      this.page--
      this.progressMove()
    },
    pageNext() {
      // 子コンポーネントのバリデーションメソッドを実行する
      this.$refs.step1.Validate()
      // userValidateのプロパティの値がすべて空の時、次のページへ移る
      if (Object.values(this.userValidate).every((value) => value === '')) {
        this.page++
        this.progressMove()
      }
    },
    // UserInputButtonのdecisionが発火したときの処理
    decision() {
      this.$store.dispatch('user/' + this.inputType)
      this.$store.dispatch('user/resetData')
      // モーダルが指定されていない場合、閉じる処理を行わない
      !!this.modelId && this.$bvModal.hide(this.modelId)
    },
    // プログレスバーをページ通りに進める
    progressMove() {
      // progress配列からactiveを全てfalseに変更
      this.progress = this.progress.map((data) => ({ active: false, state: data.state }))
      // progress配列の頭からpage分だけ、activeをtrueに変更
      for (let i = 0; i <= this.page; i++) {
        this.progress[i].active = true
      }
    },
  },
}
</script>
