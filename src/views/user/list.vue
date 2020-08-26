<template>
  <div>
    <el-table :data="get_UserList" border>
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="用户名称" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="item">
          <el-button type="primary" @click="update(item.row.id)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="del(item.row.id)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="6"></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//调用接口
import { getUserDel } from "../../util/axios";
export default {
  data() {
    return {
      // 分页信息
      pageInfo: {
        size: 2, //每页查询的个数
        page: 1,
      },
    };
  },
  computed: {
    ...mapGetters(["get_UserList"]),
  },
  mounted() {
    console.log(this.pageInfo);
    this.getUserListAction(this.pageInfo);
  },
  methods: {
    ...mapActions(["getUserListAction"]),
    //点击编辑按钮传id
    update(id) {
      this.$emit("update", {
        id,
        isAdd: false,
      });
    },
    //删除数据
    del(id) {
      this.$confirm("确定要删除该数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getRoleDel({ id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //重新调取列表接口
              this.getRoleListAction();
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

<style  lang="" scoped>
</style>

