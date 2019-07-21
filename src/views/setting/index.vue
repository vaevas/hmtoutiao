 <template>
  <div class="setting-container">
    <el-card>
      <div slot="header">
        <go-mianbao>个人设置</go-mianbao>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="编号">{{form.id}}</el-form-item>
            <el-form-item label="手机">{{form.mobile}}</el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input v-model="form.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label>
              <el-button type="primary" @click="xiugai">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :http-request="uploderurl"
          >
            <img v-if="form.photo" :src="form.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="font-size:20px; text-align: center;">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventbus from '@/eventbus'
export default {
  data () {
    return {
      form: {
        id: 0,
        mobile: null,
        name: null,
        intro: null,
        photo: null,
        email: null
      }
    }
  },
  created () {
    this.getuser()
  },
  methods: {
    // 修改头像
    async uploderurl (dat) {
      // console.log(data)
      const formdata = new FormData()
      formdata.append('photo', dat.file)
      const {
        data: { data }
      } = await this.$http.patch('user/photo', formdata)
      this.$message.success('修改头像成功')
      this.form.photo = data.photo
      eventbus.$emit('xgtx', data.photo)
      const userInfo = JSON.parse(window.sessionStorage.getItem('tokens'))
      userInfo.photo = data.photo
      window.sessionStorage.setItem('tokens', JSON.stringify(userInfo))
    },
    // 获取个人信息
    async getuser () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.form = data
    },
    // 修改个人信息
    async xiugai () {
      const {
        data: { data }
      } = await this.$http.patch('user/profile', {
        name: this.form.name,
        intro: this.form.intro,
        email: this.form.email
      })
      this.$message.success('修改用户信息成功')
      eventbus.$emit('xgxx', data.name)
      const userInfo = JSON.parse(window.sessionStorage.getItem('tokens'))
      userInfo.name = data.name
      window.sessionStorage.setItem('tokens', JSON.stringify(userInfo))
    }
  }
}
</script>

 <style scoped lang='less'></style>
