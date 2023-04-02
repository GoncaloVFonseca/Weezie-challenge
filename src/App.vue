<script setup>
import Map from "./components/Map.vue";
// import List from "./components/List.vue";
import { ref, onMounted, onUpdated, onBeforeMount, onBeforeUpdate } from "vue";
import axios from "axios";

const result = ref({});
const newVar = ref({});
const locationCoord = ref()
const loading = ref(true)
const APIKEY = ref("AIzaSyDkbf5MsXZ7eUqxFouSc0yylfOAjOHfgi4");
const figurino = ref("2984+Avenida+José+Joaquim+Ferreira,+Porto,+Portugal");
const boundingBox = ref(
  "-8.394377269914632, 41.06962620352677%7C-8.40189498525768, 41.063516042717744"
);

</script>

<!-- ne = [-8.394377269914632, 41.06962620352677] sw= [-8.40189498525768, 41.063516042717744]  41.06497599599926, -8.395962703660226-->

<template>
  <div>
    <Map />
  </div>
</template>

<style scoped>
.root {
  display: flex;
  flex-direction: row;
  width: "100%";
  height: "100%";
}
</style>
