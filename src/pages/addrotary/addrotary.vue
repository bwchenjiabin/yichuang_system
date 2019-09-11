<template>
        <div class="box">
                <el-container>
                    <el-header>
                        <Header></Header>
                    </el-header>
                    <el-container>
                        <el-aside width="200px">
                            <sidebar></sidebar>
                        </el-aside>
                        <el-main>
                            <div>
                                <router-link to="/rotary"><span class="course">轮播图</span>&nbsp;&nbsp;&nbsp;</router-link>/&nbsp;&nbsp;&nbsp;<span class="imgText">新增轮播</span><br><br>
                                <div class="title">
                                    <i class="icon"></i>
                                    <span>基本信息</span><br><br><br>
                                    <span class="name">轮播图名称</span>
                                    <el-input placeholder="请输入名称，最多不超过12个字" v-model="input" clearable maxlength="12"> 
                                    </el-input>
                                    <span class="number">{{this.input.length}}/12</span><br><br><br>
                                    <span class="name">上传图片</span>
                                <p class="text">240*180像素，支持PNG、JPG、GIF格式，小于5M</p><br><br>

                               <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess"
                                  :before-upload="beforeAvatarUpload">
                                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                  <i v-else class="el-icon-plus avatar-uploader-icon update"></i>
                               </el-upload><br><br>
                               <span class="name">跳转设置</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                               <el-radio v-model="radios" label="1" @change="radioq">跳转到</el-radio> <el-button plain @click="Popup" :disabled="disabled">选择</el-button><br><br><br>
                               <el-radio v-model="radios" label="2" class="radio" @change="radioq">无跳转</el-radio><br><br><br>
                               <el-button type="primary" @click="keep">保存</el-button>
                                </div>
                            </div>
                        </el-main>
                    </el-container>
                </el-container>
                    <!-- 弹窗 -->
            <el-dialog title="" :visible.sync="delVisible" width="550px" center style="z-index: 999" :close-on-click-modal="false">     
                <div class="del-dialog-cnt">      
                    <div class="tab">
                       <el-tabs v-model="activeName">
                        <el-tab-pane label="课程" name="courser">
                            <el-tabs :tab-position="tabPosition" style="height:300px;overflow:auto;position:relative" v-model="courser">
                                <el-tab-pane label="图文" name="imgText">
                                  <el-table
                                    @current-change="handleCurrentChange"
                                    @cell-click="handle"
                                    ref="singleTable"
                                    :data="tableData"
                                    highlight-current-row
                                    style="width: 100%">
                                    <el-table-column
                                    type="index"
                                    width="50">
                                    </el-table-column>
                                    <el-table-column
                                    property="name"
                                    label="名称"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    property="date"
                                    label="创建时间"
                                    width="120">
                                    </el-table-column>
                                </el-table>
                                </el-tab-pane>


                                <el-tab-pane label="音频" name="audio">

                                     <el-table
                                    @current-change="handleCurrentChange"
                                    @cell-click="handle"
                                    ref="singleTable"
                                    :data="tableData1"
                                    highlight-current-row
                                    style="width: 100%">
                                    <el-table-column
                                    type="index"
                                    width="50">
                                    </el-table-column>
                                    <el-table-column
                                    property="name"
                                    label="名称"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    property="date"
                                    label="创建时间"
                                    width="120">
                                    </el-table-column>
                                </el-table>

                                </el-tab-pane>
                                
                                <el-tab-pane label="视频" name="video">

                                <el-table
                                    @current-change="handleCurrentChange"
                                    @cell-click="handle"
                                    ref="singleTable"
                                    :data="tableData2"
                                    highlight-current-row
                                    style="width: 100%">
                                    <el-table-column
                                    type="index"
                                    width="50">
                                    </el-table-column>
                                    <el-table-column
                                    property="name"
                                    label="名称"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    property="date"
                                    label="创建时间"
                                    width="120">
                                    </el-table-column>
                                </el-table>

                                </el-tab-pane>
                            </el-tabs>
                        </el-tab-pane>
                        <el-tab-pane label="内容分类" name="sort">
                            <div class="Choice">
                                <ul>
                                    <li v-for="(item,index) in Choice" :key="index"><el-radio v-model="radio2" :label="item.id">{{item.class}}</el-radio><br></li>
                                </ul>
                            </div>
                        </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer"> 
                    <el-button @click="delVisible = false">取 消</el-button>
                    <el-button type="primary"  :disabled ="disab">保 存</el-button>
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
                input:'',
                imageUrl:'',
                radios:'1',
                delVisible:false,
                activeName: 'courser',  //默认选择
                radio2:'1',      // 选择分类
                tabPosition: 'left',   // 方向
                courser:'imgText',    //默认选择
                currentRow:null, 
                disab:true,    //按钮禁用
                disabled:false,   //按钮禁用
                Choice:[{
                  class:'餐饮行业',
                  id:'1'
                },
                {
                  class:'运营工作',
                  id:'2'
                }],
                tableData: [{
                    date: '2016-05-02',
                    name: '陈泳景是个弟弟',
                }, {
                    date: '2016-05-04',
                    name: '陈泳景是个弟弟',
                }, {
                    date: '2016-05-01',
                    name: '陈泳景是个弟弟',
                }, {
                    date: '2016-05-03',
                    name: '陈泳景是个弟弟',
                },{
                    date: '2016-05-02',
                    name: '陈泳景是个弟弟',
                },{
                    date: '2016-05-02',
                    name: '陈泳景是个弟弟',
                },{
                    date: '2016-05-02',
                    name: '陈泳景是个弟弟',
                },],
                tableData1: [{
                    date: '2018-05-02',
                    name: '李伟晨',
                }, {
                    date: '2017-05-04',
                    name: '李伟晨',
                }, {
                    date: '2011-05-01',
                    name: '李伟晨',
                }, {
                    date: '2010-05-03',
                    name: '李伟晨',
                }],
                tableData2: [{
                    date: '1998-05-02',
                    name: '阿萨德',
                }, {
                    date: '1997-05-04',
                    name: '通过大润发',
                }, {
                    date: '1996-05-01',
                    name: '体育',
                }, {
                    date: '1958-05-03',
                    name: '热土',
                }]

                }
                },
        created () {
      },
        methods:{
        keep(){

           if (this.activeName == "courser") {
           console.log(this.activeName);
           console.log(this.courser);       
           }else{
           console.log(this.activeName);
           console.log(this.radio2)
           }

        },
        radioq(val){
        let that = this
        if (val == "1") {
          this.disabled = false;
        }else{
          this.disabled = true;
        }
      },
            handle(row, event, column){
                if (this.currentRow != "") {
                    this.disab = false;
                }
            },
 handleCurrentChange(val) {
        this.currentRow = val;
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
 .box{background: #f5f5f5;}
  .course{font-size:18px;font-family:PingFangSC-Medium;font-weight:700;color:rgba(51,51,51,1);}
 .imgText{font-size:18px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(153,153,153,1);}
 .title{padding: 20px;}
 .cont li{width: 300px;height: 200px;background:#F4F4F4 100%;float: left;margin-right: 20px;text-align: center;display: flex;justify-content: center;align-items: center;}
 .bq{width: 60px;height: 24px;line-height: 20px;border-radius: 1px;text-align: center;border: 1px solid rgba(0, 101, 255, 1);color: #0065FF;font-size: 14px;margin-left: 10px;}
 .el-tabs__item{padding: 0 50px;}.el-input{width: auto;}.icon{width: 6px;height: 17px;background: blue;float: left;margin-top: 3px;}
 .title{width: auto;display: block}.title span{margin-left: 10px;}
  .avatar-uploader-icon {font-size: 28px;color: #8c939d;width: 275px;height: 132px;line-height: 132px;text-align: center;background:rgba(251,251,251,1);border: 1px dashed #d9d9d9;margin-left: 70px;}
 .avatar-uploader-icon:hover{border-color: #409EFF;}.avatar {width: 178px;height: 178px;display: block;}
  .name{font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);margin-right: 15px;}
 .number{font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
 .text{font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);display: inline;}
 .Choice ul li{background:rgba(255,255,255,1);border:1px solid rgba(238,238,238,1);height:15px;padding: 20px;}
 .radio{margin-left: 125px;}
</style>