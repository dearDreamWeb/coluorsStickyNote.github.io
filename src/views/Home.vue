<template>
  <div class="home" ref="home">
    <!-- 头部组件 -->
    <v-header :dataList="dataList" @showDialog="showDialog" />
    <!-- 便利贴区域 -->
    <section v-if="dataList.length > 0" class="content">
      <el-row>
        <el-col
          class="card_item"
          :span="7"
          :offset="1"
          v-for="item in dataList"
          :key="item.id"
        >
          <el-card
            class="box-card"
            :style="{
              backgroundColor: item.bgColor,
              color: ColorReverse(item.bgColor),
            }"
          >
            <div slot="header">
              <span class="card_title">{{ item.title }}</span>
              <el-button
                :style="{
                  float: 'right',
                  padding: '3px 0',
                  color: ColorReverse(item.bgColor),
                }"
                type="text"
                >删除</el-button
              >
              <el-button
                :style="{
                  float: 'right',
                  padding: '3px 5px',
                  color: ColorReverse(item.bgColor),
                }"
                type="text"
                @click.prevent="editData(item)"
                >编辑</el-button
              >
            </div>
            <div class="time">
              <p>{{ item.createTime }}</p>
              <p>分类：{{ getCategoryName(item.categoryId) }}</p>
            </div>
            <div class="text">
              {{ item.content }}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>
    <h1 v-else class="no_data">暂无便利贴</h1>
    <!-- 模态框 -->
    <v-dialog
      v-if="isShowDialog"
      :editItemData="editItemData"
      @showDialog="showDialog"
      @saveData="saveData"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import Dialog from "@/components/Dialog.vue";
import ItemData from "@/model/dataItem";
import category from "@/model/cateEleme";
import DataItem from "@/model/dataItem";
@Component({
  components: {
    vHeader: Header,
    vDialog: Dialog,
  },
})
export default class Home extends Vue {
  private dataList: "Array<ItemData>" = this.$store.state.dataAction.readData(); // 获取数据
  private isShowDialog: boolean = false; // 是否显示模态框
  private editItemData!: DataItem | undefined;

  // 获取分类名
  getCategoryName(categoryId: category) {
    return this.$store.state.dataAction.getCategoryName(categoryId);
  }

  // 设置整体的背景颜色
  bodySetBc(): void {
    let home: any = this.$refs.home;
    let homeH: number = parseInt(window.getComputedStyle(home).height, 10);
    let windowH: number = window.innerHeight;
    if (homeH < windowH) {
      home.style.height = windowH + "px";
    }
  }

  // 显示模态框
  showDialog(data: boolean): void {
    if (!data) {
      this.editItemData = undefined;
    }
    this.isShowDialog = data;
  }

  // 添加完数据关闭模态框并更新dataList
  saveData(data: boolean): void {
    this.showDialog(data);
    this.editItemData = undefined;
    this.dataList = this.$store.state.dataAction.readData();
  }

  // 颜色取反
  ColorReverse(OldColorValue: any): string {
    // console.log(OldColorValue)
    // if (OldColorValue === "#ffffff" || "#FFFFFF") {
    //   return `#000`
    // } else {
    OldColorValue = "0x" + OldColorValue.replace(/#/g, "");
    let str: string = "000000" + (0xffffff - OldColorValue).toString(16);
    return "#" + str.substring(str.length - 6, str.length);
  }
  // }

  // 编辑数据
  editData(item: DataItem): void {
    this.editItemData = item;
    this.isShowDialog = true;
  }

  /**
   * mounted生命周期
   */
  mounted() {
    this.bodySetBc();
    window.addEventListener("resize", () => this.bodySetBc());
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100vw;
  font-family: "宋体";
  background: #eee;
  .content {
    margin-left: 10vw;
    padding-top: 30px;
    width: 80vw;
    .card_item {
      margin-bottom: 10px;
      .box-card {
        .card_title {
          font-weight: 700;
          font-style: italic;
        }
        .time {
          display: flex;
          justify-content: space-between;
          padding-bottom: 10px;
          font-size: 12px;
          & :nth-child(n) {
            font-weight: 700;
          }
        }
        .text {
          white-space: pre-wrap;
          line-height: 1.2;
        }
      }
    }
  }
  .no_data {
    padding-top: 20px;
    font-size: 50px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
