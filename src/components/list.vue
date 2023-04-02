<template>
  <div class="container">
    <div v-for="(list, index) in list" class="listItem">
      <div class="topListPart">
        <h3>{{ list.name }}</h3>
        <p>Rating: {{ list.rating }}</p>
      </div>
      <div class="bottomListPart">
        <p>Status: {{ list.businessStatus }}</p>
        <p>Rua: {{ list.vicinity }}</p>
      </div>
      <div class="divider"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["data"],
  setup(props) {
    const list = ref(props.data);
    console.log(list);
    return {
      list,
    };
  },
};
</script>

<style>
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
}
</style>
