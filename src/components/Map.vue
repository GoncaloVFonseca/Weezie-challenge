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
            <!-- <ol-feature ref="positionFeature">
              <ol-geom-point :coordinates="coordinate2"></ol-geom-point>
              <ol-style>
                <ol-style-icon :src="hereIcon" :scale="0.8"></ol-style-icon>
              </ol-style>
            </ol-feature> -->
          </ol-source-vector>
        </ol-vector-layer>
      </template>
    </ol-geolocation>
  </ol-map>
</template>

<!-- ne= 41.13956,-8.529142 sw = 41.061793,-8.400241  41.07446942725651, -8.413480716386532        41.06917280710447, -8.402244138449017-->

<script>
import hereIcon from ".././assets/hereIcon.png";
import { ref } from "vue";
export default {
  props: ['data'],
  setup(props) {
    const center = ref([40, 40]);
    const projection = ref("EPSG:4326");
    const zoom = ref(8);
    const rotation = ref(0);
    const view = ref(null);
    const map = ref(null);
    const strokeColor = ref("red");
    const fillColor = ref("white");
    const coordinate = ref([-8.402009, 41.068426]);
    const coordinate2 = ref([
      { coordinate: [-8.402009, 41.068426] },
      { coordinate: [-8.413480716386532, 41.07446942725651] },
      { coordinate: [-8.402244138449017, 41.06917280710447] },
    ]);
    const coordinate3 = ref(props.data)
    const geoLocChange = (loc) => {
      view.value.fit([loc[0], loc[1], loc[0], loc[1]], { maxZoom: 15 });
      console.log(loc);
    };
    console.log('ola6')
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
      coordinate,
      coordinate2,
      coordinate3,
      props,
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
