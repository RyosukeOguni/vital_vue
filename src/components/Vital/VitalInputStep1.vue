<template>
  <section class="mt-4">
    <ul class="row list-unstyled">
      <li class="col-md-12">
        <!-- fill で入力不可　:fill="boolean" で入力制御 -->
        <InputForm
          type="text"
          name="name"
          :value="vitalData.name"
          :validate="vitalValidate.name"
          @inputForm="inputForm"
          >名前</InputForm
        >
      </li>
      <li class="col-md-6">
        <InputForm
          type="number"
          name="age"
          :value="vitalData.age"
          :validate="vitalValidate.age"
          @inputForm="inputForm"
          >年齢</InputForm
        >
      </li>
      <li class="col-md-6">
        <InputForm
          :selectlist="sexList"
          name="sex"
          :value="vitalData.sex"
          :validate="vitalValidate.sex"
          @inputForm="inputForm"
          >性別</InputForm
        >
      </li>
      <li class="col-md-12">
        <InputForm
          type="text"
          name="diagnosis"
          :value="vitalData.diagnosis"
          :validate="vitalValidate.diagnosis"
          @inputForm="inputForm"
          >診断名</InputForm
        >
      </li>
      <li class="col-md-12">
        <InputForm
          type="text"
          name="note"
          :value="vitalData.note"
          :validate="vitalValidate.note"
          @inputForm="inputForm"
          >備考</InputForm
        >
      </li>
    </ul>
  </section>
</template>

<script>
import InputForm from '@/components/Common/InputForm.vue'

export default {
  name: 'VitalInputStep1',
  components: {
    InputForm,
  },
  props: {
    vitalData: {
      type: Object,
      default: () => {},
    },
    vitalValidate: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    sexList() {
      return this.$store.getters['vital/sexList']
    },
  },
  methods: {
    inputForm(e) {
      this.$store.dispatch('vital/inputForm', e)
    },
  },
}
</script>
