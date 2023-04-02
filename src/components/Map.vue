<script setup>
import hereIcon from ".././assets/hereIcon.png";
import { ref, onBeforeMount, watch } from "vue";
import axios from "axios";

const center = ref([0, 0]);
const projection = ref("EPSG:4326");
const loading = ref(true);
const APIKEY = ref("AIzaSyDkbf5MsXZ7eUqxFouSc0yylfOAjOHfgi4");
const result = ref({});
const newVar = ref({});
const locationCoord = ref([]);
const zoom = ref(8);
const rotation = ref(0);
const view = ref(null);
const map = ref(null);
const strokeColor = ref("red");
const fillColor = ref("white");
const coordinate3 = ref(newVar);
const geoLocChange = (loc) => {
  view.value.fit([loc[0], loc[1], loc[0], loc[1]], { maxZoom: 15 });
  locationCoord.value = loc;
};

function changeCenter(coord) {
  view.value.fit([coord[0], coord[1], coord[0], coord[1]], { maxZoom: 20 });
}

watch(locationCoord, async () => {
  // const res = await axios.get(
  // `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.06497599599926%2C-8.395962703660226&radius=1500&key=${APIKEY.value}`
  // );
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationCoord.value[1]}%2C${locationCoord.value[0]}&radius=1500&key=${APIKEY.value}`
  );
  result.value = res.data;
  newVar.value = result.value.results.map((item) => ({
    coordinates: [item.geometry.location.lng, item.geometry.location.lat],
    name: item.name,
    businessStatus: item.business_status || "PLACE",
    vicinity: item.vicinity,
    rating: item.rating || 5,
  }));
  loading.value = false;
});

onBeforeMount(async () => {
  newVar.value = [];
  loading.value = false;
});
</script>

<template>
  <div v-if="loading === false" class="root">
    <div>
      <ol-map
        :loadTilesWhileAnimating="true"
        :loadTilesWhileInteracting="true"
        class="map"
      >
        <ol-view
          ref="view"
          :center="center"
          :rotation="rotation"
          :zoom="zoom"
          :projection="projection"
        />

        <ol-tile-layer>
          <ol-source-osm />
        </ol-tile-layer>

        <ol-geolocation
          :projection="projection"
          @positionChanged="geoLocChange"
        >
          <template v-slot="slotProps">
            <ol-vector-layer :zIndex="2">
              <ol-source-vector>
                <ol-feature
                  v-for="(coordinate3, index) in coordinate3"
                  ref="positionFeature"
                >
                  <ol-geom-point
                    :coordinates="coordinate3.coordinates"
                  ></ol-geom-point>
                  <ol-style>
                    <ol-style-icon :src="hereIcon" :scale="0.8"></ol-style-icon>
                  </ol-style>
                </ol-feature>
              </ol-source-vector>
            </ol-vector-layer>
          </template>
        </ol-geolocation>
      </ol-map>
    </div>
    <div>
      <div class="container">
        <div v-for="(newVar, index) in newVar" class="listItem">
          <button @click="changeCenter(newVar.coordinates)" class="buttonCoord">
          <div class="topListPart">
            <h3 class="text">{{ newVar.name }}</h3>
            <p class="text">Rating: {{ newVar.rating }}</p>
          </div>
          <div class="bottomListPart">
            <p class="text">Status: {{ newVar.businessStatus }}</p>
            <p class="text">Rua: {{ newVar.vicinity }}</p>
          </div>
          </button>
          <div class="divider"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.text {
  color: antiquewhite;
}

.buttonCoord {
  background-color: #181818;
}
.map {
  height: 100%;
  width: 1200px;
}

.root {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 1200px;
}

.container {
  margin-left: 10px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  border:5px solid rgb(103, 103, 109);
  border-radius: 5px;
  overflow: auto;
}

.listItem {
  display: flex;
  flex-direction: column;
}

.topListPart {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bottomListPart {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.divider{
  height: 5px;
  width: 100%;
  background-color: rgb(53, 53, 56);
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
