<template>
  <main class="container">
    <article class="vital_show row justify-content-center">
      <section class="mt-4 col-md-12">
        <h2 class="border-bottom border-secondary pb-2 mb-3">
          バイタル一覧(月別{{ vitalsLength }}件)
        </h2>
        <ul class="row list-unstyled">
          <li class="col-md-4">
            <InputForm
              :selectlist="userNameList"
              name="user_id"
              :value="tableProps.user_id"
              @inputForm="inputForm"
              >利用者</InputForm
            >
          </li>
          <li class="col-md-3">
            <InputForm
              type="month"
              name="year_month"
              :value="tableProps.year_month"
              @inputForm="inputForm"
              >年月</InputForm
            >
          </li>
        </ul>
        <VitalTable v-if="vitalsList" :vitals-list="vitalsList"></VitalTable>
      </section>
    </article>
  </main>
</template>
<script>
import VitalTable from '@/components/Vital/VitalTable'
import InputForm from '@/components/Common/InputForm.vue'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Vital',
  components: {
    VitalTable,
    InputForm,
  },
  data() {
    return {
      tableProps: {
        user_id: '',
        year_month: moment().format('YYYY-MM'),
      },
      userNameList: [],
    }
  },
  computed: {
    vitalsList() {
      return this.$store.getters['vital/vitalsList']
    },
    vitalsLength() {
      return this.vitalsList.length
    },
  },
  // userとdayの入力が変わる度にDBからデータを取得する
  watch: {
    tableProps: {
      handler: function (tableProps) {
        this.$store.dispatch('vital/vitalsListSet', tableProps)
      },
      deep: true,
    },
  },
  created() {
    axios
      .get('http://localhost:8000/api/users')
      .then((response) => {
        console.log(response)
        this.userNameList = response.data.data.map((data) => ({
          value: data.data.id,
          name: data.data.id + '：' + data.data.attribute.name,
        }))
      })
      .catch((error) => {
        console.log(error)
      })
  },
  destroyed() {
    this.$store.dispatch('vital/resetData')
  },
  methods: {
    inputForm(e) {
      this.tableProps[e.name] = e.value
    },
  },
}
</script>
