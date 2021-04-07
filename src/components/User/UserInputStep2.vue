<template>
  <section class="mt-4">
    <ul class="row list-unstyled">
      <li class="col-md-12">
        <!-- fill="fill" で入力不可 -->
        <InputForm type="text" name="name" :value="userData.name" fill>名前</InputForm>
      </li>
      <li class="col-md-6">
        <InputForm type="number" min="0" name="age" :value="userData.age" fill
          >年齢</InputForm
        >
      </li>
      <li class="col-md-6">
        <InputForm :selectlist="sexList" name="sex" :value="userData.sex" fill
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
  },
  computed: {
    sexList() {
      return this.$store.getters['users/sexList']
    },
  },
}
</script>
