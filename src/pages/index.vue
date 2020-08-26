<template>
  <div>
    <el-container>
      <el-header>
        <h2>小U商城后台管理</h2>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <vnav></vnav>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vnav from "../components/nav";
export default {
  data() {
    return {};
  },
  // methods: {
  //   handleOpen(key, keyPath) {
  //     console.log(key, keyPath);
  //   },
  //   handleClose(key, keyPath) {
  //     console.log(key, keyPath);
  //   },
  // },
  components: {
    vnav,
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>
