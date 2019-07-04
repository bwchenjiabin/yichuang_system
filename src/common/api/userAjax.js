import ajax from 'utils/ajax'
//登录
const login = (accountId, accountPwd) => {
  return new Promise((resolve, reject) => {
    ajax.get('/acc/login',{accountId, accountPwd}).then(res => {
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
const rotary = (owner) => {
  return new Promise((resolve, reject) => {
    ajax.get('/rollimage/selectAll',{owner}).then(res => {
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
    ajax.post('rollimage/add', data).then(res => {
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
// 新增轮播查询图文
const ImgText = (owner,lessonType,page) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lesson/selectByOwnerAndType',{owner,lessonType,page}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 新增轮播查询音频
const audio = (owner,lessonType,page) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lesson/selectByOwnerAndType',{owner,lessonType,page}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// 新增轮播查询视频
const video = (owner,lessonType,page) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lesson/selectByOwnerAndType',{owner,lessonType,page}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//展示我的用户
const user = (ex2) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/select',{ex2}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
//搜索我的用户
const ssuser = (ex2,businessPhone,businessStatus,businessConsumption,memberEndTime) => {
  return new Promise((resolve, reject) => {
    ajax.get('business/selectBySearch',{ex2,businessPhone,businessStatus,businessConsumption,memberEndTime}).then(res => {
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
const blacklist = (ex2) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/black',{ex2}).then(res => {
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
const order = (ex2) => {
  return new Promise((resolve, reject) => {
    ajax.get('/order/select',{ex2}).then(res => {
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

const delclass = (businessId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/business/immigrant',{businessId}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 修改内容分类
const modifys = (kindId,kindName) => {
  return new Promise((resolve, reject) => {
    ajax.post('/lessonKind/update',{kindId,kindName}).then(res => {
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
const feedback = (ex2) => {
  return new Promise((resolve, reject) => {
    ajax.get('/feedback/select',{ex2}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//搜索状态
const selectId = (owner,lessonType,page,status) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lesson/selectByOwnerAndType',{owner,lessonType,page,status}).then(res => {
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
const chapter = (owner,lessonid,name) => {
  return new Promise((resolve, reject) => {
    ajax.post('/chapter/insert',{owner,lessonid,name}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//新增节
const section = (chapterid,name,url,id) => {
  return new Promise((resolve, reject) => {
    ajax.post('/section/insertSectionMsg',{chapterid,name,url,id}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//修改图文节
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
const updateLesson = (lessonid,lessonName,img,lessonDetail,status,lessonVip,lessonPriceFormer,lessonPriceNow,owner) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lesson/updateLesson',{lessonid,lessonName,img,lessonDetail,status,lessonVip,lessonPriceFormer,lessonPriceNow,owner}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//删除节
const delsection = (lessonId) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lesson/selectLessonById',{lessonId}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


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
export {selectId}
export {UpperShelf}
export {lowerShelf}
export {chapter}
export {section}
export {editsection}
export {editvideosection}
export {updateLesson}
export {delsection}