<template>
   <div class="home-main"></div>
</template>

<script>
export default {
  created () {
    this.$http.get('articles').then(res => console.log(res.data))
  }
}
</script>

 <style scoped lang="less">
 .home-main {
    width: 100%;
    height: 100%;
    background: url(../../assets/images/welcome.jpg) no-repeat center
  }
</style>
