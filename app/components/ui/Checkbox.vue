<template>
  <div :class="classes">
    <div class="pl-7" v-if="errors.checkbox">
      <small class="text-bb-light-red text-sm">{{ errors.checkbox }}</small>
    </div>
    <input type="checkbox" :id="slugify(label ?? '')" class="" @change="onChange" :checked="modelValue" />
    <label :for="label">
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
