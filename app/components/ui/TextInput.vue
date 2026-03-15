<template>
  <label :for="slugify(label)">
    <small class="dark:text-bb-light text-sm">{{ label }}</small> <span :id="slugify(label) + '-error'" class="text-bb-light-red text-sm" v-if="errors[label]">{{ errors[label] }}</span>
    <input
      :type="type"
      :id="slugify(label)"
      class="border border-bb-charcoal rounded-md w-full mb-2 py-1 pl-2 text-bb-charcoal bg-bb-white dark:bg-bb-charcoal dark:border-bb-light dark:text-bb-light"
      @keyup="validateInput"
      @blur="validateInput"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :value="modelValue"
      :autocomplete="type === 'email' ? 'email' : 'off'"
      :aria-describedby="errors[label] ? slugify(label) + '-error' : undefined"
      :aria-invalid="errors[label] ? true : undefined"
    />
  </label>
</template>

<script setup lang="ts">
const VALID_INPUT_TYPES = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] as const;
type InputType = typeof VALID_INPUT_TYPES[number];

const props = withDefaults(defineProps<{
  modelValue: string;
  type?: InputType;
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
