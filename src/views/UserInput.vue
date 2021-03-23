<template>
  <main class="container">
    <article class="user_input row justify-content-center">
      <section class="mt-4 col-md-6">
        <ProgressBar></ProgressBar>
        <h2 class="border-bottom border-secondary pb-2 mb-3">利用者登録</h2>
        <section class="mt-4">
          <ul class="row list-unstyled">
            <li class="col-md-12">
              <label class="text-field">
                <span class="text-field-label">名前</span>
                <input class="text-field-input" type="text" name="name" />
              </label>
            </li>
            <li class="col-md-6">
              <label class="text-field">
                <span class="text-field-label">年齢</span>
                <input class="text-field-input" type="number" name="age" />
              </label>
            </li>
            <li class="col-md-6">
              <label class="text-field">
                <span class="text-field-label">性別</span>
                <select class="text-field-input" name="sex">
                  <option value="0" selected>-</option>
                  <option value="1">男</option>
                  <option value="2">女</option>
                  <option value="9">適用不能</option>
                </select>
              </label>
            </li>
            <li class="col-md-12">
              <label class="text-field">
                <span class="text-field-label">診断名</span>
                <input class="text-field-input" type="text" name="diagnosis" />
              </label>
            </li>
            <li class="col-md-12">
              <label class="text-field">
                <span class="text-field-label">備考</span>
                <input class="text-field-input" type="text" name="note" />
              </label>
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
export default {
  name: 'UserInput',
  components: {
    ProgressBar,
  },
}
</script>
