<template>
  <label :for="label">
    {{ label }} <small class="text-bb-light-red text-sm" v-if="error">{{ error }}</small>
    <input
      :type="type"
      class="border border-bb-charcoal rounded-md w-full mb-2 py-1 pl-2 text-bb-charcoal"
      @keyup="validateInput"
      @blue="validateInput"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      autocomplete="off"
      v-model="input"
      :id="label"
    />
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  type: { type: String, required: false, default: "text" },
  label: { type: String, required: false, default: "" },
});

const { validateTextField, errors } = useFormValidation();

const input = ref("");
const error = ref("");

const validateInput = () => {
  validateTextField("text", input.value);
  error.value = errors[props.type];
};
</script>
