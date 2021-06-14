<template>
<div>
  <button @click="re" >Rerender</button>
    <Panel :key="componentKey" :data = "boards"></Panel>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import VueKonva from "vue-konva";
import Panel from "../components/Panel.vue";
import { Watch } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
const namespace: string = "board";

Vue.use(VueKonva);

@Component({
  components: {
    Panel,
  },
})
export default class Board extends Vue {
  @State("board")
  board!: any;
  @Action("fetchData", { namespace }) fetchData: any;
  @Getter("getBoard",{namespace}) getBoard:any

  componentKey=0;

  mounted(){
      this.fetchData();
  }

  re(){
    this.componentKey+=1;
  }

   get boards(){
    return this.$store.getters["board/getBoard"];
  }

  @Watch("boards")
  onPropertyChanged(){
    console.log("hey")
  }
}
</script>

<style scoped>
</style>