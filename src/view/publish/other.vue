<template>
  <div id="whole-page">
    <nav-bar title="其它说明" :isGoBack="true"> </nav-bar>
    <div id="wrapper">
      <div class="activity-section">
        <div class="title1">活动说明</div>
        <span class="word-counter">{{ val.length }}/{{ this.maxLength }}</span>
        <div class="main1">
          <textarea
            style="resize: none"
            class="activity-advantage"
            v-model="val"
            maxlength="300"
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="请填写便于审核的活动解释，限150字。"
          >
          </textarea>
        </div>
      </div>
      <div class="click-publish">
        <div
          href="javascript:void(0)"
          class="account-form-btn js-btn-publish"
          @click="save"
        >
          保存
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { NavBar } from '@/components/nav-bar/nav-bar.vue'
export default {
  components: {
    NavBar
  },
  setup() {
    const val = ref('')
    const maxLength = 150

    if (window.localStorage.getItem('activityDescription') != null) {
      val.value = window.localStorage.getItem('activityDescription') //活动说明
    }

    const save = () => {
      // 这里应该再加一个判断才对
      window.localStorage.setItem('activityDescription', val.value)
      history.back()
    }
    return {
      val,
      maxLength,
      save
    }
  }
}
</script>

<style lang="less" scoped>
// .wholePage {
//   overflow: hidden;
//   width: 100vw;
//   // height: 100vh;
// }
#whole-page {
  padding: 0;
  margin: 0;
  // width: 375px;
  height: 100vh;
  background-color: rgba(247, 247, 247, 1);
}
#wrapper {
  // width: 375px;
  // height: 756px;
  background-color: rgba(247, 247, 247, 1);
}
.activity-section {
  // width: 375px;
  margin-top: 25px;
  .title1 {
    width: 75px;
    height: 15px;
    font-size: 15px;
    line-height: 15px;
    font-family: Adobe Heiti Std;
    font-weight: R;
    margin: 0px 286px -8px 21px;
    letter-spacing: 1px;
    color: #434343;
  }
  .word-counter {
    height: 15px;
    font-size: 13px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #acacac;
    line-height: 15px;
    float: right;
    margin-right: 22px;
    margin-top: -8px;
  }
  .main1 {
    box-sizing: border-box;
    width: 350px;
    height: 155px;
    background-color: white;
    margin: 25px auto;
    border-radius: 5px;
    padding-top: 1px;
    .activity-advantage {
      box-sizing: border-box;
      width: 350px;
      height: 155px;
      padding: 18px 11px 33px 14px;
      font-size: 13px;
      color: #767676;
    }
  }
}
//这里的样式不属于.activity-section里面，必须要放在外面
.click-publish {
  width: 152px;
  height: 46px;
  background: #ffb04f;
  border-radius: 5px;
  margin: 0px auto;
  box-sizing: border-box;
  padding-top: 8px;
}
.js-btn-publish {
  height: 16px;
  font-size: 16px;
  line-height: 30px;
  font-family: Adobe Heiti Std;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
}
</style>
