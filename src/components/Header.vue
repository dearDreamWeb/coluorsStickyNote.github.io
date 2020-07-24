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
        <span class="el-icon-circle-plus add"> </span>
        <!-- 下拉菜单 -->
        <el-dropdown trigger="click" class="all">
          <span class="el-dropdown-link">
            全部
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
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
      .add {
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
        position: absolute;
        right: 0;
        bottom: 20px;
        font-family: "宋体";
        font-weight: 600;
        font-size: 18px;
        color: #fff;
        &:hover {
          cursor: pointer;
        }
        &:focus {
          outline: none;
        }
        .el-icon--right {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
