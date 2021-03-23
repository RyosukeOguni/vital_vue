<template>
  <label class="text-field">
    <span class="text-field-label">{{ title }}</span>
    <input class="text-field-input" type="text" :v-model="inputText" />
  </label>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      inputText: '',
    }
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
