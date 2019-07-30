import ajax from 'utils/ajax'
//登录
const login = (accountId, accountPwd) => {
  return new Promise((resolve, reject) => {
    ajax.post('/acc/login',{accountId, accountPwd}).then(res => {
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
const rotary = (owner,page) => {
  return new Promise((resolve, reject) => {
    ajax.get('/rollimage/selectAll',{owner,page}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//删除轮播
const delrotary = (id) => {
  return new Promise((resolve, reject) => {
    ajax.get('/rollimage/deleteById',{id}).then(res => {
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
    ajax.get('/lessonKind/selectByOwner',{owner}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 查询图文
const ImgText = (owner,lessonType,page,sort,direction,status,lessonKind,keyword) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/selectpage',{owner,lessonType,page,sort,direction,status,lessonKind,keyword}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 查询音频
const audio = (owner,lessonType,page,sort,direction,status,lessonKind,keyword) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/selectpage',{owner,lessonType,page,sort,direction,status,lessonKind,keyword}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 查询视频
const video = (owner,lessonType,page,sort,direction,status,lessonKind,keyword) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/selectpage',{owner,lessonType,page,sort,direction,status,lessonKind,keyword}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//展示我的用户
const user = (ex2,pageNum) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/selectBySearch',{ex2,pageNum}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//搜索我的用户
const ssuser = (ex2,businessPhone,businessStatus,businessConsumption,memberEndTime,pageNum) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/selectBySearch',{ex2,businessPhone,businessStatus,businessConsumption,memberEndTime,pageNum}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//订单搜索
const orderSearch = (ex2,orderNumber,orderStatus,payTime,payEndTime) => {
  return new Promise((resolve, reject) => {
    ajax.get('order/selectBySearch',{ex2,orderNumber,orderStatus,payTime,payEndTime}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//通过状态查询订单
const orderStatus = (ex2,orderStatus) => {
  return new Promise((resolve, reject) => {
    ajax.get('order/selectBySearch',{ex2,orderStatus}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 单条删除我的用户
const deluser = (businessId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/immigrant',{businessId}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 多条删除我的用户
const singledel = (businessId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/immigrant2',{businessId}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 黑名单展示
const blacklist = (ex2,pageNum) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/black',{ex2,pageNum}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 单条删除黑名单
const delblacklist = (businessId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/remove',{businessId}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//多条删除黑名单
const ddelblacklist = (businessId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/remove2',{businessId}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


// 首页
const Home = (accountId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/store/select',{accountId}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}



//分类展示
const classe = (owner) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lessonKind/selectByOwner',{owner}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


// 订单展示
const order = (ex2,pageNum,orderStatus,orderNumber,payTime,payEndTime) => {
  return new Promise((resolve, reject) => {
    ajax.get('/order/selectBySearch',{ex2,pageNum,orderStatus,orderNumber,payTime,payEndTime}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//订单详情   
const orderdeteils = (orderNumber) => {
  return new Promise((resolve, reject) => {
    ajax.get('/order/selectByOrderNumber',{orderNumber}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//单条删除内容分类
const delclass = (kindId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lessonKind/deleteKind',{kindId}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 修改内容分类
const modifys = (kindId,kindName,img) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lessonKind/update',{kindId,kindName,img}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 新增分类
const addclass = (kindName,owner,img) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lessonKind/insert',{kindName,owner,img}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 新增课
const addlesson = (lessonName,lessonType,lessonKind,owner,status,lessonDetail,lessonPriceFormer,lessonPriceNow,lessonVip,img) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/insertLessonMsg',{lessonName,lessonType,lessonKind,owner,status,lessonDetail,lessonPriceFormer,lessonPriceNow,lessonVip,img}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 轮播排序
const sortrotary = data => {
  return new Promise((resolve, reject) => {
    ajax.post('/rollimage/updateWeight',data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 编辑展示单条    
const updataId = (id) => {
  return new Promise((resolve, reject) => {
    ajax.post('/rollimage/selectById',{id}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//用户反馈
const feedback = (ex2,page) => {
  return new Promise((resolve, reject) => {
    ajax.get('/feedback/select',{ex2,page}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 图文上架
const UpperShelf = (lessonIds) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/upperLesson',{lessonIds}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 图文下架
const lowerShelf = (data) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/lowerLesson',data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//新增章
const chapter = (owner,lessonid,name,id) => {
  return new Promise((resolve, reject) => {
    ajax.post('/chapter/insert',{owner,lessonid,name,id}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//新增节
const section = (chapterid,name,url,extend2) => {
  return new Promise((resolve, reject) => {
    ajax.post('/section/insertImgAndWord',{chapterid,name,url,extend2}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//修改图文节
const editsection1 = (id,chapterid,name,url,extend2) => {
  return new Promise((resolve, reject) => {
    ajax.post('/section/updateImgAndWord',{id,chapterid,name,url,extend2}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//修改图文节展示
const editsection = (sectionId) => {
  return new Promise((resolve, reject) => {
    ajax.post('/section/selectById',{sectionId}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//修改视频节
const editvideosection = (id,chapterid,name) => {
  return new Promise((resolve, reject) => {
    ajax.post('section/updateSection',{id,chapterid,name}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//修改展示接口
const ceshi = (lessonId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lesson/selectLessonById',{lessonId}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//修改图文
const updateLesson = (lessonid,lessonName,img,lessonDetail,status,lessonVip,lessonPriceFormer,lessonPriceNow,owner,lessonKind) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lesson/updateLesson',{lessonid,lessonName,img,lessonDetail,status,lessonVip,lessonPriceFormer,lessonPriceNow,owner,lessonKind}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除节
const delsection = (sectionId) => {
  return new Promise((resolve, reject) => {
    ajax.post('/section/deleteSectionFile',{sectionId}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除章
const delchapter = (chapterId) => {
  return new Promise((resolve, reject) => {
    ajax.post('/chapter/deleteChapterFile',{chapterId}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除图文课
const dellesson = (lessonid) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/deleteLesson',{lessonid}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//店铺会员
const vip = (accountId,memberName,memberPrice) => {
  return new Promise((resolve, reject) => {
    ajax.post('/account/update',{accountId,memberName,memberPrice}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


// 店铺预览
const preview = (accountId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/account/getAccount',{accountId}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 修改店铺名称
const editchapter = (accountId,uname) => {
  return new Promise((resolve, reject) => {
    ajax.post('/account/update',{accountId,uname}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//查询章
const querychapter = (id) => {
  return new Promise((resolve, reject) => {
    ajax.post('/chapter/selectById',{id}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 订单列表展示
const orderlist = (formatId,page) => {
  return new Promise((resolve, reject) => {
    ajax.post('/order/selectByFormatId',{formatId,page}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 修改分类展示
const sortshow = (lessonKindId) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lessonKind/selectById',{lessonKindId}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


// 音频 视频上传   
const fileupload = (chapterid,name,extend2,extend3,url,id) => {
  return new Promise((resolve, reject) => {
    ajax.post('/section/insertAudioOrVedioSection',{chapterid,name,extend2,extend3,url,id}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 查询分类课程
const classlesson = (lessonKind,owner,page) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lesson/selectpage',{lessonKind,owner,page}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 素材查询
const source = (accountId,type,page) => {
  return new Promise((resolve, reject) => {
    ajax.post('/accountFile/show',{accountId,type,page}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}        


// 素材删除
const delsource = (accountFileIds) => {
  return new Promise((resolve, reject) => {
    ajax.post('/accountFile/delete',{accountFileIds}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}     

export {classlesson}
export {login}
export {tuichu}
export {rotary}
export {user}
export {ssuser}
export {deluser}
export {singledel}
export {blacklist}
export {delblacklist}
export {delrotary}
export {checkclass}
export {ddelrotary}
export {ImgText}
export {audio}
export {video}
export {addrotary}
export {Home}
export {classe}
export {ddelblacklist}
export {order}
export {orderdeteils}
export {delclass}
export {modifys}
export {addclass}
export {addlesson}
export {sortrotary}
export {updatarotary}
export {updataId}
export {ceshi}
export {feedback}
export {UpperShelf}
export {lowerShelf}
export {chapter}
export {section}
export {editsection}
export {editvideosection}
export {updateLesson}
export {delsection}
export {delchapter}
export {dellesson}
export {vip}
export {editsection1}
export {preview}
export {editchapter}
export {orderSearch}
export {orderStatus}
export {querychapter}
export {orderlist}
export {sortshow}
export {fileupload}
export {source}
export {delsource}