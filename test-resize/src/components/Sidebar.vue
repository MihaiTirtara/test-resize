<template>
<div class="sidebar">
  <div class="order-tile">
    <div
      class="product"
      @drop="drop(element.product_id, $event)"
      @dragover="allowDrop"
      v-for="(element, index) in sidebar.sidebar.items"
      :key="index"
    >
      <div draggable="true" @dragstart="startDrag($event, element.product_id)">
        <img :src="element.image_url" />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Action } from "vuex-class";
const namespace: string = "sidebar";

@Component
export default class Sidebar extends Vue {
  @State("sidebar")
  sidebar!: any;
  @Action("fetchData", { namespace }) fetchData: any;
  @Action("moveProduct", { namespace }) moveProduct: any;

  startDrag(event: any, ID: string, index: number) {
    var evt = event.dataTransfer;
    evt.setData("id", ID);
  }
  mounted() {
    this.fetchData();
  }

  allowDrop(event: any) {
    event.preventDefault();
  }
}
</script>

<style scoped>
</style>