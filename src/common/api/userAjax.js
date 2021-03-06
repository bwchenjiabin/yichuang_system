import ajax from 'utils/ajax'
import {
  baseURL
} from 'common/config.js'
//登录
const login = (accountId, accountPwd) => {
  return new Promise((resolve, reject) => {
    ajax.post('/acc/login', {
      accountId,
      accountPwd
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 退出
const tuichu = () => {
  return new Promise((resolve, reject) => {
    ajax.get('/acc/logout').then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//展示轮播
const rotary = (owner, page) => {
  return new Promise((resolve, reject) => {
    ajax.get('/rollimage/selectAll', {
      owner,
      page
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//删除轮播
const delrotary = (id) => {
  return new Promise((resolve, reject) => {
    ajax.get('/rollimage/deleteById', {
      id
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//多条删除轮播
const ddelrotary = data => {
  return new Promise((resolve, reject) => {
    ajax.post('rollimage/deleteMoreById', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//新增轮播  
const addrotary = data => {
  return new Promise((resolve, reject) => {
    ajax.post('rollimage/insertAndUpdate', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//编辑轮播图
const updatarotary = data => {
  return new Promise((resolve, reject) => {
    ajax.post('/rollimage/update', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 新增轮播查询分类
const checkclass = (owner) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lessonKind/selectByOwner', {
      owner
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 查询图文
const ImgText = (owner, lessonType, page, sort, direction, status, lessonKind, keyword) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/selectpage', {
      owner,
      lessonType,
      page,
      sort,
      direction,
      status,
      lessonKind,
      keyword
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 查询音频
const audio = (owner, lessonType, page, sort, direction, status, lessonKind, keyword) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/selectpage', {
      owner,
      lessonType,
      page,
      sort,
      direction,
      status,
      lessonKind,
      keyword
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 查询视频
const video = (owner, lessonType, page, sort, direction, status, lessonKind, keyword) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/selectpage', {
      owner,
      lessonType,
      page,
      sort,
      direction,
      status,
      lessonKind,
      keyword
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//展示我的用户
const user = (ex2, pageNum) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/selectBySearch', {
      ex2,
      pageNum
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//搜索我的用户
const ssuser = (ex2, businessPhone, businessStatus, businessConsumption, memberEndTime, pageNum) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/selectBySearch', {
      ex2,
      businessPhone,
      businessStatus,
      businessConsumption,
      memberEndTime,
      pageNum
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//订单搜索
const orderSearch = (ex2, orderNumber, orderStatus, payTime, payEndTime, pageNum) => {
  return new Promise((resolve, reject) => {
    ajax.get('order/selectBySearch', {
      ex2,
      orderNumber,
      orderStatus,
      payTime,
      payEndTime,
      pageNum
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//通过状态查询订单
const orderStatus = (ex2, orderStatus, pageNum) => {
  return new Promise((resolve, reject) => {
    ajax.get('order/selectBySearch', {
      ex2,
      orderStatus,
      pageNum
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 单条删除我的用户
const deluser = (businessId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/immigrant', {
      businessId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 多条删除我的用户
const singledel = (businessId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/immigrant2', {
      businessId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 黑名单展示
const blacklist = (ex2, pageNum) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/black', {
      ex2,
      pageNum
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 单条删除黑名单
const delblacklist = (businessId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/remove', {
      businessId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//多条删除黑名单
const ddelblacklist = (businessId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/remove2', {
      businessId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


// 首页
const Home = (accountId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/store/select', {
      accountId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//分类展示
const classe = (owner) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lessonKind/selectByOwner', {
      owner
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


// 订单展示
const order = (ex2, pageNum, orderStatus, orderNumber, payTime, payEndTime) => {
  return new Promise((resolve, reject) => {
    ajax.get('/order/selectBySearch', {
      ex2,
      pageNum,
      orderStatus,
      orderNumber,
      payTime,
      payEndTime
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//订单详情   
const orderdeteils = (orderNumber) => {
  return new Promise((resolve, reject) => {
    ajax.get('/order/selectByOrderNumber', {
      orderNumber
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//单条删除内容分类
const delclass = (kindId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lessonKind/deleteKind', {
      kindId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 修改内容分类
const modifys = (kindId, kindName, img) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lessonKind/update', {
      kindId,
      kindName,
      img
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 新增分类
const addclass = (kindName, owner, img) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lessonKind/insert', {
      kindName,
      owner,
      img
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 新增课
const addlesson = (lessonName, lessonType, lessonKind, owner, status, lessonDetail, lessonPriceFormer, lessonPriceNow, lessonVip, img) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/insertLessonMsg', {
      lessonName,
      lessonType,
      lessonKind,
      owner,
      status,
      lessonDetail,
      lessonPriceFormer,
      lessonPriceNow,
      lessonVip,
      img
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 轮播排序
const sortrotary = data => {
  return new Promise((resolve, reject) => {
    ajax.post('/rollimage/updateWeight', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 编辑展示单条    
const updataId = (id) => {
  return new Promise((resolve, reject) => {
    ajax.post('/rollimage/selectById', {
      id
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//用户反馈
const feedback = (ex2, page) => {
  return new Promise((resolve, reject) => {
    ajax.get('/feedback/select', {
      ex2,
      page
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 图文上架
const UpperShelf = (lessonIds) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/upperLesson', {
      lessonIds
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 图文下架
const lowerShelf = (data) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/lowerLesson', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//新增章
const chapter = (owner, lessonid, name, id) => {
  return new Promise((resolve, reject) => {
    ajax.post('/chapter/insert', {
      owner,
      lessonid,
      name,
      id
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//新增节
const section = (chapterid, name, url, extend2) => {
  return new Promise((resolve, reject) => {
    ajax.post('/section/insertImgAndWord', {
      chapterid,
      name,
      url,
      extend2
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//修改图文节
const editsection1 = (id, chapterid, name, url, extend2) => {
  return new Promise((resolve, reject) => {
    ajax.post('/section/updateImgAndWord', {
      id,
      chapterid,
      name,
      url,
      extend2
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//修改图文节展示
const editsection = (sectionId) => {
  return new Promise((resolve, reject) => {
    ajax.post('/section/selectById', {
      sectionId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//修改视频节
const editvideosection = (id, chapterid, name) => {
  return new Promise((resolve, reject) => {
    ajax.post('section/updateSection', {
      id,
      chapterid,
      name
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//修改展示接口
const ceshi = (lessonId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lesson/selectLessonById', {
      lessonId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//修改图文
const updateLesson = (lessonid, lessonName, img, lessonDetail, status, lessonVip, lessonPriceFormer, lessonPriceNow, owner, lessonKind) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lesson/updateLesson', {
      lessonid,
      lessonName,
      img,
      lessonDetail,
      status,
      lessonVip,
      lessonPriceFormer,
      lessonPriceNow,
      owner,
      lessonKind
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除节
const delsection = (sectionId) => {
  return new Promise((resolve, reject) => {
    ajax.post('/section/deleteSectionFile', {
      sectionId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除章
const delchapter = (chapterId) => {
  return new Promise((resolve, reject) => {
    ajax.post('/chapter/deleteChapterFile', {
      chapterId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除图文课
const dellesson = (lessonid) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/deleteLesson', {
      lessonid
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//店铺会员
const vip = (accountId, memberName, memberPrice) => {
  return new Promise((resolve, reject) => {
    ajax.post('/account/update', {
      accountId,
      memberName,
      memberPrice
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 店铺预览
const preview = (accountId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/account/getAccount', {
      accountId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 修改店铺名称
const editchapter = (accountId, uname) => {
  return new Promise((resolve, reject) => {
    ajax.post('/account/update', {
      accountId,
      uname
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询章
const querychapter = (id) => {
  return new Promise((resolve, reject) => {
    ajax.post('/chapter/selectById', {
      id
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 订单列表展示
const orderlist = (formatId, page) => {
  return new Promise((resolve, reject) => {
    ajax.post('/order/selectByFormatId', {
      formatId,
      page
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 修改分类展示
const sortshow = (lessonKindId) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lessonKind/selectById', {
      lessonKindId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


// 音频 视频上传   
const fileupload = (chapterid, name, extend2, extend3, url, id) => {
  return new Promise((resolve, reject) => {
    ajax.post('/section/insertAudioOrVedioSection', {
      chapterid,
      name,
      extend2,
      extend3,
      url,
      id
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 查询分类课程
const classlesson = (lessonKind, owner, page) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/selectpage', {
      lessonKind,
      owner,
      page
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 素材查询
const source = (accountId, type, page) => {
  return new Promise((resolve, reject) => {
    ajax.post('/accountFile/show', {
      accountId,
      type,
      page
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


// 素材删除
const delsource = (accountFileIds) => {
  return new Promise((resolve, reject) => {
    ajax.post('/accountFile/delete', {
      accountFileIds
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


// 立即购买    
const insertOrder = (accountId, productId) => {
  return new Promise((resolve, reject) => {
    ajax.post('/wechatpay/insertOrder', {
      accountId,
      productId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//确认购买
const pay = (orderNumber, payType) => {
  return new Promise((resolve, reject) => {
    ajax.post('/wechatpay/pay', {
      orderNumber,
      payType
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询订单状态   
const orderQuery = (orderNumber) => {
  return new Promise((resolve, reject) => {
    ajax.post('/wechatpay/orderQuery', {
      orderNumber
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//根据商品类型id查商品
const selectByType = (type) => {
  return new Promise((resolve, reject) => {
    ajax.post('/product/selectByType', {
      type
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 服务订购
const service = (buyerId, pageNum, payType, orderType, orderNumber, payTime, payEndTime) => {
  return new Promise((resolve, reject) => {
    ajax.get('/order/selectBySearchPay', {
      buyerId,
      pageNum,
      payType,
      orderType,
      orderNumber,
      payTime,
      payEndTime
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 查询订单详情
const SearchPay = (id) => {
  return new Promise((resolve, reject) => {
    ajax.get('/order/selectById', {
      id
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


// 增加导航   
const insert = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/acnav/insert', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 查询所有导航
const insertNav = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/acnav/selectByAccountId', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 查询单个导航
const oneinsertNav = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/acnav/selectById', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 编辑导航
const editNav = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/acnav/update', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 删除导航
const DelNav = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/acnav/deleteById', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 排序导航
const sortNav = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/acnav/updateWeight', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


// 导航选择
const Choicenav = data => {
  return new Promise((resolve, reject) => {
    ajax.post('/account/update', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


// 广告查询
const selectacadvert = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/acadvert/select', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 新增广告
const updateacadvert = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/acadvert/update', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 会员查询
const selectvip = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/acmember/selectByAccountLengthType', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 会员修改
const editvip = data => {
  return new Promise((resolve, reject) => {
    ajax.post('/acmember/update', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 添加直播
const addlive = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/lilive/insert', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 直播列表
const selectlive = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/lilive/select', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


// 删除直播
const dellive = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/lilive/deleteById', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}



// 直播修改展示
const editlive = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/lilive/selectById', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 直播修改
const updatalive = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/lilive/update', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}



// 添加讲师接口
const addlecturer = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/liLivemember/insert', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 删除讲师接口
const dellecturer = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/liLivemember/delete', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


// 二维码邀请讲师接口
const invitelecturer = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/lilive/shareCode', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


// 直播用户搜索
const serchuser = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/selectBySearch', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}



// PPT 预览查询   

const serchppt = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/lilive/pptimg', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 文件上传  
const uploadImg = (data, headers) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(xhr.responseText);
      } else if (xhr.readyState == 4 && xhr.status != 200) {
        reject(xhr.responseText);
      }
    }
    xhr.open('POST', baseURL + '/section/insertImg');
    xhr.send(data)
  })
}

// 最新课程
const getNewCourse = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/lesson/selectNew', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 保存首页定制数据
const saveDesignHomeData = data => {
  return new Promise((resolve, reject) => {
    ajax.post2('/sysActemplate/insert', data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 查询首页定制数据
const loadDesignHomeData = data => {
    return new Promise((resolve, reject) => {
      ajax.get('/sysActemplate/selectTemple', data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 公告
const Notice = data => {
    return new Promise((resolve, reject) => {
      ajax.get('/dic/selectByType?type=notice',data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 侧边栏
const asideNav = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/help/select',data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 常见问题查询
const problem = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/help/selectById',data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

const Myaccount = data => {
  return new Promise((resolve, reject) => {
    ajax.get('store/selectBalance',data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 我的账户
const acctionDetailed = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/bill/selectpage',data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 提现管理
const cashDetailed = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/acBalanceChange/selectPage',data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 提现方式

const CashMethod = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/acCashoutConfig/select',data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 提现申请
const Cashwithdrawal = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/acBalanceChange/insert',data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 获取域名
const getdomain = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/account/getUrl',data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 修改商户信息
const editaccount = data => {
  return new Promise((resolve, reject) => {
    ajax.get('/account/updateMsg',data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


//查询标签
const queryTags = data => {
  return new Promise((resolve,reject) => {
    ajax.get('/account/getlable',data).then(res =>{
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 选择标签
const ChoiceTags = data => {
  return new Promise((resolve,reject) => {
    ajax.get('account/editlable',data).then(res =>{
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 反馈处理
const feedbackHandle = data => {
  return new Promise((resolve,reject) => {
    ajax.get('/feedback/handlefeedback',data).then(res =>{
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export {
  feedbackHandle,
  ChoiceTags,
  queryTags,
  editaccount,
  getdomain,
  Cashwithdrawal,
  CashMethod,
  acctionDetailed,
  cashDetailed,
  getNewCourse,
  classlesson,
  login,
  tuichu,
  rotary,
  user,
  ssuser,
  deluser,
  singledel,
  blacklist,
  delblacklist,
  delrotary,
  checkclass,
  ddelrotary,
  ImgText,
  audio,
  video,
  addrotary,
  Home,
  classe,
  ddelblacklist,
  order,
  orderdeteils,
  delclass,
  modifys,
  addclass,
  addlesson,
  sortrotary,
  updatarotary,
  updataId,
  ceshi,
  feedback,
  UpperShelf,
  lowerShelf,
  chapter,
  section,
  editsection,
  editvideosection,
  updateLesson,
  delsection,
  delchapter,
  dellesson,
  vip,
  editsection1,
  preview,
  editchapter,
  orderSearch,
  orderStatus,
  querychapter,
  orderlist,
  sortshow,
  fileupload,
  source,
  delsource,
  insertOrder,
  pay,
  orderQuery,
  selectByType,
  service,
  SearchPay,
  insert,
  insertNav,
  oneinsertNav,
  editNav,
  DelNav,
  sortNav,
  Choicenav,
  selectacadvert,
  updateacadvert,
  selectvip,
  editvip,
  addlive,
  selectlive,
  dellive,
  editlive,
  updatalive,
  addlecturer,
  dellecturer,
  invitelecturer,
  serchuser,
  serchppt,
  uploadImg,
  saveDesignHomeData,
  loadDesignHomeData,
  Notice,
  problem,
  asideNav,
  Myaccount
}
