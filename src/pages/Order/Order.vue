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
                                <h4>订单管理</h4><br><br><br>
                                    <span class="search">搜索</span><el-input placeholder="搜索订单" v-model="input" clearable class="inp1"></el-input>
                                    <span class="search">订单状态</span>
                                    <el-select v-model="value" clearable placeholder="全部状态" class="vip">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>

                                    <span class="search">交易时间</span>
                                    <el-date-picker
                                    v-model="value2"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                    </el-date-picker>
                                    <el-button type="primary">搜索</el-button><br><br><br>
                                    
                                    <el-table
                                            ref="multipleTable"
                                            :data="list"
                                            tooltip-effect="dark"
                                            order: string
                                            style="width: 100%"
                                            :header-cell-style="{background:'#f5f5f5',color:'#000'}">
                                                         
                                            <el-table-column
                                            type="selection"
                                            width="55">
                                            </el-table-column>
                                            <el-table-column
                                            label="商品"
                                            width="250">
                                            <template slot-scope="scope" >
                                                <i class="img-box"><img :src="scope.row.lesson.img" alt=""></i>
                                                 <span class="name">{{scope.row.lesson.lessonName}}</span><br>
                                                 <span class="money">￥{{scope.row.lesson.lessonPriceFormer}}</span>
                                            </template>
                                            </el-table-column>
                                            <el-table-column
                                            prop="businessUser.businessName"
                                            label="买家"
                                            width="250">
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
                                            </el-table-column>
                                            <el-table-column
                                            prop="consumption"
                                            label="总价格"
                                            show-overflow-tooltip>
                                            <template slot-scope="scope" >
                                              ￥{{scope.row.lesson.lessonPriceNow}}
                                          </template>
                                            </el-table-column>
                                            <el-table-column
                                            fixed="right"
                                            label="操作"
                                            width="200">
                                            <template slot-scope=""  >
                                              <el-button type="text" size="small" @click="open">查看详情</el-button>
                                            </template>
                                          </el-table-column>
                                         

                                          
                                        </el-table><br><br>
                        </el-main>
                    </el-container>
                </el-container>

                <!-- 弹窗 -->
                <el-dialog title="订单详情" :visible.sync="delVisible" width="500px" center style="z-index: 999;text-align: left">
                                            
              <div class="del-dialog-cnt"><ul>
                  <li v-for="(item,index) in details" :key="index">
                      <span class="Order">订单编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{item.number}}</span><br><br>
                      <span class="Order">支付订单号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{item.Order}}</span><br><br>
                      <span class="Order">支付流水号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{item.Pipeline}}</span><br><br>
                      <span class="Order">创建时间</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{item.build}}</span><br><br>
                      <span class="Order">成交时间</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{item.Deal}}</span><br><br>
                     
                  </li></ul></div>
              <span slot="footer" class="dialog-footer">

                  <el-button type="primary"  @click="Close">确 定</el-button>

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
                activeName: 'first',
                input:'',
                options: [{
                value: '选项1',
                label: '全部状态'
                }, {
                value: '选项2',
                label: '已关闭'
                },{
                value: '选项3',
                label: '已付款'
                },{
                value: '选项4',
                label: '已完成'
                }],
                value: '选项1',
                value2: '',
                tableData: [{
            date: '../../../static/img/微信图片_20190611141523.jpg',
            names:'江南',
            name: '王小虎',
            address: '2019-02-25',
            zt:'显示',
            consumption:'100'
          }, {
            date: '../../../static/img/微信图片_20190611141523.jpg',
            name: '王小虎',
            address: '2019-02-25',
            zt:'显示',
            consumption:'500'
          }, {
            date: '../../../static/img/微信图片_20190611141523.jpg',
            name: '王小虎',
            address: '2019-02-25',
            zt:'显示',
            consumption:'200'
          }, {
            date: '../../../static/img/微信图片_20190611141523.jpg',
            name: '王小虎',
            address: '2019-02-25',
            zt:'显示',
            consumption:'100'
          }],
          details: [{
            number: '49876524789645163418541541',
            Order:'298765789244555',
            Pipeline: '4978784456484654548',
            build : '2019-02-25',
            Deal:'2018-02-03'
          }],
            delVisible:false,
            list:[] 
                }
            },
        created () {
          this.getdata();
      },
        methods:{
      // 展示
      getdata () {
      let url = "http://192.168.0.111:8081/order/select"
      let params = {
          ex2:"1"
      }
      this.$axios({
        url,
        params
      }).then(res => {
         this.list = res.data
         console.log(this.list)
        })
    },
      open() {
              this.delVisible = true;      
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
 .el-tabs__item{padding: 0 50px;}.el-input{width: auto;}.icon{width: 6px;height: 17px;background: blue;float: left;margin-top: 3px;}
 .title{width: auto;display: block}.title span{margin-left: 10px;}.search{margin-right: 20px;}.inp1{margin-right: 40px;}.vip{margin-right: 40px;}
 .screen{margin-right: 40px;}
 .name{width:111px;height:40px;font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height:24px;display: inline-block;position: absolute;top: 20px;}
 .img-box{width: 100px;height: 75px;;display: inline-block;}.img-box img{width: 100%;height: 100%;}
 .money{width:34px;height:12px;font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);line-height:24px;}
 .number{width: 300px;text-align: left;display: inline-block;}
 .Order{width: 80px;display: inline-block;}
</style>