<template>
  <div :class="!!validate && 'error'">
    <!-- fillプロパティがある場合、fillをclassに追加 -->
    <label class="text-field" :class="{ fill: fill }">
      <span class="text-field-label"
        ><slot>ラベル名</slot><span v-if="validate">※</span></span
      >
      <!-- typeがバインドされた場合、inputを表示 -->
      <input
        v-if="type"
        v-model="newValue"
        class="text-field-input"
        :type="type"
        :disabled="fill"
        min="0"
        step="0.1"
        @input="inputForm({ name: name, value: newValue })"
      />
      <!-- 配列selectlistがバインドされた場合、selectを表示 -->
      <select
        v-if="selectlist"
        v-model="newValue"
        class="text-field-input"
        :disabled="fill"
        @change="inputForm({ name: name, value: newValue })"
      >
        <option value="" disabled selected>選択して下さい</option>
        <option v-for="select in selectlist" :key="select.value" :value="select.value">
          {{ select.name }}
        </option>
      </select>
    </label>
    <p v-if="validate" class="fs12">{{ validate }}</p>
  </div>
</template>

<script>
export default {
  name: 'InputForm',
  props: {
    type: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    selectlist: {
      type: Array,
      default: null,
    },
    validate: {
      type: String,
      default: '',
    },
    fill: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newValue: this.value,
    }
  },
  methods: {
    inputForm(e) {
      this.$emit('inputForm', e)
    },
  },
}
</script>

<style>
/* input */
.text-field {
  position: relative;
  width: 100%;
  background-color: #f5f5f5;
  border-bottom: 1px solid;
  border-radius: 4px 4px 0 0;
}
.text-field-label {
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.15rem;
}
.text-field-input {
  font-size: 1rem;
  width: 100%;
  padding: 2rem 0.5rem 0.5rem;
  border: none;
  background: none;
  height: 4rem;
}
/* セレクトボックスのアイコンをSVGでバックグラウンド表示 */
select.text-field-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' color='gray' fill='currentColor' class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 20px, 100%;
}
/* 入力不可 */
.text-field.fill {
  background-color: #ffffff;
}
.fill .text-field-input {
  margin-bottom: 0;
}
.fill select.text-field-input {
  background: none;
}
input.text-field-input:disabled,
select.text-field-input:disabled {
  color: #212529;
  opacity: 1;
  appearance: none;
}
/* バリデーション */
.error,
.error .text-field-label {
  color: #b00020;
}
.error .text-field {
  border-bottom: 2px solid #b00020;
  background-color: #ffd8df;
}
</style>
