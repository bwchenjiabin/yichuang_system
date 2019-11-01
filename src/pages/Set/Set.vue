<template>
  <el-scrollbar style="height:100%">
    <div class="box">
      <el-container>
        <el-header
          style="background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 20px -10px #000;"
        >
          <Header></Header>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <sidebar></sidebar>
          </el-aside>
          <el-main>
            <h4>店铺设置</h4>
            <br />
            <br />
            <div class="title">
              <i class="icon"></i>
              <span>店铺设置</span>
            </div>
            <div class="content">
              <span class="name">店铺名称</span>
              <div class="cont_bottom">
                <p class="news">
                  {{name}}
                  <a href="javascript:;" class="new_right">修改</a>
                </p>
              </div>
            </div>
            <div class="content">
              <span class="name">店铺地址</span>
              <div class="cont_bottom">
                <p class="news">
                  {{url}}
                  <a
                    href="javascript:;"
                    class="new_right"
                    v-clipboard:copy="url"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >复制链接</a>
                </p>
              </div>
            </div>
            <div class="content">
              <span class="name">店铺版本</span>
              <div class="cont_bottom">
                <p class="news">
                  {{accountType}}
                  <a href="javascript:;" class="new_right" @click="recharge">续费</a>
                </p>
              </div>
            </div>
            <div class="content">
              <span class="name">主营类目</span>
              <div class="cont_bottom">
                <p class="news">
                  {{diclist}}
                  <a href="javascript:;" class="new_right" @click="open">设置</a>
                </p>
              </div>
            </div>
            <div class="title">
              <i class="icon"></i>
              <span>店铺信息</span>
            </div>
            <div class="content">
              <span class="name">店铺LOGO</span>
              <div class="cont_bottom">
                <p class="news">
                  <img src="../../../static/img/0.png" alt />
                  <a href="javascript:;" class="new_right">设置</a>
                </p>
              </div>
            </div>
            <div class="content">
              <span class="name">分享语自定义</span>
              <div class="cont_bottom">
                <p class="news">
                  {{url1}}
                  <a
                    href="javascript:;"
                    class="new_right"
                    v-clipboard:copy="url1"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >复制链接</a>
                </p>
              </div>
            </div>
            <div class="content">
              <span class="name">店铺页脚LOGO</span>
              <div class="cont_bottom">
                <p class="news">
                  默认设置
                  <a href="javascript:;" class="new_right">设置</a>
                </p>
              </div>
            </div>
            <div class="title">
              <i class="icon"></i>
              <span>功能配置</span>
            </div>
            <div class="content">
              <span class="name">隐藏订阅数</span>
              <div class="cont_bottom">
                <p class="news">
                  显示&nbsp;&nbsp;
                  <span class="name">可以设置显示或隐藏订阅数</span>
                  <a href="javascript:;" class="new_right" style="color:red;">了解详情</a>
                </p>
              </div>
            </div>
            <div class="content">
              <span class="name">隐藏购买数</span>
              <div class="cont_bottom">
                <p class="news">
                  显示&nbsp;&nbsp;
                  <span class="name">可以设置显示或隐藏购买数</span>
                  <a href="javascript:;" class="new_right" style="color:red;">了解详情</a>
                </p>
              </div>
            </div>
            <div class="content">
              <span class="name">隐藏播放量/浏览量</span>
              <div class="cont_bottom">
                <p class="news">
                  显示&nbsp;&nbsp;
                  <span class="name">播放量/浏览量隐藏，所有商品将不再显示播放量/显示量</span>
                  <a href="javascript:;" class="new_right">设置</a>
                </p>
              </div>
            </div>
            <div class="content">
              <span class="name">水印设置</span>
              <div class="cont_bottom">
                <p class="news">
                  隐藏&nbsp;&nbsp;
                  <span class="name">水印设置开启后会在实时视频和桌面共享直播中出现</span>
                  <a href="javascript:;" class="new_right">设置</a>
                </p>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
      <!-- 弹窗 -->
      <el-dialog
        title="选择主营类目"
        :visible.sync="delVisible"
        width="500px"
        center
        style="z-index: 999;text-align: left"
        :close-on-click-modal="false"
      >
        <div class="del-dialog-cnt" v-loading="loading">
          <p style="text-align:center; color:rgba(153, 153, 153, 1)">完善信息可以让我们为您提供更精准的服务</p>
          <div class="type-container">
            <div
              class="item"
              v-for="(item,index) in type_item"
              :key="index"
              v-on:click="addClass(index,item.id)"
              :class="{'item_active':current===index}"
            >{{item.dicValue}}</div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="Close" :disabled="disabled">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-scrollbar>
</template>
    <script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import { preview,queryTags,ChoiceTags } from "api/userAjax";
export default {
  data() {
    return {
      url1: " https://www.baidu.com",
      Id: 5,
      name: "",
      memberName: "",
      accountType: "",
      url: "",
      loading:true,
      memberPrice: "",
      delVisible: false,
      current: '',
      currents: '',
      category:'艺术教育',
      disabled:true,
      diclist:'',
      label:'',
      type_item: [
        
      ]
    };
  },
  created() {
      window._this = this
    this.reload();
    this.getdata();
    this.queryTag();
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 初始化回到顶部
    reload() {
      $("body,html").animate({ scrollTop: 0 }, 200);
    },
    handleClicks(row) {
      console.log(row);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    onCopy: function(e) {
      this.$message.success("复制成功");
    },
    onError: function(e) {
      this.$message.error("复制失败");
    },
    recharge() {
        window.open("http://yckt.yichuangketang.com/dist/index.html#/Recharge?id=5");
    },
    // 展示
    getdata() {
      preview(localStorage.getItem("ex2")).then(res => {
        this.name = res.data.accountTitle;
        this.accountType = res.data.accountType;
        this.url = res.data.url;
        this.diclist = res.data.lable
      });
    },
    queryTag(){
        queryTags().then(res => {
          if (res.data.code == '0000') {
            this.loading = false;
          }
            this.type_item = res.data.data
        })
    },
    open() {
      this.delVisible = true;
    },
    Close() {
      this.delVisible = false;
      ChoiceTags({accountId:localStorage.getItem("ex2"),lableId:this.category}).then(res =>{
          this.getdata(); 
        })
    },
    addClass: function(index, event) {
      this.current = index;
      this.category = event
       if (this.current!='') {
           this.disabled = false;
       }
    //   alert("当前对象的内容：" + el.innerHTML);
    }
  },
  components: {
    sidebar,
    Header
  }
};
</script>
    <style scoped>
.content {
  padding: 20px 35px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
.item_active {
  background: #0457ff;
  color: #fff;
}
.type-container {
  display: flex;
  box-sizing: border-box;
  font-size: 13px;
  padding: 0 52px;
  margin-top: 34px;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
}
.type-container .item {
  width: 87px;
  height: 28px;
  text-align: center;
  line-height: 26px;
  border-radius: 14px;
  border: 1px solid #d4d9e2;
  margin-right: 12px;
  margin-bottom: 15px;
  cursor: pointer;
}
.content .name {
  width: 10%;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.new_right {
  float: right;
  /* margin-right: 50px; */
}
.cont_bottom {
  width: 80%;
  float: left;
  padding-bottom: 20px;
  border-bottom: 1px solid #e3e3e3;
}
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
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>