<template>
  <div :class="classes">
    <div class="pl-7" v-if="errors.checkbox">
      <small class="text-bb-light-red text-sm">{{ errors.checkbox }}</small>
    </div>
    <input type="checkbox" :id="useSlugify(label)" class="" @change="onChange" :checked="modelValue" />
    <label :for="label">
      <slot />
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Boolean, required: false, default: false },
  label: { type: String, required: false, default: "" },
  required: { type: Boolean, required: false, default: false },
  classes: { type: String, required: false, default: "" },
});

const emit = defineEmits(["update:modelValue"]);
const { validateCheckbox, errors } = useFormValidation();

function onChange(event) {
  validateInput(event.target.checked);
  emit("update:modelValue", (event.target as HTMLInputElement).checked);
}

const validateInput = (checked: boolean) => {
  if (props.required) {
    validateCheckbox("checkbox", checked);
  }
};
</script>
