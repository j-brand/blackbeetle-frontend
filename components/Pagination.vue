<template>
  <nav role="navigation" aria-label="pagination">
    <div class="flex flex-row justify-center font-sans-secondary">
      <a href="#" class="px-2 mx-1" @click.prevent="changePage(1)" :disabled="pagination.current_page <= 1"
        ><svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z" /></svg></a>
      <a href="#" class="px-2 mx-1" @click.prevent="changePage(pagination.current_page - 1)" :disabled="pagination.current_page <= 1"
        ><svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg></a>
      <div v-for="(page, index) in pages" :key="index" class="px-2 mx-1">
        <a href="#" :class="isCurrentPage(page) ? ' bg-bb-charcoal bg-opacity-75 rounded-md px-page py-1 text-bb-lighter' : 'hover:underline'" @click.prevent="changePage(page)">
          {{ page }}
        </a>
      </div>
      <a href="#" class="px-2 mx-1" @click.prevent="changePage(pagination.current_page + 1)" :disabled="pagination.current_page >= pagination.last_page"
        ><svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg></a>
      <a href="#" class="px-2 mx-1" @click.prevent="changePage(pagination.last_page)" :disabled="pagination.current_page >= pagination.last_page"
        ><svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" /></svg></a>
    </div>
  </nav>
</template>
<script setup lang="ts">
const route = useRoute();

const props = defineProps({
  offset: { type: Number, required: true },
  pagination: { type: Object, required: true },
});
const emit = defineEmits(['paginate']);

const pages = computed(() => {
  const pages: number[] = [];
  let from: number = props.pagination.current_page - Math.floor(props.offset / 2);
  if (from < 1) {
    from = 1;
  }
  let to: number = from + props.offset - 1;
  if (to > props.pagination.last_page) {
    to = props.pagination.last_page;
  }
  while (from <= to) {
    pages.push(from);
    from++;
  }
  return pages;
});

function isCurrentPage(page) {
  return props.pagination.current_page === page;
}

async function changePage(page) {
  if (page > props.pagination.last_page) {
    page = props.pagination.last_page;
  }

  //change URL param "page"
  //router.push({ query: { page: page } });
    await navigate(page).then(() => {
        emit('paginate',page);
    })

}

async function navigate(page){
  return navigateTo({
    path: route.params.slug,
    query: {
      page: page,
    }
  })
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 40px;
}
</style>
