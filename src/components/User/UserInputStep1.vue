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
          >名前</InputForm
        >
      </li>
      <li class="col-md-6">
        <InputForm
          type="number"
          name="age"
          :value="userData.age"
          :validate="userValidate.age"
          >年齢</InputForm
        >
      </li>
      <li class="col-md-6">
        <InputForm
          :selectlist="sexList"
          name="sex"
          :value="userData.sex"
          :validate="userValidate.sex"
          >性別</InputForm
        >
      </li>
      <li class="col-md-12">
        <InputForm
          type="text"
          name="diagnosis"
          :value="userData.diagnosis"
          :validate="userValidate.diagnosis"
          >診断名</InputForm
        >
      </li>
      <li class="col-md-12">
        <InputForm
          type="text"
          name="note"
          :value="userData.note"
          :validate="userValidate.note"
          >備考</InputForm
        >
      </li>
    </ul>
  </section>
</template>

<script>
import InputForm from '../InputForm.vue'

export default {
  name: 'UserInputArea',
  components: {
    InputForm,
  },
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
  computed: {
    sexList() {
      return this.$store.getters['users/sexList']
    },
  },
}
</script>
