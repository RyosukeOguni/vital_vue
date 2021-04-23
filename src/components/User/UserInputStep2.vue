<template>
  <section class="mt-4">
    <ul class="row list-unstyled">
      <li class="col-md-12">
        <!-- fill で入力不可　:fill="boolean" で入力制御 -->
        <InputForm type="text" name="name" :value="userData.name" fill>名前</InputForm>
      </li>
      <li class="col-md-6">
        <InputForm type="number" min="0" name="age" :value="userData.age" fill
          >年齢</InputForm
        >
      </li>
      <li class="col-md-6">
        <InputForm :selectlist="selectList('sex')" name="sex" :value="userData.sex" fill
          >性別</InputForm
        >
      </li>
      <li class="col-md-12">
        <InputForm type="text" name="diagnosis" :value="userData.diagnosis" fill
          >診断名</InputForm
        >
      </li>
      <li class="col-md-12">
        <InputForm type="text" name="note" :value="userData.note" fill>備考</InputForm>
      </li>
    </ul>
  </section>
</template>

<script>
import InputForm from '@/components/Common/InputForm.vue'
import SelectModule from '@/mixins/select'

export default {
  name: 'UserInputStep2',
  components: {
    InputForm,
  },
  mixins: [SelectModule], //ミックスインでcomputedを共通化
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
