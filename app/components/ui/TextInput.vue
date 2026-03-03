<template>
  <label :for="label">
    <small class="dark:text-bb-light text-sm">{{ label }}</small> <span class="text-bb-light-red text-sm" v-if="errors[label]">{{ errors[label] }}</span>
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
const props = withDefaults(defineProps<{
  modelValue: string;
  type?: string;
  label?: string;
}>(), {
  type: "text",
  label: "",
});

const { validateTextField, validateEmailField, errors } = useFormValidation();
const { slugify } = useHelper();

const validateInput = (): void => {
  if (props.type === "email") {
    validateEmailField(props.label ?? "", props.modelValue);
  } else {
    validateTextField(props.label ?? "", props.modelValue);
  }
};
</script>
