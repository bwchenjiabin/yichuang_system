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
        <el-main>
          <router-link to="/Order">
            <span class="course" style="cursor: pointer;">订单管理</span>
          </router-link>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
          <span class="imgText">订单列表</span><br><br>
          <div class="title">
            <i class="icon"></i>
            <span>课程订单</span>
          </div>
          <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              ref="multipleTable"
              :data="list"
              tooltip-effect="dark"
              order: string
              style="width: 100%"
              :header-cell-style="{background:'#f5f5f5',color:'#000'}">              
              <el-table-column
              label="商品封面"
              width="250">
              <template slot-scope="scope" >
                  <i class="img-box"><img :src="'http://yckt.yichuangketang.com'+scope.row.lesson.img" alt=""></i>
                    <span class="money">￥{{scope.row.lesson.lessonPriceFormer}}</span>
              </template>
              </el-table-column>
              <el-table-column
              prop="lesson.lessonName"
              label="商品名称"
              width="250">
              </el-table-column>
              <el-table-column
              prop="buyerId"
              label="买家"
              width="250">
              </el-table-column>
              <el-table-column
              prop="payTime"
              label="交易时间"
              show-overflow-tooltip>
              </el-table-column>
              <el-table-column
              prop="orderStatus"
              label="订单状态"
              show-overflow-tooltip>
              <template slot-scope="scope">
            <span>{{scope.row.orderStatus==1?"待支付":scope.row.orderStatus==2?"已完成":scope.row.orderStatus==3?"已关闭":''}}</span>
              </template>
              </el-table-column>
              <el-table-column
              prop="consumption"
              label="总价格"
              show-overflow-tooltip>
              <template slot-scope="scope" >
                ￥{{scope.row.orderAmount}}
            </template>
              </el-table-column>
              <el-table-column
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope"  >
                <el-button type="text" size="small" @click="open(scope.row)">查看详情</el-button>
              </template>
            </el-table-column>       
              
          </el-table><br><br>
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="current_change"
              @current-page="currentPage"
              :page-size="pagesize"
              background
              layout="total, prev, pager, next"
              :total="this.ordersize"
            ></el-pagination> 
        </el-main>
      </el-container>
    </el-container>
      <!-- 弹窗 -->
                <el-dialog title="订单详情" :visible.sync="delVisible" width="500px" center style="z-index: 999;text-align: left" :close-on-click-modal="false">                              
              <div class="del-dialog-cnt" v-loading="loading"
                                            element-loading-text="拼命加载中"><ul>
                  <li >
                      <span class="Order">订单编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{this.details.orderNumber}}</span><br><br>
                      <span class="Order">支付订单号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{this.details.escrowTradeNo}}</span><br><br>
                      <span class="Order">创建时间</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{this.details.payTime}}</span><br><br>
                      <span class="Order">成交时间</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">{{this.details.payEndTime}}</span><br><br>
                  </li></ul></div>
              <span slot="footer" class="dialog-footer">

                  <el-button type="primary"  @click="Close">确 定</el-button>

              </span>

          </el-dialog>
  </div>
    </el-scrollbar>
</template>
<script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import {orderlist} from 'api/userAjax';
import {orderdeteils} from 'api/userAjax';
export default {
  data() {
    return {
        Id:'', 
        Choice:[],
        list:[],
        delVisible:false,
        details: [],
        currentPage: 1, //图文当前页
        ordersize:0,
        pagesize: 5,
        ordernum:[],
        loading:true,
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
    // 订单列表展示
    getdata() {
        orderlist(this.Id,this.currentPage).then(res => {
            this.ordersize = res.data.data.total
            if (res.data.code == "0000") {
              this.list = res.data.data.data
              this.loading = false;
            }
            // console.log(this.list);
      })
    },
    // 订单详情
      getdatad () {
        orderdeteils(this.ordernum).then(res => {
           this.details = res.data
           this.loading = false;
      })
    },
    open(row) {
        this.ordernum = row.orderNumber
        this.delVisible = true;      
        this.getdatad();
      },
    Close() {
      this.delVisible = false;
    },
    // 分页
    handleSizeChange(size) {
      this.pagesize = size;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
      this.getdata();
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

.box {
  background: #f5f5f5;
}
.avatar-uploader{display: none;}
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
 .money{width:34px;height:12px;font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);line-height:24px;}
.hxj {
  margin-left: 100px;
}
.edit-title {
  padding: 15px;
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
 .box{background: #f5f5f5;}
 .el-tabs__item{padding: 0 50px;}.el-input{width: auto;}.icon{width: 6px;height: 17px;background: blue;float: left;margin-top: 3px;}
 .title{width: auto;display: block}.title span{margin-left: 10px;}.search{margin-right: 20px;}.inp1{margin-right: 40px;}.vip{margin-right: 40px;}
 .screen{margin-right: 40px;}
 .name{width:111px;height:40px;font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height:24px;display: inline-block;position: absolute;top: 20px;}
 .img-box{width: 100px;height: 75px;;display: inline-block;}.img-box img{width: 100%;height: 100%;}
 .money{width:34px;height:12px;font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);line-height:24px;}
 .number{width: 300px;text-align: left;display: inline-block;}
 .Order{width: 80px;display: inline-block;}
 .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>