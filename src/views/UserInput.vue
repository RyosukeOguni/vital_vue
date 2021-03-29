<template>
  <main class="container">
    <article class="user_input row justify-content-center">
      <section class="mt-4 col-md-6">
        <ProgressBar></ProgressBar>
        <h2 class="border-bottom border-secondary pb-2 mb-3">利用者登録</h2>
        <section class="mt-4">
          <ul class="row list-unstyled">
            <li class="col-md-12">
              <!-- fill="fill"で入力不可 -->
              <InputForm type="text" name="name">名前</InputForm>
            </li>
            <li class="col-md-6">
              <InputForm type="number" name="age">年齢</InputForm>
            </li>
            <li class="col-md-6">
              <InputForm :selectlist="sex" name="sex">性別</InputForm>
            </li>
            <li class="col-md-12">
              <InputForm type="text" name="diagnosis">診断名</InputForm>
            </li>
            <li class="col-md-12">
              <InputForm type="text" name="note">備考</InputForm>
            </li>
          </ul>
        </section>
        <div class="form-footer mt-2 mb-5 text-center">
          <button class="btn btn-secondary fs14">戻る</button>
          <button class="btn btn-primary fs14">次へ</button>
        </div>
      </section>
    </article>
  </main>
</template>
<script>
import ProgressBar from '@/components/ProgressBar.vue'
import InputForm from '@/components/InputForm.vue'
export default {
  name: 'UserInput',
  components: {
    ProgressBar,
    InputForm,
  },
  data() {
    return {
      sex: [
        { value: '0', name: '-' },
        { value: '1', name: '男' },
        { value: '2', name: '女' },
        { value: '9', name: '適用不能' },
      ],
    }
  },
}
</script>
