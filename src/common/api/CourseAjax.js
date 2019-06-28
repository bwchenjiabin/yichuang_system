import ajax from 'utils/ajax'

// 获取免费内容(商户id, 课程类型, 分页)
const reqFreeCourses = (owner, lessonType, page) => {
  return new Promise((resolve, reject) => {
    ajax.get('/lesson/selectLessonForFree',{owner, lessonType, page}).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export {reqFreeCourses}
