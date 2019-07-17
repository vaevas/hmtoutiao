<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <!-- slot标签为改变的内容占位 -->
    <el-breadcrumb-item><slot></slot></el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  // 为这个组件取名字
  name: 'go-mianbao'
}
</script>

<style>
</style>
