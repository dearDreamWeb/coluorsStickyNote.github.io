<template>
  <div id="app">
    <router-view v-if="isShow" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
@Component({})
export default class App extends Vue {
  @Provide() public componentReload = this.reload;
  private isShow: boolean = true;

  reload() {
    this.isShow = false;
    this.$nextTick(() => {
      this.isShow = true;
    });
  }
}
</script>
<style lang="scss"></style>
