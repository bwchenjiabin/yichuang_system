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
                        <el-tabs v-model="activeName">
                            
                            <el-tab-pane label="黑名单" name="second">
                                <el-table
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
                                label="用户"
                                width="250">
                                <template slot-scope="scope" >
                                    <img :src="scope.row.ex3" alt="" style="width: 50px;height: 50px">
                                     <span>{{scope.row.businessName}}</span>
                                </template>
                                </el-table-column>
                                <el-table-column
                                prop="blackTime"
                                label="拉黑时间"
                                width="250">
                                </el-table-column>
                                
                                <el-table-column
                                label="操作"
                                width="200">
                                <template slot-scope="scope">
                                  <el-button  type="text" size="small" @click="handleClicks(scope.row)" @click.native.prevent="deleteRow(scope.$index, list)">移出黑名单</el-button>
                                </template>
                              </el-table-column>
                            </el-table><br><br>
                            <el-button style="margin-left: 50px;" @click="getdatadel()">移出黑名单</el-button>
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
      number1:''
            }
        },
    created () {
      this.getdata();
  },
    methods:{
      // 展示
        getdata () {

        blacklist("1").then(res => {
         this.list = res.data.date
        // console.log(this.list);
      })
      // let url = "http://192.168.0.106:8081/business/black"
      // let params = {
      //     ex2:"1"
      // }
      // this.$axios({
      //   url,
      //   params
      // }).then(res => {
      //    this.list = res.data.date
      //   })
    },
      // 单条删除
      handleClicks(row) {
        this.userid = row.businessId
        console.log(this.userid)
        delblacklist(this.userid).then(res => {
        //  this.list = res.data.date
        console.log(res);
      })
      },
      // 单条删除
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },

          // 多条删除
    getdatadel () {
        ddelblacklist(this.number1).then(res => {
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


    changeFun(val) {
      let aa
      this.checkBoxData = val;
      for (let i = 0; i < this.checkBoxData.length; i++) {
        this.number.push(this.checkBoxData[i].businessId)
        aa = this.number.join(",")
        new Set(aa);
        this.number1 = aa
      }
      // console.log(this.number)
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