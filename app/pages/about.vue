<template>
  <div class="container mx-auto max-w-screen-md">
    <div class="space-y-4">
      <h1 class="bb-page-title anaglyph mb-4">Blackbeetle</h1>
      <h2 class="bb-page-section-title mb-4">Wenn Großstadtkinder das Weite suchen.</h2>
      <div class="bb-page-copy space-y-4">
        Keine waschechten Berliner zwar, aber lang genug im Großstadtdschungel gefangen gewesen, um nach ein paar Jahren für eine Weile das Weite zu suchen.
        <br /><br />

        <LayoutLazyImage width="736" height="414" class="chamfer-xl" src="img/Johannes_Isabell.webp" :blur="true" alt="Johannes und Isabell bei den zwölf Aposteln" />

        <br />Wir haben beschlossen, unseren Alltag für ein ganzes Jahr hinter uns zu lassen. Unsere Reise führt uns nach Indien, ins magische Dreieck von Delhi über Agra nach Jaipur. Von da aus geht
        es für zehn lange Monate nach Australien. Wir starten in Melbourne und werden die gesamte Ostküste entlang nach Norden fahren, wo wir dann von Cairns aus nach Indonesien fliegen. Nachdem wir
        Bali und Lombok hinter uns gelassen haben, werden wir unsere Zelte in Thailand aufschlagen und die Straßen Bangkoks unsicher machen. Zu Fuß, mit unserem Auto, auf dem Wasser und auch darunter
        - es gilt, so viel wie möglich zu entdecken. Auf unserem Blog nehmen wir dich mit ans andere Ende der Welt und laden dich ein, an unseren Abenteuern teilzuhaben. <br /><br /><b
          >Johannes & Isabell</b
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Über",
  meta: [
    { name:"description", content: "Ich bin nicht verrückt. Meine Realität ist einfach anders als Deine.  - Der Hutmacher" },
    { property: "og:title", content: "Blackbeetle - Über" },
    { property: "og:description", content: "Ich bin nicht verrückt. Meine Realität ist einfach anders als Deine.  - Der Hutmacher" },
  ],
});
</script>
