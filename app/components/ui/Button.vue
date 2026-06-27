<template>
  <button
    :type="type"
    class="chamfer-quad relative inline-flex items-center justify-center gap-2 transition duration-200 font-semibold"
    :class="[variantClass, sizeClass, loading ? 'spinner' : '', disabled ? 'opacity-50 pointer-events-none' : '']"
    :style="{ '--c': chamferSize }"
    :disabled="disabled"
  >
    <span class="button-content" :class="{ 'opacity-0': loading }">
      <template v-if="$slots.icon && iconPosition !== 'end'">
        <span class="button-icon" :class="iconPositionClass">
          <slot name="icon"></slot>
        </span>
      </template>

      <span class="button-label">
        <slot></slot>
      </span>

      <template v-if="$slots.icon && iconPosition === 'end'">
        <span class="button-icon" :class="iconPositionClass">
          <slot name="icon"></slot>
        </span>
      </template>
    </span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'destructive' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  iconPosition?: 'start' | 'end';
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}>(), {
  variant: 'primary',
  type: 'button',
  size: 'md',
  iconPosition: 'start',
});

const variantClass = computed(() => {
  switch (props.variant) {
    case 'primary': return 'bg-primary text-primary-fg';
    case 'destructive': return 'bg-secondary text-white';
    case 'accent': return 'bg-accent text-[#232118]';
    case 'outline': return 'text-primary outline-btn';
    case 'ghost': return 'bg-transparent text-fg-muted';
    default: return 'bg-primary text-primary-fg';
  }
});

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-3 py-2 text-sm';
    case 'md': return 'px-4 py-2 text-base';
    case 'lg': return 'px-6 py-3 text-lg';
    default: return 'px-4 py-2 text-base';
  }
});

const iconPositionClass = computed(() => {
  return props.iconPosition === 'end' ? 'button-icon-end' : '';
});

const chamferSize = computed(() => {
  switch (props.size) {
    case 'sm': return '7px';
    case 'md': return '8px';
    case 'lg': return '10px';
    default: return '8px';
  }
});
</script>

<style scoped>
@reference "@/assets/css/main.css";

.outline-btn {
  background: var(--color-line-strong);
}

.outline-btn::before {
  content: '';
  position: absolute;
  inset: 1px;
  background: var(--color-card);
  clip-path: polygon(var(--c, 9px) 0, calc(100% - var(--c, 9px)) 0, 100% var(--c, 9px), 100% calc(100% - var(--c, 9px)), calc(100% - var(--c, 9px)) 100%, var(--c, 9px) 100%, 0 calc(100% - var(--c, 9px)), 0 var(--c, 9px));
}

button svg {
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
}

.button-content {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  line-height: 1;
}

.button-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}

.button-icon-end {
  margin-left: 0.5rem;
}

.button-icon svg {
  display: inline-block;
  vertical-align: middle;
  width: 1em;
  height: 1em;
  fill: currentColor;
}

.button-label {
  display: inline-flex;
  align-items: center;
  line-height: 1;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.spinner::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid var(--color-primary-fg);
  border-top-color: transparent;
  animation: spinner 0.8s linear infinite;
}
</style>
