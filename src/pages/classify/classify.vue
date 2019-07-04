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
                              <el-table  ref="test" :data="tableData" tooltip-effect="dark" style="width: 100%">
                                <!-- <el-table-column type="selection" label="" width="55">
                                </el-table-column> -->
                                <el-table-column label=""  width="120" > 
                                    <template slot-scope="scope">{{ scope.row.kindName }}</template>
                                </el-table-column>
                                <el-table-column  prop="" label="" width="120" >
                                </el-table-column>
                                <el-table-column prop="" label=""  show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" width="200">
                                        <template slot-scope="scope">
                                          <el-button type="text" size="small" @click="modify(scope.row)">修改</el-button>
                                          <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
                                        </template>
                                </el-table-column>
                            </el-table>
                            <div style="margin-top: 20px">
                                 <!-- <el-button @click="del" >全部删除</el-button> -->
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


                  <!-- 修改弹窗 -->
                <el-dialog title="订单详情" :visible.sync="delVisible" width="500px" center style="z-index: 999;text-align: left">                                
              <div class="del-dialog-cnt">
                <el-input
                  v-model="value"
                  :placeholder="modifyName"
                  clearable>
                </el-input>
              </div>
              <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="modifyclass()">确 定</el-button>

              </span>

          </el-dialog>
        </div>    
    </template>
    <script>
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
import addSort from '@/components/addSort/addSort.vue'
import {classe} from 'api/userAjax';
import {delclass} from 'api/userAjax';
import {modifys} from 'api/userAjax';
    export default {
      name:'classify',
        data(){
            return{
          addclas:true,
          addSort:false,
          Delprompt:false,    //删除提示
          Delete:false,    //删除提示
          tableData: [],
          userid:[],
          input:''  ,//修改分类名字3
          delVisible:false, // 内容分类弹窗修改
          modifyName:'', // 修改名称
          modifyid:'', // 修改的id
          value:''
                }
            },
        created () {
          this.getdata();
      },
        methods:{
        


      //新增分类
      addclass(){
        this.addclas = false;
        this.addSort = true;
      },

      //修改
      modify(row){
        this.delVisible = true;
        this.modifyName = row.kindName
        this.modifyid = row.kindId
      },
      //修改
      modifyclass(){
        this.delVisible = false
       modifys(this.modifyid,this.value).then(res => {
         this.$message.success(res.data)
         this.$message.error(res.msg)

            console.log(res);
      })
        console.log(this.modifyid)
        console.log(this.value)
        this.getdata();
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

      // 展示
      getdata () {
        classe("1").then(res => {
          this.tableData = res.data
            // console.log(res.data);
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
        delclass(this.userid).then(res => {
            console.log(res);
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