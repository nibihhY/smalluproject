<template>
  <div>
    <!-- 面包屑 -->
    <el-break></el-break>
    <!-- 添加 -->
    <div>
      <el-button type="primary" @click="openDialog" size="small" plain>添加</el-button>
    </div>

    <v-list :isShow="sonState" @edit="edit"></v-list>

    <v-dialog ref="vdialog" :isShow="sonState" @closeDialog="closeDialog"></v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import {
//   getMenuAdd,
//   getMenuInfo,
//   getMenuEdit,
//   getMenuDelete,
// } from "../../util/axios";
import elBreak from "../../components/elBreak.vue";
import vList from "./list";
import vDialog from "./add";
export default {
  data() {
    return {
      editId: 0,
      //   dialogIs: true,
      //控制弹出框的
      //   dialogShow: false,
      sonState: {
        dialogShow: false,
        dialogIs: true,
      },
    };
  },
  components: {
    elBreak,
    vList,
    vDialog,
  },

  methods: {
    edit(e) {
      this.sonState.dialogIs = e.dialogIs;
      this.sonState.dialogShow = true;
      this.$refs.vdialog.update(e.id);
    },
    openDialog() {
      this.sonState.dialogIs = true;
      this.sonState.dialogShow = true;
    },
    closeDialog(e) {
      this.sonState.dialogShow = e;
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.el-button {
  margin: 10px 0;
}
</style>
