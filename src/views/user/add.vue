<template>
  <div>
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd?'添加管理员':'编辑管理员'"
      :visible.sync="isShow.dialogShow"
      center
    >
      <el-form :model="userForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="roleid" label="管理员名称：" :label-width="formLabelWidth">
          <el-select v-model="userForm.roleid" placeholder="请选择">
            <el-option
              v-for="item in get_RoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="username" label="用户名称：" :label-width="formLabelWidth">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item  label="用户密码：" :label-width="formLabelWidth">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="userForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button type="primary" @click="add('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//引入接口
import { getRoleAdd, getRoleInfo, getRoleEdit } from "../../util/axios";
export default {
  data() {
    return {
      editId: 0,
      formLabelWidth: "120px", //lable宽度
      userForm: {
        roleid: "",//用户编号
        username:"",//管理员名称
        password:"",//密码
        status: 1,
      },
      rules: {
        roleid: [
          //代表加红色星标
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
        username: [
          //代表加红色星标
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          //验证字符数
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
      defaultProps: {
        //树结构的显示配置项
        children: "children",
        label: "title",
      },
    };
  },
  mounted() {
    //获取角色列表
    this.getRoleListAction();
  },
  computed: {
    ...mapGetters(["get_RoleList"]),
  },
  props: ["isShow"],
  methods: {
    //触发菜单列表的调取
    ...mapActions(["getRoleListAction"]),
    reset() {
      //清空表单信息
      this.userForm = {
        roleid: "",//用户编号
        username:"",//管理员名称
        password:"",//密码
        status: 1,
      };

      //子组件去修改父组件的弹框状态
      this.$emit("closeDialog", false);
    },
    //点击弹框获取一条数据
    update(id) {
      this.editId = id;
      getRoleInfo({ id }).then((res) => {
        if (res.code === 200) {
          this.userForm = res.list;
          //得到的数组要做二次转换
          this.defaultChecked = this.userForm.menus
            ? this.userForm.menus.split(",")
            : [];
        }
      });
    },
    //添加表单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          //调取接口
          //是否调取新增事件还是编辑事件
          if (this.isShow.isAdd) {
            //调取添加接口
            getRoleAdd(this.userForm).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getRoleListAction();
              }
            });
          } else {
            //id编号，必填项  对数据进行编辑
            this.userForm.id = this.editId;
            // //调取添加接口
            getRoleEdit(this.userForm).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getRoleListAction();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
