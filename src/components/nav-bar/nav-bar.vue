<template>
  <van-nav-bar class="nav-bar" @click-left="leftArrowClick">
    <template #left>
      <img src="~@/assets/img/左箭头.png" alt="" />
    </template>
    <template #title>
      <span class="title">{{ title }}</span>
    </template>
  </van-nav-bar>
</template>

<script>
import { NavBar } from 'vant'
// import { useRouter } from 'vue-router'

export default {
  Components: {
    [NavBar.name]: NavBar
  },
  props: {
    title: {
      default: '标题',
      required: true
    },
    isGoBack: {
      default: false
    }
  },
  setup(props) {
    const leftArrowClick = () => {
      if (props.isGoBack) {
        console.log(111)
        history.back()
      }
    }
    return {
      leftArrowClick
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  height: 50px;
  color: #4a4a4a;
}
</style>
