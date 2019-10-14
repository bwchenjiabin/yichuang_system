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
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="我的账户" name="account">
                <div class="gray">
                    <ul class="cont">
                        <li>
                        <div class="dd">
                            <span class="dd_tit">累计收入（元）</span>
                            <br />
                            <br />
                            <h3>{{num.sturnover}}</h3>
                        </div>
                        </li>
                        <li>
                        <div class="dd">
                            <span class="dd_tit">可提现金额（元）</span>
                            <br />
                            <br>
                            <h3>{{num.platformBalance}}</h3>
                            <br />
                        </div>
                        </li>
                        <li>
                        <div class="dd">
                            <span class="dd_tit">待审核金额（元）</span>
                            <br />
                            <br>
                            <h3>{{num.cashouting}}</h3>
                            <br />
                        </div>
                        </li>
                        <li>
                        <div class="dd">
                            <span class="dd_tit">待结算金额（元）</span>
                            <br />
                            <br>
                            <h3>{{num.daishenhe}}</h3>
                            <br />
                        </div>
                        </li>
                        <li style="margin-left: 40%;">
                            <div class="dd">
                                <el-button type="primary" style="margin-top:60px;" @click="Popup">提 现</el-button>
                                <br>
                                <br>
                            </div>
                        </li>
                    </ul>
                </div><br>
                <div class="minxi">
                    <span>近期账单明细</span>
                    <el-button plain style="position: absolute;right: 10%;" @click="bill">查看全部账单</el-button>
                </div><br>
                <el-table
            :data="acctionData"
            v-loading="loading"
            element-loading-text="拼命加载中"
            stripe
            style="width: 100%"
            :header-cell-style="{background:'#f5f5f5',color:'#000'}"
          >
            <el-table-column prop="billDate" label="时间" ></el-table-column>
            <el-table-column prop="billTypeName" label="类型" ></el-table-column>
            <el-table-column prop="billName" label="商品名称|商品类型"></el-table-column>
            <el-table-column prop="orderNumber" label="支付方式|订单号"></el-table-column>
            <el-table-column prop="billMoney" label="入账/支出（元）"></el-table-column>
            <el-table-column prop="time" label="操作"></el-table-column>
          </el-table>
          <el-pagination
        @size-change="handleSizeChange"
        @current-change="current_change"
        :current-page="currentPage"
        :page-size="pagesize"
        background
        layout="total, prev, pager, next"
        :total="this.size"
    ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="提现管理" name="Presentation">
                <div class="gray">
                    <ul class="cont">
                        <li>
                        <div class="dd">
                            <span class="dd_tit">提现总额（元）</span>
                            <br />
                            <br />
                            <h3>{{num.tatalCashOut}}</h3>
                        </div>
                        </li>
                    </ul>
                </div><br>
                <div class="minxi">
                    <span>近期账单明细</span>
                    <el-select v-model="value" clearable placeholder="状态查询" style="position: absolute;right: 15%;">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-button plain style="position: absolute;right: 10%;">搜索</el-button>
                </div><br>
                <el-table
            :data="cashData"
            v-loading="loading"
            element-loading-text="拼命加载中"
            stripe
            style="width: 100%"
            :header-cell-style="{background:'#f5f5f5',color:'#000'}">
            <el-table-column prop="createtime" label="申请时间" ></el-table-column>
            <el-table-column prop="receiveaccount" label="到账账号" ></el-table-column>
            <el-table-column prop="receivabletype" label="账户类型"></el-table-column>
            <el-table-column prop="money" label="提现金额（元）"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="remark" label="提现备注"></el-table-column>
            <el-table-column prop="updateby" label="操作人"></el-table-column>
            <el-table-column prop="tradenumber" label="交易流水"></el-table-column>
          </el-table>
          <el-pagination
        @size-change="handleSizeChange"
        @current-change="current_change"
        :current-page="currentPage"
        :page-size="pagesize"
        background
        layout="total, prev, pager, next"
        :total="this.size"
    ></el-pagination>
            </el-tab-pane>
         </el-tabs>
        </el-main>
      </el-container>
    </el-container>
     <el-dialog title="提现" :visible.sync="delVisible" width="500px" center style="z-index: 999;text-align: left" :close-on-click-modal="false">                                
              <div class="del-dialog-cnt">
                <div class="inp_count">
                    <span class="name">提现金额（元）:</span>
                    <el-input
                    v-model="money"
                    style="width: 50%;"
                    >
                    </el-input>    
                </div>
                <br>
                <div class="inp_count">
                    <span class="name">提现方式：</span>
                <el-select v-model="value" clearable placeholder="选择" style="width: 50%;" @change="cashnum">
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.typename"
                        :value="item.id"
                        ></el-option>
                </el-select>
                </div><br>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="delVisible = false">取 消</el-button>
                  <el-button type="primary" @click="cash">确 定</el-button>
              </span>
          </el-dialog>
  </div>
  </el-scrollbar>
