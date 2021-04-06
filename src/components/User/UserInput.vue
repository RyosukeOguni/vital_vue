<template>
  <main class="container">
    <article class="user_input row justify-content-center">
      <section class="mt-2 col-md-12">
        <ProgressBar :progress="progress"></ProgressBar>
        <UserInputStep1
          v-if="page === 1"
          :user-data="userData"
          :user-validate="userValidate"
        ></UserInputStep1>
        <UserInputStep2 v-if="page === 2" :user-data="userData"></UserInputStep2>
        <div class="form-footer mt-2 mb-2 text-center">
          <button v-if="page > 1" class="btn btn-secondary fs14" @click="pageBack">
            戻る
          </button>
          <button
            v-if="page < progress.length"
            class="btn btn-primary fs14"
            @click="pageNext"
          >
            次へ
          </button>
          <!-- @clickイベントを複数持たせる場合、methodsの関数名に()をつけて、スペース区切りで記述 -->
          <button
            v-else
            class="btn btn-primary fs14"
            @click="
              userRegist()
              resetData()
              $bvModal.hide('modal-post')
            "
          >
            登録
          </button>
        </div>
      </section>
    </article>
  </main>
</template>
<script>
import ProgressBar from '../ProgressBar.vue'
import UserInputStep1 from './UserInputStep1.vue'
import UserInputStep2 from './UserInputStep2.vue'

export default {
  name: 'UserInput',
  components: {
    ProgressBar,
    UserInputStep1,
    UserInputStep2,
  },
  data() {
    return {
      page: 1,
      progress: [
        { active: true, state: '基本情報入力' },
        { active: false, state: '確認' },
      ],
    }
  },
  computed: {
    userData() {
      return this.$store.getters['users/userData']
    },
    userValidate() {
      return this.$store.getters['users/userValidate']
    },
  },
  // userValidateに値が入っている間
  watch: {
    userData: {
      handler: function () {
        if (Object.keys(this.userValidate).length) {
          this.$store.dispatch('users/Validate')
        }
      },
      // userDataの下位のプロパティが変更された場合でもwatchを起動させる
      deep: true,
    },
  },
  methods: {
    pageBack() {
      this.page--
      this.progressMove()
    },
    pageNext() {
      // 一度目のバリデーションで、userValidateにプロパティを付与する
      this.$store.dispatch('users/Validate')
      // userValidateのプロパティの値がすべて空の時、次のページへ移る
      if (Object.values(this.userValidate).every((value) => value === '')) {
        this.page++
        this.progressMove()
      }
    },
    userRegist() {
      this.$store.dispatch('users/userRegist')
    },
    resetData() {
      this.$store.dispatch('users/resetData')
    },
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
.form-footer > button {
  margin-right: 0.5rem;
}
</style>
