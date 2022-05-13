<template></template>
<script setup lang="ts">

import { PropType } from "vue";
import { ILatLng, IMap } from "~~/types/gmap";

const props = defineProps({
  map: {
    type: Object as PropType<IMap>,
    required: true,
  },
  position: {
    type: Object as PropType<ILatLng>,
    required: true,
  },
  label: { type: String },
});

const marker = new google.maps.Marker({
  map: props.map,
  position: props.position,
});

function addInfoWindow() {
  const infoWindowContent = `<div class="bg-white text-black"><span class="p-2">${props.label}</span></div>`;

  const infowindow = new google.maps.InfoWindow({
    content: infoWindowContent,
  });
  marker.addListener("mouseover", function () {
    infowindow.open(props.map, marker);
  });
  marker.addListener("mouseout", function () {
    infowindow.close();
  });
}
if (props.label) {
  addInfoWindow();
}
</script>
