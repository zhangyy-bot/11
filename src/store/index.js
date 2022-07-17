import { createStore } from 'vuex'
// import publish from './publish/publish'
import { getInitTitleAndCity, postPublishDate } from '@/service/publish/publish'

const store = createStore({
  state() {
    return {
      // 发布阶段需要上传的数据
      // 活动标题
      title: '',
      // 活动分类枚举id
      catagoryId: 0,
      // 发布者id，用户模块未介入前，直接默认1
      publishUserId: 1,
      // 活动详情 ^
      content: '',
      // 图片的base64编码 以，，分割
      images: '',
      // 城市枚举id，线上传0
      cityId: 0,
      // 地址模式，线上1，线下2
      addressMode: 1,
      // 地址详情
      addrss: '',
      // 活动开始时间
      beginTime: '',
      // 活动结束时间
      endTime: '',
      // 最小参与人数
      leastJoinNum: 0,
      // 最大参与人数
      mostJoinNum: 0,
      // 活动申请备注
      remark: '',

      // 活动分类枚举
      catagoryList: [],
      // 城市枚举
      cityList: []
    }
  },
  getters: {},
  mutations: {
    changeCatagoryList(state, list) {
      state.catagoryList = list
    },
    changeCityList(state, list) {
      state.cityList = list
    }
  },
  actions: {
    async publishInitAction({ commit }) {
      const res = await getInitTitleAndCity()
      const catagoryList = res.data.data.catagoryList
      commit('changeCatagoryList', catagoryList)
      const cityList = res.data.data.cityList
      commit('changeCityList', cityList)
    },

    async submitDataAction(payload) {
      await postPublishDate(payload)
    }
  }
})

export default store
