<template>
  <div id="whole-page">
    <nav-bar title="活动地址" :isGoBack="true"></nav-bar>
    <div id="wrapper">
      <div class="activity-section">
        <div class="main1">
          <div class="row">
            <van-cell class="name">
              <div class="rowBar">
                <div class="title">形式</div>

                <div class="choose">
                  <van-radio-group
                    v-model="radio"
                    direction="horizontal"
                    class="check-radio"
                  >
                    <van-radio
                      name="1"
                      icon-size="14px"
                      checked-color="rgba(250,194,81,1)"
                      @click="displayAddress"
                      >线上</van-radio
                    >
                    <van-radio
                      name="2"
                      icon-size="14px"
                      checked-color="rgba(250,194,81,1)"
                      @click="showAddress"
                      >线下</van-radio
                    >
                  </van-radio-group>
                </div>
              </div>
            </van-cell>
          </div>
          <!-- 地址栏的代码，利用vant里面的Area省市区选择业务组件其中confirm点击选择后的触发的函数 -->
          <div v-if="isShowAddress" class="row">
            <van-cell is-link class="name" @click="showPopup">
              <div class="rowBar">
                <div class="title">城市</div>
                <div
                  id="pleasechoose"
                  class="choose"
                  v-bind:class="[isActive ? 'active1' : 'active2']"
                >
                  {{ message }}
                </div>
              </div>
            </van-cell>
            <van-action-sheet
              :id="addressid"
              v-model:show="show"
              :actions="actions"
              cancel-text="取消"
              @cancel="onCancel"
              @select="onSelect"
            />
          </div>
          <div v-if="isShowAddress" class="row">
            <van-cell class="name">
              <div class="dateil">
                详细地址
                <input
                  id="input"
                  class="choose"
                  maxlength="32"
                  type="text"
                  placeholder="请输入详细地址"
                  style="width: 110px"
                  v-model="activityAddressCount"
                />
              </div>
            </van-cell>
          </div>
        </div>
      </div>
      <div class="click-publish">
        <!-- <router-link  href="javascript:void(0)" class="account-form-btn js-btn-publish" @click="save" to='/yue/publish'>保存</router-link> -->
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
import { ref, reactive } from 'vue'
import { NavBar } from '@/components/nav-bar/nav-bar.vue'
import { useStore } from 'vuex'
import { Toast } from 'vant'
export default {
  components: {
    NavBar
  },
  setup() {
    const store = useStore()
    const maxLength = 300
    const radio = ref(window.localStorage.getItem('addressMode') || 1)
    const show = ref(false)
    const message = ref('待选择')
    const addressid = ref(1)
    const isActive = ref(false)
    const isShowAddress = ref(true)
    const activityAddressCount = ref('')
    const actions = reactive([])

    if (
      radio.value == 1 &&
      window.localStorage.getItem('addressMode') != null
    ) {
      isShowAddress.value = false
      radio.value = window.localStorage.getItem('addressMode') //活动模式
      console.log(radio.value)
      activityAddressCount.value = window.localStorage.getItem('address') //活动地址详情
    } else if (
      radio.value == 2 &&
      window.localStorage.getItem('addressMode') != null &&
      window.localStorage.getItem('address') != null
    ) {
      radio.value = window.localStorage.getItem('addressMode') //活动模式
      console.log(radio.value)
      activityAddressCount.value = window.localStorage.getItem('address') //活动地址详情
      message.value = window.localStorage.getItem('addressCity') //地址城市
      addressid.value = window.localStorage.getItem('cityId') //地址城市id
    }
    store.dispatch('publishInitAction')
    const showPopup = () => {
      var dataMessage = store.state.cityList
      for (var i = 0; i < dataMessage.length; i++) {
        if (actions.length < dataMessage.length) {
          actions.push({
            name: dataMessage[i].name,
            id: dataMessage[i].id,
            color: 'orange'
          })
        }
      }
      show.value = true
    }
    const showAddress = () => {
      isShowAddress.value = true
    }
    const displayAddress = () => {
      isShowAddress.value = false
    }

    const onSelect = (item) => {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      show.value = false
      console.log(item)
      message.value = item.name
      addressid.value = item.id
      isActive.value = true
      console.log(isActive.value)
      // 在页面上显示出信息
      // Toast(item.name);
    }
    const onCancel = () => {
      console.log('点击取消了')
      show.value = false
      message.value = '请选择'
      isActive.value = false
      //在页面上显示cancel
      Toast('cancel')
    }
    const save = () => {
      if (radio.value == 1) {
        isShowAddress.value = false
        window.localStorage.setItem('addressMode', radio.value) //活动模式
        // window.sessionStorage.setItem("address", this.activityAddressCount); //活动地址详情
      } else if (radio.value == 2) {
        window.localStorage.setItem('addressMode', radio.value) //活动模式
        console.log(radio.value)
        window.localStorage.setItem('address', activityAddressCount.value) //活动地址详情
        window.localStorage.setItem('addressCity', message.value) //地址城市
        window.localStorage.setItem('cityId', addressid.value) //活动地址id
        if (
          activityAddressCount.value?.length == 0 ||
          activityAddressCount.value?.length > 100
        ) {
          Toast('活动具体详细地址字数为1-100')
        }
      }
      history.back()
    }
    return {
      store,
      maxLength,
      radio,
      show,
      message,
      addressid,
      isActive,
      isShowAddress,
      activityAddressCount,
      actions,
      showPopup,
      showAddress,
      displayAddress,
      onSelect,
      onCancel,
      save
    }
  }
}
</script>

<style lang="less" scoped>
.active0 {
  color: #f2a748;
}
.active1 {
  color: #898989;
}
.active2 {
  color: #bfbfbf;
}
#whole-page {
  padding: 0;
  margin: 0;
  height: 100vh;
  background: rgba(247, 247, 247, 1);
}
#wrapper {
  background: rgba(247, 247, 247, 1);
}
.activity-section {
  margin: 30px auto;
  .main1 {
    border-radius: 5px;
    background: rgba(255, 255, 255, 1);
    .row {
      height: 52px;
      font-size: 17px;
      border-bottom: solid #eeeeee 1px;
      .rowBar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title {
          line-height: 60px;
          font-size: 15px;
          color: #434343;
          font-family: Adobe Heiti Std;
          font-weight: normal;
        }
      }
      .dateil {
        font-size: 15px;
        color: #434343;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        text-align: left;
        input {
          text-align: end;
        }
      }
      ::v-deep .van-cell {
        display: flex;
        align-items: center;
        #input::-webkit-input-placeholder {
          color: #bfbfbf;
        }
        #input {
          color: #898989;
          border: 0;
        }
      }
      ::v-deep .van-cell {
        height: 52px;
        line-height: 45px;
        color: rgba(43, 43, 43, 1);
        float: left;
      }
      .choose {
        font-size: 13px;
        // color: #B2B2B2;
        height: 48px;
        display: flex;
        align-items: center;
        float: right;
      }
    }
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
</style>
