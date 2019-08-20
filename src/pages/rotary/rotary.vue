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
        <addrotary v-show="isShows"></addrotary>
        <el-main v-show="isShow">
          <div class="title">
            <h4>轮播图</h4>
            <br>
            <br>
            <div class="cont">
              <i class="el-icon-warning"></i>
              <p>轮播图将在移动端首页顶部显示。最多设置3个轮播图，可对轮播图进行排序。</p>
            </div>
            <el-button
              type="primary"
              style="float: right;margin-right: 100px;"
              @click="switchs"
            >新增轮播</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="list"
            v-loading="loading"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{background:'#f5f5f5',color:'#000'}"
            @selection-change="changeFun"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="缩略图" width="250">
               <template slot-scope="scope">
                 <i class="img-box"><img :src="'http://yckt.yichuangketang.com:8081'+scope.row.img"  alt=""></i>
                <!-- <img :src="'http://yckt.yichuangketang.com:8081'+scope.row.img" alt style="width: 50px;height: 50px"> -->
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
            <el-table-column label="状态">
                  <template slot-scope="scope">
                      <span>{{scope.row.extendtwo==1?"显示":"隐藏"}}</span>
                  </template>
                </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="Clicksort(scope.row)">排序</el-button>
                <el-button type="text" size="small" @click="handleClicks(scope.row.id)">编辑</el-button>
                <el-button
                  size="small"
                  type="text"
                  @click.native.prevent="handleClick(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br>
          <br>
          <br>
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
          <br>
          <br>
          <el-button @click="getdatadel">删除</el-button>
          <br>
          <div class="sort">
            移动到第
            <input type="number" v-model="sort">
            位
            <br>
            <br>
            <el-button @click="Clicknone()">取 消</el-button>
            <el-button type="primary" @click="sortrota()">确 定</el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 单条删除提示 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt">确定要删除该条轮播图吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow()">确 定</el-button>
      </span>
    </el-dialog>
        <!-- 多条删除提示 -->
    <el-dialog title="提示" :visible.sync="delVisiblee" width="300px" center style="z-index: 999" :close-on-click-modal="false">
      <div class="del-dialog-cnt">确定要删除选中轮播图吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisiblee = false">取 消</el-button>
        <el-button type="primary" @click="deleteRows()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
    </el-scrollbar>
</template>
    <script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import addrotary from "@/components/addrotary/addrotary.vue";
import {rotary} from 'api/userAjax';
import {delrotary} from 'api/userAjax';
import {ddelrotary} from 'api/userAjax';
import {sortrotary} from 'api/userAjax';
export default {
  data() {
    return {
      isShow: true,
      isShows: false,
      delVisible: false,
      delVisiblee: false,
      checkBoxData: [], //多选框选择的值
      ada: [],
      currentPage: 1,
      pagesize: 5,
      loading:true,
      userList: [],
      number: [], //多选框的值
      userid: "", //单条删除的值
      list: [],
      sort:'',  //移动到第几位
      sortid:'',  //需要排序的id
      pageleng:0
    };
  },
  created() {
    this.getdata();
    this.reload();
  },
  methods: {
    //切换新增页面
    switchs() {
      this.isShow = false;
      this.isShows = true;
    },
    // 获取当行内容
    handleClicks(id) {
      this.$router.push({
        path: `/editrotary/${id}`
      });
    },
    Clicksort(row) {
      this.sortid = row.id
      $(".sort").css("display", "block");
    },
    Clicknone(row) {
      $(".sort").css("display", "none");
    },
    Clickthen(row) {
      $(".sort").css("display", "none");
    },
    //轮播排序
      sortrota() {
      $(".sort").css("display", "none");
        sortrotary({id:this.sortid,weight:this.sort}).then(res => {
          this.getdata();
           this.$message.success(res.data)
      })
    },
    //单条删除
    deleteRow() {
      this.delVisible = false;      
        delrotary(this.userid).then(res => {
          this.$message.success('删除成功')
            this.getdata();
      })
    },
    deleteRows() {
      if (this.checkBoxData == "") {
          this.$message.error('请至少选择一个轮播再进行操作') 
          return;       
      }
      this.delVisible = false;    
        ddelrotary({rollimageIds:this.checkBoxData.join(",")}).then(res => {
          this.$message.success('删除成功')
          this.delVisiblee = false;
            this.getdata();
      })
    },
    //多选值
    changeFun(val) {
      this.checkBoxData = val.map(item => item.id);
    },
    // 分页
    handleSizeChange(size) {
      this.pagesize = size;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
      this.getdata();
    },
    // 展示
    getdata() {
        rotary(localStorage.getItem('ex2'),this.currentPage).then(res => {
            this.loading = false;
            this.list = res.data.data.data;
            this.pageleng = res.data.data.total
      })
    },
    // 初始化回到顶部
    reload() {
     $('body,html').animate({scrollTop:0},200);
    },
    // 单条删除
    handleClick(row) {
      this.delVisible = true;
      this.userid = row.id;
    },
    // 多条删除
    getdatadel() {
      this.delVisiblee = true;
    }
  },
  components: {
    sidebar,
    Header,
    addrotary
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
  width: 95%;
  height: 100px;
  background: #fff;
  padding: 30px;
}
.cont {
  margin-top: 10px;
  margin-left: 40px;
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
  width: 70%;
  float: left;
}
.cont p {
  display: inline;
}
.del-dialog-cnt {
  text-align: center;
}
.box {
  background: #f5f5f5;
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
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 275px;
  height: 132px;
  line-height: 132px;
  text-align: center;
  background: rgba(251, 251, 251, 1);
  border: 1px dashed #d9d9d9;
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
.Choice ul li {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  height: 15px;
  padding: 20px;
}
.radio {
  margin-left: 125px;
}
.sort {
  text-align: center;
  margin-top: 30px;
  display: none;
}
.sort input {
  width: 50px;
  height: 25px;
  background: rgba(251, 251, 251, 1);
  border: 1px solid rgba(238, 238, 238, 1);
}
 .img-box{width: 100px;height: 75px;;display: inline-block;}.img-box img{width: 100%;height: 100%;}
.el-scrollbar__wrap {
   overflow-x: hidden;
 }
</style>