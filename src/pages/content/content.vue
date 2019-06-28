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
                        <addImgText v-show="imgTexts"></addImgText>
                        <addaudio v-show="audios"></addaudio>
                        <addvideo v-show="videos"></addvideo>
                        <editImgText v-show="editimgtext"></editImgText>
                        <el-main v-show="imgText">    
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="图文" name="first">
                                    <el-select v-model="value" clearable placeholder="全部状态">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input placeholder="搜索关键词" v-model="input" clearable></el-input>
                                    <el-button type="info" plain>筛选</el-button>
                                    <el-button type="primary" style="float:right;margin-right:150px;" @click="switcht">新增图文</el-button>
                                    <br><br><br>
                                    <el-table ref="test" :data="tableData" tooltip-effect="dark" style="width: 100%" :header-cell-style="{background:'#f5f5f5',color:'#000'}"
                                    @selection-change="changeFun">
                                        <el-table-column type="selection" width="55">
                                        </el-table-column>
                                        <el-table-column label="名称" width="250">
                                            <template slot-scope="scope" >
                                                <i class="img-box"><img :src="scope.row.url" alt=""></i>
                                                 <span class="name">{{scope.row.date}}</span>
                                                 <span class="money">￥{{scope.row.consumption}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="name" label="上架时间" width="250">
                                        </el-table-column>
                                        <el-table-column prop="address" label="访客数/浏览数" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="xl" label="销量" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="xl" label="状态" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="xl" label="序号" show-overflow-tooltip>
                                        </el-table-column>
                                        
                                        <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="200">
                                        <template slot-scope="scope">
                                            <el-button @click="handleClicks(scope.row)" type="text" size="small">排序</el-button>
                                            <el-button type="text" size="small" @click="editimgtxt">编辑</el-button>
                                        </template>
                                      </el-table-column>
                                    </el-table>                              
                                       <div class="sort">
                                              移动到第
                                                <input type="number">
                                                位
                                            </div>
                                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="current_change"
                            :current-page="currentPage"
                            :page-size="pagesize" 
                            background
                            layout="total, prev, pager, next"
                            :total="this.tableData.length">
                          </el-pagination>
                                  <br><br>
                                    <el-button>上架</el-button>
                                    <el-button>下架</el-button>
                                    <el-button @click="del">删除</el-button>
                                
                                </el-tab-pane>
                                <el-tab-pane label="音频" name="second">

                                    <el-select v-model="value1" clearable placeholder="全部状态">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input placeholder="搜索关键词" v-model="input1" clearable></el-input>
                                    <el-button type="info" plain>筛选</el-button>
                                    <el-button type="primary" style="float:right;margin-right:150px;"  @click="switchy">新增音频</el-button>
                                    <br><br><br>
                                    <el-table
                                        ref="multipleTable"
                                        :data="tableDataa"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        >
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        label="名称"
                                        width="250">
                                        <template slot-scope="scope" >
                                            <i class="img-box"><img :src="scope.row.time" alt=""></i>
                                             <span class="name">{{scope.row.date}}</span>
                                             <span class="money">￥{{scope.row.consumption}}</span>
                                        </template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="name"
                                        label="上架时间"
                                        width="250">
                                        </el-table-column>
                                        <el-table-column
                                        prop="address"
                                        label="访客数/浏览数"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="xl"
                                        label="销量"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="xl"
                                        label="状态"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="xl"
                                        label="序号"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        
                                        <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="200">
                                        <template slot-scope="scope">
                                          <el-button @click="handleClicks(scope.row)" type="text" size="small">排序</el-button>
                                          <el-button type="text" size="small"  @click.native.prevent="deleteRow(scope.$index, tableDataa)">编辑</el-button>
                                        </template>
                                      </el-table-column>
                                    </el-table>
                                    <br><br>
                                    <el-button>上架</el-button>
                                    <el-button>下架</el-button>
                                    <el-button>删除</el-button>
                                    

                                </el-tab-pane>
                                <el-tab-pane label="视频" name="third">
                                    
                                    <el-select v-model="value2" clearable placeholder="全部状态">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input placeholder="搜索关键词" v-model="input2" clearable></el-input>
                                    <el-button type="info" plain>筛选</el-button>
                                    <el-button type="primary" style="float:right;margin-right:150px;"  @click="switchs">新增视频</el-button>
                                    <br><br><br>
                                    <el-table
                                        ref="multipleTable"
                                        :data="tableDatab"
                                        tooltip-effect="dark"
                                        style="width: 100%">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        label="名称"
                                        width="250">
                                        <template slot-scope="scope" >
                                            <i class="img-box"><img :src="scope.row.time" alt=""></i>
                                             <span class="name">{{scope.row.date}}</span>
                                             <span class="money">￥{{scope.row.consumption}}</span>
                                        </template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="name"
                                        label="上架时间"
                                        width="250">
                                        </el-table-column>
                                        <el-table-column
                                        prop="address"
                                        label="访客数/浏览数"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="xl"
                                        label="销量"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="xl"
                                        label="状态"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="xl"
                                        label="序号"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="200">
                                        <template slot-scope="scope">
                                          <el-button @click="handleClicks(scope.row)" type="text" size="small">排序</el-button>
                                          <el-button type="text" size="small">编辑</el-button>
                                        </template>
                                      </el-table-column>
                                    </el-table>                                  
                                     <br><br><el-button>上架</el-button>
                                    <el-button>下架</el-button>
                                    <el-button>删除</el-button>                                                              
                                </el-tab-pane>
                            </el-tabs>
                        </el-main>
                    </el-container>
                </el-container>

            <!-- 删除提示 -->
                   <el-dialog title="提示" :visible.sync="Delprompt" width="300px" center style="z-index: 999">
                                            
                      <div class="del-dialog-cnt">确定要删除选中的轮播图吗？</div>

                      <span slot="footer" class="dialog-footer">

                        <el-button @click="Delprompt = false">取 消</el-button>

                        <el-button type="primary" @click="deleteRow" >确 定</el-button>

                    </span>

                  </el-dialog>
        </div>    
    </template>
    <script>
    import Sortable from 'sortablejs'
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
import addImgText from '@/components/addImgText/addImgText.vue'
import addaudio from '@/components/addaudio/addaudio.vue'
import addvideo from '@/components/addvideo/addvideo.vue'
import editImgText from '@/components/editImgText/editImgText.vue'
import { quillEditor } from 'vue-quill-editor'
    export default {
        data(){
            return{
                imgTexts:false,  //切换图文
                imgText:true,    //切换图文
                audios:false,   //切换音频
                videos:false,   //切换视频
                editimgtext:false,  //切换编辑图文
                Delprompt:false,    //删除提示
                activeName: 'first',   //默认先显示图文
                checkBoxData: [],    //多选框选择的值
                number:[],
                options: [{          //图文状态值
                value: '选项1',
                label: '上架中'
                }, {
                value: '选项2',
                label: '下架中'
                }],

                options1: [{         //音频状态值
                value: '选项1',
                label: '上架中'
                }, {
                value: '选项2',
                label: '下架中'
                }],

                options2: [{          //视频状态值
                value: '选项1',
                label: '上架中'
                }, {
                value: '选项2',
                label: '下架中'
                }],

                value: '',    //图文状态
                value1: '',    //音频状态
                value2: '',    //视频状态
                input:'',
                input1:'',
                input2:'',
                delVisible:false,
                currentPage: 1,
                pagesize:2,
                userList: [],

        tableDataa: [{
          time:'../../../static/img/1491557776054_.pic_hd@2x@2x.png',
          date: '最新金融',
          name: '2019-02-24',
          address: '0/1',
          xl:'0',
          consumption:'100'
        }, {
          time:'../../../static/img/1491557776054_.pic_hd@2x@2x.png',
          date: '最新金融',
          name: '2019-02-24',
          address: '0/1',
          xl:'0',
          consumption:'100'
        }, {
          time:'../../../static/img/1491557776054_.pic_hd@2x@2x.png',
          date: '最新金融',
          name: '2019-02-24',
          address: '0/1',
          xl:'0',
          consumption:'100'
        }, {
          time:'../../../static/img/1491557776054_.pic_hd@2x@2x.png',
          date: '最新金融',
          name: '2019-02-24',
          address: '0/1',
          xl:'0',
          consumption:'100'
        }],
        tableDatab: [{
          time:'../../../static/img/1491557776054_.pic_hd@2x@2x.png',
          date: '最新金融xuexi',
          name: '2019-02-24',
          address: '0/1',
          xl:'0',
          consumption:'100'
        }, {
          time:'../../../static/img/1491557776054_.pic_hd@2x@2x.png',
          date: '最新金融学习',
          name: '2019-02-24',
          address: '0/1',
          xl:'0',
          consumption:'100'

        }, {
          time:'../../../static/img/1491557776054_.pic_hd@2x@2x.png',
          date: '最新金融第七位',
          name: '2019-02-24',
          address: '0/1',
          xl:'0',
          consumption:'100'
        }, {
          time:'../../../static/img/1491557776054_.pic_hd@2x@2x.png',
          date: '最新金融阿萨德',
          name: '2019-02-24',
          address: '0/1',
          xl:'0',
          consumption:'100'
        }],

      tableData: [
        {
          id: '1',
          date: '2016-05-02',
          name: '王小虎1',
          number: '200',
          url:'../../../static/img/1491557776054_.pic_hd@2x@2x.png',
          Sales:'5000',
          state:'已上架',
          Serial:'0',
          money:'211'
        },
        {
          id: '2',
          date: '2016-05-02',
          name: '王小虎2',
          number: '200',
          url:'../../../static/img/1491557776054_.pic_hd@2x@2x.png',
          Sales:'5000',
          state:'已上架',
          Serial:'0',
          money:'211'
        },
        {
          id: '3',
          date: '2016-05-02',
          name: '王小虎3',
          number: '200',
          url:'../../../static/img/1491557776054_.pic_hd@2x@2x.png',
          Sales:'5000',
          state:'已上架',
          Serial:'0',
          money:'211'
        },
        {
          id: '4',
          date: '2016-05-02',
          name: '王小虎4',
          number: '200',
          url:'../../../static/img/1491557776054_.pic_hd@2x@2x.png',
          Sales:'5000',
          state:'已上架',
          Serial:'0',
          money:'211'
        }
      ],

          }
    },
        created () {
      },
        methods:{
      //编辑图文
      editimgtxt(){
        this.imgText = false;
        this.editimgtext = true;
      },
      
      //新增图文切换
      switcht(){
        this.imgText = false;
        this.imgTexts = true
      },
      //新增音频
      switchy(){
        this.imgText = false;
        this.audios = true
      },
      //新增视频
      switchs(){
        this.imgText = false;
        this.videos = true
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      handleClicks(row) {
          $('.sort').css('display','block');
      },
      Popup(){
        this.delVisible =true
      },
      //展开弹窗
      del(){
            this.Delprompt = true;
        },
      //多条删除
      deleteRow(){
          console.log(this.number)
      for(let item in this.$refs.test.selection){
        this.tableData.splice(item.date - 1,1);
        
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
        }
        this.Delprompt = false;
      },
      //多选框
  changeFun(val) {
      this.checkBoxData = val;
                  let aa = [];
      for (let i = 0; i < this.checkBoxData.length; i++) {
        aa.push(this.checkBoxData[i].id)
      }
      new Set(aa);
      this.number = aa
      // console.log(this.number)
  },
  // 分页
      handleSizeChange(size) {
        this.pagesize = size;
        console.log(this.pagesize)  //每页下拉显示数据
        // console.log(`每页 ${val} 条`);
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
      current_change:function(currentPage){
        this.currentPage = currentPage
      },
    },
  created(){
    // this.getdata();
    },
        components:{
            sidebar,
            Header,
            addImgText,
            addaudio,
            addvideo,
            editImgText
        },
        mounted () {
          // this.rowDrop()
          // this.columnDrop()
    }
    }
    </script>
    <style scoped>
 .box{background: #f5f5f5;}
 h3{display: inline;}
 .title{padding: 20px;}
 .cont li{width: 300px;height: 200px;background:#F4F4F4 100%;float: left;margin-right: 20px;text-align: center;display: flex;justify-content: center;align-items: center;}
 .bq{width: 60px;height: 24px;line-height: 20px;border-radius: 1px;text-align: center;border: 1px solid rgba(0, 101, 255, 1);color: #0065FF;font-size: 14px;margin-left: 10px;}
 .el-tabs__item{padding: 0 50px;}.el-input{width: auto;}
 .name{width:111px;height:40px;font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height:24px;display: inline-block;position: absolute;top: 20px;}
 .img-box{width: 100px;height: 75px;;display: inline-block;}.img-box img{width: 100%;height: 100%;}
 .money{width:34px;height:12px;font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);line-height:24px;}
 .namea{font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);margin-right: 15px;}.number{font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
 .el-input[data-v-52a5028a] {width: auto;}.del-dialog-cnt{text-align: center;}
 .sort{display: none;text-align: center;margin-top: 30px;}
 .sort input{width:50px;height:25px;background:rgba(251,251,251,1);border:1px solid rgba(238,238,238,1); }
    </style>
    