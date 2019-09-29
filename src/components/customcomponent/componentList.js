/**
 * 所有自定义组件的列表及其默认配置项,新增组件时需要在此声明
 */
import Search from "./search"
import Swiper from "./swiper"
import NavigaterBtn from "./navigaterBtn"
import Ads from "./ads"
import CourseList from "./courseList"
import Live from "./live"
import NewCourse from "./newCourse"
import SearchConfig from "./searchConfig"
import SwiperConfig from "./swiperConfig"
import NavigaterBtnConfig from "./navigaterBtnConfig"
import AdsConfig from "./adsConfig"
import CourseListConfig from "./courseListConfig"
import LiveConfig from "./liveConfig"
import NewCourseConfig from "./newCourseConfig"
import VipAsd from "./vipAsd"
import VipAsdConfig from "./vipAsdConfig"

const componentDataList = [{
    "name": "base",
    "icon": "iconfont  icon-jichushuju",
    "text": "基础组件",
    "content": [{
        "id": 1,
        "name": "search",
        "icon": "iconfont icon-sousuo",
        "text": "课程搜索",
        "config": {
          "placeholder": "搜索课程名称"
        }
      },
      {
        "id": 2,
        "name": "swiper",
        "icon": "iconfont icon-lunbotu",
        "text": "轮播图",
        "config": {
          "imgLength": 1,
          "itemList": [{
            "img": 'http://jskt.yichuangtang.com/icon/lunbotu.png',
            "title": "",
            "placeholder": "(选填)",
            "url": {
                "title": "",
                "link": '',
                "ids": "",
                "type": ""
            }
          }]
        }
      },
      {
        "id": 3,
        "name": "navigaterBtn",
        "icon": "iconfont icon-daohang",
        "text": "导航按钮",
        "config": {
          "countOnLine": 4,
          "itemList": [{
              "img": "http://jskt.yichuangtang.com/icon/navigaterBtn1.png",
              "title": "导航按钮",
              "url": {
                "title": '',
                "link": "",
                "ids": "",
                "type": ""
              }
            },
            {
              "img": "http://jskt.yichuangtang.com/icon/navigaterBtn1.png",
              "title": "导航按钮",
              "url": {
                "title": '',
                "link": "",
                "ids": "",
                "type": ""
              }
            },
            {
              "img": "http://jskt.yichuangtang.com/icon/navigaterBtn1.png",
              "title": "导航按钮",
              "url": {
                "title": '',
                "link": "",
                "ids": "",
                "type": ""
              }
            },
            {
              "img": "http://jskt.yichuangtang.com/icon/navigaterBtn1.png",
              "title": "导航按钮",
              "url": {
                "title": '',
                "link": "",
                "ids": "",
                "type": ""
              }
            }
          ]
        }
      },
      {
        "id": 4,
        "name": "ads",
        "icon": "iconfont icon-guanggao",
        "text": "图片广告",
        "config": {
          "num": 1,
          "padding": false,
          "itemList": []
        }
      },
      {
        "id": 8,
        "name": "vipAsd",
        "icon": "iconfont icon-vip",
        "text": "会员广告",
        "config": {
            "padding": true,
            "title": "自定义会员标题",
            "textColor": "rgba(74, 40, 9, 1)",
            "info": "自定义会员简介",
            "img": "http://yckt.yichuangtang.com/img/advert/b3.png",
            "id": 1
        }
      },
    ]
  },
  {
    "name": "course",
    "icon": "iconfont icon-kecheng",
    "text": "课程组件",
    "content": [{
        "id": 5,
        "icon": "iconfont icon-fenlei",
        "text": "分类课程",
        "name": "courseList",
        "config": {
          "titleName": "分类课程",
          "classId": 0,
          "showList": [],
          "listStyle": 1
        }
      },
      {
        "id": 6,
        "name": "live",
        "icon": "iconfont icon-zhibo",
        "text": "直播组件",
        "config": {
          "showTitle": true,
          "titleName": "最新直播",
          "showMore": true,
          "contentFrom": 1,
          "data": 0
        }
      },
      {
        "id": 7,
        "name": "newCourse",
        "icon": "iconfont icon-zuixin",
        "text": "最新课程",
        "config": {
          "showTitle": true,
          "num": 6,
          "titleName": "最新课程",
          "defData": [{
              "lessonName": "此处显示课程名称",
              "lessonVip": "0",
              "lessonType": 1,
              "img": "http://jskt.yichuangtang.com/icon/kejianfengmian.png"
            },
            {
              "lessonName": "此处显示课程名称",
              "lessonVip": "0",
              "lessonType": 2,
              "img": "http://jskt.yichuangtang.com/icon/kejianfengmian.png"
            },
            {
              "lessonName": "此处显示课程名称",
              "lessonVip": "0",
              "lessonType": 3,
              "img": "http://jskt.yichuangtang.com/icon/kejianfengmian.png"
            }
          ],
        }
      },

    ]
  }
]

export {
  componentDataList
}
export {
  Search,
  SearchConfig,
  Swiper,
  SwiperConfig,
  NavigaterBtn,
  NavigaterBtnConfig,
  Ads,
  AdsConfig,
  CourseList,
  CourseListConfig,
  Live,
  LiveConfig,
  NewCourse,
  NewCourseConfig,
  VipAsd,
  VipAsdConfig
}
