<template>
  <div id="whole-page">
    <nav-bar title="发布活动" :isGoBack="false"></nav-bar>
    <div id="wrapper">
      <div class="activity-section">
        <div class="title1">活动信息</div>
        <div class="main1">
          <div class="row">
            <van-cell title="活动类别" class="name" is-link @click="showPopup">
              <template #icon>
                <div class="icon-box">
                  <img src="~@/assets/yue/slices/类别.png" alt="" />
                </div>
              </template>
              <div
                id="pleasechoose"
                class="choose"
                v-bind:class="[isActiveCatagory ? 'active0' : 'active2']"
              >
                {{ message }}
              </div>
            </van-cell>
            <van-popup
              v-model:show="show"
              round
              position="bottom"
              style="width: 375px; border-radius: 0px"
            >
              <van-picker
                title="标题"
                :columns="actions"
                @confirm="onConfirm"
                @cancel="onCancel"
                show-toolbar
              />
            </van-popup>

            <!-- <van-action-sheet
              :id="selectionid"
              v-model="show"
              ref="mybox"
              :actions="actions"
              title="标题"
              cancel-text="取消"
              @cancel="onCancel"
              @select="onSelect"
            /> -->
          </div>

          <div class="row">
            <van-cell title="活动标题" class="name">
              <template #icon>
                <div class="icon-box">
                  <img src="~@/assets/yue/slices/标题.png" alt="" />
                </div>
              </template>
              <!-- 活动标题5-32字 -->
              <input
                id="input"
                class="choose"
                maxlength="32"
                v-bind:class="[isActiveTitle ? 'active1' : 'active2']"
                type="text"
                placeholder="未设置"
                style="width: 100px; padding-left: 35px"
                @keyup="confirmActivityTitle"
                v-model="activitytitle"
              />
            </van-cell>
          </div>
          <div class="row">
            <van-cell title="活动详情" class="name" is-link>
              <template #icon>
                <div class="icon-box">
                  <img src="~@/assets/yue/slices/详情.png" alt="" />
                </div>
              </template>
              <router-link
                class="choose"
                v-bind:class="[isActive2 ? 'active1' : 'active2']"
                to="/publish/detail"
                >{{ activitydetail }}</router-link
              >
            </van-cell>
          </div>
          <div class="row" id="pic">
            <van-cell class="name" @click="handleUploadImage">
              <template #icon>
                <div class="icon-box">
                  <img src="~@/assets/yue/slices/上传.png" alt="" />
                </div>
              </template>
              <template #title>
                <span class="add-pic">添加照片</span>
                <span
                  class="pic-info"
                  style="color: rgb(170, 170, 170); margin-left: 5px"
                  >（可选, 最多4张）</span
                >
              </template>
              <!-- <div
                class="choose"
                v-bind:class="[isActiveImage ? 'active1' : 'active2']">
                {{ uploaded }}
              </div> -->
              <!-- 图片上传采用vant-uploader -->
            </van-cell>
            <div class="picture">
              <van-uploader
                v-model="fileList"
                multiple
                :max-count="3"
                preview-size="70px"
                :preview-image="true"
                :after-read="afterRead"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="activity-section">
        <div class="title2">活动设置</div>
        <div class="main2">
          <div class="row">
            <van-cell title="活动人数" class="name" is-link>
              <template #icon>
                <div class="icon-box">
                  <img src="~@/assets/yue/slices/人数.png" alt="" />
                </div>
              </template>
              <router-link
                class="choose"
                v-bind:class="[isActivePeople ? 'active1' : 'active2']"
                to="/publish/join"
                >{{ activitypeople }}</router-link
              >
            </van-cell>
          </div>
          <div class="row">
            <van-cell title="活动时间" class="name" is-link>
              <template #icon>
                <div class="icon-box">
                  <img src="~@/assets/yue/slices/时间.png" alt="" />
                </div>
              </template>
              <router-link
                class="choose"
                v-bind:class="[isActiveTime ? 'active1' : 'active2']"
                to="/publish/time"
                >{{ activitytime }}</router-link
              >
            </van-cell>
          </div>
          <div class="row">
            <van-cell title="活动地址" class="name" is-link>
              <template #icon>
                <div class="icon-box">
                  <img src="~@/assets/yue/slices/地址.png" alt="" />
                </div>
              </template>
              <!-- 活动地址的路由跳转 -->
              <router-link
                class="choose"
                v-bind:class="[isActiveAddress ? 'active1' : 'active2']"
                to="/publish/address"
                >{{ activityaddress }}</router-link
              >
            </van-cell>
          </div>
          <div class="row">
            <van-cell title="其它说明" class="name">
              <template #icon>
                <div class="icon-box">
                  <img src="~@/assets/yue/slices/说明.png" alt="" />
                </div>
              </template>
              <router-link
                class="choose"
                v-bind:class="[isActiveOther ? 'active1' : 'active2']"
                to="/publish/other"
                style="padding-right: 20px"
                >{{ otherexplanation }}</router-link
              >
            </van-cell>
          </div>
        </div>
      </div>
      <div class="rule">
        <a href="javascript:void(0)">查看活动审核规则</a>
      </div>
      <div class="click-publish">
        <div
          href="javascript:void(0)"
          class="account-form-btn js-btn-publish"
          @click="submit"
        >
          确认发布
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

    // 数据
    let name = ''
    let password = ''
    // 先初始化个网络请求
    store.dispatch('publishInitAction')

    // **************活动类别****************
    const message = ref('请选择')
    // 控制活动类别的弹出层
    const show = ref(false)
    // 活动类别中弹出层的数据
    const actions = reactive([])
    // 活动分类名称
    let selection = ref(window.localStorage.getItem('catagoryName'))
    // 活动分类的id
    const selectionid = ref(window.localStorage.getItem('catagoryId') || '')
    // 样式
    const isActiveCatagory = ref(false)
    // 弹出层逻辑
    const showPopup = () => {
      let dataMessage = store.state.catagoryList
      for (var i = 0; i < dataMessage.length; i++) {
        //注意：需要判断actions里面的数据小于接收到的数据，才push，否则点击一次，push一次数据
        if (actions.length < dataMessage.length) {
          actions.push({
            id: dataMessage[i].id,
            text: dataMessage[i].name
            // callback: this.onClick
          })
        }
      }
      show.value = true
    }
    const onConfirm = (item) => {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      show.value = false
      message.value = item.text
      selectionid.value = item.id
      isActiveCatagory.value = true
      window.localStorage.setItem('catagoryName', message.value)
      window.localStorage.setItem('catagoryId', selectionid.value)
      // 反向取id
      for (var i = 0; i < actions.length; i++) {
        if (selectionid.value == actions[i].id) {
          actions[i].color = 'orange'
        } else {
          actions[i].color = 'black'
        }
      }
    }
    const onCancel = () => {
      show.value = false
      message.value = '请选择'
      isActiveCatagory.value = false
      //在页面上显示cancel
      Toast('取消后请重新选择')
      for (var i = 0; i < actions.length; i++) {
        actions[i].color = 'black'
      }
    }
    if (selection.value != null && selectionid.value != null) {
      //选中之后变成黄色
      isActiveCatagory.value = true
      message.value = selection.value
    }

    // ***********活动标题*************
    const activitytitle = ref('')
    const isActiveTitle = ref(false)
    //活动标题不能少于5-32字
    const confirmActivityTitle = () => {
      if (activitytitle.value.length < 5 || activitytitle.value.length > 32) {
        Toast('活动标题长度为5-32')
        window.localStorage.setItem('title', activitytitle.value)
      } else {
        window.localStorage.setItem('title', activitytitle.value)
      }
    }
    let title = window.localStorage.getItem('title')
    if (title != null) {
      isActiveTitle.value = true
      activitytitle.value = title
    } else {
      isActiveTitle.value = false
    }

    // ************活动详情***************
    const activitydetail = ref('未完善')
    const isActiveDetail = ref(false)
    let advantage = window.localStorage.getItem('activityAdvantage')
    let content = window.localStorage.getItem('activityContent')
    if (advantage != null && content != null) {
      isActiveDetail.value = true
      activitydetail.value = '已完善'
    }

    // ************活动图片**************
    const fileList = reactive([])
    const base64List = reactive([])
    const isActiveImage = ref(false)
    const afterRead = (file) => {
      // 此时可以自行将文件上传至服务器
      fileList.push(file)
      console.log(fileList)
    }
    const handleUploadImage = () => {
      window.localStorage.setItem('images', fileList)
      if (fileList.length > 0) {
        isActiveImage.value = true
      }
    }

    // ************活动人数**************
    const isActivePeople = ref(false)
    const activitypeople = ref('待设置')
    if (
      window.localStorage.getItem('leastJoinNum') != null &&
      window.localStorage.getItem('mostJoinNum') != null
    ) {
      isActivePeople.value = true
      activitypeople.value = '已设置'
    } else if (
      window.localStorage.getItem('leastJoinNum') == null ||
      window.localStorage.getItem('mostJoinNum') == null
    ) {
      isActivePeople.value = false
    }

    // ************活动时间**************
    const activitytime = ref('待设置')
    const isActiveTime = ref(false)
    if (
      window.localStorage.getItem('beginTime') != null &&
      window.localStorage.getItem('endTime') != null
    ) {
      isActiveTime.value = true
      activitytime.value = '已设置'
    }

    // ************活动地址**************
    const activityaddress = ref('待设置')
    const isActiveAddress = ref(false)
    if (
      window.localStorage.getItem('addressMode') == 2 &&
      window.localStorage.getItem('addressCity') != null &&
      window.localStorage.getItem('address') != null
    ) {
      isActiveAddress.value = true
      activityaddress.value = '已设置'
    } else if (
      window.localStorage.getItem('addressMode') == 1 &&
      window.localStorage.getItem('address') != null
    ) {
      isActiveAddress.value = true
      activityaddress.value = '已设置'
    }

    // ************选填**************
    const otherexplanation = ref('选填')
    const isActiveOther = ref(false)
    if (window.localStorage.getItem('activityDescription') != null) {
      isActiveOther.value = true
      otherexplanation.value = '已完善'
    } else {
      isActiveOther.value = false
    }

    const handleSelected = () => {
      show.value = true
    }

    // ********************确定发布逻辑*****************
    const submit = () => {
      // 对所有的数据进行验证
      // 1.活动分类信息不能为空
      if (message.value == '请选择') {
        Toast('活动分类不能为空，请选择')
      } else {
        // 2.活动标题范围为5-32字
        confirmActivityTitle()
      }

      // 提交图片的base64编码
      console.log(fileList)
      for (let i = 0; i < fileList.length; i++) {
        base64List.push(
          fileList[i].content.replace(/^data:image\/\w+;base64,/, '')
        )
      }
      console.log(base64List)
      let base64ListString = base64List.join(',,')
      console.log(base64ListString)
      //获取图片的base64编码
      // console.log(this.fileList[0].content.replace(/^data:image\/\w+;base64,/, ''));

      // 数据的提交
      let catagoryId = window.localStorage.getItem('catagoryId')
      let cityId = window.localStorage.getItem('cityId')
      let title = window.localStorage.getItem('title')
      let publishUserId = 1
      let content = window.localStorage.getItem('activityContent')
      let images = base64ListString
      let addressMode = window.localStorage.getItem('addressMode')
      let address = window.localStorage.getItem('address')
      let beginTime = window.localStorage.getItem('beginTime') + ':00'
      let endTime = window.localStorage.getItem('endTime') + ':00'
      let leastJoinNum = window.localStorage.getItem('leastJoinNum')
      let mostJoinNum = window.localStorage.getItem('mostJoinNum')
      let remark = window.localStorage.getItem('activityDescription')
      if (
        catagoryId &&
        title &&
        // publishUserId &&
        content &&
        addressMode &&
        beginTime &&
        endTime &&
        leastJoinNum &&
        mostJoinNum
      ) {
        console.log(
          catagoryId,
          title,
          content,
          addressMode,
          beginTime,
          endTime,
          leastJoinNum,
          mostJoinNum
        )
        store.dispatch('submitDataAction', {
          title,
          catagoryId,
          publishUserId,
          content,
          images,
          cityId,
          addressMode,
          address,
          beginTime,
          endTime,
          leastJoinNum,
          mostJoinNum,
          remark
        })
        history.back()
        Toast('发布成功')
      } else {
        console.log(
          catagoryId,
          title,
          content,
          addressMode,
          beginTime,
          endTime,
          leastJoinNum,
          mostJoinNum
        )
        Toast('请完善你的信息')
      }
    }

    return {
      name,
      password,
      // 活动类别
      message,
      selectionid,
      show,
      actions,
      isActiveCatagory,
      showPopup,
      onConfirm,
      onCancel,
      // 活动标题
      activitytitle,
      isActiveTitle,
      confirmActivityTitle,
      // 活动详情
      isActiveDetail,
      activitydetail,
      // 活动图片
      isActiveImage,
      fileList,
      base64List,
      afterRead,
      handleUploadImage,
      // 活动人数
      activitypeople,
      isActivePeople,
      // 活动时间
      activitytime,
      isActiveTime,
      // 活动地址
      activityaddress,
      isActiveAddress,
      // 活动选填
      isActiveOther,
      otherexplanation,
      handleSelected,
      // 发布活动
      submit
    }
  }
}
</script>

