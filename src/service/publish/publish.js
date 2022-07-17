import zyyRequest from '../index'

// 获取发布页中活动标题和城市的数据
export function getInitTitleAndCity() {
  // 给的接口有问题，真实无语了！
  // return zyyRequest.get({ url: '/yue/activity/info/submit/ajax/init' })
  return zyyRequest.get({ url: '/yue/activity/info/ajax/init' })
}

// 获取发布页面所有的初始化数据
export function postPublishDate({ payload }) {
  return zyyRequest.post({
    url: '/yue/activity/submit/ajax/submit',
    // catagoryId: payload.catagoryId,
    publishUserId: payload.publishUserId,
    content: payload.content,
    images: payload.images,
    cityId: payload.cityId,
    addressMode: payload.addressMode,
    beginTime: payload.beginTime,
    endTime: payload.endTime,
    leastJoinNum: payload.leastJoinNum,
    mostJoinNum: payload.mostJoinNum,
    remark: payload.remark
  })
}
