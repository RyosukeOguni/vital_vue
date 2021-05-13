<template>
  <div>
    <paginate name="paginate-items" tag="div" :list="vitalsList" :per="10">
      <table class="table table-hover table-striped mt-3 fs14">
        <thead>
          <tr>
            <th class="border-top-0">通所日</th>
            <th class="border-top-0">天気</th>
            <th class="border-top-0">体温</th>
            <th class="border-top-0">体調</th>
            <th class="border-top-0">機嫌</th>
            <th class="border-top-0">睡眠</th>
            <th class="border-top-0">朝食</th>
          </tr>
        </thead>
        <tbody>
          <tr
            is="vital-table-list"
            v-for="vital in paginated('paginate-items')"
            :key="vital.id"
            :vital="vital"
          ></tr>
        </tbody>
      </table>
    </paginate>
    <paginate-links
      for="paginate-items"
      class="pagination justify-content-center"
      :limit="3"
      :show-step-links="true"
      :step-links="{
        next: '>',
        prev: '<',
      }"
      :classes="{
        'ul.paginate-links > li': 'page-item',
        'ul.paginate-links > li > a': 'page-link',
      }"
    ></paginate-links>
  </div>
</template>

<script>
import VitalTableList from './VitalTableList.vue'
export default {
  name: 'VitalTable',
  components: {
    VitalTableList,
  },
  props: {
    vitalsList: {
      type: Array,
      default: () => [],
    },
    tableProps: {
      type: Object,
      default: () => {},
    },
  },
  data: () => {
    return {
      paginate: ['paginate-items'],
    }
  },
  watch: {
    // 利用者、年月が変更された場合、ページネーションの初期位置を０に戻す
    vitalsList: {
      handler: function () {
        this.paginate['paginate-items'].page = 0
      },
      // 変更でvitalsListの情報が変わったとき、ページをそのままにする為、 deep: true, はしない。
    },
  },
}
</script>
<style>
table tbody tr {
  cursor: pointer;
}
</style>
