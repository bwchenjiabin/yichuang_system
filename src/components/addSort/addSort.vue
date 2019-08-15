<template>
    <div class="box">
        <el-main>
            <div>
                <router-link to="/classify"><span class="course" @click="switchss">内容分类</span>&nbsp;&nbsp;&nbsp;</router-link>/&nbsp;&nbsp;&nbsp;<span class="imgText">新增分类</span><br><br>
                <div class="title">

                    <span class="name">分类名称</span>
                    <el-input placeholder="请输入分类名称" v-model="input" clearable maxlength="6"> 
                    </el-input>
                    <span class="number">{{this.input.length}}/6</span><br><br><br>
                    <span class="name">选择分类配图</span>&nbsp;&nbsp;&nbsp;<el-button plain @click="Popup">选择</el-button>

                
                <span class="name">是否推广</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-radio v-model="radios" label="1">是</el-radio>
                <el-radio v-model="radios" label="2" class="radio">否</el-radio><br><br><br>
                <div class="cont">
                    <i class="el-icon-warning"></i>
                    <p>被推广类别可放置在移动端首页“专题推荐”模块展示</p>
                </div><br><br><br><br>
                <el-button type="primary" @click="getdata()">保存</el-button>
                <!-- &nbsp;&nbsp;&nbsp;<el-button plain>取消</el-button> -->
                </div>
            </div>
        </el-main>
            <!-- 弹窗 -->
            <el-dialog title="选择分类配图" :visible.sync="delVisible" width="600px" center style="z-index: 999" :close-on-click-modal="false">     
                <div class="del-dialog-cnt"> 
                    <ul style="height:500px;overflow:auto;">
                  <li v-for="(item,index) in tableData" :key="index" @click="aa(item.id)">
                      <span class="Order">{{item.id}}</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">
                          <img :src="item.img" alt="" :class = "active == index ? 'addclass' : '' " @click='dowm(index)' class="imga">
                          </span><br><br>  
                      <img src="../../../static/img/微信图片_20190620160108.png" alt="" class="good" :class = "active == index ? 'goods' : '' " >
                  </li></ul>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delVisible = false">取 消</el-button>
                    <el-button type="primary" @click="delVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>    
    </template>
    <script>
import {addclass} from 'api/userAjax';
    export default {
      name:'classify',
        data(){
            return{
                input:'',
                radios:'1',
                delVisible:false,
                   tableData: [{
            img: "http://yckt.yichuangketang.com/img/banner/1.png",
            id: '1',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/2.png",
            id: '2',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/3.png",
            id: '3',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/4.png",
            id: '4',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/5.png",
            id: '5',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/6.png",
            id: '6',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/7.png",
            id: '7',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/8.png",
            id: '8',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/9.png",
            id: '9',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/10.png",
            id: '10',
          }],
       active : -1,
       imgid:'',
              }
            },
        created () {
      },
        methods:{
    // 新增分类
      getdata () {
        if (this.input == "") {
        this.$message.error("分类名称不可为空"); 
          return;         
        }
        if (this.imgid == "") {
        this.$message.error("分类配图不可为空");    
          return;         
        }
        addclass(this.input,localStorage.getItem('ex2'),this.imgid).then(res => {
        this.$message.success(res.data);
        this.switchss();
      })
    },
        
    // 刷新页面
        switchss(){
        this.$router.go(0)
      },
    // 弹窗
        Popup(){
        this.delVisible =true
      },
        dowm(index){
        this.active = index
      },
      aa(val){
        this.imgid = val
      }
        },
    }
    </script>
    <style scoped>
 .box{background: #f5f5f5;width: 1650px;}
 .course{font-size:18px;font-family:PingFangSC-Medium;font-weight:700;color:rgba(51,51,51,1);}
 .imgText{font-size:18px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(153,153,153,1);}
 .title{padding: 20px;}
 .cont li{width: 300px;height: 200px;background:#F4F4F4 100%;float: left;margin-right: 20px;text-align: center;display: flex;justify-content: center;align-items: center;}
 .bq{width: 60px;height: 24px;line-height: 20px;border-radius: 1px;text-align: center;border: 1px solid rgba(0, 101, 255, 1);color: #0065FF;font-size: 14px;margin-left: 10px;}
 .el-tabs__item{padding: 0 50px;}.el-input{width: auto;}.icon{width: 6px;height: 17px;background: blue;float: left;margin-top: 3px;}
 .title{width: auto;display: block}.title span{margin-left: 10px;}
 .name{font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);margin-right: 15px;}
 .number{font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);width: 300px;height: 130px;margin: 10px 20px 10px 20px;}
 .number .imga{width: 100%;height: 100%;}
 .text{font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);display: inline;}
 .cont{margin-top: 10px;margin-left: 40px;color: rgba(153, 153, 153, 1);font-size: 14px;text-align: left;font-family: SourceHanSansSC-regular;width: 70%;float: left;}
 .cont p{display: inline;}.del-dialog-cnt{text-align: center;}
 .radio{margin-left: 50px;}.el-dialog .el-dialog__header{text-align: left!important;}
 .tit{padding: 0 20px 25px 20px;position: absolute;top: 0}
 .del-dialog-cnt li{display: flex;align-items: center;justify-content: center;position: relative;font-size:20px;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(20,85,250,1);}
 .del-dialog-cnt li .imga:hover{border:1px solid rgba(20,85,250,1);}
 .good{width: 15px;height: 15px;position: absolute;top: 10px;right: 86px;display: none} 
 .addclass{border:1px solid rgba(20,85,250,1)}
 .goods{display: block}
 /deep/ .el-dialog__header{
    text-align: left;
}
 /deep/ .el-dialog__title{
    font-size: 16px;
 }
 .Order{width: 25px;height: 26px;}

</style> 