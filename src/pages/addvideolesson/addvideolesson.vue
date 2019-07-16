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
          <router-link to="/content">
            <span class="course" style="cursor: pointer;">我的课程</span>
          </router-link>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
          <span class="imgText">新增课程</span>
          <div class="title">
            <i class="icon"></i>
            <span>课程信息</span>
            <br />
            <br />
            <br />
            <el-input placeholder="请输入章节标题" v-model="input" clearable class="inp2"></el-input>
            <el-button type="primary" class="btn1" @click="chapters()">添加章</el-button>
          </div>
          <div v-for="(item,index1) in courseDetail.chapters" :key="index1" class="content">
            <div class="cont-title">
              <span class="chapter">第{{index1+1}}章</span>
              <span class="chapter_name txt-cut">{{item.name}}</span>
              <el-button plain class="btn" @click="Popup(item.id);">+添加节</el-button>
              <i class="el-icon-delete icona" @click="delchapters(item.id)"></i>
              <i class="el-icon-edit-outline icona" @click="editmodify(item.id)"></i>
            </div>
            <div class="table" v-for="(node,index2) in item.sections" :key="index2">
              <ul>
                <li>
                  {{index1+1}}-{{index2+1}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {{node.name}}
                  <div class="icons">
                    <i class="el-icon-edit-outline" @click="Popupp(node.id),aa(item.id)"></i>&nbsp;&nbsp;&nbsp;
                    <i class="el-icon-delete" @click="delsections(node.id)"></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 新增音频弹窗 -->
    <el-dialog title :visible.sync="delVisible" width="600px" center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt">
        <span class="namea">标题</span>
        <el-input placeholder="请输入标题" v-model="input1" clearable maxlength="30"></el-input>
        <span class="number">{{this.input1.length}}/30</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-checkbox v-model="checked" @change="changes" value="0"  @click="this.value=(this.value==0)?1:0">是否试听</el-checkbox>
        <br />
        <br />
        <br />视频上传：&nbsp;&nbsp;&nbsp;
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="imageUrl"
          :on-success="handleAvatarSuccess"
          :file-list="fileList"
          :data="{
            chapterid:this.chapterid,
            name:this.input1,
            extend2:this.checkedss
          }"
          :limit="1"
          accept=".mp4,.avi,.webm"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpload()">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑音频弹窗 -->
    <el-dialog title :visible.sync="delVisiblee" width="600px" center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt">
        <span class="namea">标题</span>
        <el-input placeholder="请输入标题" v-model="input2" clearable maxlength="30"></el-input>
        <span class="number">{{this.input2.length}}/30</span>
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-checkbox v-model="checked1" @change="changes1" value="0"  @click="this.value=(this.value==0)?1:0">是否试听</el-checkbox>
        <br/>
        <br/>
        <br/>
             视频上传：&nbsp;&nbsp;&nbsp; <span>{{this.videoname}}</span>
             <el-upload
          class="upload-demo"
          ref="upload1"
          :action="imageUrl1"
          :on-success="handleAvatarSuccesss"
          :file-list="fileList1"
          :data="{
            id:this.sectionid,
            chapterid:this.chapterId,
            name:this.input2,
            extend2:this.checkedss1
          }"
          :limit="1"
          accept=".mp4,.avi,.webm"
          :auto-upload="false">
          
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
         </el-upload>   
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpload1(),editvideosections()">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑章名称弹窗 -->
    <el-dialog title :visible.sync="editmodifys" width="600px" center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt">
        <div class="edit-title">
          修改章名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-input placeholder="请输入新的章名称" v-model="input3" clearable maxlength="20"></el-input>
          <el-button type="primary" @click="editmodif()" style="margin-left:20px;">保 存</el-button>
        </div>
      </div>
    </el-dialog>
