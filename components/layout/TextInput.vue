<template>
  <label :for="label">
    <smalspanl class="dark:text-bb-light text-sm">{{ label }}</smalspanl> <span class="text-bb-light-red text-sm" v-if="errors[label]">{{ errors[label] }}</span>
    <input
      :type="type"
      :id="slugify(label)"
      class="border border-bb-charcoal rounded-md w-full mb-2 py-1 pl-2 text-bb-charcoal bg-bb-white dark:bg-bb-charcoal dark:border-bb-light dark:text-bb-light"
      @keyup="validateInput"
      @blur="validateInput"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :value="modelValue"
      :autocomplete="type === 'email' ? 'email' : 'off'"
    />
  </label>
</template>

<script setup lang="ts">

const props = defineProps({
  modelValue: { type: String, required: true, defaul: "" },
  type: { type: String, required: false, default: "text" },
  label: { type: String, required: false, default: "" },
});

const { validateTextField, validateEmailField, errors } = useFormValidation();
const { slugify } = useHelper();

const validateInput = () => {
  if (props.type === "email") {
    validateEmailField(props.label, props.modelValue);
  } else {
    validateTextField(props.label, props.modelValue);
  }
};
</script>
