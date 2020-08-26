<template>
  <div>
    <!-- table -->
    <el-table
      :data="get_MenuList"
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号" width="180"></el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>
      <el-table-column prop="pid" label="上级菜单"></el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180"></el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="item">
          <el-button type="success" @click="edit(item.row.id)" plain size="small">编辑</el-button>
          <el-button type="danger" @click="del(item.row.id)" plain size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getMenuList, getMenuDelete } from "../../util/axios";
export default {
  props: ["isShow"],
  data() {
    return {};
  },
  mounted() {
    this.getMenuListAction();
  },
  computed: {
    ...mapGetters(["get_MenuList"]),
  },
  methods: {
    // 获取菜单列表数据
    ...mapActions(["getMenuListAction"]),
    // 编辑
    edit(id) {
      this.$emit("edit", {
        dialogIs: false,
        id,
      });
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该条菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 调删除菜单接口
          getMenuDelete({ id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              // 重新调菜单列表
              // this.get_menu_list();
              this.getMenuListAction();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="" scoped>
</style>
