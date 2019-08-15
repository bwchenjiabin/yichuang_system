<template>
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
        <el-main>
          <h4>素材管理</h4>
          <br />
          <br />
          <br />
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="图片" name="first">
              <br />
              <h4>图片（共{{pageleng}}）</h4>
               <br />
              <br />
              <div class="headers">
                  <div class="delbtn" @click="deletebtn">
                    <i class="el-icon-delete"></i>
                    删除
                  </div>
              </div>
              <br />
              <br />
              <div class="content">
                <div class="list" v-for="(items,index) in checked" :key="index">
                  <div class="showbox"></div>
                  <img :src="'http://192.168.0.103:8081'+items.url" alt />
                  <div class="listfooter">
                    <label class="checkboxs">
                      <span class="spans">被引用{{items.quotetime}}次</span>

                      <el-checkbox-group
                        v-model="staffinfoForm.commdityTypeRelationid"
                        @change="handleCheckedCitiesChange">
                        <el-checkbox  :label="items.id"></el-checkbox>
                      </el-checkbox-group>
                    </label>
                  </div>
                </div>
              </div><br><br><br>
                    <!-- 分页 -->
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="current_change"
                @current-page="currentPage"
                :page-size="pagesize"
                background
                layout="total, prev, pager, next"
                :total="this.pageleng"
              ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="音频" name="second">

              <br />
              <h4>音频（共{{pageleng1}}）</h4>
               <br />
              <br />
              <div class="headers">
                  <div class="delbtn" @click="deletebtn">
                    <i class="el-icon-delete"></i>
                    删除
                  </div>
              </div>
              <br />
              <br />
              <div class="content">
                <div class="listAudio" v-for="(item,index) in checked1" :key="index">
                  <!-- <audio loop="loop" src="'http://192.168.0.103:8081'+item.url" id="xqt"></audio> -->
                  <audio ref="audio" class="dn" 
                  id="xqt"
                    :src="'http://192.168.0.103:8081'+item.url" :preload="preload"
                  ></audio>
                  <div class="audioinfo">
                    <i class="el-icon-video-play " @click="kaishi(item.url,index)" :class="{'el-icon-video-pause':active === index}" ></i>
                    <div class="audio-title">
                      <p class="audio-name">{{item.name}}</p>
                      <span class="audio-time">{{item.extend1}}</span>
                    </div>
                  </div>
                  <div class="listfooter">
                    <label class="checkboxs">
                      <span class="spans">被引用{{item.quotetime}}次</span>
                      <el-checkbox-group
                        v-model="staffinfoForm.commdityTypeRelationid"
                        @change="handleCheckedCitiesChange">
                        <el-checkbox :label="item.id"></el-checkbox>
                      </el-checkbox-group>
                    </label>
                    <!-- <span class="img-name">{{items.url}}</span> -->
                  </div>
                </div>
              </div><br><br><br>
                    <!-- 分页 -->
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="current_change1"
                @current-page="currentPage1"
                :page-size="pagesize"
                background
                layout="total, prev, pager, next"
                :total="this.pageleng1"
              ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="视频" name="third">

                <br />
              <h4>视频（共{{pageleng2}}）</h4>
               <br />
              <br />
              <div class="headers">
                  <div class="delbtn" @click="deletebtn">
                    <i class="el-icon-delete"></i>
                    删除
                  </div>
              </div>
              <br />
              <br />
              <div class="content">
                <div class="listAudio" v-for="(itema,index) in checked2" :key="index">
                  <!-- <audio loop="loop" src="'http://192.168.0.103:8081'+item.url" id="xqt"></audio> -->
                  <!-- <video ref="audio" 
                  >
                  <source :src="'http://192.168.0.103:8081'+itema.url" id="xqt" type="video/mp4" class="audioinfos">
                  </video> -->
                  <video controls class="audioinfos">
                  <source  :src="'http://192.168.0.103:8081'+itema.url" id="xqt" type="video/mp4" class="audioinfos">
                  <source  :src="'http://192.168.0.103:8081'+itema.url" id="xqt" type="video/ogg" class="audioinfos">
                  您的浏览器不支持 video 标签。
                </video>
                  <div >
                      <!-- <i class="el-icon-video-play " @click="kaishi(itema.url,index)" :class="{'el-icon-video-pause':active === index}" ></i> -->
                    <div class="audio-title">
                      <p class="audio-name">{{itema.name}}</p>
                      <span class="audio-time">{{itema.extend1}}</span>
                    </div>
                  </div>
                  <div class="listfooter">
                    <label class="checkboxs">
                      <span class="spans">被引用{{itema.quotetime}}次</span>

                      <el-checkbox-group
                        v-model="staffinfoForm.commdityTypeRelationid"
                        @change="handleCheckedCitiesChange">
                        <el-checkbox :label="itema.id"></el-checkbox>
                      </el-checkbox-group>
                    </label>

                  </div>
                </div>
              </div><br><br><br>
                    <!-- 分页 -->
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="current_change2"
                @current-page="currentPage2"
                :page-size="pagesize"
                background
                layout="total, prev, pager, next"
                :total="this.pageleng2"
              ></el-pagination>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
    <!-- 删除图文提示 -->
      <el-dialog title="提示" :visible.sync="Delete" width="300px" center style="z-index: 999" :close-on-click-modal="false">                      
        <div class="del-dialog-cnt">确定要删除选中素材吗？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Delete = false">取 消</el-button>
          <el-button type="primary" @click="handleClicks()" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
    <script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import { source } from "api/userAjax";
