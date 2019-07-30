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
                                    <el-select v-model="value" clearable placeholder="请选择" class="vip" @change="changes">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <span>付费客户筛选</span>
                                    <el-select v-model="value1" clearable placeholder="请选择" class="screen" @change="changess">
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
                                        value-format="yyyy-MM-dd"
                                        placeholder="结束时间"
                                        :disabled="disabled">
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
                                            label="用户头像"
                                            >
                                            <template slot-scope="scope" >
                                                <img :src="scope.row.ex3" alt="" style="width: 50px;height: 50px">
                                            </template>
                                            </el-table-column>
                                            <el-table-column
                                            prop="businessName"
                                            label="用户昵称"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                            prop="businessPhone"
                                            label="手机号"
                                            >
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
                                            label="消费总金额(元)"
                                            show-overflow-tooltip>
                                            </el-table-column>
                                            
                                            <el-table-column
                                            fixed="right"
                                            label="操作"
                                            >
                                            <template slot-scope="scope">
                                              <el-button  type="text" size="small" @click="handleClicks(scope.row)">加入黑名单</el-button>
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
                                            :total="this.usersize"
                                          ></el-pagination>   <br><br> 
                                        <el-button @click="getdatadel">加入黑名单</el-button>
                                </el-tab-pane>                   
                              </el-tabs>
                        </el-main>
                    </el-container>
              </el-container>
                  <!-- 单条删除提示 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt">确定要把该用户移入黑名单吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow()">确 定</el-button>
      </span>
    </el-dialog>
        <!-- 多条删除提示 -->
    <el-dialog title="提示" :visible.sync="delVisiblee" width="300px" center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt">确定要把选中用户移入黑名单吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisiblee = false">取 消</el-button>
        <el-button type="primary" @click="deleteRows()">确 定</el-button>
      </span>
    </el-dialog>
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
                value: '1',
                label: '付费'
                }, {
                value: '2',
                label: '未付'
                }],
                value: '',  //是否会员
                value1:'',   //是否付费
                value2:'',   //会员到期时间
                input:'',    //手机号
                list:[],     //请求后的值
                userid:[],   //单条加入黑名单
                checkBoxData: [],    //多选框选择的值
                number:[],
                number1:'',
                disabled:false,
                currentPage: 1, //图文当前页
                usersize:0,
                pagesize: 5,
                delVisible:false,
                delVisiblee:false,
                }
            },
        created () {
          this.getdata();
      },
        methods:{
      // 展示
      getdata () {
        user(localStorage.getItem('ex2'),this.currentPage).then(res => {
           this.list = res.data.data.data
           this.usersize = res.data.data.total
      })
    },
    // 分页
    handleSizeChange(size) {
      this.pagesize = size;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
      this.getdata();
    },
    // 下拉事件
    changes(){
        if (this.value == 1) {
          this.disabled = true;
        }else{
          this.disabled = false;
        }
       this.getdataphone(); 
    },
    // 下拉事件
    changess(){
       this.getdataphone(); 
    },
    // 搜索
        getdataphone () {
           ssuser(localStorage.getItem('ex2'),this.input,this.value,this.value1,this.value2,this.currentPage).then(res => {
           this.list = res.data.data.data
           this.usersize = res.data.data.total

        this.$message.success(res.data.msg)    
      })        
    },
    // 多条删除
    getdatadel () {
       this.delVisiblee = true;
    },

    // 单条删除
    handleClicks(row) {
       this.userid = row.businessId          
       this.delVisible = true;

    },
    changeFun(val) {
      this.checkBoxData = val.map(item => item.businessId);
  },
    deleteRow() {
        deluser(this.userid).then(res => {
        this.delVisible = false;        
        this.getdata();
        this.$message.success('操作成功')
      })  
      },
    deleteRows() {
      if (this.checkBoxData == "") {
          this.$message.error('请至少选择一个用户再进行操作')   
          return;      
      }
      singledel(this.checkBoxData.join(",")).then(res => {
        this.delVisiblee = false;
        this.getdata();
        this.$message.success('操作成功')
      })  
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