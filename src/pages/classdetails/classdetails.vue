<template>
    <el-scrollbar style="height:100%">
       <div class="box">
    <el-container>
      <el-header  style="    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 20px -10px #000;">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <sidebar></sidebar>
        </el-aside>
        <el-main>
            <router-link to="/classify">
          <span class="course" style="cursor: pointer;">内容分类</span>&nbsp;&nbsp;&nbsp;
        </router-link>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
        <span class="imgText">分类详情</span><br><br><br>
         <el-table
                ref="test"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                :header-cell-style="{background:'#f5f5f5',color:'#000'}"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="课程封面" >
                  <template slot-scope="scope">
                    <i class="img-box">
                      <img :src="'http://yckt.yichuangketang.com'+scope.row.img" alt />
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
                    <el-button type="text" size="small" @click="editimgtxt(scope.row.lessonid)">编辑</el-button>
                    <el-button type="text" size="small" @click="addlessons(scope.row.lessonid)">课程添加</el-button>
                  </template>
                </el-table-column>
              </el-table><br><br>
               <!-- 分页 -->
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="current_change"
                @current-page="currentPage"
                :page-size="pagesize"
                background
                layout="total, prev, pager, next"
                :total="this.lessonsize"
              ></el-pagination>
        </el-main>
      </el-container>
    </el-container>
  </div>
    </el-scrollbar>
</template>
<script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import {classlesson} from 'api/userAjax';
export default {
  data() {
    return {
        Id:'',
        tableData:[],
        currentPage: 1, //当前页
        pagesize: 5,
        lessonsize:0,
    };
  },
  created() {
this.getParams();
this.getdata();
  },
  methods: {
    //获取传值
    getParams() {
      var routerParams = this.$route.params.id;
      this.Id = routerParams;
    },
    // 分类课程列表展示
    getdata() {
      classlesson(this.Id,localStorage.getItem('ex2'),this.currentPage).then(res => {
        this.tableData = res.data.data.data;
        this.lessonsize = res.data.data.total;
      });
    },
    // 分页
    handleSizeChange(size) {
      this.pagesize = size;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
      this.getImgText();
    },
  },
  components: {
    sidebar,
    Header,
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
.course {
  font-size: 17px;
  font-family: PingFangSC-Medium;
  font-weight: 700;
  color: rgba(51, 51, 51, 1);
}
.imgText {
  font-size: 17px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
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
    