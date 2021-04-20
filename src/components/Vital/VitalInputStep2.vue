<template>
  <section class="mt-4">
    <ul class="row list-unstyled">
      <li class="col-md-12">
        <!-- fill で入力不可　:fill="boolean" で入力制御 -->
        <InputForm type="text" name="name" :value="vitalData.name" fill>名前</InputForm>
      </li>
      <li class="col-md-6">
        <InputForm type="number" min="0" name="age" :value="vitalData.age" fill
          >年齢</InputForm
        >
      </li>
      <li class="col-md-6">
        <InputForm :selectlist="sexList" name="sex" :value="vitalData.sex" fill
          >性別</InputForm
        >
      </li>
      <li class="col-md-12">
        <InputForm type="text" name="diagnosis" :value="vitalData.diagnosis" fill
          >診断名</InputForm
        >
      </li>
      <li class="col-md-12">
        <InputForm type="text" name="note" :value="vitalData.note" fill>備考</InputForm>
      </li>
    </ul>
  </section>
</template>

<script>
import InputForm from '@/components/Common/InputForm.vue'

export default {
  name: 'VitalInputStep2',
  components: {
    InputForm,
  },
  props: {
    vitalData: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    sexList() {
      return this.$store.getters['vital/sexList']
    },
  },
}
</script>
