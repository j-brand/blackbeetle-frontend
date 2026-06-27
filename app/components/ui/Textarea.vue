<template>
  <label :for="slugify(label)">
    <span class="text-fg text-sm">{{ label }}</span><span :id="slugify(label) + '-error'" class="text-secondary text-sm" v-if="errors[label]">{{ errors[label] }}</span>
    <span class="cut-frame chamfer-quad block mb-2" style="--c: 8px; --bd: var(--color-line-strong)">
      <textarea
        :id="slugify(label)"
        :value="modelValue"
        class="cut-inner chamfer-quad px-4 py-3 text-sm w-full outline-none block text-fg"
        style="--c: 8px; --sf: var(--color-card)"
        @keyup="validateInput"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        autocomplete="off"
        :cols="cols"
        :rows="rows"
        :maxlength="maxlength"
        :aria-describedby="errors[label] ? slugify(label) + '-error' : undefined"
        :aria-invalid="errors[label] ? true : undefined"
      ></textarea>
    </span>
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
