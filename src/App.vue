<script setup>
import Map from "./components/Map.vue";
import { ref, onMounted } from 'vue'
import axios from "axios";
const result = ref({});
const APIKEY = ref("AIzaSyDkbf5MsXZ7eUqxFouSc0yylfOAjOHfgi4")
onMounted(async () => {
  const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${APIKEY.value}`);
  result.value = res.data;
  console.log(result.value)
});
</script>

<template>
  <div class="root">
    <div>
      <Map />
    </div>
    <div>
      <h1>lol</h1>
    </div>
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
