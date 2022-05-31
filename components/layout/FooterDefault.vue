<template>
  <footer class="">
    <div class="bg-bb-charcoal dark:bg-bb-light opacity-75 w-full py-2"></div>
    <div class="bg-bb-charcoal dark:bg-bb-light w-full text-bb-lighter dark:text-bb-charcoal py-1">
      <div class="container flex items-center justify-between flex-col md:flex-row py-3 px-5 mx-auto">
        <div class="flex flex-row justify-between">
          <div class="flex flex-col md:flex-row items-center py-1">
            <span class="text-base font-sans-secondary h-7 leading-7 dark:text-bb-charcoal ">© 2022 BLACKBEETLE</span>
            <span class="md:ml-4 h-7 leading-7 dark:text-bb-charcoal "
              >Made with &#128150; and interest by
              <span class="text-bb-red h-7 leading-7 dark:text-bb-red">Johannes Brand</span>
            </span>
          </div>
        </div>

        <div class="flex flex-row items-center mt-2 md:m-0">
          <NuxtLink to="/privacy" class="md:ml-4">Datenschutzerklärung</NuxtLink>
          <NuxtLink to="/imprint" class="ml-4">Impressum</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
