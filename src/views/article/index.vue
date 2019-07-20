<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <go-mianbao>内容管理</go-mianbao>
      </div>
      <el-form ref="form" :model="form" size="small" label-width="80px">
        <el-form-item label="状态: ">
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道: ">
          <go-pindao v-model="form.channel_id"></go-pindao>
        </el-form-item>
        <el-form-item label="时间: ">
          <div class="block">
            <el-date-picker
              value-format="yyyy-MM-dd"
              @change="gettime"
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="shaixuan">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span>共查询到{{num}} 条结果:</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="封面" width="180">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px;">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" alt width="100" height="75" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status===0">草稿</el-tag>
            <el-tag type="info" v-if="scope.row.status===1">待审核</el-tag>
            <el-tag type="warning" v-if="scope.row.status===2">审核通过</el-tag>
            <el-tag type="danger" v-if="scope.row.status===3">审核失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              plain
              icon="el-icon-edit"
              @click="edit(scope.row.id)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              plain
              icon="el-icon-delete"
              @click="del(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <el-pagination
          v-if="num>form.per_page"
          background
          layout="prev, pager, next"
          :total="num"
          @current-change="getpage"
          :current-page="form.page"
          :page-size="form.per_page"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        channel_id: null,
        status: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      tableData: [],
      num: 0,
      value1: []
    }
  },
  created () {
    this.gettabledata()
    console.log(this.$route)
    console.log(this.$router)
  },
  methods: {
    shaixuan () {
      this.form.page = 1
      this.gettabledata()
    },
    // 时间数据处理
    gettime () {
      this.form.begin_pubdate = this.value1[0]
      this.form.end_pubdate = this.value1[1]
    },

    // 获取数据
    async gettabledata () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.form })
      this.tableData = data.results
      this.num = data.total_count
    },
    // 分页
    getpage (page) {
      this.form.page = page
      this.gettabledata()
    },
    // 删除
    del (id) {
      this.$confirm('此操作将永久删除该素材, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.gettabledata()
      }).catch(() => {
      })
    },
    // 编辑
    edit (id) {
      this.$router.push(`/publish?id=${id}`)
    }
  }
}
</script>

<style scoped>
.box {
  text-align: center;
  margin-top: 20px;
}
</style>
