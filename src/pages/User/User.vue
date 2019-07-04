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
                            <el-tabs v-model="activeName" >
                                <el-tab-pane label="我的用户" name="first">
                                    <span class="search">用户搜索</span><el-input placeholder="请输入手机号" v-model="input" clearable class="inp1"></el-input>
                                    <span >是否会员</span>
                                    <el-select v-model="value" clearable placeholder="请选择" class="vip">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <span>付费客户筛选</span>
                                    <el-select v-model="value1" clearable placeholder="请选择" class="screen">
                                        <el-option
                                          v-for="item in options1"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <span>会员到期时间</span>
                                    <el-date-picker
                                        v-model="value2"
                                        type="date"
                                        placeholder="结束时间">
                                    </el-date-picker>
                                    <el-button type="primary" @click="getdataphone()">搜索</el-button><br><br><br>

                                    <el-table
                                            ref="multipleTable"
                                            :data="list"
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            :header-cell-style="{background:'#f5f5f5',color:'#000'}"
                                            @selection-change="changeFun">
                                            <el-table-column
                                            type="selection"
                                            width="55">
                                            </el-table-column>
                                            <el-table-column
                                            label="用户"
                                            width="250">
                                            <template slot-scope="scope" >
                                                <img :src="scope.row.ex3" alt="" style="width: 50px;height: 50px">
                                                 <span>{{scope.row.businessName}}</span>
                                            </template>
                                            </el-table-column>
                                            <el-table-column
                                            prop="businessPhone"
                                            label="手机号"
                                            width="250">
                                            </el-table-column>
                                            <el-table-column
                                            prop="businessRegisterTime"
                                            label="注册时间"
                                            show-overflow-tooltip>
                                            </el-table-column>
                                            <el-table-column
                                            prop="businessLoginTime"
                                            label="最后登录时间"
                                            show-overflow-tooltip>
                                            </el-table-column>
                                            <el-table-column
                                            prop="businessConsumption"
                                            label="消费总金额"
                                            show-overflow-tooltip>
                                            </el-table-column>
                                            
                                            <el-table-column
                                            fixed="right"
                                            label="操作"
                                            width="200">
                                            <template slot-scope="scope">
                                              <el-button  type="text" size="small" @click="handleClicks(scope.row)" @click.native.prevent="deleteRow(scope.$index, list)">加入黑名单</el-button>
                                            </template>
                                          </el-table-column>
                                        </el-table><br><br>
                                        <el-button @click="getdatadel">加入黑名单</el-button>
                                </el-tab-pane>                   
                              </el-tabs>
                        </el-main>
                    </el-container>
                </el-container>
        </div>    
    </template>
    <script>
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
import {user} from 'api/userAjax';
import {ssuser} from 'api/userAjax';
import {singledel} from 'api/userAjax';
import {deluser} from 'api/userAjax';
    export default {
        data(){
            return{
                activeName: 'first',
                options: [{
                value: '2',
                label: '是'
                }, {
                value: '1',
                label: '否'
                }],
                options1: [{
                value: '选项1',
                label: '有'
                }, {
                value: '选项2',
                label: '无'
                }],
                value: '',  //是否会员
                value1:'',   //是否付费
                value2:'',   //会员到期时间
                input:'',    //手机号
                list:[],     //请求后的值
                userid:[],   //单条加入黑名单
                checkBoxData: [],    //多选框选择的值
                number:[],
                number1:''
                }
            },
            // computed: {
            //   ...mapGetters({
            //     ex2: 'ex2'
            //   })
            // },
        created () {
          this.getdata();
      },
        methods:{
      // 展示
        getdata () {
        user("1").then(res => {
           this.list = res.data.date
           console.log(this.list)
      })
    },
    // 搜索
        getdataphone () {
           ssuser("3",this.input,this.value,this.value1,this.value2).then(res => {
           this.list = res.data.date
      })        
      // let url = "http://192.168.0.106:8081/business/selectBySearch"
      // let params = {
      //     ex2:"3",
      //     businessPhone:this.input,   // 手机号
      //     businessStatus:this.value,          //是否会员
      //     businessConsumption:this.value1,     //是否付费
      //     memberEndTime:this.value2,         //会员到期时间
      // }
      // this.$axios({url,params})
      //   .then(res => {
      //    console.log(res.data.date)
      //   })
    },
    // 多条删除
    getdatadel () {
        singledel(this.number1).then(res => {
        // this.list = res.data.date
        console.log(res)
        this.getdata();
      })  
      // console.log(this.number1)
      // let url = "http://192.168.0.106:8081/business/immigrant2"
      // let params = {
      //   businessId:this.number1
      // }
      // this.$axios({
      //   url,
      //   params
      // }).then(res => {
      //    console.log(res)
      //   })
    },

    // 单条删除
    handleClicks(row) {
       this.userid = row.businessId
        deluser(this.userid).then(res => {
        // this.list = res.data.date
        console.log(res)
      })  
      },
    changeFun(val) {
      let aa
      this.checkBoxData = val;
      for (let i = 0; i < this.checkBoxData.length; i++) {
        this.number.push(this.checkBoxData[i].businessId)
        aa = this.number.join(",")
        new Set(aa);
        this.number1 = aa
      }
  },
    checkBox(){
      console.log(this.number)
    },
    deleteRow(index, rows) {
        rows.splice(index, 1);
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
 .el-tabs__item{padding: 0 50px;}.el-input{width: auto;}.icon{width: 6px;height: 17px;background: blue;float: left;margin-top: 3px;}
 .title{width: auto;display: block}.title span{margin-left: 10px;}.search{margin-right: 20px;}.inp1{margin-right: 40px;}.vip{margin-right: 40px;}
 .screen{margin-right: 40px;}
</style>