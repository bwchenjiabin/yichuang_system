<template>
    <el-scrollbar style="height:100%">
       <div class="box">
                <el-container>
                    <el-header style="    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 20px -10px #000;">
                        <Header></Header>
                    </el-header>
                    <el-container>
                        <el-aside width="200px">
                            <sidebar></sidebar>
                        </el-aside>
                        <el-main>
                                <h4>我的直播</h4><br><br><br>
                                <div class="OrderHeader">
                                  <div class="search-inner">
                                    <span class="search" style="margin-right: 32px;">搜索:&nbsp;</span><el-input placeholder="搜索" v-model="input" clearable class="search-inp"></el-input>
                                  </div>
                                      
                                   <span class="search" style="margin-left:20px;">直播类型:</span><el-select v-model="value1" clearable placeholder="全部类型" class="vip" @change="changes1">
                                        <el-option
                                          v-for="item in options1"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select><br><br>
                                    <span class="search">直播状态:</span>
                                    <el-select v-model="value" clearable placeholder="全部状态" class="vip" @change="changes">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select> 
                                    <span class="search">上架时间:</span>                                               
                                    <!-- <el-date-picker
                                    v-model="value2"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    range-separator="至"
                                    placeholder="开始日期">
                                    </el-date-picker> -->
                                    <el-date-picker
                                      v-model="value2"
                                      type="datetime"
                                      range-separator="至"
                                      placeholder="开始日期"
                                      format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                      align="right"
                                      :picker-options="pickerOptions">
                                    </el-date-picker>
                                    至
                                     <!-- <el-date-picker
                                    v-model="value3"
                                    type="date"
                                    range-separator="至"
                                    value-format="yyyy-MM-dd"
                                    placeholder="结束日期">
                                    </el-date-picker> -->
                                    <el-date-picker
                                      v-model="value3"
                                      type="datetime"
                                      range-separator="至"
                                      placeholder="结束日期"
                                      format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                      align="right"
                                      :picker-options="pickerOptions">
                                    </el-date-picker>
                                    <el-button type="primary" @click="search">搜索</el-button>
                                    <el-button type="primary" @click="opens">新增直播</el-button>
                                </div>
                            <br><br><br>
                                    <el-table
                                            v-loading="loading"
                                            ref="multipleTable"
                                            :data="list"
                                            tooltip-effect="dark"
                                            order: string
                                            style="width: 100%"
                                            :header-cell-style="{background:'#f5f5f5',color:'#000'}">
                                              <el-table-column
                                            label="直播封面">
                                            <template slot-scope="scope">
                                                <i class="img-box">
                                                  <img :src="'http://yckt.yichuangketang.com:8081'+scope.row.image" alt />
                                                </i>
                                            </template>
                                            </el-table-column>
                                              <el-table-column
                                            prop="title"
                                            label="直播名称">
                                            </el-table-column>
                                            <!-- <el-table-column
                                            label="直播状况"
                                            >
                                              <template slot-scope="scope">
                                                <span>{{scope.row.orderType==4?"壹创币":"系统续费"}}</span>
                                              </template>
                                            </el-table-column> -->
                                            <el-table-column
                                            prop="payAmount"
                                            label="直播类型"
                                            >
                                             <template slot-scope="scope">
                                                <!-- <span>{{scope.row.opentype==1?"语音":"PPT"}}</span> -->
                                                <span>{{scope.row.opentype==1?'语音':scope.row.opentype== 2 ? 'PPT':''}}</span>
                                              </template>
                                            </el-table-column>

                                            <el-table-column
                                            prop="lookcount"
                                            label="访客数"
                                            show-overflow-tooltip>
                                            </el-table-column>
                                            <el-table-column
                                            prop="buycount"
                                            label="销量"
                                            show-overflow-tooltip>
                                            <!-- <template slot-scope="scope" >
                                             <span>{{scope.row.payType==1?'微信支付':scope.row.payType== 2 ? '支付宝支付':''}}</span>
                                          </template> -->
                                            </el-table-column>
                                            <el-table-column
                                            label="状态"
                                            show-overflow-tooltip>
                                            <template slot-scope="scope" >
                                             <span>{{scope.row.status==0?"未开播":scope.row.status==1?"开播中":scope.row.status==2?"已结束":''}}</span>
                                          </template>
                                            </el-table-column>
                                            <el-table-column
                                            fixed="right"
                                            label="操作">
                                            <template slot-scope="scope"  >
                                              <el-button type="text" size="small" @click="open(scope.row.id)">修改</el-button>
                                              <el-button type="text" size="small" @click="deletes(scope.row)">删除</el-button>
                                              <el-button type="text" size="small" @click="manage(scope.row.id)">管理讲师</el-button>
                                            </template>
                                          </el-table-column>                
                                        </el-table><br><br>
                                        <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="current_change"
                                            @current-page="currentPage"
                                            :page-size="pagesize"
                                            background
                                            layout="total, prev, pager, next"
                                            :total="this.ordersize"></el-pagination>    
                        </el-main>
                    </el-container>
                </el-container>
            <!-- 新增直播 -->
           <el-dialog title="选择直播类型" :visible.sync="delVisiblee" width="600px" center style="z-index: 999;" :close-on-click-modal="false">     
                <div class="del-dialog-cnt" > 
                   <div class="select-list">
                      <div class="select-item" v-for="(item,index) in selectlist" :key="index">
                          <div :class = "active == index ? 'type-item-select' : '' " @click='dowm(index)'></div>
                            <img :src="item.icon" alt="">
                            <span>{{item.name}}</span>
                      </div>
                   </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delVisiblee = false">取 消</el-button>
                    <el-button type="primary" @click="Live">确 定</el-button>
                </span>
            </el-dialog>
        <!-- 单条删除提示 -->
    <el-dialog title="提示" :visible.sync="delVisiblelive" width="300px" center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt" style="text-align:center">确定要删除该直播吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisiblelive = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow()">确 定</el-button>
      </span>
    </el-dialog>
        <!-- 讲师管理 -->
    <el-dialog title="讲师管理" :visible.sync="delVisibles" width="800px" center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt" style="text-align:center">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="邀请讲师" name="first">
               <div class="buttons">
                <el-button style="margin-left:22px;" @click="Popup" class="sort">添加人员</el-button>
                <span
                  style="font-size:16px;font-weight:400;color:rgba(153,153,153,1);margin-left:25px;"
                >添加用户成为讲师</span>
              </div>
              <br />
              <br />
              <div class="list">
                <el-table :data="checkBoxDatas" style="width: 100%">
                  <el-table-column label="用户头像" >
                    <template slot-scope="scope">
                      <i class="img-box">
                        <img :src="scope.row.businessUser.ex3" alt />
                      </i>
                    </template>
                  </el-table-column>
                  <el-table-column prop="businessUser.businessName" label="用户名称" ></el-table-column>
                  <el-table-column label="操作"  width="100">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="handleDelete(scope.row.id)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="二维码邀请" name="second">
              <img :src="'http://yckt.yichuangketang.com:8081'+url" alt="">
            </el-tab-pane>
          </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delVisibles = false">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 弹窗 -->
    <el-dialog
      title="添加人员"
      :visible.sync="delVisible"
      width="800px"
      center
      style="z-index: 999"
      :close-on-click-modal="false"
    >
      <div class="del-dialog-cnt">
        <div class="gray">
          <el-input placeholder="搜索关键词" v-model="inputsearch" clearable class="search-inp"></el-input>
          <el-button type="primary" @click="liveSearchs">搜索</el-button>
        </div>
        <br/>
        <div class="Choice">
          <el-table :data="lists" @selection-change="changeFun" style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="用户头像">
              <template slot-scope="scope">
                <i class="img-boxs">
                  <img :src="scope.row.ex3" alt />
                </i>
              </template>
            </el-table-column>
            <el-table-column prop="businessName" label="用户名称"></el-table-column>
          </el-table>
          <br />
          <br />
          <el-pagination
            @size-change="handleSizeChanges"
            @current-change="current_changes"
            @current-page="currentPages"
            :page-size="pagesize"
            background
            layout="total, prev, pager, next"
            :total="this.usersize"
          ></el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="delVisible = false,assignment()">保 存</el-button>
      </span>
    </el-dialog>
        </div>   
    </el-scrollbar>
        
    </template>
    <script>
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
import {selectlive} from 'api/userAjax';
import {dellive} from 'api/userAjax';
import { user } from "api/userAjax";
import { serchuser } from "api/userAjax";
import { editlive } from "api/userAjax";
import { addlecturer } from "api/userAjax";
import { dellecturer } from "api/userAjax";
import { invitelecturer } from "api/userAjax";

    export default {
        data(){
            return{
                activeName: 'first',
                input:'',
                options: [{
                value: '0',
                label: '未开始'
                },{
                value: '1',
                label: '直播中'
                },{
                value: '2',
                label: '已结束'
                }],
                options1: [{
                value: '1',
                label: '语音直播'
                },{
                value: '2',
                label: 'PPT直播'
                }],
                options2: [{
                value: '1',
                label: '微信'
                },{
                value: '2',
                label: '支付宝'
                }],
                 activeName: 'first',
                value: '',
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                change:'',
                change1:'',
                inputsearch: "",
                change2:'',
                usersize: 0,
                currentPage: 1, //图文当前页
                ordersize:0,
                pagesize: 5,
                liveid:[],
                active:0,
                url:'',
                currentPages: 1,
                manageid:'',
                loading:true,
                selectlist: [{
                name: '语音直播',
                icon: 'http://yckt.yichuangketang.com:8081/img/20190817095403.png'
                },{
                name: 'PPT直播',
                icon: 'http://yckt.yichuangketang.com:8081/img/20190817095352.png'
                }],
                checkBoxDatas:[],
                checkBoxData:[],
                pickerOptions: {
                shortcuts: [{
                  text: '最近一周',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近一个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近三个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                  }
                }]
              },
                details: null,
                delVisiblee:false,
            delVisiblelive:false,
            delVisibles:false,
            delVisible:false,
            list:[],
            lists:[],
            ordernum:[]
                }
            },
        created () {
          this.reload();
          this.getdata();
          this.getdatas();
      },
        methods:{
    handleSizeChange(size) {
      this.pagesize = size;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
      this.getdatae();
    },
    changes(val){
      this.change = val;
      this.getdatae();
          },
    changes1(val){
      this.change1 = val;
      this.getdatae();
          },
    assignment() {
      addlecturer({liveid:this.manageid,ids:this.checkBoxData.join(",")}).then(res => {
          this.manages();
          this.getdatas();
          if(res.data.code == "0000"){
              this.$message.success(res.data.msg);
          }else{
              this.$message.error(res.data.msg);            
          }
      })                                        
    },
  // 初始化回到顶部
      reload() {
     $('body,html').animate({scrollTop:0},200);
    },
    handleClick(tab, event) {
      },
    changeFun(val) {
      this.checkBoxData = val.map(item => item.businessId);
    },
        // 展示
    getdatas() {
      user(localStorage.getItem("ex2"), this.currentPages).then(res => {
        this.lists = res.data.data.data;
        this.usersize = res.data.data.total;
        this.loading = false;
      });
    },
      // 展示
      getdata () {
        selectlive({accountid:localStorage.getItem('ex2'),pageNum:this.currentPage,pageSize:this.pagesize,createtimestart:this.value2,createtimeend:this.value3,opentype:this.change1,status:this.change,title:this.input}).then(res => {
           this.list = res.data.data.list;
           this.ordersize = res.data.data.total
           this.loading = false;
      })
    }, 
    getdatae () {
        selectlive({accountid:localStorage.getItem('ex2'),pageNum:this.currentPage,pageSize:this.pagesize,createtimestart:this.value2,createtimeend:this.value3,opentype:this.change1,status:this.change,title:this.input}).then(res => {
           this.list = res.data.data.list;
        this.$message.success(res.data.msg);
           this.ordersize = res.data.data.total
           this.loading = false;
      })
    },     
      search(){
      selectlive({accountid:localStorage.getItem('ex2'),pageNum:this.currentPage,pageSize:this.pagesize,createtimestart:this.value2,createtimeend:this.value3,opentype:this.change1,status:this.change,title:this.input}).then(res => {
           this.list = res.data.data.list;
        this.$message.success(res.data.msg);
           this.ordersize = res.data.data.total
           this.loading = false;
      })
          },
    liveSearchs() {
      serchuser(
        {ex2:localStorage.getItem("ex2"),
        businessName:this.inputsearch,
        pageNum:this.currentPages}
      ).then(res => {
        this.$message.success(res.data.msg);
        this.lists = res.data.data.data;
        this.usersize = res.data.data.total;
      });
    },
    deletes(res){
      this.liveid = res.id
      this.delVisiblelive = true;
    },
    manage(res){
      this.manageid = res
      this.delVisibles = true;
      this.manages();
      this.invitelecturers();
    },
    invitelecturers(){
      invitelecturer({id:this.manageid,accountid:localStorage.getItem('ex2')}).then(res => {
        this.url = res.data.data.codepath
      })
    },
    manages(){
      editlive({id:this.manageid}).then(res => {
        this.checkBoxDatas = res.data.data.liLiveMembers
      });
    },
    //弹窗
    Popup() {
      this.delVisible = true;
    },
    deleteRow(){
            dellive({id:this.liveid}).then(res => {
        this.getdata();
          this.delVisiblelive = false;
          if (res.data.code == "0000") {
            this.$message.success(res.data.msg)                  
          }else{
            this.$message.error(res.data.msg)                  
          }
      })
    },
    
    // 分页
    handleSizeChanges(size) {
      this.pagesize = size;
    },
    current_changes: function(currentPage) {
      this.currentPages = currentPage;
      this.getdatas();
    },
      open(row) {
        this.$router.push({
          path: `/editdirect`,
            query:{id:row}
          });
            },
      handleDelete(index) {
        dellecturer({id:index}).then(res => {
          this.manages();
          if (res.data.code == "0000") {
            this.$message.success(res.data.msg)                  
          }else{
            this.$message.error(res.data.msg)                  
          }
        })
    },
      opens() {
        this.delVisiblee = true;      
            },
      dowm(index){
        this.active = index
      },   
      Live(){
         this.$router.push({
          path: `/direct`,
            query:{type:this.active}
          });
      }
        },
        components:{
            sidebar,
            Header
        }
    }
    </script>
    <style scoped>
 .box{background: #f5f5f5;}
 .search{margin-right: 10px;
     text-align: left;
    font-size: 14px;
    color: #333;
    padding: 8px 6px 8px 0;}
 .search-inp{
    width: 326px;
    line-height: 30px;
    padding-left: 5px;}
    .search-inner{width: auto;display: inline-block}
 .el-tabs__item{padding: 0 50px;}.icon{width: 6px;height: 17px;background: blue;float: left;margin-top: 3px;}
 .title{width: auto;display: block}.title span{margin-left: 10px;}.inp1{margin-right: 40px;}
 .screen{margin-right: 40px;}
 .name{width:111px;height:40px;font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height:24px;display: inline-block;position: absolute;top: 20px;}
 .img-box{width: 100px;height: 75px;;display: inline-block;}.img-box img{width: 100%;height: 100%;}
 .money{width:34px;height:12px;font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);line-height:24px;}
 .number{width: 300px;text-align: left;display: inline-block;}
 .Order{width: 80px;display: inline-block;}
 .select-list{display: flex;align-items: flex-start;flex-wrap: wrap;justify-content: flex-start;}
 .select-item{
    width: 120px;
    height: 140px;
    margin-right: 20px;
    background-color: #FAFAFA;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 27px;
 }
 .select-item div{
     width: 120px;
    height: 140px;
    border-radius: 4px;
    cursor: pointer;
    position: absolute;
 }
 .type-item-select{
    border: 2px solid #0095FF;
 }
 .select-item img{
       width: 24px;
    height: 24px;
    margin-bottom: 17px;
 }
 .select-item span{
   color: #333;
    font-size: 12px;
 }
 .list {
  height: auto;
}
.img-boxs {
  width: 35px;
  height: 35px;
}
.img-boxs img {
  width: 100%;
  height: 100%;
}
.img-box {
  width: 50px;
  height: 50px;
}
.img-box img {
  width: 100%;
  height: 100%;
}
.el-scrollbar__wrap {
   overflow-x: hidden;
 }
</style>
