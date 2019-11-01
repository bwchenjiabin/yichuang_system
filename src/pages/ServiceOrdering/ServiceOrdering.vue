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
                                <h4>服务订购</h4><br><br><br>
                                <div class="OrderHeader">
                                  <div class="search-inner">
                                      <span class="search" style="margin-right: 32px;">搜索:&nbsp;</span><el-input placeholder="搜索订单" v-model="input" clearable class="search-inp"></el-input>
                                  </div>
                                    <!-- <span class="search" style="margin-left: 20px;">订单状态:</span>
                                    <el-select v-model="value" clearable placeholder="全部状态" class="vip" @change="changes">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>                                                   
                                    <br><br> -->
                                         <span class="search">商品类型:</span>
                                    <el-select v-model="value1" clearable placeholder="全部状态" class="vip" @change="changes1">
                                        <el-option
                                          v-for="item in options1"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select><br><br>
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
                                    </el-date-picker><br><br>
                                    <span class="search">订单类型:</span>
                                    <el-select v-model="value4" clearable placeholder="全部状态" class="vip" @change="changes2">
                                        <el-option
                                          v-for="item in options2"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-button type="primary" @click="orderSearchs">搜索</el-button>

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
                                            label="商品名称"
                                            >
                                              <template slot-scope="scope">
                                                <span>{{scope.row.orderType==4?"壹创币":"系统续费"}}</span>
                                              </template>
                                            </el-table-column>
                                            <el-table-column
                                            prop="payAmount"
                                            label="单价"
                                            >
                                            </el-table-column>
                                            <!-- <el-table-column
                                            prop=""
                                            label="数量"
                                            show-overflow-tooltip>
                                            </el-table-column> -->
                                            <el-table-column
                                            prop="orderAmount"
                                            label="实付款"
                                            show-overflow-tooltip>
                                            </el-table-column>
                                            <el-table-column
                                            label="支付方式"
                                            show-overflow-tooltip>
                                            <template slot-scope="scope" >
                                             <span>{{scope.row.payType==1?'微信支付':scope.row.payType== 2 ? '支付宝支付':''}}</span>
                                          </template>
                                            </el-table-column>
                                            <el-table-column
                                            label="订单状态"
                                            show-overflow-tooltip>
                                            <template slot-scope="scope" >
                                             <span>{{scope.row.orderStatus==1?"待支付":scope.row.orderStatus==2?"已付款":scope.row.orderStatus==3?"已关闭":''}}</span>
                                          </template>
                                            </el-table-column>
                                            <el-table-column
                                            fixed="right"
                                            label="操作">
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
                                            :total="this.ordersize"></el-pagination>    
                        </el-main>
                    </el-container>
                </el-container>

                <!-- 弹窗 -->
                <el-dialog title="订单详情" :visible.sync="delVisible" width="500px" center style="z-index: 999;text-align: left" >
                                            
              <div class="del-dialog-cnt"><ul>
                  <li v-if="details">
                      <span class="Order">商品名称</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{details.orderType==4?"壹创币":"系统续费"}}</span><br><br>
                      <span class="Order">订单编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{details.orderNumber}}</span><br><br>
                      <span class="Order">支付订单号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{details.escrowTradeNo}}</span><br><br>
                      <span class="Order">创建时间</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{details.payTime}}</span><br><br>
                      <span class="Order">成交时间</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{details.payEndTime}}</span><br><br>
                      <span class="Order">支付方式</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{details.payType==1?'微信支付':details.payType== 2 ? '支付宝支付':''}}</span><br><br>
                      <span class="Order">订单状态</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{details.orderStatus==1?"待支付":details.orderStatus==2?"已付款":details.orderStatus==3?"已关闭":''}}</span><br><br>
                      <span class="Order">商品规格</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{details.sysProduct.num}}{{details.orderType==4?"个":"年"}}</span><br><br>
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
import {service} from 'api/userAjax';
import {SearchPay} from 'api/userAjax';
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
                options1: [{
                value: '4',
                label: '短书币'
                },{
                value: '5',
                label: '系统续费'
                }],
                options2: [{
                value: '1',
                label: '微信'
                },{
                value: '2',
                label: '支付宝'
                }],
                value: '',
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                change:'',
                change1:'',
                change2:'',
                currentPage: 1, //图文当前页
                ordersize:0,
                pagesize: 5,
                loading:true,
                details: null,
            delVisible:false,
            list:[],
            ordernum:[]
                }
            },
        created () {
          this.reload();
          this.getdata();
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
      this.getdata();
          },
    changes1(val){
      this.change1 = val;
      this.getdata();
          },
    changes2(val){
      this.change2 = val;
      this.getdata();
          },
  // 初始化回到顶部
      reload() {
     $('body,html').animate({scrollTop:0},200);
    },
      // 展示
      getdata () {
        service(localStorage.getItem('ex2'),this.currentPage,this.change2,this.change1,this.input,this.value2,this.value3).then(res => {
           this.list = res.data.data.data;
           this.ordersize = res.data.data.total
           this.loading = false;
      })
    },   
    // 订单详情
      getdatad () {
        SearchPay(this.ordernum).then(res => {
           this.details = res.data.data
      })
    },
    // 订单搜索
      orderSearchs () {
        service(localStorage.getItem('ex2'),this.currentPage,this.change2,this.change1,this.input,this.value2,this.value3).then(res => {
            this.list = res.data.data.data;
           this.ordersize = res.data.data.total
      })
    },
    //通过状态查询订单
      orderSearchss () {
        service(localStorage.getItem('ex2'),this.currentPage,this.change2,this.change,this.change1,this.input,this.value2,this.value3).then(res => {
           this.list = res.data.data.data;
           this.ordersize = res.data.data.total
           if (res.data.code == "0000") {
              this.$message.success("搜索成功")                 
           }else{
             return;
           }      
      })
    },
      open(row) {
        this.ordernum = row.itemId
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
