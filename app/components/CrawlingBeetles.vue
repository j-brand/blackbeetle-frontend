<template>
  <div ref="layerRef" class="beetle-layer" aria-hidden="true" />
</template>

<script setup lang="ts">
import { mountBeetles, type BeetleMode } from "@/lib/beetles";

const props = withDefaults(
  defineProps<{
    /** Krabbel-Effekt an/aus. Pro Seite via definePageMeta({ beetles: false }) steuerbar. */
    enabled?: boolean;
    count?: number;
    mode?: BeetleMode;
    speed?: number;
    size?: number;
    scuttle?: number;
    opacity?: number;
  }>(),
  {
    enabled: true,
    count: 6,
    mode: "flee",
    speed: 1,
    size: 44,
    scuttle: 0.6,
    opacity: 1,
  },
);

const layerRef = ref<HTMLElement | null>(null);
let stop: (() => void) | null = null;

function teardown() {
  stop?.();
  stop = null;
}

function setup() {
  teardown();
  const layer = layerRef.value;
  if (!layer || !props.enabled) return;
  // Respektiere Nutzer, die reduzierte Bewegung bevorzugen.
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  stop = mountBeetles(layer, {
    count: props.count,
    mode: props.mode,
    speed: props.speed,
    size: props.size,
    scuttle: props.scuttle,
  });
}

onMounted(setup);
watch(
  () => [props.enabled, props.count, props.mode, props.speed, props.size, props.scuttle],
  setup,
);
onBeforeUnmount(teardown);
</script>

<style scoped>
.beetle-layer {
  /* absolute statt fixed: der Layer hängt am Dokument (Layout-Root ist `relative`)
     und deckt die volle Seitenhöhe ab – die Käfer scrollen mit der Seite. */
  position: absolute;
  inset: 0;
  /* Hinter allem Inhalt, aber über dem Seitenhintergrund (Layout-Root ist `isolate`). */
  z-index: -1;
  pointer-events: none;
  /* Käfer bleiben scharf. Der Weichzeichner entsteht durch die überdeckenden
     Elemente (Header/Footer via backdrop-filter) – so wirken sie nur "weit weg",
     wenn sie tatsächlich hinter etwas krabbeln, im Freien dagegen scharf. */
  opacity: v-bind("props.opacity");
  /* Käferfarben (Linien/Füllung, inkl. Dark Mode) stehen global in custom.css,
     damit der `.dark`-Selektor zuverlässig greift. */
}
</style>