import { delsource } from "api/userAjax";
export default {
  data() {
    return {
      activeName: "first",
      staffinfoForm: {
        commdityTypeRelationid: []
      },
      checked: [],
      checked1: [],
      checked2: [],
      typeimg:'img',
      typeaudio:'audio',
      typevideo:'vedio',
      currentPage:1,
      currentPage1:1,
      currentPage2:1,
      pageleng:0,
      pageleng1:0,
      pageleng2:0,
      pagesize: 12,
      sourceid:[],
      audiourl:'',
      preload: 'auto',
      playing: false,  //是否自动播放
      isPlaying:false,
      urls:'',
      shows:true,
      shows1:false,
      active:'',
      Delete:false,
      sourstr:'',
    };
  },
  created() {
      this.getdata();
      this.getdata1()
      this.getdata2()
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleCheckedCitiesChange(val) {
      console.log(val)
      this.sourceid = val
      this.sourstr = this.sourceid.join(",")
      console.log(this.sourstr);
    },
    getdata() {
      source(localStorage.getItem("ex2"),this.typeimg,this.currentPage).then(res => {
        this.checked = res.data.data.img;
        this.pageleng = res.data.data.total;
        console.log(res)
      });
    },
        getdata1() {
      source(localStorage.getItem("ex2"),this.typeaudio,this.currentPage1).then(res => {
        this.checked1 = res.data.data.img;
        this.pageleng1 = res.data.data.total;
      });
    },
        getdata2() {
      source(localStorage.getItem("ex2"),this.typevideo,this.currentPage2).then(res => {
        this.checked2 = res.data.data.img;
        this.pageleng2 = res.data.data.total;
      });
    },
        // 分页
    handleSizeChange(size) {
      this.pagesize = size;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
      this.getdata();
    },
    current_change1: function(currentPage) {
      this.currentPage1 = currentPage;
      this.getdata1();
    },
    current_change2: function(currentPage) {
      this.currentPage2 = currentPage;
      this.getdata2();
    },
    deletebtn(){
        this.Delete = true;
    },
    checkedOne(val){
      console.log(val)
    },
    handleClicks(){
      delsource(this.sourstr).then(res => {
        this.sourstr = "",
        this.Delete = false;
          this.$message.success(res.data.msg);
          this.getdata();
          this.getdata1();
          this.getdata2();
      });
    },
    kaishi(val,index){
      this.urls = val
      this.active = index
      var player = document.getElementById('xqt');
      if (player != null) {
        if (this.isPlaying) {
          player.pause()
          player.src = "",
          this.active = "",
          this.isPlaying = false;
        }else {
          player.src = 'http://192.168.0.103:8081'+this.urls
          player.play();
          this.isPlaying = true;
        }
      } 
    },
    },
  components: {
    sidebar,
    Header
  }
};
</script>
    <style scoped>
    
.box {
  background: #f5f5f5;
}
.content {
  display: flex;
  flex-wrap: wrap;
  padding-left: 20px;
}
.list {
  width: 170px;
  height: 166px;
  margin: 0 26px 20px 0;
  border: solid 1px #ebebeb;
  box-shadow: none;
  border-radius: 0;
  background-color: #fafafa;
  flex-shrink: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.list:hover .showbox {
  display: block;
}
.list img {
  width: 100%;
  height: 126px;
  border-bottom: 1px solid #ebebeb;
  max-width: unset;
  max-height: unset;
}
.listfooter {
  height: 40px;
  background: #fafafa;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}
.spans{
  float: right;
  position: absolute;
  right: -115px;
}
.checkbox{
    opacity: 0;
    outline: 0;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    left: -999px;
}

.checkboxinner::after{
      width: 2px;
    height: 6px;
    top: 1px;
    left: 4px;
}
.checkboxs {
  outline: 0;
  line-height: 1;
  vertical-align: middle;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 10px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
}
.img-name {
  color: #333;
  font-size: 12px;
  width: 100px;
  overflow: hidden;
}
.showbox {
  background-color: #000;
  opacity: 0.2;
  width: 100%;
  height: 126px;
  position: absolute;
  top: 0;
  display: none;
}
.headers{
    height: 54px;
    width: 100%;
    padding-left: 10px;
    position: relative;
    display: flex;
    align-items: center;
    background-color: #FAFAFA;
}
.delbtn{
  cursor: pointer;
}
.listAudio{
    width: 300px;
    margin-right: 20px;
    margin-bottom: 20px;
    border: 1px solid #EBEBEB;
}
.audioinfo{
    height: 72px;
    padding: 18px 10px 18px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #EBEBEB;
    position: relative;
}

.audioinfos{
    width: 100%;
    height: 168px;
    display: flex;
    align-items: center;
    position: relative;
}
.audioinfo i:before {    
    display: inline-block;
    height: 22px;
    width: 22px;
    cursor: pointer;
    font-size: 30px;
}
.audio-title{
  margin-left: 15px;
}
.audio-name{
    width: 100%;
    flex-shrink: 0;
    flex-grow: 1;
    font-size: 12px;
    color: #333;
    margin-bottom: 10px;
}
.audio-time{
    position: absolute;
    right: 12px;
    bottom: 42px;
    font-size: 12px;
    color: #999;
}
.aas{
  display: none;
}
.active{
  color: red;
}
</style>