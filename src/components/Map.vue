<template>
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

    <ol-geolocation :projection="projection" @positionChanged="geoLocChange">
      <template v-slot="slotProps">
        <ol-vector-layer :zIndex="2">
          <ol-source-vector>
            <ol-feature ref="positionFeature">
              <ol-geom-point :coordinates="slotProps.position"></ol-geom-point>
              <ol-style>
                <ol-style-icon :src="hereIcon" :scale="0.8"></ol-style-icon>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>
      </template>
    </ol-geolocation>
  </ol-map>
</template>

<script>
import hereIcon from ".././assets/hereIcon.png";
import { ref } from "vue";
export default {
  setup() {
    const center = ref([40, 40]);
    const projection = ref("EPSG:4326");
    const zoom = ref(8);
    const rotation = ref(0);
    const view = ref(null);
    const map = ref(null);
    const strokeColor = ref("red");
    const fillColor = ref("white");
    const geoLocChange = (loc) => {
      view.value.fit([loc[0], loc[1], loc[0], loc[1]], { maxZoom: 14 });
    };
    return {
      center,
      projection,
      zoom,
      rotation,
      hereIcon,
      view,
      map,
      strokeColor,
      fillColor,
      geoLocChange,
    };
  },
};
</script>

<style>
.map {
  height: 500px;
  width: 1200px;
}
</style>
