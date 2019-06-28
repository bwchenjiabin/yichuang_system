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
                        <addSort v-show="addSort"></addSort>
                        <el-main v-show="addclas">
                            <h4>内容分类</h4><br><br>
                            <el-button type="primary" style="float:right;margin-right:100px" @click="addclass">新增分类</el-button>
                              <el-table  ref="test" :data="tableData" tooltip-effect="dark" style="width: 100%"  @selection-change="selsChange">
                                <el-table-column type="selection" label="" width="55">
                                </el-table-column>
                                <el-table-column label="全选"  width="120" > 
                                    <template slot-scope="scope">{{ scope.row.date }}</template>
                                </el-table-column>
                                <el-table-column  prop="" label="" width="120" >
                                </el-table-column>
                                <el-table-column prop="" label=""  show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" width="200">
                                        <template slot-scope="scope">
                                          <el-button type="text" size="small">修改</el-button>
                                          <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                                        </template>
                                </el-table-column>
                            </el-table>
                            <div style="margin-top: 20px">
                                 <el-button @click="del" >全部删除</el-button>
                            </div>
                        </el-main>
                    </el-container>
                </el-container>
                 <!-- 删除提示 -->
                   <el-dialog title="提示" :visible.sync="Delprompt" width="300px" center style="z-index: 999">
                                            
                      <div class="del-dialog-cnt">确定要删除选中的轮播图吗？</div>

                      <span slot="footer" class="dialog-footer">

                        <el-button @click="Delprompt = false">取 消</el-button>

                        <el-button type="primary" @click="dele()" >确 定</el-button>

                    </span>

                  </el-dialog>


                   <!-- 删除提示2 -->
                   <el-dialog title="提示" :visible.sync="Delete" width="300px" center style="z-index: 999">
                                            
                      <div class="del-dialog-cnt">确定要删除该条轮播图吗？</div>

                      <span slot="footer" class="dialog-footer">

                        <el-button @click="Delete = false">取 消</el-button>

                        <el-button type="primary" @click="handleClicks()" >确 定</el-button>

                    </span>

                  </el-dialog>
        </div>    
    </template>
    <script>
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
import addSort from '@/components/addSort/addSort.vue'
    export default {
      name:'classify',
        data(){
            return{
          addclas:true,
          addSort:false,
         Delprompt:false,    //删除提示
         Delete:false,    //删除提示
   tableData: [{
          id:1,
          date: '运营工作',

        }, {
          id:2,
          date: '运营工作',

        }, {
          id:3,
          date: '运营工作',

        }],
        checkBoxData: [],//选中的值显示
        userid:[],
                }
            },
        created () {
          // this.getdata();
      },
        methods:{
      //新增分类
      addclass(){
        this.addclas = false;
        this.addSort = true;
      },

 
      //展开删除提示
      del(){
        this.Delprompt = true;
  
      },
      //删除选中数据
      dele(){
        console.log(this.number)
         this.Delprompt = false;
            let len = this.tableData.length;
      for(let item in this.$refs.test.selection){
      this.tableData.splice(item.date - 1,1);
        }
      },
      //多选选中的值
      selsChange(val) {
           let aa=[];
      this.checkBoxData = val;
      for (let i = 0; i < this.checkBoxData.length; i++) {
        aa.push(this.checkBoxData[i].id)
        new Set(aa);
      this.number = aa;
        // console.log(this.number)
      }
    },
      // 展示
      getdata () {
      let url = "http://192.168.0.106:8081/business/select"
      let params = {
          ex2:"1"
      }
      this.$axios({
        url,
        params
      }).then(res => {
        //  this.list = res.data.date
         console.log(res)
        })
    },
      //    deleteRow() {
      //   rows.splice(index, 1);
      // },
    //单选值
      deleteRow(row){
          this.Delete = true;
          this.userid = row.id
      },
    // 单条删除
    handleClicks() {
      console.log(this.userid)
      this.Delete = false;
        // this.userid = row.businessId
        let url = "http://192.168.0.106:8081/business/immigrant"
      let params = {
        businessId:this.userid
      }
      this.$axios({
        url,
        params
      }).then(res => {
        //  this.list = res.data.date
         console.log(res)
        })
      },
          // 多条删除
    getdatadel () {
      console.log(this.number)
      let url = "http://192.168.0.106:8081/business/immigrant2"
      let params = {
        businessId:this.number
      }
      this.$axios({
        url,
        params
      }).then(res => {
         console.log(res)
        })
    },
        },
            components:{
            sidebar,
            Header,
            addSort
        }
    }
    </script>
    <style scoped>
 .box{background: #f5f5f5;}
 .el-tabs__item{padding: 0 50px;}.el-input{width: auto;}.icon{width: 6px;height: 17px;background: blue;float: left;margin-top: 3px;}
 .title{width: auto;display: block}.title span{margin-left: 10px;}.del-dialog-cnt{text-align: center;}
</style>