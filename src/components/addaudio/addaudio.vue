<template>
        <div class="box">
                <el-main>
                      <div>
                          <router-link to=""><span class="course" @click="switchss">我的课程</span>&nbsp;&nbsp;&nbsp;</router-link>/&nbsp;&nbsp;&nbsp;<span class="imgText">新增音频</span><br><br>
                            <div class="title">
                                <i class="icon"></i>
                                <span>基本信息</span><br><br><br>
                                <span class="name">课程名称</span>
                                <el-input placeholder="请输入名称，最多不超过12个字" v-model="input" clearable maxlength="12"> 
                                </el-input>
                                <span class="number">{{this.input.length}}/12</span><br><br><br>
                                <span class="name">课程封面</span>
                                <p class="text">240*180像素，支持PNG、JPG、GIF格式，小于5M</p><br><br>

                               <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess"
                                  :before-upload="beforeAvatarUpload">
                                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                               </el-upload><br><br>

                               <span class="name">详情封面</span>
                                <p class="text">240*180像素，支持PNG、JPG、GIF格式，小于5M</p><br><br>

                               <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess"
                                  :before-upload="beforeAvatarUpload">
                                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                                  <i v-else class="el-icon-plus avatar-uploader-icon update"></i>
                               </el-upload><br><br>

                               <span class="name">课程简介</span>
                                <p class="text">为了保证图片完整显示，从第三方编辑器复制的内容需要手动点击“图片本地化”操作</p><br><br>
                                <el-input
                                  type="textarea"
                                  maxlength="500"
                                  :rows="7"
                                  placeholder="请输入内容"
                                  v-model="textarea" class="inp">
                                </el-input><span class="number">{{this.textarea.length}}/500</span><br><br><br>
                            </div> 

                             <div class="title">
                                <i class="icon"></i>
                                <span>课程信息</span><br>
                             </div>
                             <div class="content">
                               <div class="cont-tit">
                                   <span class="chapter">第一章</span><span>章节标题</span><el-input placeholder="请输入章节标题" v-model="input1" clearable class="inp2"></el-input>
                                   <el-button plain class="btn">+添加节</el-button>
                               </div>
                               <el-button type="primary" class="btn1">添加章</el-button>
                             </div>
                             <div class="table">
                               <ul>
                                 <li v-for="(item,index) in list" :key="index">{{item.name}}<div class="icons"><i class="el-icon-edit-outline"></i>&nbsp;&nbsp;&nbsp;<i class="el-icon-delete"></i></div></li>
                               </ul>
                             </div>

                             <div class="content">
                               <div class="cont-title">
                                   <span class="chapter">第二章</span><span>章节标题</span><el-input placeholder="请输入章节标题" v-model="input2" clearable class="inp2"></el-input>
                                   <el-button plain class="btn">+添加节</el-button><i class="el-icon-delete icona"></i>
                               </div>
                             </div>
                             <div class="title">
                                <i class="icon"></i>
                                <span>上架信息</span><br><br><br>
                                <span class="name">上架时间</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <el-radio v-model="radio" label="1">立即上架</el-radio>
                                <el-radio v-model="radio" label="2">暂不上架</el-radio><br><br><br>
                                <div style="display:inline-block"><span>所属分类<span class="bt"><br>&nbsp;&nbsp;&nbsp;&nbsp;(必填)</span></span></div>
                                <el-button style="margin-left:22px;" @click="Popup">选择分类</el-button>
                                <span style="font-size:16px;font-weight:400;color:rgba(153,153,153,1);margin-left:25px;">选择后，可添加到相应分类</span><br><br><br>
                                <span>获取形式</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <el-radio v-model="radios" label="1" @change="radioq">收费</el-radio>
                                <span class="money">￥</span><el-input placeholder="0.01-50000" v-model="input3" :disabled="disabled"></el-input><br><br><br>
                                <div style="display:inline-block" class="hxj"><span>划线价<span class="bt"><br>&nbsp;&nbsp;(必填)</span></span></div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="money">￥</span><el-input placeholder="0.01-50000" v-model.number="input4" :disabled="disabled"></el-input><br><br><br>
                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-radio v-model="radios" label="2" @change="radioq">免费</el-radio>
                                 <el-radio v-model="radio1" label="1">所有人免费</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-radio v-model="radio1" label="2">会员免费</el-radio><br><br><br>
                                  <el-button type="primary">保存</el-button>
                             </div>
                          </div>
                  </el-main>
                     <!-- 弹窗 -->
            <el-dialog title="选择分类" :visible.sync="delVisible" width="600px" center style="z-index: 999">     
                <div class="del-dialog-cnt">      
                    <div class="gray">
                      注意：包含以下级分类的项目不可选择
                    </div><br>
                    <div class="Choice">
                        <ul>
                          <li v-for="(item,index) in Choice" :key="index"><el-radio v-model="radio2" :label="item.id">{{item.class}}</el-radio><br></li>
                        </ul>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delVisible = false">取 消</el-button>
                    <el-button type="primary" >保 存</el-button>
                </span>
            </el-dialog>
        </div>    
    </template>
    <script>
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
    export default {
        data(){
            return{
                input:'',        // 课程名称
                input1:'',       // 章节标题1
                input2:'',       // 章节标题2
                input3:'',       // 收费价格
                input4:'',       // 划线价
                imageUrl: '',    // 课程封面
                imageUrl1:'',    // 详情封面
                textarea:'',     // 课程简介
                radio: '1',      // 上架时间
                radios: '2',     // 获取形式
                radio1:'1',      // 免费
                radio2:'1',      // 选择分类
                disabled:true,   // 是否禁用
                list: [{
                    name: '1-1  导语（试读）',
                },
                {
                    name: '1-2  大佬教你怎样创业（试读）',

                },{
                    name: '1-3  大佬教你怎样创业（试读）',
                }], 
                delVisible:false,
                radio:'1',
                Choice:[{
                  class:'餐饮行业',
                  id:'1'
                },
                {
                  class:'运营工作',
                  id:'2'
                }]
                
                }
            },
        created () {
      },
        methods:{
      //刷新页面
      switchss(){
        this.$router.go(0)
      },
      //判断如果选择收费，输入框可以输入
      radioq(val){
        let that = this
        if (val == "1") {
          this.disabled = false;
          that.radio1 = ''
        }else{
          this.disabled = true;
          that.radio1 = '1'
          this.input3 = ''
          this.input4 = ''
        }
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //弹窗
      Popup(){
        this.delVisible =true
      },
     
        },
        components:{
            sidebar,
            Header
        }
    }
    </script>
    <style scoped>
 .box{background: #f5f5f5;width: 1650px;}
 .title{padding: 20px;}
 .cont li{width: 300px;height: 200px;background:#F4F4F4 100%;float: left;margin-right: 20px;text-align: center;display: flex;justify-content: center;align-items: center;}
 .bq{width: 60px;height: 24px;line-height: 20px;border-radius: 1px;text-align: center;border: 1px solid rgba(0, 101, 255, 1);color: #0065FF;font-size: 14px;margin-left: 10px;}
 .el-tabs__item{padding: 0 50px;}.el-input{width: auto;}.icon{width: 6px;height: 17px;background: blue;float: left;margin-top: 3px;}
 .title{width: auto;display: block}.title span{margin-left: 10px;}
 .name{font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);margin-right: 15px;}
 .number{font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
 .text{font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);display: inline;}
 .course{font-size:18px;font-family:PingFangSC-Medium;font-weight:700;color:rgba(51,51,51,1);}
 .imgText{font-size:18px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(153,153,153,1);}
 .avatar-uploader-icon {font-size: 28px;color: #8c939d;width: 178px;height: 178px;line-height: 132px;text-align: center;background:rgba(251,251,251,1);border: 1px dashed #d9d9d9;width:176px;height:132px;margin-left: 70px;}
 .avatar-uploader-icon:hover{border-color: #409EFF;}.avatar {width: 178px;height: 178px;display: block;}
 .update{font-size: 28px;color: #8c939d;width:275px!important;height: 178px;line-height: 132px;text-align: center;background:rgba(251,251,251,1);border: 1px dashed #d9d9d9;width:176px;height:132px;}
 .update:hover{border-color: #409EFF!important;}.inp{margin-left: 70px;width:706px;height:170px;}
 .content{padding: 20px;}.cont-tit{width:600px;height:70px;background:rgba(251,251,251,1);border:1px solid rgba(238,238,238,1);line-height: 70px;padding-left: 30px;display: inline-block;}
 .chapter{padding-right: 50px;}.inp2{margin-left: 50px;}.btn{margin-left: 40px;}.btn1{width:120px;height:50px;margin-left: 20px;}
 .table ul li{width:650px;height:60px;background:rgba(251,251,251,0);line-height: 60px;font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);padding-left: 150px;}
 .table ul li:hover{background: rgba(251,251,251,1);}
 .icons{float: right;}.icons i{width: 23px;height: 23px;cursor: pointer;}
 .cont-title{width:750px;height:70px;background:rgba(251,251,251,1);border:1px solid rgba(238,238,238,1);line-height: 70px;padding-left: 30px;display: inline-block;}
 .icona{cursor: pointer;width: 23px;height: 23px;margin-left: 150px;}.bt{color: #999999}
 .money{width:40px;height:40px;background:rgba(238,238,238,1);border:1px solid rgba(238,238,238,1);text-align: center;line-height: 40px;display: inline-block;}
 .hxj{margin-left: 100px;}.gray{height:50px;background:rgba(251,251,251,1);line-height: 50px;font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);padding-left: 30px;}
 .Choice ul li{background:rgba(255,255,255,1);border:1px solid rgba(238,238,238,1);height:15px;padding: 20px;}
 /deep/ .el-dialog__header{text-align: left;}
 /deep/ .el-dialog__title{font-size: 16px;}
</style>