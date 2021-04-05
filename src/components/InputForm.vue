<template>
  <div :class="!validate || 'error'">
    <label class="text-field" :class="fill">
      <span class="text-field-label"><slot></slot><span v-if="validate">※</span></span>
      <!-- typeがバインドされた場合、inputを表示 -->
      <input
        v-if="type"
        v-model="newValue"
        class="text-field-input"
        :type="type"
        :disabled="!!fill"
        min="0"
        @input="inputForm({ name: name, text: newValue })"
      />
      <!-- 配列selectlistがバインドされた場合、selectを表示 -->
      <select
        v-if="selectlist"
        v-model="newValue"
        class="text-field-input"
        :disabled="!!fill"
        @change="inputForm({ name: name, text: newValue })"
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
    selectlist: {
      type: Array,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    validate: {
      type: String,
      default: '',
    },
    fill: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // もしvalueがあればvalueを返す、valueが無い場合、typeがnumberまたは指定無ければ０、その他の場合は空文字を返す
      newValue: this.value ? this.value : this.type == 'number' ? 0 : '',
    }
  },
  methods: {
    inputForm(e) {
      this.$store.dispatch('users/inputForm', e)
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
.text-field.fill {
  background-color: #ffffff;
}
.fill .text-field-input {
  margin-bottom: 0;
}
input.text-field-input:disabled,
select.text-field-input:disabled {
  color: #212529;
  opacity: 1;
  appearance: none;
}
.error,
.error .text-field-label {
  color: #b00020;
}
.error .text-field {
  border-bottom: 2px solid #b00020;
  background-color: #ffd8df;
}
</style>
