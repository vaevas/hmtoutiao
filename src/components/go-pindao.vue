<template>
  <el-select placeholder="所有频道" :value="value" @change="pin">
    <el-option :label="item.name" :value="item.id" v-for="item in lie" :key="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'go-pindao',
  props: ['value'],
  data () {
    return {
      lie: []
    }
  },
  created () {
    this.getchannels()
  },
  methods: {
    pin (id) {
      this.$emit('input', id)
    },
    // 获取频道列表
    async getchannels () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.lie = data.channels
    }
  }
}
</script>

<style>
</style>