<!-- 删除章提示 -->
      <el-dialog title="提示" :visible.sync="Deletez" width="300px" center style="z-index: 999" :close-on-click-modal="false">                      
        <div class="del-dialog-cnt" style="text-align: center;">确定要删除该章吗？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Deletez = false">取 消</el-button>
          <el-button type="primary" @click="handleClicks()" >确 定</el-button>
      </span>
    </el-dialog>
         <!-- 删除节提示 -->
      <el-dialog title="提示" :visible.sync="Deletej" width="300px" center style="z-index: 999" :close-on-click-modal="false">                      
        <div class="del-dialog-cnt" style="text-align: center;">确定要删除该节吗？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Deletej = false">取 消</el-button>
          <el-button type="primary" @click="handleClicksj()" >确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>
    <script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import { ceshi } from "api/userAjax";
import { chapter } from "api/userAjax";
import { chaptsectioner } from "api/userAjax";
import { section } from "api/userAjax";
import { editsection } from "api/userAjax";
import { editvideosection } from 'api/userAjax';
import { delsection } from 'api/userAjax';
import { delchapter } from "api/userAjax";
import { querychapter } from "api/userAjax";
export default {
  data() {
    return {
      input: "", // 章名称
      input1: "", // 新增节标题
      input2: "", // 修改节标题
      delVisible: false, //新增弹窗
      delVisiblee: false, //编辑弹窗
      content: "", // 新增节
      content1: "", // 编辑节
      checked:false, // 是否试读
      checkedss:false, // 是否试读
      checked1:false, // 是否试读
      checkedss1:false, // 是否试读
      input3: "", // 修改章标题
      chapterids:'', // 获取章id
      editmodifys:false,  //修改章弹窗
      Deletez:false,   //删除章
      Deletej:false,   //删除节
      courseDetail: [],
      fileList:[],
      fileList1:[],
      videoname:'',
      delsectionID: "", //删除jieid
      delchapterID:'',  //删除章id
      imageUrl: "http://yckt.yichuangketang.com/section/insertSectionFile", // 上传地址
      imageUrl1:"http://yckt.yichuangketang.com:8081/section/updateSection",  //修改地址
      sectionid: "", //节ID
      chapterid: "", //章ID
      chapterId: "", //章ID
      Id: "",
      date: [],
      date1: [],
      date2: [],
      date3: [],
    };
  },
  created() {
    this.getParams();
    this.getdata();
  },
  methods: {
    //是否试听取值
    changes(val){
      this.checked = val
      if (this.checked == true) {
        this.checkedss = 1;
      }else{
        this.checkedss = 0;
      }
    },
    //是否试听取值
    changes1(val){
      this.checked1 = val
      if (this.checked1 == true) {
        this.checkedss1 = 1;
      }else{
        this.checkedss1 = 0;
      }
    },
    //获取传值
    getParams() {
      var routerParams = this.$route.params.id;
      this.Id = routerParams;
    },
    //删除节
      delsections(val){
        this.delsectionID = val
        this.Deletej = true;
        },
                handleClicks(){
          delsection(this.delsectionID).then(res => {
            this.$message.success(res.data)
            this.Deletej = false
            this.getdata()
      })  
    },
    //删除章
    delchapters(val) {
      this.delchapterID = val;
      this.Deletez = true;
     
    },
        handleClicks(){
 delchapter(this.delchapterID).then(res => {
        this.$message.success(res.data);
        this.Deletez = false;
        this.getdata();
      });
    },
      //修改
      submitUpload1() {
        this.$refs.upload1.submit();
      },
      //新增
    submitUpload() {
      this.$refs.upload.submit();
    },
    //文件上传成功
      handleAvatarSuccess(res, file) {
      this.delVisible = false
      this.$refs.upload.clearFiles()
      this.input1 = ""
      this.getdata();
      this.$message.success(res)
      console.log(file.size);
      },
      handleAvatarSuccesss(res, file) {
      this.delVisiblee = false
      this.$refs.upload.clearFiles()
      this.input2 = ""
      this.getdata();
      this.$message.success(res)
      },
    //测试
    getdata() {
      ceshi(this.Id).then(res => {
        this.courseDetail = res.data;
      });
    },
    //新增章
    chapters() {
      chapter(localStorage.getItem('ex2'), this.Id, this.input).then(res => {
        this.$message.success(res.data);
        this.getdata();
      }).catch(err => {
      this.$message.error(err)
    });
    },
    //修改节
      editvideosections(){
          editvideosection(this.sectionid,this.chapterId,this.input2).then(res => {
            this.getdata()
          this.delVisiblee = false;
          this.$message.success(res.data);
      })  
        },
    // 修改章名称
    editmodify(val) {
      this.chapterids = val
      this.editmodifys = true;
      querychapter(this.chapterids).then(res =>{
        this.input3 = res.data.name
      })
    },
    // 确认修改章名称
    editmodif(){
            chapter(localStorage.getItem("ex2"),this.Id, this.input3,this.chapterids)
        .then(res => {
          this.editmodifys = false;
          this.$message.success(res.data);
          this.getdata();
        })
        .catch(err => {
          this.$message.error(err);
        });
    },

    // 弹窗
    Popup(val) {
      this.chapterid = val; //章id
      this.delVisible = true;
    },
    aa(val) {
      this.chapterId = val;
    },
    Popupp(val) {
      this.sectionid = val   //节id
      this.delVisiblee = true;
      editsection(this.sectionid).then(res => {
        this.input2 = res.data.name
      }) 
    }
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
.icon {
  width: 6px;
  height: 17px;
  background: blue;
  float: left;
  margin-top: 3px;
}
.title {
  width: auto;
  display: block;
}
.title span {
  margin-left: 10px;
}
.name {
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
.text {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  display: inline;
}
.course {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 700;
  color: rgba(51, 51, 51, 1);
}
.imgText {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 132px;
  text-align: center;
  background: rgba(251, 251, 251, 1);
  border: 1px dashed #d9d9d9;
  width: 176px;
  height: 132px;
  margin-left: 70px;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.update {
  font-size: 28px;
  color: #8c939d;
  width: 275px !important;
  height: 178px;
  line-height: 132px;
  text-align: center;
  background: rgba(251, 251, 251, 1);
  border: 1px dashed #d9d9d9;
  width: 176px;
  height: 132px;
}
.update:hover {
  border-color: #409eff !important;
}
.inp {
  margin-left: 70px;
  width: 706px;
  height: 170px;
}
.content {
  padding: 20px;
}
.cont-tit {
  width: 600px;
  height: 70px;
  background: rgba(251, 251, 251, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  line-height: 70px;
  padding-left: 30px;
  display: inline-block;
}
.chapter {
  padding-right: 50px;
}
.inp2 {
  margin-left: 50px;
}
.inp3 {
  margin-left: 50px;
}
.btn {
  margin-left: 40px;
}
.btn1 {
  width: 120px;
  height: 50px;
  margin-left: 20px;
}
.table ul li {
  width: 630px;
  height: 60px;
  background: rgba(251, 251, 251, 0);
  line-height: 60px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  padding-left: 150px;
}
.table ul li:hover {
  background: rgba(251, 251, 251, 1);
}
.icons {
  float: right;
}
.icons i {
  width: 23px;
  height: 23px;
  cursor: pointer;
}
.cont-title {
  width: 750px;
  height: 70px;
  background: rgba(251, 251, 251, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  line-height: 70px;
  padding-left: 30px;
  display: inline-block;
}
.icona {
  cursor: pointer;
  width: 23px;
  height: 23px;
  float: right;
  margin-top: 28px;
}
.bt {
  color: #999999;
}
.money {
  width: 40px;
  height: 40px;
  background: rgba(238, 238, 238, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  text-align: center;
  line-height: 40px;
  display: inline-block;
}
.hxj {
  margin-left: 100px;
}
.gray {
  height: 50px;
  background: rgba(251, 251, 251, 1);
  line-height: 50px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  padding-left: 30px;
}
.Choice ul li {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  height: 15px;
  padding: 20px;
}
</style>