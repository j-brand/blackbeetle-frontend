<template>
  <div :class="classes">
    <div class="pl-8" v-if="errors.checkbox">
      <small :id="label ? slugify(label) + '-error' : 'checkbox-error'" class="text-secondary text-sm">{{ errors.checkbox }}</small>
    </div>
    <input type="checkbox" :id="label ? slugify(label) : undefined" class="" @change="onChange" :checked="modelValue"
      :aria-describedby="errors.checkbox ? (label ? slugify(label) + '-error' : 'checkbox-error') : undefined"
      :aria-invalid="errors.checkbox ? true : undefined"
    />
    <label :for="label ? slugify(label) : undefined">
      <slot />
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean;
  label?: string;
  required?: boolean;
  classes?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();
const { validateCheckbox, errors } = useFormValidation();
const { slugify } = useHelper();

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  validateInput(target.checked);
  emit("update:modelValue", target.checked);
}

const validateInput = (checked: boolean) => {
  if (props.required) {
    validateCheckbox("checkbox", checked);
  }
};
</script>
