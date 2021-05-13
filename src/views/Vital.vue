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
        <VitalTable
          v-if="vitalsList"
          :vitals-list="vitalsList"
          :table-props="tableProps"
        ></VitalTable>
      </section>
    </article>
    <!-- バイタル新規登録ボタンを押下したときに展開するバイタル新規登録モーダル -->
    <VitalModal id="modal-vital-put"
      >バイタル登録
      <template #input>
        <VitalInput input-type="vitalEdit" model-id="modal-vital-put"
          ><template #button>更新</template></VitalInput
        ></template
      ></VitalModal
    >
  </main>
</template>
<script>
import VitalTable from '@/components/Vital/VitalTable'
import InputForm from '@/components/Common/InputForm.vue'
import VitalModal from '@/components/Vital/VitalModal.vue'
import VitalInput from '@/components/Vital/VitalInput.vue'
import moment from 'moment'

export default {
  name: 'Vital',
  components: {
    VitalTable,
    InputForm,
    VitalModal,
    VitalInput,
  },
  data() {
    return {
      tableProps: {
        user_id: null,
        year_month: moment().format('YYYY-MM'),
      },
    }
  },
  computed: {
    vitalsList() {
      return this.$store.getters['vital/vitalsList']
    },
    vitalsLength() {
      return this.vitalsList.length
    },
    usersList() {
      return this.$store.getters['user/usersList']
    },
    userNameList() {
      return this.usersList.map((data) => ({
        value: data.id,
        name: data.id + '：' + data.name,
      }))
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
    // バイタル入力画面で選択する利用者一覧をあらかじめ読み込んでおく
    this.$store.dispatch('user/usersListSet')
  },
  // ルート変更時にバイタル一覧をリセットする
  destroyed() {
    this.$store.dispatch('vital/resetList')
  },
  methods: {
    inputForm(e) {
      this.tableProps[e.name] = e.value
    },
  },
}
</script>
<style>
@media (min-width: 576px) {
  #modal-vital-put .modal-dialog {
    max-width: 90%;
  }
}
</style>
