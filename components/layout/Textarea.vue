<template>
  <label :for="label">
    <span class="dark:text-bb-light text-sm">{{ label }}</span><span class="text-bb-light-red text-sm" v-if="errors[label]">{{ errors[label] }}</span>
    <textarea
      :id="slugify(label)"
      :value="modelValue"
      class="border border-bb-charcoal rounded-md w-full mb-2 pl-2 text-bb-charcoal dark:bg-bb-charcoal dark:text-bb-light dark:border-bb-light"
      @keyup="validateInput"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      autocomplete="off"
      :cols="cols"
      :rows="rows"
    ></textarea>
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String, required: true, defaul: "" },
  type: { type: String, required: false, default: "text" },
  label: { type: String, required: false, default: "" },
  rows: { type: String, required: false, default: "5" },
  cols: { type: String, required: false, default: "30" },
});

const { validateTextField, errors } = useFormValidation();
const { slugify } = useHelper();

const error = ref("");
const validateInput = () => {
  validateTextField(props.label, props.modelValue);
};
</script>
