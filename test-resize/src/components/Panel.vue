<template>
  <div id="d" class="droptarget" @drop="drop" @dragover="allowDrop">
    <v-stage
      ref="stage"
      @mousedown="handleStageMouseDown"
      :config="configStage"
    >
      <v-layer ref="layer">
        <v-rect :config="tileRect"></v-rect>
        <Tile
          ref="tile"
          :products="products.top"
          :config="topTile"
          :selectedImage="selectedImage"
        ></Tile>
        <Tile
          ref="tile"
          :products="products.center"
          :config="centerTile"
          :selectedImage="selectedImage"
        ></Tile>
        <Tile
          ref="tile"
          :products="products.bottom"
          :config="bottomTile"
          :selectedImage="selectedImage"
        ></Tile>
      </v-layer>
    </v-stage>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Action } from "vuex-class";
import { Prop, Watch } from "vue-property-decorator";
import Tile from "../components/Tile.vue";
import Konva from "konva";
const namespace: string = "sidebar";

@Component({
  components: {
    Tile,
  },
})
export default class Panel extends Vue {
  @State("sidebar")
  sidebar!: any;
  @Action("fetchData", { namespace }) fetchData: any;
  @Action("removeProduct", { namespace }) removeProduct: any;
  @Prop({ type: Object, required: true })
  data!: any;

  selectedImage = "";

  configStage = { width: 875, height: 500 } as any;

  mounted() {
    this.fetchData();
  }

  products = this.data;

  handleStageMouseDown(e: any) {
    if (e.target === e.target.getStage()) {
      this.selectedImage = "";
      return;
    }

    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    const name = e.target.name();
    this.selectedImage = name;
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  drop(event: any) {
    event.preventDefault();
    var id = event.dataTransfer.getData("id");
    this.sidebar.sidebar.items.forEach((value: any, index: any) => {
      if (value.product_id == id) {
        var boardObject = {
          product_id: Number(value.product_id),
          name: value.name,
          image_url: value.image_url,
          width: 100,
          height: 100,
        };

        var tile = "center";

        let payload = {
          newTile: tile,
          obj: boardObject,
        };

        let indexPayload = {
          index: index,
        };

        this.$store.dispatch("board/moveImage", payload);
        this.removeProduct(indexPayload);
      }
    });
  }

  tileRect = new Konva.Rect({
    width: 500,
    height: 500,
    stroke: "lightgrey",
    strokeWidth: 1,
  });

  topTile = {
    tileX: 20,
    tileY: 20,
    tileWidth: 200,
    tileHeight: 150,
  } as any;

  centerTile = {
    tileX: 20,
    tileY: 170,
    tileWidth: 200,
    tileHeight: 150,
  } as any;

  bottomTile = {
    tileX: 20,
    tileY: 320,
    tileWidth: 200,
    tileHeight: 150,
  } as any;

}
</script>

<style scoped>
</style>