<template>
  <div class="home" ref="home">
    <!-- 头部组件 -->
    <v-header
      :dataList="dataList"
      @showDialog="showDialog"
      @categoryIdData="categoryIdData"
    />
    <!-- 便利贴区域 -->
    <section v-if="dataList.length > 0" class="content">
      <ul ref="cardWrap">
        <li
          ref="cardItem"
          class="card_item"
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
                @click.prevent="deleteItem(item.id)"
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
        </li>
      </ul>
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
import { Component, Vue, Inject } from "vue-property-decorator";
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
  @Inject() private componentReload!: any; // 祖先组件传递下来用来刷新组件用的
  private dataList: ItemData[] = this.$store.state.dataAction.readData(); // 获取数据
  private isShowDialog: boolean = false; // 是否显示模态框
  private editItemData!: DataItem | undefined;

  // 获取分类名
  getCategoryName(categoryId: category) {
    return this.$store.state.dataAction.getCategoryName(categoryId);
  }

  // 设置整体的背景颜色
  bodySetBc(): void {
    // setTimeout(() => {
    let home: HTMLElement = this.$refs.home;
    let homeH: number = parseInt(window.getComputedStyle(home).height, 10);
    let windowH: number = window.innerHeight;
    if (homeH < windowH) {
      home.style.height = windowH + "px";
    } else {
      home.style.height = windowH + document.documentElement.scrollTop + "px";
    }
    // }, 300);
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
    this.componentReload();
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

  // 删除便利贴
  deleteItem(id: number): void {
    this.$confirm("该操作永久删除该便利贴，确定删除？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        this.$store.state.dataAction.removeItem(id);
        this.$message.success("删除成功");
        this.componentReload();
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
  }

  // 显示该分类下的所有数据
  categoryIdData(cateId: category) {
    this.dataList = this.$store.state.dataAction.getCategoryData(cateId);
    this.$nextTick(() => this.cardPosition());
  }
  // 瀑布流布局
  cardPosition(): void {
    let cardWrap: any = this.$refs.cardWrap;
    let cardItems: any = this.$refs.cardItem;
    // 父元素的宽度
    let cardWrapW: number = parseInt(
      window.getComputedStyle(cardWrap).width,
      10
    );
    cardWrap.style.position = "relative";
    // columns代表列数
    let columns: number = 3;
    // 子元素的宽度
    let cardItemW: number = cardWrapW / 3;
    // 记录每行的高度
    let arr = new Array(columns).fill(0);

    // 当屏幕宽度大于768px时，瀑布流布局；小于或等于时，变成块级元素
    if (cardWrapW > 768) {
      // 遍历每个子元素，通过arr数组中找到一列的高度最小，把子元素放到哪一列最后面
      cardItems.forEach((item: HTMLElement, i: number) => {
        let min: number = Math.min(...arr);
        let minIndex: number = arr.indexOf(min);
        item.style.position = "absolute";
        item.style.padding = "0 20px 10px";
        item.style.width = cardItemW + "px";
        item.style.left = minIndex * cardItemW + "px";
        item.style.top = min + "px";
        let itemH: number = parseInt(window.getComputedStyle(item).height, 10);
        arr[minIndex] += itemH;
      });
    } else {
      cardItems.forEach((item: HTMLElement) => {
        item.style.position = "relative";
        item.style.padding = "0 0 10px";
        item.style.width = cardWrapW + "px";
        item.style.left = "auto";
        item.style.top = "auto";
      });
    }
  }

  // 窗口大小变化事件 节流操作
  resizeEvent(): void {
    let timer: any = null;
    window.addEventListener("resize", () => {
      if (timer) {
        return;
      } else {
        timer = setTimeout(() => {
          this.bodySetBc();
          this.cardPosition();
          window.clearTimeout(timer);
          timer = null;
        }, 100);
      }
    });
  }

  // 滚动条滚动事件 节流
  scrollEvent(): void {
    window.addEventListener("scroll", () => {
      let timer: any = null;
      if (timer) {
        return;
      } else {
        timer = setTimeout(() => {
          this.bodySetBc();
          window.clearTimeout(timer);
          timer = null;
        }, 100);
      }
    });
  }

  /**
   * mounted生命周期
   */
  mounted() {
    this.bodySetBc();
    this.$nextTick(() => this.cardPosition());
    this.resizeEvent();
    this.scrollEvent();
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  font-family: "宋体";
  background: #eee;
  .content {
    margin-left: 10vw;
    padding-top: 30px;
    width: 80vw;
    .card_item {
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
    @media screen and (max-width: 768px) {
      margin: 0;
      width: 100vw;
      .card_item {
        padding-bottom: 20px;
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
