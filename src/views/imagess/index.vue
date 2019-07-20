<template>
  <el-card>
    <div slot="header">
      <go-mianbao>素材管理</go-mianbao>
    </div>
    <el-radio-group v-model="imageForm.collect" @change="shaixuan" style="margin-bottom: 30px">
      <el-radio-button :label="false">全部</el-radio-button>
      <el-radio-button :label="true">收藏</el-radio-button>
    </el-radio-group>
    <el-button type="success" style="float:right" @click="dialogVisible=true">上传素材</el-button>
    <ul
      class="img-list"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <li v-for="item in images" :key="item.id">
        <img :src="item.url" alt />
        <div class="btn">
          <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="shoucang(item)"></span>
          <span class="el-icon-delete" @click="del(item.id)"></span>
        </div>
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
    <el-dialog title="上传素材" :visible.sync="dialogVisible" width="280px">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      imageForm: {
        collect: false,
        page: 1,
        per_page: 14
      },
      images: [],
      num: 0,
      loading: false,
      dialogVisible: false,
      imageUrl: null,
      headers: { Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('tokens')).token }
    }
  },
  created () {
    this.getimage()
  },

  methods: {
    shaixuan () {
      this.imageForm.page = 1
      this.getimage()
    },
    // 图片列表
    async getimage () {
      this.loading = true
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.imageForm })
      this.images = data.results
      this.num = data.total_count
      this.loading = false
    },
    // 分页
    newpage (page) {
      this.imageForm.page = page
      this.getimage()
    },
    // 点击取消添加收藏
    async shoucang (item) {
      const {
        data: { data }
      } = await this.$http.put('user/images/' + item.id, {
        collect: !item.is_collected
      })
      this.$message.success('操作成功')
      item.is_collected = data.collect
    },
    // 删除
    del (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete('user/images/' + id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getimage()
        })
        .catch(() => {})
    },
    handleAvatarSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getimage()
        this.imageUrl = null
      }, 2000)
    }
  }
}
</script>

<style scoped lang="less">
.img-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  li {
    width: 160px;
    height: 160px;
    float: left;
    border: 1px dashed #ddd;
    margin-left: 60px;
    margin-bottom: 30px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .btn {
      position: absolute;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: #fff;
      text-align: center;
      span {
        padding: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
