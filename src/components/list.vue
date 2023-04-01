<template>
  <div class="container">
    <h1>lolasdasdasdasdas</h1>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["data"],
  setup(props) {
    const test = ref(props.data);
    console.log(test);
    return {
      test,
    };
  },
};
</script>

<style>
.container {
  margin-left: 10px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  border:5px solid rgb(37, 47, 182);
  border-radius: 5px;
}
</style>
