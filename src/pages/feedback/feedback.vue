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
          <h4>用户反馈</h4>
          <br />
          <br />

          <el-table
            :data="tableData"
            v-loading="loading"
            stripe
            style="width: 100%"
            :header-cell-style="{background:'#f5f5f5',color:'#000'}"
          >
            <el-table-column prop="businessNanme" label="用户昵称" ></el-table-column>
            <el-table-column prop="feedbackHead" label="反馈标题" ></el-table-column>
            <el-table-column prop="feedbackBody" label="反馈内容"></el-table-column>
            <el-table-column prop="time" label="反馈时间"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="current_change"
            @current-page="currentPage"
            :page-size="pagesize"
            background
            layout="total, prev, pager, next"
            :total="this.feedbacksize"
          ></el-pagination>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
    <script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import { feedback } from "api/userAjax";

export default {
  data() {
    return {
      tableData: [],
      loading:true,
      feedbacksize: 0,
      currentPage: 1, //图文当前页
      pagesize: 5,
    };
  },
  created() {
    this.reload();
    this.getdata();
  },
  methods: {
    handleSizeChange(size) {
      this.pagesize = size;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
      this.getdata();
    },
    getdata() {
      feedback(localStorage.getItem("ex2"),this.currentPage).then(res => {
        this.tableData = res.data.data.data;
        this.feedbacksize = res.data.data.total
        this.loading = false;
      });
    },
        // 初始化回到顶部
      reload() {
     $('body,html').animate({scrollTop:0},200);
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
</style>