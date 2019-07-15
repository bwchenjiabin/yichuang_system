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

                   <!-- 删除提示2 -->
                   <el-dialog title="提示" :visible.sync="Delete" width="300px" center style="z-index: 999">
                                            
                      <div class="del-dialog-cnt">确定要删除该条轮播图吗？</div>

                      <span slot="footer" class="dialog-footer">

                        <el-button @click="Delete = false">取 消</el-button>

                        <el-button type="primary" @click="handleClicks()" >确 定</el-button>

                    </span>

                  </el-dialog>


                  <!-- 修改弹窗 -->
                <el-dialog title="分类修改" :visible.sync="delVisible" width="500px" center style="z-index: 999;text-align: left">                                
              <div class="del-dialog-cnt">
                <el-input
                  v-model="value"
                  :placeholder="modifyName"
                  clearable>
                </el-input>
                <span class="name">修改分类配图</span>&nbsp;&nbsp;&nbsp;<el-button plain @click="Popup">选择</el-button>
              </div>
              <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="modifyclass()">确 定</el-button>
              </span>
          </el-dialog>
            <!-- 弹窗 -->
            <el-dialog title="选择分类配图" :visible.sync="delVisiblee" width="600px" center style="z-index: 999">     
                <div class="del-dialog-cnt"> 
                    <ul>
                  <li v-for="(item,index) in tableDataa" :key="index" @click="aa(item.id)">
                      <span class="Order">{{item.id}}</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">
                          <img :src="item.img" alt="" :class = "active == index ? 'addclass' : '' " @click='dowm(index)' class="imga">
                          </span><br><br>  
                      <img src="../../../static/img/微信图片_20190620160108.png" alt="" class="good" :class = "active == index ? 'goods' : '' " >
                  </li></ul>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delVisiblee = false">取 消</el-button>
                    <el-button type="primary" @click="delVisiblee = false">确 定</el-button>
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
          userid:'',
          input:''  ,//修改分类名字3
          delVisible:false, // 内容分类弹窗修改
          delVisiblee:false, // 内容分类弹窗修改
          modifyName:'', // 修改名称
          modifyid:'', // 修改的id
          value:'',
          active : -1,
          tableDataa: [{
            img: "http://yckt.yichuangketang.com/img/banner/1.png",
            id: '1',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/2.png",
            id: '2',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/3.png",
            id: '3',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/4.png",
            id: '4',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/5.png",
            id: '5',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/6.png",
            id: '6',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/7.png",
            id: '7',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/8.png",
            id: '8',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/9.png",
            id: '9',
          },{
            img: "http://yckt.yichuangketang.com/img/banner/10.png",
            id: '10',
          }],
          imgid:'',
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
    // 弹窗
        Popup(){
        this.delVisiblee =true
      },
        dowm(index){
        this.active = index
      },
      aa(val){
        this.imgid = val
      },
      //修改
      modify(row){
        this.delVisible = true;
        this.modifyName = row.kindName
        this.modifyid = row.kindId
        console.log(row)
      },
      //修改
      modifyclass(){
        this.delVisible = false
       modifys(this.modifyid,this.value,this.imgid).then(res => {
         this.$message.success(res.data)
         this.getdata();
            console.log(res);
      })
        this.getdata();
      },

      //展开删除提示
      del(){
        this.Delprompt = true;
      },

      // 展示
      getdata () {
        classe(localStorage.getItem('ex2')).then(res => {
          this.tableData = res.data
      })
    },
    //单选值
      deleteRow(row){
          this.Delete = true;
          this.userid = row.kindId
      },
    // 单条删除
    handleClicks() {
      console.log(this.userid)
        delclass(this.userid).then(res => {
          this.Delete = false;
         this.$message.success(res.data)
         this.getdata();
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

  .box{background: #f5f5f5;}
  .course{font-size:18px;font-family:PingFangSC-Medium;font-weight:700;color:rgba(51,51,51,1);}
 .imgText{font-size:18px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(153,153,153,1);}
 .title{padding: 20px;}
 .cont li{width: 300px;height: 200px;background:#F4F4F4 100%;float: left;margin-right: 20px;text-align: center;display: flex;justify-content: center;align-items: center;}
 .bq{width: 60px;height: 24px;line-height: 20px;border-radius: 1px;text-align: center;border: 1px solid rgba(0, 101, 255, 1);color: #0065FF;font-size: 14px;margin-left: 10px;}
 .el-tabs__item{padding: 0 50px;}.el-input{width: auto;}.icon{width: 6px;height: 17px;background: blue;float: left;margin-top: 3px;}
 .title{width: auto;display: block}.title span{margin-left: 10px;}
 .name{font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);margin-right: 15px;}
 .number{font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);width: 350px;height: 80px;border:1px solid rgba(238,238,238,1);margin: 10px 20px 10px 20px;}
 .number .imga{width: 100%;height: 100%;}
 .text{font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);display: inline;}
 .cont{margin-top: 10px;margin-left: 40px;color: rgba(153, 153, 153, 1);font-size: 14px;text-align: left;font-family: SourceHanSansSC-regular;width: 70%;float: left;}
 .cont p{display: inline;}.del-dialog-cnt{text-align: center;}
 .radio{margin-left: 50px;}.el-dialog .el-dialog__header{text-align: left!important;}
 .tit{padding: 0 20px 25px 20px;position: absolute;top: 0}
 .del-dialog-cnt li{display: flex;align-items: center;justify-content: center;position: relative;font-size:20px;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(20,85,250,1);}
 .del-dialog-cnt li .imga:hover{border:1px solid rgba(20,85,250,1);}
 .good{width: 15px;height: 15px;position: absolute;top: 12px;right: 75px;display: none} 
 .addclass{border:1px solid rgba(20,85,250,1)}
 .goods{display: block}
 /deep/ .el-dialog__header{
    text-align: left;
}
 /deep/ .el-dialog__title{
    font-size: 16px;
 }
</style>