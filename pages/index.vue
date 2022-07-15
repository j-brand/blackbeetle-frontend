<template>
  <div class="w-full h-full min-h-screen flex justify-center items-center">
    <Head>
      <Meta name="description" content="Ein Spiel für jeden der drauf sinnt, wie er seiner Welt entrinnt." />
    </Head>

    <nuxt-img src="/default.jpeg" sizes="sm:640px md:768px lg:1024px xl:1280px" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Home",
});
</script>
