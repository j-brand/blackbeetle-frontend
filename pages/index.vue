<template>
<div>

  <h1 class="text-2xl font-bold pt-28">{{ date }}</h1>
</div>
</template>

<script setup lang="ts">
const { $formatDate } = useNuxtApp();

const date = $formatDate("12-3-2022");
</script>
