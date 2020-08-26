<template>
  <div>
    <!-- 面包屑 -->
    <el-break></el-break>
    <!-- 添加 -->
    <div>
      <el-button type="primary" @click="openDialog" size="small" plain>添加</el-button>
    </div>
    <!-- table -->
    <el-table :data="get_MenuList" style="width: 100%" row-key="id" default-expand-all :tree-props="{children: 'children'}">
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
    <!-- 弹出添加框 -->
    <el-dialog
      :before-close="reset"
      :title="dialogIs?'添加菜单':'编辑菜单'"
      :visible.sync="dialogShow"
      center
    > 
      <el-form :model="menuForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="title" label="菜单名称:" :label-width="formLabelWidth">
          <el-input v-model="menuForm.title"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单:" :label-width="formLabelWidth">
          <el-select v-model="menuForm.pid" placeholder="请选择">
            <el-option value disabled>---请选择---</el-option>
            <el-option label="顶级菜单" :value="0">顶级菜单</el-option>
            <el-option
              v-for="item in get_MenuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型:" :label-width="formLabelWidth">
          <el-radio v-model="menuForm.type" label="1">目录</el-radio>
          <el-radio v-model="menuForm.type" label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item v-if="menuForm.type=='1'" label="菜单图标:" :label-width="formLabelWidth">
          <el-input v-model="menuForm.icon"></el-input>
        </el-form-item>
        <el-form-item v-if="menuForm.type=='2'" label="菜单地址:" :label-width="formLabelWidth">
          <el-input v-model="menuForm.url"></el-input>
        </el-form-item>
        <el-form-item label="状态:" :label-width="formLabelWidth">
          <el-switch v-model="menuForm.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button @click="add('ruleForm')" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  getMenuAdd,
  getMenuList,
  getMenuInfo,
  getMenuEdit,
  getMenuDelete,
} from "../util/axios";
import elBreak from "../components/elBreak";
export default {
  data() {
    return {
      editId: 0,
      formLabelWidth: "100px",
      menuForm: {
        title: "",
        pid: "",
        type: "1",
        url: "",
        status: true,
        icon: "",
      },
      dialogIs: true,
      //控制弹出框的
      dialogShow: false,
      // 表单验证
      rules: {
        title: [
          //  是否要加红色※
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          // 验证内容
          { min: 2, max: 9, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        pid: [
          //  是否要加红色※
          { required: true, message: "请选择上级菜单", trigger: "blur" },
        ],
      },
      // tableData: [
      //   //   id:1, //菜单编号
      //   //   title: "1", //菜单名称
      //   //   pid: "1", //上级菜单
      //   //   icon: "1",  菜单图标
      //   //   url: "1",  菜单地址
      //   //   status: "1"  状态值  1是正常 2是禁用
      //   {
      //     id: 1,
      //     title: "系统管理",
      //     pid: 1,
      //     icon: "1",
      //     url: "1",
      //     status: 1,
      //   },
      //   {
      //     id: 2,
      //     title: "系统管理",
      //     pid: "1",
      //     icon: 1,
      //     url: "1",
      //     status: 2,
      //   },
      //   {
      //     id: 3,
      //     title: "系统管理",
      //     pid: 1,
      //     icon: "1",
      //     url: "1",
      //     status: 1,
      //   },
      // ],
    }; 
  },
  components: {
    elBreak,
  },
  mounted() {
    // this.get_menu_list();
     this.getMenuListAction()
  },
  computed: {
    ...mapGetters(["get_MenuList"]),
  },
  methods: {
    openDialog() {
      this.dialogIs = true;
      this.dialogShow = true;
    },
    // 编辑
    edit(id) {
      // 编辑确定时使用
      this.editId = id;

      this.dialogIs = false;
      getMenuInfo({ id }).then((res) => {
        if (res.code == 200) {
          this.dialogShow = true;
          res.list.type = res.list.type.toString();
          this.menuForm = res.list;
        }
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
              this.getMenuListAction()
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
    //添加表单验证事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 修改status的数据类型，布尔转为1或2
          // this.menuForm.status = this.menuForm.status ? 1 : 2; 但由于双向vue的数据绑定特点，最后确定时，数据会影响视图
          // 利用深拷贝数据解决问题
          let data = JSON.parse(JSON.stringify(this.menuForm));
          // 把表单的数据类型改为数据库可以识别的数据类型
          data.status = data.status ? 1 : 2;
          data.type = parseInt(data.type);
          data.pid = parseInt(data.pid);

          // 判断是添加菜单还是编辑菜单
          if (this.dialogIs == true) {
            // 调添加接口
            getMenuAdd(data).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.reset();
                // 重新调菜单列表
                // this.get_menu_list();
                this.getMenuListAction()
              }
            });
          } else {
            data.id = this.editId;
            getMenuEdit(data).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.reset();
                // 重新调菜单列表
                // this.get_menu_list();
                this.getMenuListAction()
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取菜单列表数据
    ...mapActions(["getMenuListAction"]),
    // get_menu_list() {
    //   getMenuList().then((res) => {
    //     // console.log(res);
    //     if (res.code == 200) {
    //       this.tableData = res.list;
    //     }
    //   });
    // },
    // 封装清空弹框事件
    reset() {
      // 清空弹框
      this.menuForm = {
        title: "",
        pid: 0,
        type: "1",
        url: "",
        status: true,
        icon: "",
      };
      // 关闭弹窗
      this.dialogShow = false;
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-button {
  margin: 10px 0;
}
</style>
