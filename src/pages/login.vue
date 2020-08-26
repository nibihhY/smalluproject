<template>
  <div class="wrap">
    <div class="login">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="账号" prop="name" >
          <el-input v-model="ruleForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" clearable show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        ruleForm: {
          name: '',
          pass:"",
          delivery: false,
          type: [],
        },
        rules: {
          name: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 调取登录接口
            if(this.ruleForm.name=="ypkypk" && this.ruleForm.pass=="123456"){
              // 跳转首页
              this.$router.push("/index")
            }else{
              this.$message.error('用户名或者密码错误');
            }
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "../stylus/index.styl"
.wrap
  height 100vh
  background-color $twoColor
  .login 
    position absolute
    width 500px
    height 164px
    left 50%
    top 50%
    transform translate(-50%,-50%)
    background-color $oneColor
    padding 50px 50px 50px 0px
    border-radius 5px
    .el-button 
      position absolute
      top 0
      left 70px
      width 200px
</style>
