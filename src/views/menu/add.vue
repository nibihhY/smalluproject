<template>
  <div>
    <!-- 弹出添加框 -->
    <el-dialog
      :before-close="reset"
      :title="isShow.dialogIs?'添加菜单':'编辑菜单'"
      :visible.sync="isShow.dialogShow"
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
import { getMenuAdd, getMenuEdit, getMenuInfo } from "../../util/axios";
export default {
  props: ["isShow"],
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
    };
  },
  computed: {
    ...mapGetters(["get_MenuList"]),
  },
  methods: {
    ...mapActions(["getMenuListAction"]),
    //添加表单验证事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.menuForm));
          data.status = data.status ? 1 : 2;
          data.type = parseInt(data.type);
          data.pid = parseInt(data.pid);

          // 判断是添加菜单还是编辑菜单
          if (this.isShow.dialogIs == true) {
            // 调添加接口
            getMenuAdd(data).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.reset();
                // 重新调菜单列表
                this.getMenuListAction();
              }
            });
          } else {
            data.id = this.editId;
            getMenuEdit(data).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.reset();
                // 重新调菜单列表
                this.getMenuListAction();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    update(id) {
      this.editId = id;
      // 编辑确定时使用
      this.isShow.dialogIs = false;
      getMenuInfo({ id }).then((res) => {
        if (res.code == 200) {
          this.menuForm = res.list;
          this.menuForm.type = res.list.type.toString();
           this.menuForm.status = this.menuForm.status === 1 ? true: false;
        }
      });
    },
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
      // 子父传值
      this.$emit("closeDialog", false);
    },
  },
};
</script>

<style lang="" scoped>
</style>
