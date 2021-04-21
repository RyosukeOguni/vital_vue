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
  },
  data: () => {
    return {
      paginate: ['paginate-items'],
    }
  },
  watch: {
    vitalsList: {
      handler: function () {
        // vitalsListが変更された場合、ページネーションを０に戻す
        this.paginate['paginate-items'].page = 0
      },
      deep: true,
    },
  },
}
</script>
<style>
table tbody tr {
  cursor: pointer;
}
</style>
