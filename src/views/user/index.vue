<template>
  <div>
    <el-break></el-break>
    <div>
      <el-button @click="openDialog" type="primary" size="mini" plain>添加</el-button>
    </div>
    <!-- table 表格渲染 -->
    <el-user @update="update"></el-user>
    <!-- 弹框的渲染 -->
    <v-add ref="vAdd" :isShow="sonStatus" @closeDialog="closeDialog"></v-add>
  </div>
</template>

<script>
import elBreak from "../../components/elBreak";
import elUser from "./list";
import vAdd from "./add";
export default {
  data() {
    return {
      sonStatus: {
        isAdd: true, //是否是添加
        dialogShow: false, //控制对话框
      },
    };
  },
  components: {
    elBreak,
    elUser,
    vAdd,
  },
  methods: {
    //打开弹框
    openDialog() {
      this.sonStatus.isAdd = true;
      this.sonStatus.dialogShow = true;
    },
    //关闭弹框
    //关闭弹框事件
    closeDialog(e) {
      this.sonStatus.dialogShow = e;
    },
    //update事件
    update(e){
        this.sonStatus.isAdd = e.isAdd
        this.sonStatus.dialogShow = true
        this.$refs.vAdd.update(e.id)
    }
  },
};
</script>

<style lang="" scoped>
.el-button {
  margin: 20px 0 ;
}
</style>
