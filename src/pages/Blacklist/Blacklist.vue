<template>
  <el-scrollbar style="height:100%">
     <div class="box">
            <el-container>
                <el-header  style="    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 20px -10px #000;">
                    <Header></Header>
                </el-header>
                <el-container>
                    <el-aside width="200px">
                        <sidebar></sidebar>
                    </el-aside>
                    <el-main>
                        <el-tabs v-model="activeName">
                            
                            <el-tab-pane label="黑名单" name="second">
                                <el-table
                                v-loading="loading"
                                element-loading-text="拼命加载中"
                                ref="multipleTable"
                                :data="list"
                                tooltip-effect="dark"
                                style="width: 100%"
                                :header-cell-style="{color:'#000'}"
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
                                prop="blackTime"
                                label="拉黑时间"
                                >
                                </el-table-column>
                                
                                <el-table-column
                                label="操作"
                               >
                                <template slot-scope="scope">
                                  <el-button  type="text" size="small" @click="handleClicks(scope.row)">移出黑名单</el-button>
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
                                :total="this.blacksize"
                              ></el-pagination>    <br><br>
                            <el-button style="margin-left: 50px;" @click="getdatadel()">移出黑名单</el-button>
                            </el-tab-pane>
                          </el-tabs>
                    </el-main>
                </el-container>
            </el-container>
            <!-- 单条删除提示 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt">确定要把该用户移出黑名单吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow()">确 定</el-button>
      </span>
    </el-dialog>
        <!-- 多条删除提示 -->
    <el-dialog title="提示" :visible.sync="delVisiblee" width="300px" center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt">确定要把选中用户移出黑名单吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisiblee = false">取 消</el-button>
        <el-button type="primary" @click="deleteRows()">确 定</el-button>
      </span>
    </el-dialog>
    </div>    
  </el-scrollbar>
</template>
<script>
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
import {blacklist} from 'api/userAjax';
import {delblacklist} from 'api/userAjax';
import {ddelblacklist} from 'api/userAjax';
export default {
    data(){
        return{
            activeName: 'second',
            input:'',
            options: [{
            value: '选项1',
            label: '是'
            }, {
            value: '选项2',
            label: '否'
            }],
            value: '选项1',
            options1: [{
            value: '选项1',
            label: '有'
            }, {
            value: '选项2',
            label: '无'
            }],
            value1: '选项1',
            value2: '',
            tableData: [{
        date: '../../../static/img/微信图片_20190611141523.jpg',
        names:'江南',
        name: '王小虎',
        address: '课程详情',
        zt:'显示',
        consumption:'100'
      }, {
        date: '../../../static/img/微信图片_20190611141523.jpg',
        name: '王小虎',
        address: '课程详情',
        zt:'显示',
        consumption:'500'
      }, {
        date: '../../../static/img/微信图片_20190611141523.jpg',
        name: '王小虎',
        address: '课程详情',
        zt:'显示',
        consumption:'200'
      }, {
        date: '../../../static/img/微信图片_20190611141523.jpg',
        name: '王小虎',
        address: '课程详情',
        zt:'显示',
        consumption:'100'
      }],
      list:[],
      userid:[],   //单条移出黑名单
      checkBoxData:[],
      number:[],
      number1:'',
      currentPage: 1, //图文当前页
      blacksize:0,
      pagesize: 5,
      delVisible:false,
      delVisiblee:false,
      loading:true,
            }
        },
    created () {
      this.reload();
      this.getdata();
  },
    methods:{
      // 展示
        getdata () {
        blacklist(localStorage.getItem('ex2'),this.currentPage).then(res => {
         this.list = res.data.data.data
         this.blacksize = res.data.data.total
         this.loading = false;
      })
    },
      // 单条删除
      handleClicks(row) {
        this.userid = row.businessId
        this.delVisible = true;
      },
      // 单条删除
      deleteRow() {
        delblacklist(this.userid).then(res => {
        this.getdata();
        this.delVisible = false;   
        this.$message.success('操作成功');    
      })
    },
      //多条删除
      deleteRows(){
        if (this.checkBoxData == "") {
          this.$message.error('请至少选择一个用户再进行操作');     
          return;         
        }
        ddelblacklist(this.checkBoxData.join(",")).then(res => {
          this.delVisiblee = false;
          this.getdata();
          this.$message.success('操作成功');    
      })  
    },
    // 初始化回到顶部
      reload() {
     $('body,html').animate({scrollTop:0},200);
    },
      // 多条删除
    getdatadel () {
      this.delVisiblee = true;
    },
    // 分页
     handleSizeChange(size) {
      this.pagesize = size;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
      this.getdata();
    },


    changeFun(val) {
      this.checkBoxData = val.map(item => item.businessId);
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
 .el-scrollbar__wrap {
   overflow-x: hidden;
 }
</style>