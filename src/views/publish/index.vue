<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <go-mianbao>{{wzid?'修改':'发表'}}文章</go-mianbao>
      </div>
      <el-form :model="publishForm" label-width="100px">
        <el-form-item label="标题: ">
          <el-input v-model="publishForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容: ">
          <quill-editor v-model="publishForm.content" style="height:300px" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面: " style="margin-top:75px">
          <el-radio-group v-model="publishForm.cover.type" @change="xuan">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if=" publishForm.cover.type===1">
            <go-image v-model="publishForm.cover.images[0]" ></go-image>
          </div>
          <div v-if=" publishForm.cover.type===3">
            <go-image v-model="publishForm.cover.images[0]"></go-image>
            <go-image v-model="publishForm.cover.images[1]"></go-image>
            <go-image v-model="publishForm.cover.images[2]"></go-image>
          </div>
        </el-form-item>
        <el-form-item label="频道: ">
          <go-pindao v-model="publishForm.channel_id"></go-pindao>
        </el-form-item>
        <el-form-item v-if="wzid">
          <el-button type="primary" @click="edit(false)">修改</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      publishForm: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 1,
          images: []
        }
      },
      wzid: null,
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      }
    }
  },
  created () {
    this.wzid = this.$route.query.id
    if (this.wzid) {
      this.gettwz()
    }
  },
  watch: {
    $route () {
      // 监听一种  有修改切换到发布
      this.wzid = null
      this.publishForm = {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
    }
  },
  methods: {
    // 发表文章
    async publish (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.publishForm)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    // 通过id获取文章
    async gettwz () {
      const { data: { data } } = await this.$http.get(`articles/${this.wzid}`)
      this.publishForm = data
    },
    // 修改文章
    async edit (draft) {
      await this.$http.put(`articles/${this.wzid}?draft=${draft}`, this.publishForm)
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      this.$router.push('/article')
    },
    // 选择几图时将原有清空
    xuan () {
      this.publishForm.cover.images = []
    }
  }
}
</script>

<style scoped lang="less">
</style>
