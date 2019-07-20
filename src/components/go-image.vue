<template>
  <div class="image-container">
    <div style="width:200px;height:200px" class="photo" @click="open()">
      <img :src="value||tu" alt width="100%" height="100%" />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材" name="image">
          <div>
            <el-radio-group
              v-model="imageForm.collect"
              @change="shaixuan"
              style="margin-bottom: 30px"
            >
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <ul
            class="img-list"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <li v-for="item in images" :key="item.id" :class="{selected:selectedImageUrl===item.url}" @click="checked(item.url)">
              <img :src="item.url" alt />
            </li>
          </ul>
          <el-pagination
            v-if="num>imageForm.per_page"
            background
            layout="prev, pager, next"
            :total="num"
            :page-size="imageForm.per_page"
            :current-page="imageForm.page"
            @current-change="newpage"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :headers="headers"
             name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// webpack 打包时只会打包src href 上原有的静态路径 所以需要主动引入
import tu from '../assets/images/default.png'
export default {
  name: 'go-image',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      imageForm: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      loading: false,
      num: 0,
      imageUrl: null,
      selectedImageUrl: null,
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('tokens')).token },
      tu
    }
  },
  methods: {
    // 不选图片进行提醒 选中进行预览
    sure () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) return this.$message.warning('请选择素材')
        // this.photo = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
        this.dialogVisible = false
      } else {
        if (!this.imageUrl) return this.$message.warning('请上传素材')
        // this.photo = this.imageUrl
        this.$emit('input', this.imageUrl)
        this.dialogVisible = false
      }
    },
    // 选中图片
    checked (url) {
      this.selectedImageUrl = url
    },
    // 筛选时在第一页显示
    shaixuan () {
      this.imageForm.page = 1
      this.getimage()
    },
    // 点击假图 弹出对话框 获取图片
    open () {
      this.dialogVisible = true
      this.selectedImageUrl = null
      this.imageUrl = null
      this.getimage()
    },
    // 获取图片
    async getimage () {
      this.loading = true
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.imageForm })
      this.images = data.results
      this.num = data.total_count
      this.num = data.total_count
      this.loading = false
    },
    // 分页
    newpage (page) {
      this.imageForm.page = page
      this.getimage()
    },
    // 上传成功
    handleAvatarSuccess (res) {
      this.imageUrl = res.data.url
    }
  }
}
</script>

<style scoped lang='less'>
.photo {
  border: 1px dashed #ddd;
}
.img-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  li {
    width: 120px;
    height: 120px;
    float: left;
    border: 1px dashed #ddd;
    margin-left: 10px;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    &.selected {
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
          no-repeat center / 50px 50px;
      }
    }
  }
}
.image-container {
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
}
</style>
