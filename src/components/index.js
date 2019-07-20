// 将所以的公有组件 注册在这个文件中
// min.js引入这个js文件 Vue.use将会自动调用install方法
import GoMianbao from '@/components/go-mianbao.vue'
import GoPindao from '@/components/go-pindao.vue'
import GoImage from '@/components/go-image.vue'
export default {
  install (Vue) {
    // GoMianbao.name获取 go-mianbao.vue里的data中name值
    // 以name值作为注册组件的名字
    Vue.component(GoMianbao.name, GoMianbao)
    Vue.component(GoPindao.name, GoPindao)
    Vue.component(GoImage.name, GoImage)
  }
}
