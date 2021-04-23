<template>
  <section class="mt-4">
    <ul class="row list-unstyled">
      <li class="col-md-12">
        <!-- fill で入力不可　:fill="boolean" で入力制御 -->
        <InputForm
          type="text"
          name="name"
          :value="userData.name"
          :validate="userValidate.name"
          @inputForm="inputForm"
          >名前</InputForm
        >
      </li>
      <li class="col-md-6">
        <InputForm
          type="number"
          name="age"
          :value="userData.age"
          :validate="userValidate.age"
          @inputForm="inputForm"
          >年齢</InputForm
        >
      </li>
      <li class="col-md-6">
        <InputForm
          :selectlist="selectList('sex')"
          name="sex"
          :value="userData.sex"
          :validate="userValidate.sex"
          @inputForm="inputForm"
          >性別</InputForm
        >
      </li>
      <li class="col-md-12">
        <InputForm
          type="text"
          name="diagnosis"
          :value="userData.diagnosis"
          :validate="userValidate.diagnosis"
          @inputForm="inputForm"
          >診断名</InputForm
        >
      </li>
      <li class="col-md-12">
        <InputForm
          type="text"
          name="note"
          :value="userData.note"
          :validate="userValidate.note"
          @inputForm="inputForm"
          >備考</InputForm
        >
      </li>
    </ul>
  </section>
</template>

<script>
import InputForm from '@/components/Common/InputForm.vue'
import SelectModule from '@/mixins/select'

export default {
  name: 'UserInputStep1',
  components: {
    InputForm,
  },
  mixins: [SelectModule], //ミックスインでcomputedを共通化
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
    userValidate: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    inputForm(e) {
      this.$store.dispatch('user/inputForm', e)
    },
  },
}
</script>
