<template>
  <div class="login-container">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form ref="FormDataLogin" :model="FormDataLogin" :status-icon="true" :rules="logincheck">
        <el-form-item class="login-input" prop="mobile">
          <el-input v-model="FormDataLogin.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="FormDataLogin.code" placeholder="验证码" style="width:300px"></el-input>
          <el-button style=" float: right">获取验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">
            我已阅读并同意
            <span>用户协议</span>和
            <span>隐私条款</span>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login" :disabled="!checked">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    const checkcode = (rule, value, callback) => {
      if (/\d/.test(value)) {
        callback()
      } else {
        callback(new Error('验证码格式不正确'))
      }
    }
    return {
      checked: true,
      FormDataLogin: {
        mobile: '',
        code: ''
      },
      logincheck: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位数字', trigger: 'blur' },
          { validator: checkcode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 整体验证
      this.$refs.FormDataLogin.validate(vaild => {
        if (vaild) {
          this.$http
            .post(
              'authorizations',
              this.FormDataLogin
            )
            .then(res => {
              // console.log(res)
              window.sessionStorage.setItem('tokens', JSON.stringify(res.data.data))
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('手机号或验证码错误')
            })
        }
      })
      // 用async和await使用
      // this.$refs.FormDataLogin.validate(async vaild => {
      //   if (vaild) {
      //     try {
      //       const res = await this.$http.post('authorizations', this.FormDataLogin)
      //       window.sessionStorage.setItem('tokens', JSON.stringify(res.data.data))
      //       this.$router.push('/')
      //     } catch (err) {
      //       this.$message.error('手机号或验证码错误')
      //     }
      //   }
      // })
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 460px;
    height: 320px;
    img {
      width: 200px;
      display: block;
      margin: 0 auto;
    }
    .login-input {
      padding-top: 20px;
    }
    span {
      color: #ccc;
    }
  }
}
</style>
