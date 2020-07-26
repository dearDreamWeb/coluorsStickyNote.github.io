<template>
  <div class="header">
    <el-row class="header_container">
      <el-col class="img">
        <el-image
          style="width: 60px; height:60px"
          :src="require('../assets/images/logo.png')"
          fit="fill"
        ></el-image>
      </el-col>
      <el-col class="title">彩色便利贴</el-col>
      <el-col class="utils">
        <!-- 添加按钮 -->
        <span class="el-icon-circle-plus add" @click="addItem"> </span>
        <!-- 下拉菜单 -->
        <el-dropdown
          trigger="click"
          placement="bottom-start"
          @command="handleCommand"
          class="all"
        >
          <span class="el-dropdown-link">
            <el-badge :value="mesCount" :max="99" :hidden="mesCount <= 0">
              <i class="el-icon-message-solid message"></i>
            </el-badge>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in categoryName"
              :key="index"
              :command="index"
              >{{ item }}
              <span
                class="category_count"
                v-show="categoryCount(index) !== 0"
                >{{ categoryCount(index) }}</span
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import category from "@/model/cateEleme";
@Component({})
export default class Header extends Vue {
  @Prop() private dataList!: any[];
  private mesCount: number = this.dataList.length; // 所有的便利贴的数量
  private categoryName: string[] = ["工作", "生活", "学习"]; // 便利贴的所以分类名称

  // 下拉框选中
  handleCommand(command: category): void {
    console.log(category[command]);
  }
  // 获取每个分类的数量
  categoryCount(index: category): number {
    let arr = this.dataList.filter(item => item.categoryId === index);
    return arr.length;
  }
  // 点击添加按钮向父组件传递
  addItem(): void {
    this.$emit("showDialog", true);
  }

  // 监听dataList
  @Watch("dataList")
  getDataList(newValue: object[]) {
    this.mesCount = newValue.length;
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 0 30px;
  height: 62px;
  background: #f5d45d;
  .header_container {
    display: flex;
    align-items: center;
    height: 100%;
    .img {
      width: 60px;
    }
    .title {
      font-family: "宋体";
      font-weight: 600;
      font-size: 25px;
      color: #1f1f1f;
    }
    .utils {
      position: relative;
      flex-basis: 150px;
      height: 100%;
      // 添加和消息按钮
      .add,
      .all {
        position: absolute;
        left: 0;
        bottom: -15px;
        display: inline-block;
        padding: 5px;
        font-size: 30px;
        border-radius: 50%;
        color: #fff;
        background: #f5d45d;
        &:hover {
          cursor: pointer;
        }
      }
      .all {
        left: 50px;
      }
    }
  }
}
// 分类计数的数字样式
.category_count {
  background-color: #f56c6c;
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 5px;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #fff;
}
</style>
