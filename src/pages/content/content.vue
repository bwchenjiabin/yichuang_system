<template>
<el-scrollbar style="height:100%">
    <div class="box">
    <el-container>
      <el-header style="    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 20px -10px #000;">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <sidebar></sidebar>
        </el-aside>
        <addImgText v-show="imgTexts"></addImgText>
        <addaudio v-show="audios"></addaudio>
        <addvideo v-show="videos"></addvideo>
        <el-main v-show="imgText">
          <el-tabs v-model="activeName">
            <el-tab-pane label="图文" name="first">
              <el-select v-model="valuesort" clearable placeholder="分类筛选" @change="sortSel">
                <el-option
                  v-for="item in Choice"
                  :key="item.value"
                  :label="item.label"
                  :value="item.kindName"
                ></el-option>
              </el-select>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              <el-select v-model="value" clearable placeholder="状态查询" @change="currentSel">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              <el-input placeholder="搜索关键词" v-model="input" clearable></el-input>
              <el-button type="info" plain @click="keywords()">筛选</el-button>
              <el-button
                type="primary"
                style="float:right;margin-right:150px;"
                @click="switcht"
              >新增图文</el-button>
              <br />
              <br />
              <br />
              <el-table
                ref="test"
                :data="tableData"
                v-loading="loading"
                element-loading-text="拼命加载中"
                tooltip-effect="dark"
                style="width: 100%"
                @sort-change ="sortchange"
                :header-cell-style="{background:'#f5f5f5',color:'#000'}"
                @selection-change="changeFun"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="课程封面" >
                  <template slot-scope="scope">
                    <i class="img-box">
                      <img :src="'http://yckt.yichuangketang.com:8081'+scope.row.img" alt />
                    </i>
                    <span class="money">￥{{scope.row.lessonPriceNow}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="lessonName" label="课程名称"></el-table-column>
                <el-table-column prop="upperoffTime" label="上架时间" sortable="custom"></el-table-column>
                <el-table-column prop="browseNumber" label="访客数" sortable="custom"></el-table-column>
                <el-table-column prop="tradeNumber" label="销量" sortable="custom">
                  <template slot-scope="scope">
                    <el-button @click="openDetails(scope.row.lessonid)" type="text" size="small">{{scope.row.tradeNumber}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column label="状态">
                  <template slot-scope="scope">
                      <span>{{scope.row.status==1?"上架":"下架"}}</span>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                  <template slot-scope="scope">
                    <!-- <el-button @click="handleClickssort(scope.row)" type="text" size="small">排序</el-button> -->
                    <el-button type="text" size="small" @click="editimgtxt(scope.row.lessonid)">编辑</el-button>
                    <el-button type="text" size="small" @click="addlessons(scope.row.lessonid)">课程添加</el-button>
                  </template>
                </el-table-column>
              </el-table><br><br>
              <div class="sort">
                  移动到第
                  <input type="number" v-model="sort">
                  位
                  <br>
                  <br>
                  <el-button @click="Clicknone()">取 消</el-button>
                  <el-button type="primary" @click="sortrota()">确 定</el-button>
              </div>
              <!-- 分页 -->
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="current_change"
                @current-page="currentPage"
                :page-size="pagesize"
                background
                layout="total, prev, pager, next"
                :total="this.twsize"
              ></el-pagination>
              <br />
              <br />
              <el-button @click="Upper()">上架</el-button>
              <el-button @click="lower()">下架</el-button>
              <el-button @click="dellessons()">删除</el-button>
            </el-tab-pane>
            <el-tab-pane label="音频" name="second">
              <el-select v-model="valuesort1" clearable placeholder="分类筛选" @change="sortSel1">
                <el-option
                  v-for="item in Choice"
                  :key="item.value"
                  :label="item.label"
                  :value="item.kindName"
                ></el-option>
              </el-select>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              <el-select v-model="value1" clearable placeholder="全部状态" @change="currentSel1">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              <el-input placeholder="搜索关键词" v-model="input1" clearable></el-input>
              <el-button type="info" plain @click="keywords1()">筛选</el-button>
              <el-button
                type="primary"
                style="float:right;margin-right:150px;"
                @click="switchy"
              >新增音频</el-button>
              <br />
              <br />
              <br />
              <el-table
                ref="multipleTable"
                v-loading="loading"
                element-loading-text="拼命加载中"
                :data="tableData1"
                tooltip-effect="dark"
                style="width: 100%"
                @sort-change ="sortchange1"
                :header-cell-style="{background:'#f5f5f5',color:'#000'}"
                @selection-change="changeFun1"
              >
                <el-table-column type="selection" width="55"></el-table-column>
               <el-table-column label="课程封面" >
                  <template slot-scope="scope">
                    <i class="img-box">
                      <img :src="'http://yckt.yichuangketang.com:8081'+scope.row.img" alt />
                    </i>
                    <span class="money">￥{{scope.row.lessonPriceNow}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="lessonName" label="课程名称"></el-table-column>
                <el-table-column prop="upperoffTime" label="上架时间" sortable="custom"></el-table-column>
                <el-table-column prop="browseNumber" label="访客数" sortable="custom"></el-table-column>
                 <el-table-column prop="tradeNumber" label="销量" sortable="custom">
                  <template slot-scope="scope">
                    <el-button @click="openDetails(scope.row.lessonid)" type="text" size="small">{{scope.row.tradeNumber}}</el-button>
                  </template>
                </el-table-column>
                 <el-table-column label="状态">
                  <template slot-scope="scope">
                      <span>{{scope.row.status==1?"上架":"下架"}}</span>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                  <template slot-scope="scope">
                    <!-- <el-button @click="handleClickssort(scope.row)" type="text" size="small">排序</el-button> -->
                    <el-button type="text" size="small" @click="editaudio(scope.row.lessonid)">编辑</el-button>
                    <el-button type="text" size="small" @click="addaudiolesson(scope.row.lessonid)" >课程添加</el-button>
                  </template>
                </el-table-column>
              </el-table><br><br>
              <div class="sort">
                  移动到第
                  <input type="number" v-model="sort">
                  位
                  <br>
                  <br>
                  <el-button @click="Clicknone()">取 消</el-button>
                  <el-button type="primary" @click="sortrota()">确 定</el-button>
              </div>
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
              <br />
              <br />
              <el-button @click="Upper1()">上架</el-button>
              <el-button @click="lower1()">下架</el-button>
              <el-button @click="dellessons1()">删除</el-button>
            </el-tab-pane>
            <el-tab-pane label="视频" name="third">
              <el-select v-model="valuesort2" clearable placeholder="分类筛选" @change="sortSel2">
                <el-option
                  v-for="item in Choice"
                  :key="item.value"
                  :label="item.label"
                  :value="item.kindName"
                ></el-option>
              </el-select>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              <el-select v-model="value2" clearable placeholder="全部状态" @change="currentSel2">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
                &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              <el-input placeholder="搜索关键词" v-model="input2" clearable></el-input>
              <el-button type="info" plain @click="keywords2()">筛选</el-button>
              <el-button
                type="primary"
                style="float:right;margin-right:150px;"
                @click="switchs"
              >新增视频</el-button>
              <br />
              <br />
              <br />
              <el-table
                ref="multipleTable"
                :data="tableData2"
                v-loading="loading"
                element-loading-text="拼命加载中"
                tooltip-effect="dark"
                style="width: 100%"
                :header-cell-style="{background:'#f5f5f5',color:'#000'}"
                @sort-change ="sortchange2"
                @selection-change="changeFun2"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="课程封面" >
                  <template slot-scope="scope">
                    <i class="img-box">
                      <img :src="'http://yckt.yichuangketang.com:8081'+scope.row.img" alt />
                    </i>
                    <span class="money">￥{{scope.row.lessonPriceNow}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="lessonName" label="课程名称"></el-table-column>
                <el-table-column prop="upperoffTime" label="上架时间" sortable="custom"></el-table-column>
                <el-table-column prop="browseNumber" label="访客数" sortable="custom"></el-table-column>
                 <el-table-column prop="tradeNumber" label="销量" sortable="custom">
                  <template slot-scope="scope">
                    <el-button @click="openDetails(scope.row.lessonid)" type="text" size="small">{{scope.row.tradeNumber}}</el-button>
                  </template>
                </el-table-column>
                 <el-table-column label="状态">
                  <template slot-scope="scope">
                      <span>{{scope.row.status==1?"上架":"下架"}}</span>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                  <template slot-scope="scope">
                    <!-- <el-button @click="handleClickssort(scope.row)" type="text" size="small">排序</el-button> -->
                    <el-button type="text" size="small" @click="editvideo(scope.row.lessonid)">编辑</el-button>
                    <el-button type="text" size="small" @click="addvideolesson(scope.row.lessonid)">课程添加</el-button>
                  </template>
                </el-table-column>
              </el-table><br><br>
              <div class="sort">
                  移动到第
                  <input type="number" v-model="sort">
                  位
                  <br>
                  <br>
                  <el-button @click="Clicknone()">取 消</el-button>
                  <el-button type="primary" @click="sortrota()">确 定</el-button>
              </div>
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
              <br />
              <br />
              <el-button @click="Upper2()">上架</el-button>
              <el-button @click="lower2()">下架</el-button>
              <el-button @click="dellessons2()">删除</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
 <!-- 删除图文提示 -->
      <el-dialog title="提示" :visible.sync="Delete" width="300px" center style="z-index: 999" :close-on-click-modal="false">                      
        <div class="del-dialog-cnt">确定要删除选中课程吗？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Delete = false">取 消</el-button>
          <el-button type="primary" @click="handleClicks()" >确 定</el-button>
      </span>
    </el-dialog>
<!-- 删除音频提示 -->
<el-dialog title="提示" :visible.sync="Delete1" width="300px" center style="z-index: 999" :close-on-click-modal="false">                      
  <div class="del-dialog-cnt">确定要删除选中课程吗？</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="Delete1 = false">取 消</el-button>
    <el-button type="primary" @click="handleClicks1()" >确 定</el-button>
</span>
</el-dialog>
<!-- 删除视频提示 -->
<el-dialog title="提示" :visible.sync="Delete2" width="300px" center style="z-index: 999" :close-on-click-modal="false">                      
  <div class="del-dialog-cnt">确定要删除选中课程吗？</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="Delete2 = false">取 消</el-button>
    <el-button type="primary" @click="handleClicks2()" >确 定</el-button>
</span>
</el-dialog>
  </div>
</el-scrollbar>

</template>
    <script>
import Sortable from "sortablejs";
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import addImgText from "@/components/addImgText/addImgText.vue";
import addvideo from "@/components/addvideo/addvideo.vue";
import addaudio from "@/components/addaudio/addaudio.vue";
import { ImgText } from "api/userAjax";
import { audio } from "api/userAjax";
import { video } from "api/userAjax";
import { selectId } from "api/userAjax";
import { UpperShelf } from "api/userAjax";
import { lowerShelf } from "api/userAjax";
import { dellesson } from "api/userAjax";
import {checkclass} from 'api/userAjax';
export default {
  data() {
    return {
      imgTexts: false, //切换图文
      imgText: true, //切换图文
      audios: false, //切换音频
      videos: false, //切换视频
      Delprompt: false, //删除提示
      activeName: "first", //默认先显示图文
      checkBoxData: [], //TW多选框选择的值
      checkBoxData1: [], //YP多选框选择的值
      checkBoxData2: [], //SP多选框选择的值.
      number: [],
      numbera: [],
      numberb: [],
      value: "", //图文状态
      valuesort: "", //图文分类
      valuesort1: "", //音频分类
      valuesort2: "", //视频分类
      value1: "", //音频状态
      value2: "", //视频状态
      input: "",   //图文关键词
      input1: "",   //音频关键词
      input2: "",   //视频关键词
      sort:'',
      loading:true,
      custom:true,
      Choice:'',
      delVisible: false,
      currentPage: 1, //图文当前页
      currentPage1: 1, //音频当前页
      currentPage2: 1, //视频当前页
      pagesize: 5,
      userList: [],
      tableData: [],
      tableData1: [],
      tableData2: [],
      sortid:[],  // 图文分类下拉值
      sortid1:[],  // 音频分类下拉值
      sortid2:[],  // 视频分类下拉值
      twsize: 0,
      ypsize: 0,
      spsize: 0,
      editTwid: "", //修改图文的id
      Delete:false,   // 删除图文课程
      Delete1:false,   // 删除音频课程
      Delete2:false,   // 删除视频课程
      property:'',  // 排序的字段名
      order:'',  // 排序的规则
      property1:'',  // 排序的字段名
      order1:'',  // 排序的规则
      property2:'',  // 排序的字段名
      order2:'',  // 排序的规则
      options: [
        {
          //图文状态值
          value: "1",
          label: "上架中"
        },
        {
          value: "2",
          label: "下架中"
        }
      ],
      options1: [
        {
          //音频状态值
          value: "选项1",
          label: "上架中"
        },
        {
          value: "选项2",
          label: "下架中"
        }
      ],
      options2: [
        {
          //视频状态值
          value: "选项1",
          label: "上架中"
        },
        {
          value: "选项2",
          label: "下架中"
        }
      ],
      selectId: [], //图文选中的下拉值
      selectId1: [], //图文选中的下拉值
      selectId2: [] //图文选中的下拉值
    };
  },
  created() {
    this.reload();
    this.getImgText();
    this.getaudio();
    this.getvideo();
    this.getdata();
  },
  mounted(){
    
  },
  methods: {
    // 排序 
    sortByDate(){

    },
    // 查询分类
    getdata() {
        checkclass(localStorage.getItem('ex2')).then(res => {
            this.Choice = res.data;
      })
    },
    //编辑图文
    editimgtxt(id) {
      this.editTwid = id;
      this.$router.push({
        path: `/editImgText/${id}`
      });
    },
    // 进入订单详情
    openDetails(id){
      this.editTwid = id;
      this.$router.push({
        path: `/orderlist/${id}`
      });
    },
    // 初始化回到顶部
      reload() {
     $('body,html').animate({scrollTop:0},200);
    },
    //编辑音频
    editaudio(id) {
      this.editTwid = id;
      this.$router.push({
        path: `/editaudio/${id}`
      });
    },
    //编辑视频
    editvideo(id) {
      this.editTwid = id;
      this.$router.push({
        path: `/editvideo/${id}`
      });
    },

    //删除图文课
    dellessons() {

      this.Delete = true;
   
    },
    //删除音频课
        dellessons1() {
      this.Delete1 = true;
    },
    // 删除视频课
        dellessons2() {
      this.Delete2 = true;
    },
    // 获取图文下拉菜单值
    currentSel(val) {
      this.selectId = val;
      this.selectImgText();
    },
    // 获取图文分类下拉菜单值
    sortSel(val) {
      this.sortid = val;
      this.sortImgText();
    },
    // 获取音频分类下拉菜单值
    sortSel1(val) {
      this.sortid1 = val;
      this.sortaudio();
    },
    // 获取视频分类下拉菜单值
    sortSel2(val) {
      this.sortid2 = val;
      this.sortvideo();
    },
    // 获取音频下拉菜单值
    currentSel1(val) {
      this.selectId1 = val;
      this.selectaudio();
      
    },
    // 获取视频下拉菜单值
    currentSel2(val) {
      this.selectId2 = val;
      this.selectvideo();
    },
    //新增图文切换
    switcht() {
      this.imgText = false;
      this.imgTexts = true;
    // this.$router.push({
    //       path: `/addImgText`,
    //     });
    },
    switchtt() {
      this.imgText = true;
      this.imgTexts = false;
    // this.$router.push({
    //       path: `/addImgText`,
    //     });
    },
    //新增音频
    switchy() {
      this.imgText = false;
      this.audios = true;
    },
    //新增视频
    switchs() {
      this.imgText = false;
      this.videos = true;
    },

    //课程排序
    handleClickssort(row) {
      $(".sort").css("display", "block");
    },
    Clicknone(row) {
      $(".sort").css("display", "none");
      this.sort = "";
    },
    Clickthen(row) {
      $(".sort").css("display", "none");
      this.sort = "";
    },
    // 删除图文课程
    handleClicks(row) {
    if (this.checkBoxData == "") {
          this.$message.error('请至少选择一个课程再进行操作') 
          return;        
      }
   dellesson(this.checkBoxData.join(",")).then(res => {
        console.log(this.checkBoxData)
        this.$message.success(res.data)
        this.Delete = false;
        this.getImgText();
      }).catch(err => {
      this.$message.error(err)
    });
},
    handleClicks1(row) {
    if (this.checkBoxData1 == "") {
          this.$message.error('请至少选择一个课程再进行操作') 
          return;        
      }
      dellesson(this.checkBoxData1.join(",")).then(res => {
        this.$message.success(res.data)
        this.Delete1 = false;
        this.getaudio();
      }).catch(err => {
      this.$message.error(err)
    });
},
    handleClicks2(row) {
    if (this.checkBoxData2 == "") {
          this.$message.error('请至少选择一个课程再进行操作') 
          return;        
      }
      dellesson(this.checkBoxData2.join(",")).then(res => {
        this.$message.success(res.data)
        this.Delete2 = false;
        this.getvideo();
      }).catch(err => {
      this.$message.error(err)
    });
},
    // 获取图文课程id
    addlessons(id) {
      this.$router.push({
        path: `/addlesson/${id}`
      });
    },
    // 获取音频课程id
    addaudiolesson(id) {
      this.$router.push({
        path: `/addaudiolesson/${id}`
      });
    },
    // 获取视频课程id
    addvideolesson(id) {
      this.$router.push({
        path: `/addvideolesson/${id}`
      });
    },

    //展开弹窗
    del() {
      this.Delprompt = true;
    },
    //TW上架
    Upper() {
      if (this.checkBoxData == "") {
          this.$message.error('请至少选择一个课程再进行操作') 
          return;        
      }
      UpperShelf(this.checkBoxData.join(",")).then(res => {
        this.$message.success(res.data)
        this.getImgText();
      }).catch(err => {
      this.$message.error(err)
    });
    },
    //YP上架
    Upper1() {
      if (this.checkBoxData1 == "") {
          this.$message.error('请至少选择一个课程再进行操作') 
          return;        
      }
      UpperShelf(this.checkBoxData1.join(",")).then(res => {
        this.$message.success(res.data)
        this.getaudio();
      }).catch(err => {
      this.$message.error(err)
    });
    },
    //SP上架
    Upper2() {
      if (this.checkBoxData2 == "") {
          this.$message.error('请至少选择一个课程再进行操作') 
          return;        
      }
      UpperShelf(this.checkBoxData2.join(",")).then(res => {
        this.$message.success(res.data)
        this.getvideo();
      }).catch(err => {
      this.$message.error(err)
    });
    },
    //TW下架
    lower() {
      if (this.checkBoxData == "") {
          this.$message.error('请至少选择一个课程再进行操作') 
          return;        
      }
      lowerShelf({ lessonIds: this.checkBoxData.join(",") }).then(res => {
        this.$message.success(res.data)
        this.getImgText();
      }).catch(err => {
      this.$message.error(err)
    });
    },
    //YP下架
    lower1() {
      if (this.checkBoxData1 == "") {
          this.$message.error('请至少选择一个课程再进行操作') 
          return;        
      }
      lowerShelf({ lessonIds: this.checkBoxData1.join(",") }).then(res => {
        this.$message.success(res.data)
        this.getaudio();
      }).catch(err => {
      this.$message.error(err)
    });
    },
    //SP下架
    lower2() {
      if (this.checkBoxData2 == "") {
          this.$message.error('请至少选择一个课程再进行操作') 
          return;        
      }
      lowerShelf({ lessonIds: this.checkBoxData2.join(",") }).then(res => {
        this.$message.success(res.data)
        this.getvideo();
      }).catch(err => {
      this.$message.error(err)
    });
    },

    //图文获取多选值
      changeFun(val) {
      this.checkBoxData = val.map(item => item.lessonid);
      console.log(this.checkBoxData);
    },
    //音频获取多选值
      changeFun1(val) {
      this.checkBoxData1 = val.map(item => item.lessonid);
    },
    //视频获取多选值
      changeFun2(val) {
      this.checkBoxData2 = val.map(item => item.lessonid);

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
      ImgText(localStorage.getItem("ex2"), "1", this.currentPage,this.property,this.order,this.selectId,this.sortid,this.input).then(res => {
        this.loading = false;
        this.tableData = res.data.data.data;
        this.twsize = res.data.data.total;
      });
    },
    // 音频查询
    getaudio() {
      audio(localStorage.getItem("ex2"), "2", this.currentPage1,this.property1,this.order1,this.selectId1,this.sortid1,this.input1).then(res => {
        this.loading = false;
        this.tableData1 = res.data.data.data;
        this.ypsize = res.data.data.total;
      });
    },
    // 视频查询
    getvideo() {
      video(localStorage.getItem("ex2"), "3", this.currentPage2,this.property2,this.order2,this.selectId2,this.sortid2,this.input2).then(res => {
        this.loading = false;
        this.tableData2 = res.data.data.data;
        this.spsize = res.data.data.total;
      });
    },
    // // 图文通过分类查询
      sortImgText() {
          ImgText(localStorage.getItem("ex2"), "1", this.currentPage,this.property,this.order,this.selectId,this.sortid,this.input).then(res => {
        this.tableData = res.data.data.data;
        this.twsize = res.data.data.total;
        this.$message.success(res.data.msg)
      });
    },
    //     // 音频通过分类查询
      sortaudio() {
    audio(localStorage.getItem("ex2"), "2", this.currentPage1,this.property1,this.order1,this.selectId1,this.sortid1,this.input1).then(res => {
        this.tableData1 = res.data.data.data;
        this.$message.success(res.data.msg)
        this.ypsize = res.data.data.total;
      });
    },
    //   // 视频通过分类查询
      sortvideo() {
         video(localStorage.getItem("ex2"), "3", this.currentPage2,this.property2,this.order2,this.selectId2,this.sortid2,this.input2).then(res => {
        this.tableData2 = res.data.data.data;
        this.spsize = res.data.data.total;
        this.$message.success(res.data.msg)
      });
    },
    // 图文通过状态查询
    selectImgText() {
     ImgText(localStorage.getItem("ex2"), "1", this.currentPage,this.property,this.order,this.selectId,this.sortid,this.input).then(res => {
        this.tableData = res.data.data.data;
        this.twsize = res.data.data.total;
        this.$message.success(res.data.msg)
      });
    },
    // 音频通过状态查询
    selectaudio() {
 audio(localStorage.getItem("ex2"), "2", this.currentPage1,this.property1,this.order1,this.selectId1,this.sortid1,this.input1).then(res => {
        this.tableData1 = res.data.data.data;
        this.$message.success(res.data.msg)
        this.ypsize = res.data.data.total;
      });
    },
    // 视频通过状态查询
    selectvideo() {
  video(localStorage.getItem("ex2"), "3", this.currentPage2,this.property2,this.order2,this.selectId2,this.sortid2,this.input2).then(res => {
        this.tableData2 = res.data.data.data;
        this.spsize = res.data.data.total;
        this.$message.success(res.data.msg)
      });
    },
  // 图文关键词搜索
    keywords(){
        ImgText(localStorage.getItem("ex2"), "1", this.currentPage,this.property,this.order,this.selectId,this.sortid,this.input).then(res => {
        this.tableData = res.data.data.data;
        this.twsize = res.data.data.total;
        this.$message.success(res.data.msg)
      });
    },
      // 音频关键词搜索
    keywords1(){
     audio(localStorage.getItem("ex2"), "2", this.currentPage1,this.property1,this.order1,this.selectId1,this.sortid1,this.input1).then(res => {
        this.tableData1 = res.data.data.data;
        this.$message.success(res.data.msg)
        this.ypsize = res.data.data.total;
      });
    },
      // 视频关键词搜索
    keywords2(){
      video(localStorage.getItem("ex2"), "3", this.currentPage2,this.property2,this.order2,this.selectId2,this.sortid2,this.input2).then(res => {
        this.tableData2 = res.data.data.data;
        this.spsize = res.data.data.total;
        this.$message.success(res.data.msg)
      });
    },
    // 图文排序
    sortchange(column, prop, order){
      this.property = column.column.property
      this.order = column.order
      this.getImgText();
    },
        // 图文排序
    sortchange1(column, prop, order){
      this.property1 = column.column.property
      this.order1 = column.order
      this.getaudio();
    },
        // 图文排序
    sortchange2(column, prop, order){
      this.property2 = column.column.property
      this.order2 = column.order
      this.getvideo();
    },
  },
  components: {
    sidebar,
    Header,
    addImgText,
    addvideo,
    addaudio
    // addlesson
  }
};
</script>
    <style scoped>
.box {
  background: #f5f5f5;
}
h3 {
  display: inline;
}
.title {
  padding: 20px;
}
.cont li {
  width: 300px;
  height: 200px;
  background: #f4f4f4 100%;
  float: left;
  margin-right: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bq {
  width: 60px;
  height: 24px;
  line-height: 20px;
  border-radius: 1px;
  text-align: center;
  border: 1px solid rgba(0, 101, 255, 1);
  color: #0065ff;
  font-size: 14px;
  margin-left: 10px;
}
.el-tabs__item {
  padding: 0 50px;
}
.el-input {
  width: auto;
}
.name {
  width: 111px;
  height: 40px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  display: inline-block;
  position: absolute;
  top: 20px;
}
.img-box {
  width: 100px;
  height: 75px;
  display: inline-block;
}
.img-box img {
  width: 100%;
  height: 100%;
}
.money {
  width: 34px;
  height: 12px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 24px;
}
.namea {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-right: 15px;
}
.number {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.el-input[data-v-52a5028a] {
  width: auto;
}
.del-dialog-cnt {
  text-align: center;
}
.sort {
  display: none;
  text-align: center;
  margin-top: 30px;
}
.sort input {
  width: 50px;
  height: 25px;
  background: rgba(251, 251, 251, 1);
  border: 1px solid rgba(238, 238, 238, 1);
}
 .el-scrollbar__wrap {
   overflow-x: hidden;
 }
</style>
    