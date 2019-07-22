import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)



export default new Router({
  routes: [
    {
      path:'/',
      component: resolve => require(['@/pages/Login/Login'], resolve)     //默认登录页
    },
    {
      path:'/Home',
      component: resolve => require(['@/pages/Home/Home'], resolve),    //首页   店铺概况
    },
    {
      path:'/content',
      component: resolve => require(['@/pages/content/content'], resolve)    //我的课程
    },
    {
      path:'/preview',
      component: resolve => require(['@/pages/preview/preview'], resolve)    //店铺预览
    },
    {
      path:'/Set',
      component: resolve => require(['@/pages/Set/Set'], resolve)    //店铺设置
    },
    {
      path:'/rotary',
      component: resolve => require(['@/pages/rotary/rotary'], resolve),     //轮播图
    },
    {
      path:'/classify',
      component: resolve => require(['@/pages/classify/classify'], resolve)    //内容分类
    },
    {
      path:'/Vip',
      component: resolve => require(['@/pages/Vip/Vip'], resolve)    //店铺会员
    },
    {
      path:'/feedback',
      component: resolve => require(['@/pages/feedback/feedback'], resolve)   //用户反馈
    },
    {
      path:'/User',
      component: resolve => require(['@/pages/User/User'], resolve)    //用户
    },
    {
      path:'/Blacklist',
      component: resolve => require(['@/pages/Blacklist/Blacklist'], resolve)    //黑名单
    },
    {
      path:'/Order',
      component:resolve => require(['@/pages/Order/Order'], resolve)   //店铺预览
    },
    {
      path:'/addImgText',
      component:resolve => require(['@/pages/addImgText/addImgText'], resolve)   //店铺预览
    },
    {
      path:'/addrotary',
      component:resolve => require(['@/pages/addrotary/addrotary'], resolve)   //新增轮播
    },
    {
      path:'/addSort',
      component:resolve => require(['@/pages/addSort/addSort'], resolve) // 新增分类
    },
    {
      path:'/rotary/addrotary',
      component:resolve => require(['@/pages/addrotary/addrotary.vue'], resolve)   //新增轮播
    },
    {
      path:'/editrotary/:id',
      component:resolve => require(['@/pages/editrotary/editrotary.vue'], resolve)   //修改轮播
    },
    {
      path:'/editImgText/:id',
      component:resolve => require(['@/pages/editImgText/editImgText.vue'], resolve)   //修改图文
    },
    {
      path:'/editaudio/:id',
      component:resolve => require(['@/pages/editaudio/editaudio.vue'], resolve)   //修改音频
    },
    {
      path:'/editvideo/:id',
      component:resolve => require(['@/pages/editvideo/editvideo.vue'], resolve)   //修改视频
    },
    {
      path:'/addlesson/:id',
      component:resolve => require(['@/pages/addlesson/addlesson.vue'], resolve)   //新增图文章节
    },
    {
      path:'/addvideolesson/:id',
      component:resolve => require(['@/pages/addvideolesson/addvideolesson.vue'], resolve)   //新增章节
    },
    {
      path:'/addaudiolesson/:id',
      component:resolve => require(['@/pages/addaudiolesson/addaudiolesson.vue'], resolve)   //新增章节
    },
    {
      path:'/orderlist/:id',
      component:resolve => require(['@/pages/orderlist/orderlist.vue'], resolve)   //  课程订单页面
    },    
    {
      path:'/classdetails/:id',
      component:resolve => require(['@/pages/classdetails/classdetails.vue'], resolve)   //  分类详情页面      
    },    
    {
      path:'/Source',
      component:resolve => require(['@/pages/Source/Source.vue'], resolve)   //  素材管理页面      
    },    
  ]
})

