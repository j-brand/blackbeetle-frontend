<template>
  <label :for="slugify(label)">
    <span class="dark:text-bb-light text-sm">{{ label }}</span><span :id="slugify(label) + '-error'" class="text-bb-light-red text-sm" v-if="errors[label]">{{ errors[label] }}</span>
    <textarea
      :id="slugify(label)"
      :value="modelValue"
      class="border border-bb-charcoal rounded-md w-full mb-2 pl-2 text-bb-charcoal bg-bb-white dark:bg-bb-charcoal dark:text-bb-light dark:border-bb-light"
      @keyup="validateInput"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      autocomplete="off"
      :cols="cols"
      :rows="rows"
      :maxlength="maxlength"
      :aria-describedby="errors[label] ? slugify(label) + '-error' : undefined"
      :aria-invalid="errors[label] ? true : undefined"
    ></textarea>
  </label>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: string;
  type?: string;
  label?: string;
  rows?: string;
  cols?: string;
  maxlength?: number;
}>(), {
  type: "text",
  label: "",
  rows: "5",
  cols: "30",
  maxlength: 5000,
});

const { validateTextField, errors } = useFormValidation();
const { slugify } = useHelper();

const validateInput = (): void => {
  validateTextField(props.label, props.modelValue);
};
</script>
