<template>
  <div class="dialoglogin">
    <el-dialog
      :visible.sync="dialogFlog"
      @close="close"
      width="370px"
      top="200px"
      :close-on-click-modal="EscModal"
      :close-on-press-escape="escape"
    >
      <!-- 标题 -->
      <div class="title-wrap">
        <el-tabs v-model="model">
          <el-tab-pane label="注册" name="register"></el-tab-pane>
          <el-tab-pane label="登陆" name="login"></el-tab-pane>
        </el-tabs>
      </div>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="Form"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-from">
          <label for="username">邮箱</label>
          <el-input
            id="username"
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-from">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="passwords"
          class="item-from"
          v-show="model === 'register'"
        >
          <label for="passwords">确认密码</label>
          <el-input
            id="passwords"
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-from">
          <label for="code">验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input
                id="code"
                v-model="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="codeButtonStatus.status"
                >{{ codeButtonStatus.text }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('Form')"
            class="login-btn block"
            >{{ model === "login" ? "登陆" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { GetSms } from "../../api/login";
import {
  stripscript,
  validateEmail,
  validatepass,
  validateVcode
} from "@/utils/validate";
import { reactive, ref, watch } from "@vue/composition-api";
export default {
  name: "login",
  props: {
    flog: {
      type: Boolean,
      default: false
    },
    log: {
      type: String
    }
  },
  setup(props, { emit, refs, root }) {
    //表单验证
    //验证邮箱
    let validateusername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback(); //true
      }
    };
    //验证密码
    let validatepassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatepass(value)) {
        callback(new Error("以字母开头，长度在6~18之间数字或字母"));
      } else {
        if (ruleForm.passwords !== "") {
          refs.Form.validateField("passwords");
        }
        callback();
      }
    };
    //验证确认密码
    let validatepasswords = (rule, value, callback) => {
      //若模块值为login，直接通过
      if (model.value === "login") {
        callback();
      }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    //验证验证码
    let validatecode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码"));
      } else if (validateVcode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    //窗口数据
    const dialogFlog = ref(false);
    const formLabelWidth = ref("70px");
    //关闭窗口
    const EscModal = ref(false);
    const escape = ref(false);
    //form表单
    const model = ref("register");
    //表单的数据
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    //表单的验证
    const rules = reactive({
      username: [{ validator: validateusername, trigger: "blur" }],
      password: [{ validator: validatepassword, trigger: "blur" }],
      passwords: [{ validator: validatepasswords, trigger: "blur" }],
      code: [{ validator: validatecode, trigger: "blur" }]
    });
    //时间
    const timer = ref(null);
    //验证码按钮状态
    const codeButtonStatus = reactive({
      //验证码按钮禁用状态
      status: false,
      //验证码的文本状态
      text: "获取验证码"
    });
    //方法
    const close = () => {
      dialogFlog.value = false;
      emit("update:flog", false);
    };
    //更新验证码按钮状态
    const updataButtonStatus = parameter => {
      codeButtonStatus.status = parameter.status;
      codeButtonStatus.text = parameter.text;
    };
    //验证码
    const getSms = () => {
      //前端拦截提示
      //邮箱是否为空
      if (ruleForm.username == "") {
        root.$message.error("请填写您的邮箱!");
        return false;
      }
      //邮箱格式是否正确真实
      if (validateEmail(ruleForm.username)) {
        root.$message.error("请填写正确邮箱格式!");
        return false;
      }
      //请求的接口,获取验证码
      let requestData = {
        username: ruleForm.username,
        module: model.value
      };
      //修改获取验证码状态
      updataButtonStatus({
        status: true,
        text: "已发送"
      });
      //延时多长时间
      setTimeout(() => {
        //获取验证码后台接口结果判断
        GetSms(requestData)
          .then(response => {
            let data = response.data;
            root.$message({
              message: data.message,
              type: "success"
            });
            //调定时器，倒计时
            countDown(5);
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      }, 2000);
    };
    // 提交表单
    const submitForm = formName => {
      refs[formName].validate(() => {});
    };
    //倒计时
    const countDown = number => {
      //判断是否存在定时器，存在则清除
      if (timer.value) {
        clearInterval(timer.value);
      }
      let time = number;
      timer.value = setInterval(() => {
        time--;
        console.log(time);
        if (time === 0) {
          clearInterval(timer.value);
          updataButtonStatus({
            status: false,
            text: "重新发送"
          });
        } else {
          codeButtonStatus.text = `倒计时${time}秒`;
        }
      }, 1000);
    };
    //清除倒计时定时器
    const clearCountDown = () => {
      //还原验证码状态
      updataButtonStatus({
        status: false,
        text: "获取验证码"
      });
      //清除倒计时
      clearInterval(timer.value);
    };
    //title切换
    watch(() => (dialogFlog.value = props.flog));
    return {
      dialogFlog,
      formLabelWidth,
      close,
      EscModal,
      escape,
      model,
      ruleForm,
      rules,
      getSms,
      codeButtonStatus,
      submitForm,
      timer
    };
  }
};
</script>
<style lang="scss" scoped>
//标题
.title-wrap {
  width: 94%;
  height: 40px;
  line-height: 40px;
}
//表单样式
.login-form {
  margin-top: 5px;
  width: 94%;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: rgb(61, 61, 61);
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    width: 100%;
    display: block;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
