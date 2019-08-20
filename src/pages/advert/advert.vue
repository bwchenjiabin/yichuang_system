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
          <div class="title">
            <h4>广告位</h4>
            <br>
            <br>
          </div>
          <el-radio v-model="radio" label="1" @change="radios" class="jd">分类专题</el-radio><br>
          <span
            style="font-size:16px;font-weight:400;color:rgba(153,153,153,1);margin-left:25px;"
          >跳转到</span>
            <span>内容分类</span>
          <span
            style="font-size:16px;font-weight:400;color:rgba(153,153,153,1);"
          >进行分类专题设置</span><br><br>
          <el-radio v-model="radio" label="2" class="jd" @change="radios">VIP推广</el-radio>
          <el-button plain @click="Popup" >选择</el-button><br><br>
          <div class="img-box">
            <img :src="'http://yckt.yichuangketang.com:8081/img/advert/' + this.imgids+'.png'" alt="">
            <!-- <p class="p1" v-html="input"></p>
            <p class="p2" v-html="input1"></p> -->
          </div><br>
              配置上行文字&nbsp;&nbsp;&nbsp;<el-input
              placeholder="请输入内容"
              v-model="input1"
              
              clearable>
            </el-input> <br><br><br>
             配置下行文字&nbsp;&nbsp;&nbsp;<el-input
              placeholder="请输入内容"
              v-model="input"
              
              clearable>
            </el-input> <br><br><br>
          <el-button type="primary" @click="update">保存</el-button>
           <el-backtop target=".box"></el-backtop>
        </el-main>
      </el-container>
    </el-container>
     <!-- 弹窗 -->
            <el-dialog title="选择分类配图" :visible.sync="delVisible" width="600px" center style="z-index: 999" :close-on-click-modal="false">     
                <div class="del-dialog-cnt"> 
                    <ul style="height:500px;overflow:auto;">
                  <li v-for="(item,index) in tableData" :key="index" @click="aa(item.id)">
                      <span class="Order">{{item.num}}</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="number">
                          <img :src="item.img" alt="" :class = "active == index ? 'addclass' : '' " @click='dowm(index)' class="imga">
                          </span><br><br>  
                      <img src="../../../static/img/微信图片_20190620160108.png" alt="" class="good" :class = "active == index ? 'goods' : '' " >
                  </li></ul>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delVisible = false">取 消</el-button>
                    <el-button type="primary" @click="peitu">确 定</el-button>
                </span>
            </el-dialog>
  </div>
  </el-scrollbar>
</template>
    <script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue"; 
import { selectacadvert } from "api/userAjax";
import { updateacadvert } from "api/userAjax";

export default {
  data() {
    return {
        radio:'1',
        delVisible:false,
        Choice: [],
        radio2:'',
        aaa:'',
        input:null,
        input1:null,
        tableData: [{
            img: "http://yckt.yichuangketang.com/img/advert/a1.png",
            id: 'a1',
            num:'1'
          },{
            img: "http://yckt.yichuangketang.com/img/advert/a2.png",
            id: 'a2',
            num:'2'
          },{
            img: "http://yckt.yichuangketang.com/img/advert/a3.png",
            id: 'a3',
            num:'3'
          },{
            img: "http://yckt.yichuangketang.com/img/advert/a4.png",
            id: 'a4',
            num:'4'
          },{
            img: "http://yckt.yichuangketang.com/img/advert/a5.png",
            id: 'a5',
            num:'5'
          },{
            img: "http://yckt.yichuangketang.com/img/advert/b1.png",
            id: 'b1',
            num:'6'
          },{
            img: "http://yckt.yichuangketang.com/img/advert/b2.png",
            id: 'b2',
            num:'7'
          },{
            img: "http://yckt.yichuangketang.com/img/advert/b3.png",
            id: 'b3',
            num:'8'
          }],
          active : -1,
          imgid:'',
          imgids:null,
          disabled:false,
          adtype:'type',
          Id:'',
    };
  },
  created() {
    this.reload();
    this.select();
  },
  methods: {
    // 初始化回到顶部
    reload() {
     $('body,html').animate({scrollTop:0},200);
    },
    // 弹窗
        Popup(){
        this.delVisible =true
      },
      dowm(index){
        this.active = index
      },
      aa(val){
        this.imgid = val
      },
      peitu(){
        this.delVisible = false
        this.imgids = this.imgid
      },
    update() {
      if (this.radio == "1") {
        this.adtype = 'type'
      }else if (this.radio == "2") {
        this.adtype = 'vip'
      }
      if (this.radio == '2') {
        if (this.imgids == '') {
          this.$message.error('vip 推广配图不可为空')
          return;
        }else if (this.input == '') {
          this.$message.error('vip 上行文字不可为空')     
          return;     
        }else if (this.input1 == '') {
          this.$message.error('vip 下行文字不可为空')
          return;
        }
      }
      updateacadvert({adtype:this.adtype,underlinetext:this.input,upperlinetext:this.input1,img:this.imgids,accountid:localStorage.getItem("ex2"),id:this.Id}).then(res => {
          // console.log(res);
          this.select();
          this.$message.success(res.data.msg);
      });
    },
    select() {
      selectacadvert({accountId:localStorage.getItem("ex2")}).then(res => {
        if (res.data.data[0].adtype == 'type') {
          this.radio = '1';
        }else if (res.data.data[0].adtype == 'vip') {
          this.radio = '2';
        }
        this.imgids = res.data.data[0].img;
        this.input = res.data.data[0].underlinetext;
        this.input1 = res.data.data[0].upperlinetext;
        this.Id = res.data.data[0].id
        // console.log(res);
      });
    },
    radios(){
      if (this.radio == "1") {
        this.input = '';
        this.input1 = '';
        this.imgids = '';
      }
    },
    Choices(){

    },
    //类型名字获取
    abv(val) {
      this.aaa = val;
    },
    assignment() {
      $(".sorts").html(this.aaa);
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
  width: 72px;
  height: 72px; 
  line-height: 75px;
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
.radio {
  margin-left: 125px;
}
.img-box{width: 400px;height: 80px;display: inline-block;margin-bottom: 30px;position: relative;}.img-box img{width: 100%;height: 100%;}
/* .img-box .p1{display: inline;position: absolute;top: 0;left: 55px;font-weight:1000;color: #ceae7b}
.img-box .p2{display: inline;position: absolute;top: 32px;left: 55px;font-weight:500;color: #ceae7b;font-size: 13px;} */
.jd {
padding: 0px 20px 50px 10px;
    margin-top: 20px;
}
 .del-dialog-cnt li{display: flex;align-items: center;justify-content: center;position: relative;font-size:20px;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(20,85,250,1);}
 .del-dialog-cnt li .imga:hover{border:1px solid rgba(20,85,250,1);}
 .number{font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);width: 400px;height: 100px;margin: 10px 20px 10px 20px;}

.number .imga{width: 100%;height: 100%;}
 .good{width: 15px;height: 15px;position: absolute;top: 11px;right: 36px;display: none} 
 .addclass{border:1px solid rgba(20,85,250,1)}
 .goods{display: block}
 .Order{width: 25px;height: 26px;}
 .el-scrollbar__wrap {
   overflow-x: hidden;
 }
</style>