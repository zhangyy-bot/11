<template>
  <div id="whole-page">
    <nav-bar title="活动人数" :isGoBack="true"></nav-bar>
    <div id="wrapper">
      <div class="activity-section">
        <div class="main1">
          <div class="row">
            <van-cell class="name" title="最少人数">
              <div class="nameBar">
                <input
                  type="text"
                  v-model="peopleInputMin"
                  class="choose"
                  placeholder="请输入"
                  @input="handelInputMin"
                />
              </div>
            </van-cell>
          </div>
          <div class="row">
            <van-cell class="name" title="最多人数">
              <div class="nameBar">
                <input
                  v-model="peopleInputMax"
                  class="choose"
                  placeholder="请输入"
                  :disabled="disabled1"
                />
              </div>
            </van-cell>
          </div>
        </div>
      </div>
      <div class="click-publish">
        <!-- <router-link href="javascript:void(0)" class="account-form-btn js-btn-publish" @click="save">保存</router-link> -->
        <div
          href="javascript:void(0)"
          class="account-form-btn js-btn-publish"
          @click="save"
        >
          确定
        </div>
      </div>
      <textarea
        v-model="explaintion"
        style="resize: none"
        class="activity-address"
        name=""
        id="explaintion-text"
        cols="30"
        rows="10"
        disabled
      >
      </textarea>
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
    const disabled1 = ref(false)
    const peopleInputMin = ref(0)
    const peopleInputMax = ref(0)
    const explaintion = `说明：\n1.活动到期后，如果最小报名人数不为0，且报名人数小于需要人数，活动自动取消。\n2.若最小报名人数为0，则最大报名人数输入无效。 \n3.最大报名人数暂时不能超过500人。`

    if (
      window.localStorage.getItem('leastJoinNum') != null &&
      window.localStorage.getItem('mostJoinNum') != null
    ) {
      peopleInputMin.value = window.localStorage.getItem('leastJoinNum') // 最小参与人数
      peopleInputMax.value = window.localStorage.getItem('mostJoinNum') // 最大参与人数
    }

    const handelInputMin = (event) => {
      console.log(event.target.value)
      //总的判断就行了
      if (parseInt(event.target.value) === 0) {
        console.log(event.target.value)
        disabled1.value = true
      } else {
        disabled1.value = false
      }
    }

    //提交登录
    const save = () => {
      if (peopleInputMax.value > 500) {
        Toast('最大报名人数为500,请重新输入')
      }
      window.localStorage.setItem('leastJoinNum', peopleInputMin.value) //最小参与人数
      window.localStorage.setItem('mostJoinNum', peopleInputMax.value) //最大参与人数
      window.localStorage.setItem('joinExplation', explaintion.value) //人数参与解释
      history.back()
    }
    return {
      // passwordClass,
      disabled1,
      peopleInputMin,
      peopleInputMax,
      explaintion,
      handelInputMin,
      save
    }
  }
}
</script>

<style lang="less" scoped>
#whole-page {
  padding: 0;
  margin: 0;
  height: 100vh;
  background-color: rgba(247, 247, 247, 1);
}
#wrapper {
  background-color: rgba(247, 247, 247, 1);
}
.activity-section {
  height: 85px;
  margin: 27px auto;
  .main1 {
    height: 85px;
    border-radius: 5px;
    background: white;
    .row {
      height: 42px;
      // border-radius:10px;
      font-size: 15px;
      border-bottom: solid #eeeeee 1px;
      .name {
        height: 42px;
        line-height: 42px;
        color: rgba(43, 43, 43, 1);
        float: left;
        // font-size: 56px;
      }
      .choose {
        width: 60px;
        border: 0;
        font-size: 15px;
        color: #f2a748;
        ::-webkit-input-placeholder {
          color: #bfbfbf;
        }
      }
    }
  }
}
.van-cell {
  height: 25px;
  display: flex;
  align-items: center;
  span {
    font-size: 15px;
    font-family: Adobe Heiti Std;
  }
}
//这里的样式不属于.activity-section里面，必须要放在外面
.click-publish {
  width: 152px;
  height: 46px;
  line-height: 30px;
  background: #ffb04f;
  border-radius: 5px;
  margin: 0px auto;
  box-sizing: border-box;
  padding-top: 8px;
}
.js-btn-publish {
  height: 16px;
  font-size: 16px;
  font-family: Adobe Heiti Std;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
}
#explaintion-text {
  background-color: rgba(247, 247, 247, 1);
  display: block;
  margin: 60px auto;
  border: 0;
  width: 303px;
  height: 129px;
  font-size: 13px;
  color: #aaaaaa;
}
.nameBar input {
  text-align: end;
}
</style>
