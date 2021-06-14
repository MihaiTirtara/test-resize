<template>
  <div>
    <v-group :config="tileGroup">
      <div v-for="(image,index) in images" :key="index">
        <v-image
          :config="image"
          @transformend="handleTransformEnd"
        />
      </div>
      <v-transformer ref="transformer" />
    </v-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Action } from "vuex-class";
import { Prop, Watch } from "vue-property-decorator";
import Tile from "../components/Tile.vue";
import Konva from "konva";
const namespace: string = "visionboard";
@Component
export default class TIle extends Vue {
  @Prop({ type: Array, required: true })
  products!: [];
  @Prop({ type: Object, required: true })
  config!: any;
  @Prop({ type: String, required: true })
  selectedImage!: string;

  tile = this.config;

  selectedImageName = {} as string;
  //image = null as any;
  images: Konva.Image[] = [];

  newTile: string = "";

  tileGroup = new Konva.Group({
    x: this.tile.tileX,
    y: this.tile.tileY,
    width: this.tile.tileWidth,
    height: this.tile.tileHeight,
  });

  handleTransformEnd(e: any) {
    const image = this.images.find(
      (im) => im.attrs.name === this.selectedImageName
    ) as Konva.Image;

    image.x = e.target.x();
    image.y = e.target.y();
    image.rotation = e.target.rotation();
    image.scaleX = e.target.scaleX();
    image.scaleY = e.target.scaleY();
  }

  setSelectedImage(name: string) {
    const image = this.images.find((im) => im.attrs.name === name);
    if (image) {
      this.selectedImageName = name;
    } else {
      this.selectedImageName = "";
    }
  }

  updateTransformer() {
    const transformer = this.$refs.transformer as any;
    const transformerNode = transformer.getNode();
    const stage = transformerNode.getStage();
    const { selectedImageName } = this;

    const selectedNode = stage.findOne("." + selectedImageName);

    if (selectedNode === transformerNode.node()) {
      return;
    }

    if (selectedNode) {
      transformerNode.nodes([selectedNode]);
    } else {
      transformerNode.nodes([]);
    }
  }

  addImagesToTile() {
    this.images.length = 0;
    this.products.forEach((product: any) => {
      //console.log(product);
      var img = new Image();
      img.src = product.image_url;
      img.onload = () => {
        var konvaImage = new Konva.Image({
          id: String(product.product_id),
          image: img,
          name:product.name,
          draggable: true,
          width: product.width,
          height: product.height,
        });

        this.images.push(konvaImage);
      };
        
    });

  
  }



  @Watch("selectedImage")
  onChange(value: any) {
    this.setSelectedImage(value);
    this.updateTransformer();
  }

  mounted() {
    this.addImagesToTile();
  }
}
</script>

<style scoped>
</style>