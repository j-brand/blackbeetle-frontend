<template>
  <button
    class="relative px-4 py-1 border border-solid rounded-lg border-bb-charcoal hover:bg-bb-charcoal hover:text-bb-light dark:border-bb-light dark:bg-bb-charcoal dark:text-bb-light dark:hover:bg-bb-light dark:hover:text-bb-charcoal transition duration-200 dark:disabled:border-gray-500 disabled:bg-gray-200 disabled:text-gray-500 dark:disabled:bg-bb-charcoal"
    :class="[classes , loading ? 'spinner before:border-bb-charcoal before:dark:border-bb-light before:border-solid before:border-2' : '']"
    :disabled="disabled"
  >
    <span :class="[{ 'opacity-0': loading }, disabled ? 'dark:text-gray-500' : '']">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  classes: { type: String, required: false, default: "" },
  loading: { type: Boolean, required: false, default: false },
  disabled: { type: Boolean, required: false, default: false },
});
</script>

<style lang="scss" scoped>
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spinner 0.8s linear infinite;
  }
}
</style>
