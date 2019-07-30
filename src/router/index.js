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
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/content',
      component: resolve => require(['@/pages/content/content'], resolve),    //我的课程
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/preview',
      component: resolve => require(['@/pages/preview/preview'], resolve),    //店铺预览
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/Set',
      component: resolve => require(['@/pages/Set/Set'], resolve),    //店铺设置
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/rotary',
      component: resolve => require(['@/pages/rotary/rotary'], resolve),     //轮播图
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/classify',
      component: resolve => require(['@/pages/classify/classify'], resolve),    //内容分类
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/Vip',
      component: resolve => require(['@/pages/Vip/Vip'], resolve),    //店铺会员
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/feedback',
      component: resolve => require(['@/pages/feedback/feedback'], resolve),   //用户反馈
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/User',
      component: resolve => require(['@/pages/User/User'], resolve) ,   //用户
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/Blacklist',
      component: resolve => require(['@/pages/Blacklist/Blacklist'], resolve)  ,  //黑名单
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/Order',
      component:resolve => require(['@/pages/Order/Order'], resolve)  , //店铺预览
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/addImgText',
      component:resolve => require(['@/pages/addImgText/addImgText'], resolve) ,  //店铺预览
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/addrotary',
      component:resolve => require(['@/pages/addrotary/addrotary'], resolve) ,  //新增轮播
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/addSort',
      component:resolve => require(['@/pages/addSort/addSort'], resolve), // 新增分类
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/rotary/addrotary',
      component:resolve => require(['@/pages/addrotary/addrotary.vue'], resolve) ,  //新增轮播
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/editrotary/:id',
      component:resolve => require(['@/pages/editrotary/editrotary.vue'], resolve),   //修改轮播
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/editImgText/:id',
      component:resolve => require(['@/pages/editImgText/editImgText.vue'], resolve) ,  //修改图文
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/editaudio/:id',
      component:resolve => require(['@/pages/editaudio/editaudio.vue'], resolve) ,  //修改音频
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/editvideo/:id',
      component:resolve => require(['@/pages/editvideo/editvideo.vue'], resolve)  , //修改视频
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/addlesson/:id',
      component:resolve => require(['@/pages/addlesson/addlesson.vue'], resolve) ,  //新增图文章节
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/addvideolesson/:id',
      component:resolve => require(['@/pages/addvideolesson/addvideolesson.vue'], resolve)  , //新增章节
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/addaudiolesson/:id',
      component:resolve => require(['@/pages/addaudiolesson/addaudiolesson.vue'], resolve),   //新增章节
      meta:{
        requireAuth:true,
      }
    },
    {
      path:'/orderlist/:id',
      component:resolve => require(['@/pages/orderlist/orderlist.vue'], resolve),   //  课程订单页面
      meta:{
        requireAuth:true,
      }
    },    
    {
      path:'/classdetails/:id',
      component:resolve => require(['@/pages/classdetails/classdetails.vue'], resolve) ,  //  分类详情页面   
      meta:{
        requireAuth:true,
      }   
    },    
    {
      path:'/Source',
      component:resolve => require(['@/pages/Source/Source.vue'], resolve),   //  素材管理页面 
      meta:{
        requireAuth:true,
      }     
    },    
    {
      path:'/wallet',
      component:resolve => require(['@/pages/wallet/wallet.vue'], resolve),   //  素材管理页面       
      meta:{
        requireAuth:true,
      }     
    },    
    {
      path:'/Recharge',
      component:resolve => require(['@/pages/Recharge/Recharge.vue'], resolve),   //  素材管理页面     
      meta:{
        requireAuth:true,
      }     
    },    
    {
      path:'/confirmorder/:money',
      component:resolve => require(['@/pages/confirmorder/confirmorder.vue'], resolve),   //  素材管理页面       
      meta:{
        requireAuth:true,
      }     
    },    
    {
      path:'/confirmpayment',
      component:resolve => require(['@/pages/confirmpayment/confirmpayment.vue'], resolve),   //  素材管理页面        
      meta:{
        requireAuth:true,
      }     
    },    
    {
      path:'/payment',
      component:resolve => require(['@/pages/payment/payment.vue'], resolve),   //  素材管理页面        
      meta:{
        requireAuth:true,
      }     
    },    
    
  ]
})

