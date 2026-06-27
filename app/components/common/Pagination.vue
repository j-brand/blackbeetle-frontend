<template>
  <nav role="navigation" aria-label="Seitennavigation">
    <div class="flex flex-row justify-center">
      <button type="button" class="px-2 mx-1" :disabled="pagination.current_page <= 1" aria-label="Erste Seite" @click="changePage(1)">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24" class="text-fg" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z" />
        </svg>
      </button>
      <button type="button" class="px-2 mx-1" :disabled="pagination.current_page <= 1" aria-label="Vorherige Seite" @click="changePage(pagination.current_page - 1)">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24" class="text-fg" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
        </svg>
      </button>
      <div v-for="(page, index) in pages" :key="index" class="px-2 mx-1">
        <button
          type="button"
          :class="isCurrentPage(page) ? 'chamfer-quad bg-primary px-page py-1 text-primary-fg font-bold' : 'text-fg hover:underline'"
          :style="isCurrentPage(page) ? { '--c': '6px' } : {}"
          :aria-current="isCurrentPage(page) ? 'page' : undefined"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </div>
      <button type="button" class="px-2 mx-1" :disabled="pagination.current_page >= pagination.last_page" aria-label="Nächste Seite" @click="changePage(pagination.current_page + 1)">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24" class="text-fg" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </button>
      <button type="button" class="px-2 mx-1" :disabled="pagination.current_page >= pagination.last_page" aria-label="Letzte Seite" @click="changePage(pagination.last_page)">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24" class="text-fg" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" />
        </svg>
      </button>
    </div>
  </nav>
</template>
<script setup lang="ts">
import type { IPaginationMeta } from "@/types";

const props = defineProps<{
  offset: number;
  pagination: IPaginationMeta;
}>();
const emit = defineEmits<{
  paginate: [page: number];
}>();

const route = useRoute();

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

function isCurrentPage(page: number): boolean {
  return props.pagination.current_page === page;
}

async function changePage(page: number) {
  if (page > props.pagination.last_page) {
    page = props.pagination.last_page;
  }

  //change URL param "page"
  //router.push({ query: { page: page } });
  await navigate(page).then(() => {
    emit("paginate", page);
  });
}

async function navigate(page: number) {
  const slug = 'slug' in route.params ? String(route.params.slug) : '';
  return navigateTo({
    path: slug,
    query: {
      page: page,
    },
  });
}
</script>
