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
                        <!-- <addlesson v-show="addlesson"></addlesson> -->
                        <el-main v-show="imgText">    
                            <el-tabs v-model="activeName">
                                <el-tab-pane label="图文" name="first">
                                    <el-select v-model="value" clearable placeholder="全部状态" @change="currentSel">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input placeholder="搜索关键词" v-model="input" clearable></el-input>
                                    <el-button type="info" plain  @click="selectImgText()">筛选</el-button>
                                    <el-button type="primary" style="float:right;margin-right:150px;" @click="switcht">新增图文</el-button>
                                    <br><br><br>
                                    <el-table ref="test" :data="tableData" tooltip-effect="dark" style="width: 100%" :header-cell-style="{background:'#f5f5f5',color:'#000'}"
                                    @selection-change="changeFun">
                                        <el-table-column type="selection" width="55">
                                        </el-table-column>
                                        <el-table-column label="名称" width="250">
                                            <template slot-scope="scope" >
                                                <i class="img-box"><img :src="'http://192.168.0.107:8081'+scope.row.img" alt=""></i>
                                                 <span class="name">{{scope.row.lessonName}}</span>
                                                 <span class="money">￥{{scope.row.lessonPriceNow}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="upperoffTime" label="上架时间" width="250">
                                        </el-table-column>
                                        <el-table-column prop="browseNumber" label="访客数/浏览数" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="tradeNumber" label="销量" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="status" label="状态" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="200">
                                        <template slot-scope="scope">
                                            <el-button @click="handleClicks(scope.row)" type="text" size="small">排序</el-button>
                                            <el-button type="text" size="small" @click="editimgtxt(scope.row.lessonid)">编辑</el-button>
                                            <el-button type="text" size="small" @click="addlessons(scope.row.lessonid)">课程添加</el-button>
                                        </template>
                                      </el-table-column>
                                    </el-table>                              
                                       <div class="sort">
                                              移动到第
                                                <input type="number">
                                                位
                                            </div>
                                   <!-- 分页 -->
                                 <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="current_change"
                                @current-page="currentPage"
                                :page-size="pagesize"
                                background
                                layout="total, prev, pager, next"
                                :total="this.twsize">
                              </el-pagination>
                                  <br><br>
                                    <el-button @click="Upper()">上架</el-button>
                                    <el-button @click="lower()">下架</el-button>
                                    <el-button @click="del">删除</el-button>
                                
                                </el-tab-pane>
                                <el-tab-pane label="音频" name="second">
                                    <el-select v-model="value1" clearable placeholder="全部状态" @change="currentSel1">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input placeholder="搜索关键词" v-model="input1" clearable></el-input>
                                    <el-button type="info" plain @click="selectaudio()">筛选</el-button>
                                    <el-button type="primary" style="float:right;margin-right:150px;"  @click="switchy">新增音频</el-button>
                                    <br><br><br>
                                    <el-table
                                        ref="multipleTable"
                                        :data="tableData1"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        @selection-change="changeFun1">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        label="名称"
                                        width="250">
                                        <template slot-scope="scope" >
                                            <i class="img-box"><img :src="'http://192.168.0.107:8081'+scope.row.img" alt=""></i>
                                             <span class="name">{{scope.row.lessonName}}</span>
                                             <span class="money">￥{{scope.row.lessonPriceNow}}</span>
                                        </template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="upperoffTime"
                                        label="上架时间"
                                        width="250">
                                        </el-table-column>
                                        <el-table-column
                                        prop="browseNumber"
                                        label="访客数/浏览数"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="tradeNumber"
                                        label="销量"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="status"
                                        label="状态"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="200">
                                        <template slot-scope="scope">
                                          <el-button @click="handleClicks(scope.row)" type="text" size="small">排序</el-button>
                                          <el-button type="text" size="small" @click="editaudio(scope.row.lessonid)">编辑</el-button>
                                          <el-button type="text" size="small" @click="addaudiolesson(scope.row.lessonid)">课程添加</el-button>
                                        </template>
                                      </el-table-column>
                                    </el-table>
                                                  <!-- 音频分页 -->
                                  <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="current_change1"
                                    :current-page="currentPage1"
                                    :page-size="pagesize"
                                    background
                                    layout="total, prev, pager, next"
                                    :total="this.ypsize"
                                  ></el-pagination>

                                    <br><br>
                                    <el-button @click="Upper1()">上架</el-button>
                                    <el-button @click="lower1()">下架</el-button>
                                    <el-button>删除</el-button>
                                    

                                </el-tab-pane>
                                <el-tab-pane label="视频" name="third">
                                    
                                    <el-select v-model="value2" clearable placeholder="全部状态" @change="currentSel2">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input placeholder="搜索关键词" v-model="input2" clearable></el-input>
                                    <el-button type="info" plain @click="selectvideo()">筛选</el-button>
                                    <el-button type="primary" style="float:right;margin-right:150px;"  @click="switchs">新增视频</el-button>
                                    <br><br><br>
                                    <el-table
                                        ref="multipleTable"
                                        :data="tableData2"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        @selection-change="changeFun2">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        label="名称"
                                        width="250">
                                        <template slot-scope="scope" >
                                            <i class="img-box"><img :src="'http://192.168.0.107:8081'+scope.row.img" alt=""></i>
                                             <span class="name">{{scope.row.lessonName}}</span>
                                             <span class="money">￥{{scope.row.lessonPriceNow}}</span>
                                        </template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="upperoffTime"
                                        label="上架时间"
                                        width="250">
                                        </el-table-column>
                                        <el-table-column
                                        prop="browseNumber"
                                        label="访客数/浏览数"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="tradeNumber"
                                        label="销量"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="status"
                                        label="状态"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="200">
                                        <template slot-scope="scope">
                                          <el-button @click="handleClicks(scope.row)" type="text" size="small">排序</el-button>
                                          <el-button type="text" size="small" @click="editvideo(scope.row.lessonid)">编辑</el-button>
                                          <el-button type="text" size="small" @click="addvideolesson(scope.row.lessonid)">课程添加</el-button>

                                        </template>
                                      </el-table-column>
                                    </el-table>      
                                    <!-- 视频分页 -->
                                  <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="current_change2"
                                    :current-page="currentPage2"
                                    :page-size="pagesize"
                                    background
                                    layout="total, prev, pager, next"
                                    :total="this.spsize"
                                  ></el-pagination>    

                                     <br><br><el-button @click="Upper2()">上架</el-button>
                                    <el-button @click="lower2()">下架</el-button>
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

                        <el-button type="primary">确 定</el-button>

                    </span>

                  </el-dialog>
        </div>    
    </template>
    <script>
    import Sortable from 'sortablejs'
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
import addImgText from '@/components/addImgText/addImgText.vue'
import addvideo from '@/components/addvideo/addvideo.vue'
import addaudio from '@/components/addaudio/addaudio.vue'
import {ImgText} from 'api/userAjax';
import {audio} from 'api/userAjax';
import {video} from 'api/userAjax';
import {selectId} from 'api/userAjax';
import {UpperShelf} from 'api/userAjax';
import {lowerShelf} from 'api/userAjax';

// import { quillEditor } from 'vue-quill-editor'
    export default {
        data(){
            return{
                imgTexts:false,  //切换图文
                imgText:true,    //切换图文
                audios:false,   //切换音频
                videos:false,   //切换视频
                // addlesson:false,   //切换添加课程
                Delprompt:false,    //删除提示
                activeName: 'first',   //默认先显示图文
                checkBoxData: [],    //TW多选框选择的值
                checkBoxData1: [],    //YP多选框选择的值
                checkBoxData2: [],    //SP多选框选择的值
                number:[],
                number1:'',
                numbera:[],
                numberaa:'',
                numberb:[],
                numberbb:'',
                value: '',    //图文状态
                value1: '',    //音频状态
                value2: '',    //视频状态
                input:'',
                input1:'',
                input2:'',
                delVisible:false,
                currentPage: 1,   //图文当前页
                currentPage1: 1,  //音频当前页
                currentPage2: 1,  //视频当前页
                pagesize:8,
                userList: [],
                tableData: [],
                tableData1: [],
                tableData2: [],
                twsize:0,
                ypsize:0,
                spsize:0,
                editTwid:'',     //修改图文的id
                options: [{      //图文状态值
                value: '1',
                label: '上架中'
                }, {
                value: '2',
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
                selectId:[],         //图文选中的下拉值
                selectId1:[],         //图文选中的下拉值
                selectId2:[],         //图文选中的下拉值
          }
    },
  created() {
    this.getImgText()
    this.getaudio()
    this.getvideo()
  },
        methods:{
      //编辑图文
      editimgtxt(id){
        this.editTwid = id;
        this.$router.push({
        path: `/editImgText/${id}`
      });
      // console.log(id)
      },
      //编辑音频
      editaudio(id){
        this.editTwid = id;
        this.$router.push({
        path: `/editaudio/${id}`
      });
      console.log(id)
      },
      //编辑视频
      editvideo(id){
        this.editTwid = id;
        this.$router.push({
        path: `/editvideo/${id}`
      });
      console.log(id)
      },

      // 获取图文下拉菜单值
      currentSel(val){
          this.selectId = val
      },
      // 获取音频下拉菜单值
      currentSel1(val){
          this.selectId1 = val
      },
      // 获取视频下拉菜单值
      currentSel2(val){
          this.selectId2 = val
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
      handleClicks(row) {
          $('.sort').css('display','block');
      },
      // 获取图文课程id
      addlessons(id){
      this.$router.push({
        path: `/addlesson/${id}`
      });
      },
      // 获取音频课程id
      addaudiolesson(id){
      this.$router.push({
        path: `/addaudiolesson/${id}`
      });
      },
      // 获取视频课程id
      addvideolesson(id){
      this.$router.push({
        path: `/addvideolesson/${id}`
      });
      },
      
      //展开弹窗
      del(){
            this.Delprompt = true;
        },
      //TW上架
      Upper(){
      UpperShelf(this.number1).then(res => {
           this.getImgText()
      })
    },
      //YP上架
      Upper1(){
      UpperShelf(this.numberaa).then(res => {
           this.getaudio()
      })
    },
     //SP上架
      Upper2(){
      UpperShelf(this.numberbb).then(res => {
           this.getvideo()
      })
    },
    //TW下架
      lower(){
      lowerShelf({lessonIds: this.number1}).then(res => {
           this.getImgText()
      })
    }, 
    //YP下架
      lower1(){
      lowerShelf({lessonIds: this.numberaa}).then(res => {
           this.getaudio()
      })
    }, 
    //SP下架
      lower2(){
      lowerShelf({lessonIds: this.numberbb}).then(res => {
           this.getvideo()
      })
    }, 
    
  //图文获取多选值
    changeFun(val) {
      let aa
      this.checkBoxData = val;
      for (let i = 0; i < this.checkBoxData.length; i++) {
        this.number.push(this.checkBoxData[i].lessonid)
        aa = this.number.join(",")
        new Set(aa);
        this.number1 = aa
      }
  },
    //音频获取多选值
    changeFun1(val) {
      let bb
      this.checkBoxData1 = val;
      for (let i = 0; i < this.checkBoxData1.length; i++) {
        this.numbera.push(this.checkBoxData1[i].lessonid)
        bb = this.numbera.join(",")
        new Set(bb);
        this.numberaa = bb
      }
  },
    //视频获取多选值
    changeFun2(val) {
      let cc
      this.checkBoxData2 = val;
      for (let i = 0; i < this.checkBoxData2.length; i++) {
        this.numberb.push(this.checkBoxData2[i].lessonid)
        cc = this.numberb.join(",")
        new Set(cc);
        this.numberbb = cc
      }
  },
    // 分页
    handleSizeChange(size) {
      this.pagesize = size;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
      this.getImgText();
    },
        current_change1: function(currentPage) {
      this.currentPage1 = currentPage;
      this.getaudio();
    },
        current_change2: function(currentPage) {
      this.currentPage2 = currentPage;
      this.getvideo();
    },

   // 图文查询
    getImgText() {
        ImgText("1","1",this.currentPage).then(res => {
            this.tableData = res.data.lesson;
            this.twsize = res.data.totalLesson
      })
    },
        // 音频查询
    getaudio() {
        audio("1","2",this.currentPage1).then(res => {
            this.tableData1 = res.data.lesson;
            this.ypsize = res.data.totalLesson
            // console.log(res);
      })
    },
        // 视频查询
    getvideo() {
        video("1","3",this.currentPage2).then(res => {
            this.tableData2 = res.data.lesson;
            this.spsize = res.data.totalLesson
            // console.log(res);
      })
    },
           // 图文通过状态查询
    selectImgText() {
        selectId("1","1",this.currentPage,this.selectId).then(res => {
            this.tableData = res.data.lesson;
            this.twsize = res.data.lesson.length
      })
    },
           // 音频通过状态查询
    selectaudio() {
        selectId("1","2",this.currentPage,this.selectId1).then(res => {
            this.tableData1 = res.data.lesson;
            console.log(res)
            this.ypsize = res.data.lesson.length
      })
    },
           // 视频通过状态查询
    selectvideo() {
        selectId("1","3",this.currentPage,this.selectId2).then(res => {
            this.tableData2 = res.data.lesson;
            this.spsize = res.data.lesson.length
      })
    },
    },
        components:{
            sidebar,
            Header,
            addImgText,
            addvideo,
            addaudio,
            // addlesson
        },
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
    