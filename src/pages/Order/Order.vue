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
                                <h4>订单管理</h4><br><br><br>
                                <div class="OrderHeader">
                                  <div class="search-inner">
                                      <span class="search" style="margin-right: 32px;">搜索:&nbsp;</span><el-input placeholder="搜索订单" v-model="input" clearable class="search-inp"></el-input>
                                  </div>
                                    <span class="search" style="margin-left:20px;">订单状态:</span>
                                    <el-select v-model="value" clearable placeholder="全部状态" class="vip" @change="changes">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>                                                   
                                    <br><br>
                                  <span class="search">交易时间:</span>
                                    <el-date-picker
                                    v-model="value2"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    range-separator="至"
                                    placeholder="开始日期">
                                    </el-date-picker>
                                    至
                                     <el-date-picker
                                    v-model="value3"
                                    type="date"
                                    range-separator="至"
                                    value-format="yyyy-MM-dd"
                                    placeholder="结束日期">
                                    </el-date-picker>
                                    <el-button type="primary" @click="orderSearchs" style="    margin-left: 30px;">搜索</el-button>
                                </div>
                            <br><br><br>
                                    <el-table
                                            v-loading="loading"
                                            element-loading-text="拼命加载中"
                                            ref="multipleTable"
                                            :data="list"
                                            tooltip-effect="dark"
                                            order: string
                                            style="width: 100%"
                                            :header-cell-style="{background:'#f5f5f5',color:'#000'}">
                                            <el-table-column
                                            label="商品"
                                            >
                                            <template slot-scope="scope" >
                                                <i class="img-box"><img :src="'http://yckt.yichuangketang.com'+scope.row.lesson.img" alt=""></i>
                                            </template>
                                            </el-table-column>
                                            <el-table-column
                                            prop="lesson.lessonName"
                                            label="商品名称"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                            prop="businessUser.businessName"
                                            label="买家"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                            prop="payTime"
                                            label="交易时间"
                                            show-overflow-tooltip>
                                            </el-table-column>
                                            <el-table-column
                                            prop="orderStatus"
                                            label="订单状态"
                                            show-overflow-tooltip>
                                            <template slot-scope="scope">
                                          <span>{{scope.row.orderStatus==1?"待支付":scope.row.orderStatus==2?"已完成":scope.row.orderStatus==3?"已关闭":''}}</span>
                                            </template>
                                            </el-table-column>
                                            <el-table-column
                                            prop="consumption"
                                            label="价格"
                                            show-overflow-tooltip>
                                            <template slot-scope="scope" >
                                              ￥{{scope.row.lesson.lessonPriceNow}}
                                          </template>
                                            </el-table-column>
                                            <el-table-column
                                            fixed="right"
                                            label="操作"
                                            >
                                            <template slot-scope="scope"  >
                                              <el-button type="text" size="small" @click="open(scope.row)">查看详情</el-button>
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
                                            :total="this.ordersize"
                                          ></el-pagination>    
                        </el-main>
                    </el-container>
                </el-container>

                <!-- 弹窗 -->
                <el-dialog title="订单详情" :visible.sync="delVisible" width="500px" center style="z-index: 999;text-align: left" :close-on-click-modal="false">
                                            
              <div class="del-dialog-cnt"><ul>
                  <li >
                      <span class="Order">订单编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{this.details.orderNumber}}</span><br><br>
                      <span class="Order">支付订单号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{this.details.escrowTradeNo}}</span><br><br>
                      <span class="Order">创建时间</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{this.details.payTime}}</span><br><br>
                      <span class="Order">成交时间</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{this.details.payEndTime}}</span><br><br>
                  </li></ul></div>
              <span slot="footer" class="dialog-footer">

                  <el-button type="primary"  @click="Close">确 定</el-button>

              </span>

          </el-dialog>
        </div>    
        </el-scrollbar>
    </template>
    <script>
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
import {order} from 'api/userAjax';
import {orderdeteils} from 'api/userAjax';
import {orderSearch} from 'api/userAjax';
import {orderStatus} from 'api/userAjax';
    export default {
        data(){
            return{
                activeName: 'first',
                input:'',
                options: [{
                value: '1',
                label: '待支付'
                },{
                value: '2',
                label: '已付款'
                },{
                value: '3',
                label: '已关闭'
                }],
                value: '',
                value2: '',
                value3: '',
                change:'',
                currentPage: 1, //图文当前页
                ordersize:0,
                pagesize: 5,
                loading:true,
          details: [],
            delVisible:false,
            list:[],
            ordernum:[]
                }
            },
        created () {
          this.reload();
          this.getdata();
          // this.changes();
      },
        methods:{
    handleSizeChange(size) {
      this.pagesize = size;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
      this.getdata();
    },
      changes(val){
            this.change = val;
            this.orderSearchss();
          },
  // 初始化回到顶部
      reload() {
     $('body,html').animate({scrollTop:0},200);
    },
      // 展示
      getdata () {
        order(localStorage.getItem('ex2'),this.currentPage,this.change,this.input,this.value2,this.value3).then(res => {
           this.list = res.data.list;
           this.ordersize = res.data.total
           this.loading = false;
      })
    },   
    // 订单详情
      getdatad () {
        orderdeteils(this.ordernum).then(res => {
           this.details = res.data
      })
    },
    // 订单搜索
      orderSearchs () {
        orderSearch(localStorage.getItem('ex2'),this.input,this.change,this.value2,this.value3,'1').then(res => {
          this.list = res.data.list;
           this.ordersize = res.data.total          
      })
    },
    //通过状态查询订单
      orderSearchss () {
        orderStatus(localStorage.getItem('ex2'),this.change,'1').then(res => {
          this.list = res.data.list;
           this.ordersize = res.data.total          
        this.$message.success("搜索成功")    
      })
    },
      open(row) {
        this.ordernum = row.orderNumber
        this.delVisible = true;      
        this.getdatad();
            },
      Close() {
            this.delVisible = false;
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
 .search-inp{    width: 326px;
    line-height: 30px;
    padding-left: 5px;}
    .search-inner{width: auto;display: inline-block}
 .el-tabs__item{padding: 0 50px;}.icon{width: 6px;height: 17px;background: blue;float: left;margin-top: 3px;}
 .title{width: auto;display: block}.title span{margin-left: 10px;}.inp1{margin-right: 40px;}.vip{margin-right: 40px;}
 .screen{margin-right: 40px;}
 .name{width:111px;height:40px;font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height:24px;display: inline-block;position: absolute;top: 20px;}
 .img-box{width: 100px;height: 75px;;display: inline-block;}.img-box img{width: 100%;height: 100%;}
 .money{width:34px;height:12px;font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);line-height:24px;}
 .number{width: 300px;text-align: left;display: inline-block;}
 .Order{width: 80px;display: inline-block;}
 .el-scrollbar__wrap {
   overflow-x: hidden;
 }
</style>