</template>
<script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import {preview,Myaccount,CashMethod,cashDetailed,Cashwithdrawal,acctionDetailed} from 'api/userAjax';

export default {
  data() {
    return {
      activeName: 'account',
      loading:false,
      num:{},
      acctionData:[],
      cashData:[],
      currentPage:1,
      pagesize:5,
      size:0,
      options: [],
      value:'',
      value1:'',
      modifyName:'',
      delVisible:false,
      money:'',
      typeId:'',
    };
  },
  created() {
    this.reload();
    this.getdata();
  },
  methods: {
     handleClick(tab, event) {
        if (this.activeName == 'account') {
          acctionDetailed({accountId:localStorage.getItem('ex2'),pageNum:this.currentPage,pageSize:this.pagesize}).then(res => {
          this.acctionData = res.data.data.list
          this.size = res.data.data.total
      })
        }else{
          cashDetailed({accountid:localStorage.getItem('ex2'),pageNum:this.currentPage,pageSize:this.pagesize,type:'2'}).then( res => {
            this.cashData = res.data.data.list
            this.size = res.data.data.total
          })
        }
      },
    reload() {
     $('body,html').animate({scrollTop:0},200);
    },
        // 弹窗
    Popup(){
      if (this.num.platformBalance == 0) {
          this.delVisible = false
         this.$message.error('您的余额为0元，需大于0元方可提现');
      }else{
      this.delVisible =true
      }
    },
    bill(){
      this.activeName = 'Presentation' 
    },
    getdata(){
      Myaccount({accountId:localStorage.getItem('ex2')}).then( res => {
          this.num = res.data.data;
      })
      CashMethod({accountid:localStorage.getItem('ex2'),ifAll:'0'}).then( res => {
          this.options = res.data.data.list
      })
      // cashDetailed({accountid:localStorage.getItem('ex2'),pageNum:this.currentPage,pageSize:this.pagesize,type:'2'}).then( res => {
      //     this.cashData = res.data.data.list
      //     this.size = res.data.data.total
      // })
      acctionDetailed({accountId:localStorage.getItem('ex2'),pageNum:this.currentPage,pageSize:this.pagesize}).then(res => {
        console.log(res);
          this.acctionData = res.data.data.list
          this.size = res.data.data.total
      })
    },
    cash(){
      Cashwithdrawal({accountid:localStorage.getItem('ex2'),money:this.money,receivabletype:this.typeId}).then( res => {
        if (res.data.code == "0000") {
          this.$message.success(res.data.msg);
          this.delVisible =false
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    cashnum(value){
      this.typeId = value
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    
    current_change: function(currentPage) {
      this.currentPage = currentPage;
      if (this.activeName == 'account') {
        acctionDetailed({accountId:localStorage.getItem('ex2'),pageNum:this.currentPage,pageSize:this.pagesize}).then(res => {
        console.log(res);
          this.acctionData = res.data.data.list
          this.size = res.data.data.total
      })
      }else{
        cashDetailed({accountid:localStorage.getItem('ex2'),pageNum:this.currentPage,pageSize:this.pagesize,type:'2'}).then( res => {
          this.cashData = res.data.data.list
          this.size = res.data.data.total
      })
      }
      // this.getdata();
    },

  },
  components: {
    sidebar,
    Header
  }
};
</script>
<style scoped>
.course {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 700;
  color: rgba(51, 51, 51, 1);
}
.inp_count{
    width: 450px;
    display: flex;
    align-items: center;
}
.dialog-footer{
    text-align: inherit;
}
.name{
    width: 30%;
}
.minxi{
    position: relative;
    height: 55px;
    display: flex;
    align-items: center;
    line-height: 55px;
}
.minxi span{
    font-size:14px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1);
}
.ullist {
  width: auto;
  padding-left: 120px;
}
.ullist li {
  padding: 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  list-style: disc;
  color: rgba(153, 153, 153, 1);
}
.dd_tit{
    margin-top: 30px;
    display: block;
}
.dd span{
    font-size:14px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(102,102,102,1);
}
.cont {
  display: flex;
}
.cont li {
  width: 25%;
  height: 170px;
  box-sizing: border-box;
  display: flex;
}
.dd{
    margin-left: 20px;
}
.headers i {
  display: inline-block;
  width: 50px;
  height: 50px;
}
.headers {
  /* margin-top: 60px; */
  padding: 20px 500px 60px 20px;
  display: flex;
  align-items: center;
}
.headers h4 {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.headers span {
  font-size: 36px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 4, 4, 1);
}
.box {
  background: #f5f5f5;
}
.gray{
  /* height:135px; */
  background: #FAFAFA;
}
</style>