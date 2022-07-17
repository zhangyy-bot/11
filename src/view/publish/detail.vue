<template>
  <div id="whole-page">
    <nav-bar title="活动详情" :isGoBack="true"></nav-bar>
    <div id="wrapper">
      <div class="activity-section">
        <div class="title1">活动亮点</div>
        <span class="word-counter"
          >{{ advantageTextarea.length }}/{{ maxLength }}</span
        >
        <div class="main1">
          <textarea
            style="resize: none"
            class="activity-advantage"
            v-model="advantageTextarea"
            maxlength="300"
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="请填写几句活动亮点，用于分享和推荐活动，限300字。"
          >
          </textarea>
        </div>
      </div>
      <div class="activity-section">
        <div class="title2">活动内容</div>
        <div class="main2">
          <textarea
            v-model="messageTextarea"
            style="resize: none"
            class="activity-content"
            name=""
            id=""
            cols="50"
            rows="10"
            placeholder="填写活动详细介绍，不得出现微信等联系方式"
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
          确定
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { NavBar } from '@/components/nav-bar/nav-bar.vue'
import { Toast } from 'vant'
export default {
  components: {
    NavBar
  },
  setup() {
    // 活动亮点
    const advantageTextarea = ref('')
    const maxLength = 300
    // 活动内容
    const messageTextarea = ref('')

    if (window.localStorage.getItem('activityContent') !== null) {
      messageTextarea.value = window.localStorage.getItem('activityContent')
    }

    if (window.localStorage.getItem('activityAdvantage') != null) {
      advantageTextarea.value = window.localStorage.getItem('activityAdvantage')
    }

    const save = () => {
      //1.页面信息的验证，如内容不能为空。输入的信息不能为手机号码和网址
      var phone = /[1][3,4,5,7,8][0-9]{9}/
      if (
        messageTextarea.value.length == 0 ||
        phone.test(messageTextarea.value) == true ||
        messageTextarea.value.includes('http://')
      ) {
        Toast('活动内容不能为空,并且不能输入手机号码和网址')
      } else {
        //保存活动亮点和活动内容
        window.localStorage.setItem(
          'activityAdvantage',
          advantageTextarea.value
        )
        window.localStorage.setItem('activityContent', messageTextarea.value)
        //提交完数据之后再回退一个
        history.back()
      }
    }
    return {
      advantageTextarea,
      maxLength,
      messageTextarea,
      save
    }
  }
}
</script>

<style lang="less" scoped>
#whole-page {
  height: 100vh;
  height: 100vh;
  background-color: rgba(247, 247, 247, 1);
}
#wrapper {
  background-color: rgba(247, 247, 247, 1);
}
.activity-section {
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
    margin-top: -10px;
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
  .title2 {
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
  .main2 {
    box-sizing: border-box;
    width: 350px;
    height: 255px;
    background-color: white;
    margin: 25px auto;
    border-radius: 5px;
    padding-top: 1px;
    .activity-content {
      box-sizing: border-box;
      width: 350px;
      height: 255px;
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
