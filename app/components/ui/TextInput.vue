<template>
  <label :for="slugify(label)">
    <small class="text-fg text-sm">{{ label }}</small> <span :id="slugify(label) + '-error'" class="text-secondary text-sm" v-if="errors[label]">{{ errors[label] }}</span>
    <span class="cut-frame chamfer-quad block mb-2" :style="{ '--c': '8px', '--bd': errors[label] ? 'var(--color-secondary)' : 'var(--color-line-strong)' }">
      <input
        :type="type"
        :id="slugify(label)"
        class="cut-inner chamfer-quad px-4 py-3 text-sm w-full outline-none block text-fg"
        style="--c: 8px; --sf: var(--color-card)"
        @keyup="validateInput"
        @blur="validateInput"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :value="modelValue"
        :autocomplete="type === 'email' ? 'email' : 'off'"
        :aria-describedby="errors[label] ? slugify(label) + '-error' : undefined"
        :aria-invalid="errors[label] ? true : undefined"
      />
    </span>
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
