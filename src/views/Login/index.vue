<template>
  <div class="login">
    <div class="login-warp">
      <ul class="menu-tab">
        <li :class='{"current":item.current}' v-for="(item,index) in menuTab" :key="index" @click="toggleMenu(item)">{{item.txt}}</li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">
        <el-form-item  prop="username">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item  prop="password">
          <label for="password">密码</label>
          <el-input id="password" type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item  prop="password1" v-show=' mode=="register" '>
          <label for="password1">重复密码</label>
          <el-input id="password1" type="text" v-model="ruleForm.password1" autocomplete="off"></el-input>
        </el-form-item>
 
        <el-form-item  prop="code">
          <label for="code">验证码</label>
          <el-row :gutter="20" prop="age">
            <el-col :span="16">
              <el-input id="code" v-model="ruleForm.code" ></el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="success"  class="ablock">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" class="block" @click="submitForm('ruleForm')" >{{this.mode=="login" ? '登录':'注册'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import validateUtils from "@/utils/validate.js"

export default {
    data(){
      //邮箱
      var validateUsername = (rule, value, callback) => {
        this.ruleForm.username= value = validateUtils.validate_inputValue(value,"email")
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if(validateUtils.test_email(value)) {
          callback(new Error('邮箱格式错误'));
        }else{
            callback();
        }
      };
      //密码
      var validatePassword = (rule, value, callback) => {
        //验证的字段  输入的值  验证后做什么  (回调函数)
        //过滤
        this.ruleForm.password=value = validateUtils.validate_inputValue(value,"password")
        if (value === '') {
          callback(new Error('请输入密码' ));
        } else if(validateUtils.test_password(value)){
          callback(new Error("密码格式字母+数字6~20位"))
        }else{
          callback();
        }
      };
      //重复密码
      var validatePassword1 = (rule, value, callback) => {
        //验证的字段  输入的值  验证后做什么  (回调函数)
        //过滤
       
        if(this.mode=="login"){
          callback()
          return
        }
        console.log("验证重复密码")
        this.ruleForm.password1=value = validateUtils.validate_inputValue(value,"password1")
        if (value!==this.ruleForm.password) {
          callback(new Error('两次密码不一致' ));
        }else{
          callback();
        }
      };
      //验证码
      var validateCode = (rule, value, callback) => {
        this.ruleForm.code=value = validateUtils.validate_inputValue(value,"code")
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else if(validateUtils.test_code(value)){
          callback(new Error("请输入6位数的验证码"));
        }else{
          callback()
        }
      };

      return{
        mode:"login",
        menuTab:[
          {txt:'登录',current:true,type:"login"},
          {txt:'注册',current:false ,type:"register"},
        ],
        //input绑定的数据
        ruleForm: {
          username: '',
          password: '',
          password1: '',
          code: ''
        },
        //效验规则
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          password1: [
            { validator: validatePassword1, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ]
        }
      };
    },

    methods:{
      toggleMenu(item){
        this.menuTab.map(item =>item.current=false)
        item.current=true
        this.mode=item.type
      },
      submitForm(formName) {
        //对表单的每一个字段进行验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },  
    }
}



</script>

<style lang="scss">
.login{
  height:100vh;
}
.login-warp{
  width:350px;
  height:500px;
  // background: greenyellow;
  margin: 150PX auto;
}
.menu-tab{
  text-align: center;
  word-spacing:130px;
  margin-bottom: 30px;
  li{ 
    
    display: inline-block;
    width:88px;
    height:36px;
    line-height:36px;
    font-size: 14px;
    color:white;
    border-radius: 2PX;
  }
}
.current{
    background-color: rgba(0,0,0,.1);
}
.login-form{
  label{
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color:#fff;
  }
  .block{
    width:100%;
    height:40px;
    margin-top: 10px;
  }
  .ablock{
    margin-left:-10px;
  }
}
</style>