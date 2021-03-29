<template>
  <label class="text-field" :class="fill">
    <span class="text-field-label"><slot></slot></span>
    <InputText v-if="type" :type="type" :fill="!!fill" :name="name"></InputText>
    <InputSelect
      v-if="selectlist"
      :selectlist="selectlist"
      :fill="!!fill"
      :name="name"
    ></InputSelect>
  </label>
</template>

<script>
import InputText from './InputText.vue'
import InputSelect from './InputSelect.vue'
export default {
  name: 'InputForm',
  components: {
    InputText,
    InputSelect,
  },
  props: {
    type: {
      type: String,
      default: '',
    },
    selectlist: {
      type: Array,
      default: null,
    },
    fill: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
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
</style>