<style lang="less" scoped>
.active0 {
  color: #f2a748;
}
.active1 {
  // color: rgba(250, 194, 81, 1);
  color: #898989;
}
.active2 {
  color: #bfbfbf;
}
#whole-page {
  padding: 0;
  margin: 0;
  // width: 375px;
  // height: 800px;
  height: 125vh;
  background: rgba(248, 248, 248, 1);
}
#wrapper {
  // width: 375px;
  // height: 800px;
  background-color: rgb(247, 247, 247);
}
::v-deep .van-picker {
  padding-top: 30px;
}
::v-deep .van-picker__toolbar .van-picker__cancel {
  font-size: 17px;
  color: #b5b5b5;
  letter-spacing: 100;
}
::v-deep .van-picker__toolbar .van-picker__title {
  font-size: 18px;
  color: #535353;
  letter-spacing: 100;
}
::v-deep .van-picker__toolbar .van-picker__confirm {
  font-size: 17px;
  color: #ffb04f;
  letter-spacing: 100;
}
::v-deep .van-uploader__preview {
  margin-right: 15px;
}
.activity-section {
  // width: 375px;
  .title1 {
    height: 53px;
    font-size: 15px;
    line-height: 53px;
    padding-left: 10px;
    color: #838383;
    font-family: Alibaba PuHuiTi;
  }
  .main1 {
    height: 300px;
    margin: 0px 5px 0px 0px;
    background-color: white;
    border-radius: 5px;
    .row {
      height: 50px;
      // line-height:57px;
      font-size: 14px;
      padding: 15px 0 10px;
      border-bottom: solid #eeeeee 1px;
      .choose {
        font-size: 15px;
        float: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border: 0;
      }

      .choose1 {
        font-size: 15px;
        float: right;
      }
    }
    #pic {
      height: 145px;
      border-bottom: 0px;
      .picture {
        margin: 20px 5px 0px 10px;
      }
    }
  }
  .title2 {
    width: 375px;
    height: 46px;
    font-size: 15px;
    line-height: 55px;
    padding-left: 10px;
    color: #838383;
    font-family: Alibaba PuHuiTi;
  }
  .main2 {
    height: 203px;
    margin: 0px 5px 0px 0px;
    background-color: white;
    border-radius: 5px;
    .row {
      height: 50px;
      // line-height:57px;
      font-size: 14px;
      padding: 15px 0 10px;
      border-bottom: solid #eeeeee 1px;
      display: flex;
      align-items: center;
      van-cell.name {
        color: #2b2b2b;
        float: left;
        font-weight: bold;
      }
      .choose {
        font-size: 15px;
        // color: #B2B2B2;
        float: right;
      }
      .choose1 {
        font-size: 15px;
        float: right;
      }
    }
  }
  .icon-box {
    margin-left: -5px;
    margin-right: 15px;
    width: 25px;
    height: 25px;
    border-radius: 2px;
    background-color: rgb(255, 206, 128);
    text-align: center;
    img {
      margin-top: 4.5px;
      width: 14px;
      height: 16px;
    }
  }
}
.rule {
  width: 150px;
  height: 14px;
  margin: 30px auto;
  a {
    font-size: 14px;
    font-family: Adobe Heiti Std;
    color: #ffce7f;
    letter-spacing: 1px;
    user-select: none;
  }
}
.click-publish {
  width: 152px;
  height: 46px;
  background: #b5b5b5;
  border-radius: 5px;
  margin: 30px auto;
  .js-btn-publish {
    text-align: center;
    height: 16px;
    font-size: 16px;
    font-family: Alibaba PuHuiTi;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 1);
    line-height: 46px;
    user-select: none;
  }
}
.click-publish:active {
  background-color: #ffb04f;
}

.van-cell {
  height: 25px;
  display: flex;
  align-items: center;
  span {
    font-family: Adobe Heiti Std;
    // font-weight: 600;
    font-size: 15px;
    // font-weight: bold;
  }
  #input::-webkit-input-placeholder {
    color: #bfbfbf;
  }
  #input {
    color: #898989;
  }
  ::v-deep .van-cell__value--alone {
    text-align: left;
    font-size: 13px;
    .van-cell__value {
      font-size: 13px;
    }
  }
}
</style>
