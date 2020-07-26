<template>
  <div class="dialog">
    <div class="content_wrap">
      <header class="cotent_header">
        <!-- 标题 -->
        <el-input
          v-model="inputTitle"
          placeholder="标题，标题字数不能超过15个"
          class="input_title"
          :maxlength="15"
        ></el-input>

        <!-- 选择器 -->
        <el-select v-model="selectValue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <!-- 颜色选择器 -->
        <el-tooltip
          effect="dark"
          content="选择便利贴的背景颜色"
          placement="bottom"
          :hide-after="2000"
        >
          <el-color-picker v-model="color1" size="mini"></el-color-picker>
        </el-tooltip>

        <!-- 保存按钮 -->
        <el-tooltip
          effect="dark"
          content="保存"
          placement="bottom"
          :hide-after="2000"
        >
          <i class="el-icon-success save_btn" @click.prevent="addItemData"></i>
        </el-tooltip>

        <!-- 关闭按钮 -->
        <el-tooltip
          effect="dark"
          content="关闭"
          placement="bottom"
          :hide-after="2000"
        >
          <i class="el-icon-error close_btn" @click.prevent="colseDialog"></i>
        </el-tooltip>
      </header>
      <section>
        <el-input
          type="textarea"
          :rows="15"
          placeholder="请输入内容"
          v-model="inputTextarea"
        >
        </el-input>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ItemData from "@/model/dataItem";
import category from "@/model/cateEleme";

@Component({})
export default class Dialog extends Vue {
  @Prop() private editItemData!: ItemData | undefined;
  private inputTitle: string = "";
  private selectValue: number = 0;
  private inputTextarea: string = "";
  private color1: string = "#323131";
  private options: object[] = [
    {
      value: 0,
      label: "工作",
    },
    {
      value: 1,
      label: "生活",
    },
    {
      value: 2,
      label: "学习",
    },
  ];

  // 保存数据
  addItemData(): void {
    // 校验标题
    if (!this.inputTitle.trim()) {
      this.$message.info("标题不能为空");
      return;
    }

    // 校验内容
    if (!this.inputTextarea.trim()) {
      this.$message.info("内容不能为空");
      return;
    }

    // 如果 editItemData有值，说明是编辑数据，没有值说明是添加数据
    if (this.editItemData) {
      let itemData = Object.assign(this.editItemData, {
        title: this.inputTitle,
        content: this.inputTextarea,
        categoryId: this.selectValue,
        bgColor: this.color1,
      });
      this.$store.state.dataAction.editItem(itemData);
      this.$message.success("修改数据成功");
    } else {
      // 添加数据
      let itemData = new ItemData(
        1,
        this.selectValue,
        this.inputTitle,
        this.inputTextarea,
        this.color1
      );
      this.$store.state.dataAction.addData(itemData);
      this.$message.success("添加数据成功");
    }

    this.$emit("saveData", false);
  }

  // 关闭模态框
  colseDialog() {
    this.$confirm("数据未保存，确定离开？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        this.$emit("showDialog", false);
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消关闭",
        });
      });
  }

  // 编辑数据
  editData(): void {
    if (this.editItemData) {
      this.inputTitle = this.editItemData.title;
      this.inputTextarea = this.editItemData.content;
      this.selectValue = this.editItemData.categoryId;
      this.color1 = this.editItemData.bgColor;
    }
  }

  mounted() {
    this.editData();
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  .content_wrap {
    padding: 10px;
    width: 40%;
    background-color: #fff;
    border-radius: 5px;
    .cotent_header {
      display: grid;
      grid-template-columns: 5fr 2fr auto 22px 22px;
      grid-column-gap: 20px;
      align-items: center;
      padding-bottom: 20px;
      .save_btn,
      .close_btn {
        font-size: 22px;
        text-align: center;
      }
      .save_btn {
        &:hover {
          cursor: pointer;
          color: green;
        }
      }
      .close_btn {
        &:hover {
          cursor: pointer;
          color: red;
        }
      }
    }
    @media screen and (max-width: 768px) {
      width: 100%;
      height: 100%;
      .cotent_header {
        grid-template-columns: 5fr 3fr auto 22px 22px;
        grid-column-gap: 10px;
      }
    }
  }
}
</style>
