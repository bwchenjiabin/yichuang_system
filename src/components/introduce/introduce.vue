<template>
    <div class="box">
      <div class="title_box">
        <h2>壹创介绍</h2>
      </div>
      <div class="content">
         <font>
           <h3>功能介绍</h3>
           <p>壹创直播支持语音、视频、直播流3种类型的直播：</p>
           <ul>
             <li>语音、视频直播：适合教学互动、课堂模式。</li>
             <li>直播流直播：适合现场直播。</li>
           </ul>
           <h4>1、创建直播</h4>
           <p>选择「直播」->「新增直播」</p>
           <center>
             <br>
             <img src="http://yckt.yichuangketang.com:8081/help/2.png" alt="" style="width:1000px;height:auto;">
           </center>
           <h4>2、直播间设置</h4>
           <center>
             <br>
             <img src="http://yckt.yichuangketang.com:8081/help/3.png" alt="" style="width:1000px;height:auto;">
             <br>
             <img src="http://yckt.yichuangketang.com:8081/help/4.png" alt="" style="width:1000px;height:auto;">
             <br>
             <img src="http://yckt.yichuangketang.com:8081/help/5.png" alt="" style="width:1000px;height:auto;">
           </center>
         </font>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
.title_box {
  height: auto;
  margin: 30px 30px 10px;
  width: auto;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 10px;
}
.box {
  width:700px;
  padding: 20px;
  margin: 60px auto;
}
.content{
    width: 95%;
    font-size: 16px;
    text-align: left;
    font-size: 14px;
    line-height: 1.6;
    padding: 20px;
    overflow: auto;
    width: 100%;
    background-color: #fff;
}
</style>