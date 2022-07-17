<template>
  <div id="whole-page">
    <nav-bar title="发布活动" :isGoBack="true"></nav-bar>
    <div id="wrapper">
      <div class="activity-section">
        <div class="main1">
          <div class="row">
            <van-cell title="开始时间" class="name" @click="showPopup1">
              <div
                id="pleasechoose"
                class="choose"
                v-bind:class="[isActive1 ? 'active1' : 'active2']"
              >
                {{ message1 }}
              </div>
            </van-cell>
            <van-popup
              v-model:show="show1"
              position="bottom"
              :style="{ height: '50%' }"
            >
              <van-datetime-picker
                @confirm="confirmPicker1"
                @cancel="cancelPicker1"
                v-model="currentDate"
                type="datetime"
                title="年月日"
                :min-date="minDate"
                :max-date="maxDate"
              />
            </van-popup>
          </div>
          <div class="row">
            <van-cell title="结束时间" class="name" @click="showPopup2">
              <div
                id="pleasechoose"
                class="choose"
                v-bind:class="[isActive2 ? 'active1' : 'active2']"
              >
                {{ message2 }}
              </div>
            </van-cell>
            <van-popup
              v-model:show="show2"
              position="bottom"
              :style="{ height: '50%' }"
            >
              <van-datetime-picker
                v-model="currentDate"
                @confirm="confirmPicker2"
                @cancel="cancelPicker2"
                type="datetime"
                title="具体时间"
                :min-date="minDate"
                :max-date="maxDate"
              />
            </van-popup>
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
        style="resize: none"
        class="activity-address"
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="information"
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
    const information = '说明:\n 1. 开始时间需要大于发布时间两天。'
    const passwordClass = ref('icon-input-show')
    const val = ref('')
    const show1 = ref(false)
    const show2 = ref(false)
    const message1 = ref('请输入')
    const message2 = ref('请输入')
    const isActive1 = ref(false)
    const isActive2 = ref(false)
    const isShowAddress = ref(true)
    const minDate = new Date(2020, 0, 1)
    const maxDate = new Date(2025, 10, 1)
    const currentDate = new Date()

    if (window.localStorage.getItem('beginTime') != null) {
      message1.value = window.localStorage.getItem('beginTime') //开始时间
    }
    if (window.localStorage.getItem('endTime') != null) {
      message2.value = window.localStorage.getItem('endTime') //结束时间
    }

    const showPopup1 = () => {
      show1.value = true
    }
    const showPopup2 = () => {
      show2.value = true
    }
    const timeFormat = (time) => {
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var day = time.getDate()
      var hours = time.getHours()
      var minutes = time.getMinutes()
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
    }
    const confirmPicker1 = (value) => {
      if (value - new Date() < 172800000) {
        Toast('开始时间必须大于发布时间2天，请重新选择开始时间')
      } else {
        message1.value = timeFormat(value)
        show1.value = false
        isActive1.value = true
      }
    }
    const cancelPicker1 = () => {
      show1.value = false
    }
    const confirmPicker2 = (value) => {
      message2.value = timeFormat(value)
      show2.value = false
      isActive2.value = true
    }
    const cancelPicker2 = () => {
      show2.value = false
    }

    //提交
    const save = () => {
      window.localStorage.setItem('beginTime', message1.value) //开始时间
      window.localStorage.setItem('endTime', message2.value) //结束时间
      history.back()
    }
    return {
      information,
      passwordClass,
      val,
      show1,
      show2,
      message1,
      message2,
      isActive1,
      isActive2,
      isShowAddress,
      minDate,
      maxDate,
      currentDate,
      showPopup1,
      showPopup2,
      confirmPicker1,
      confirmPicker2,
      cancelPicker1,
      cancelPicker2,
      timeFormat,
      save
    }
  }
}
</script>

<style lang="less" scoped>
.active1 {
  color: rgba(250, 194, 81, 1);
}
.active2 {
  color: rgb(148, 143, 143);
}
#whole-page {
  height: 100vh;
  padding: 0;
  margin: 0;
  background: rgba(247, 247, 247, 1);
}
#wrapper {
  background-color: rgba(247, 247, 247, 1);
}
::v-deep .van-cell__value #pleasechoose {
  text-align: left;
  font-size: 15px;
  letter-spacing: 2px;
}
.activity-section {
  width: 346px;
  height: 85px;
  margin: 27px auto;
  .main1 {
    width: 346px;
    height: 85px;
    border-radius: 5px;
    background: white;
    .row {
      width: 333px;
      height: 42px;
      // border-radius:10px;
      font-size: 17px;
      border-bottom: solid #f8f8f8 1px;
      van-cell.name {
        height: 57px;
        line-height: 50px;
        color: rgba(43, 43, 43, 1);
        float: left;
        font-weight: 600;
      }
      .choose {
        font-size: 15px;
        color: #b5b5b5;
      }
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
.activity-address {
  background-color: rgba(247, 247, 247, 1);
  display: block;
  margin: 60px auto;
  width: 292px;
  height: 110px;
  font-size: 15px;
  color: #acacac;
  font-family: Adobe Heiti Std;
  border: 0;
}
.van-cell {
  display: flex;
  align-items: center;
  span {
    font-size: 15px;
    font-family: Adobe Heiti Std;
  }
}
</style>
