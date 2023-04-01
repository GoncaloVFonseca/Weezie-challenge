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
      const coordinate3 = ref({})
      coordinate3.value = props.data;
      console.log(coordinate3);
      return {
        coordinate3,
      };
    },
  };
  </script>
  
  <style>
  
  </style>
  