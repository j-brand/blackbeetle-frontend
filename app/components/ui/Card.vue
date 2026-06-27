<template>
  <div :class="wrapperClass" :style="wrapperStyle">
    <div v-if="variant === 'featured'" class="h-1" :style="{ background: 'var(--color-accent)' }"></div>
    <div :class="innerClass" :style="innerStyle">
      <div v-if="eyebrow || title" class="mb-2">
        <p v-if="eyebrow" class="font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5" :style="{ color: 'var(--color-accent)' }">{{ eyebrow }}</p>
        <h3 v-if="title" class="font-display font-semibold text-lg leading-tight mb-2" :style="{ color: titleColor }">{{ title }}</h3>
      </div>

      <div class="mb-4">
        <slot />
      </div>

      <div v-if="$slots.actions" class="mt-4">
        <slot name="actions" />
      </div>

      <div v-if="tags && tags.length" class="flex gap-2 mt-4">
        <span v-for="t in tags" :key="t" class="cut-frame chamfer-quad inline-block" style="--c:6px; --bd:var(--color-line-strong)">
          <span class="cut-inner chamfer-quad px-2.5 py-1 text-xs font-medium inline-block" style="--c:6px; --sf:var(--color-card); color:var(--color-fg-muted)">{{ t }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String as () => 'plain' | 'featured' | 'primary' | 'outline', default: 'plain' },
  title: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  tags: { type: Array as () => string[], default: () => [] },
})

const wrapperClass = computed(() => {
  if (props.variant === 'primary') return 'chamfer-lg lift p-6'
  if (props.variant === 'outline') return 'cut-frame chamfer-lg'
  return 'cut-frame chamfer-lg lift'
})

const innerClass = computed(() => {
  if (props.variant === 'primary') return ''
  return 'cut-inner chamfer-lg p-6'
})

const wrapperStyle = computed(() => {
  if (props.variant === 'primary') return { background: 'var(--color-primary)' }
  return {}
})

const innerStyle = computed(() => {
  if (props.variant === 'primary') return { color: '#fff' }
  return {}
})

const titleColor = computed(() => (props.variant === 'primary' ? '#fff' : 'var(--color-fg)'))
</script>

<style scoped>
/* Component uses global Look Book utilities (cut-frame, chamfer-*, cut-inner). */
</style>
