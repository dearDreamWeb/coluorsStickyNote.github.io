<template>
  <div class="home" ref="home">
    <!-- 头部组件 -->
    <v-header :dataList="dataList" @showDialog="showDialog" />
    <!-- 便利贴区域 -->
    <section class="content">
      <el-row>
        <el-col
          class="card_item"
          :sm="7"
          :offset="1"
          v-for="item in dataList"
          :key="item.id"
        >
          <el-card class="box-card">
            <div slot="header">
              <span>{{ item.title }}</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >删除</el-button
              >
              <el-button style="float: right; padding: 3px 5px" type="text"
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
    <!-- 模态框 -->
    <v-dialog />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import Dialog from "@/components/Dialog.vue";
import ItemData from "@/model/dataItem";
import category from "@/model/cateEleme";
@Component({
  components: {
    vHeader: Header,
    vDialog: Dialog,
  },
})
export default class Home extends Vue {
  private dataList: "Array<ItemData>" = this.$store.state.dataAction.readData(); // 获取数据
  private isShowDialog: boolean = false;  //是否显示模态框

  // 获取分类名
  getCategoryName(categoryId: category) {
    return this.$store.state.dataAction.getCategoryName(categoryId);
  }

  // 设置整体的背景颜色
  bodySetBc(): void {
    let home: any = this.$refs.home;
    let homeH: number = parseInt(window.getComputedStyle(home).height);
    let windowH: number = window.innerHeight;
    if (homeH < windowH) {
      home.style.height = windowH + "px";
    }
  }

  // 显示模态框
  showDialog(data: boolean): void {
    console.log(data);
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
        .time {
          display: flex;
          justify-content: space-between;
          padding-bottom: 10px;
          color: rgba(0, 0, 0, 0.5);
          font-size: 12px;
          & :nth-child(n) {
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
