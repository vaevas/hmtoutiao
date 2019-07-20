<template>
  <div class="comments-container">
    <el-card>
      <div slot="header">
        <go-mianbao>评论管理</go-mianbao>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" width="400"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="success" size="mini" v-if="!scope.row.comment_status" @click="setComment(scope.row)">打开评论</el-button>
            <el-button type="danger" size="mini" v-else @click="setComment(scope.row)">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination
      style="margin-top:20px"
      background
      layout="prev, pager, next"
      :page-size="comments.per_page"
      :current-page="comments.page"
      @current-change="pager"
      :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      comments: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.comments })
      this.tableData = data.results
      this.total = data.total_count
    },
    pager (page) {
      this.comments.page = page
      this.getComments()
    },
    setComment (shuju) {
      const text1 = '确定打开评论功能'
      const text2 = '确定关闭评论功能'
      this.$confirm(shuju.comment_status ? text2 : text1, '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.$http.put('comments/status?article_id=' + shuju.id, { allow_comment: !shuju.comment_status })
        this.$message({ type: 'success', message: '操作成功!' })
        shuju.comment_status = data.allow_comment
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang='less'>

</style>
