<template>
  <el-scrollbar style="height:100%">
     <div class="box">
    <el-container>
      <el-header
        style="    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 20px -10px #000;"
      >
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <sidebar></sidebar>
        </el-aside>
        <el-main>
          <h4>店铺会员</h4>
          <br />
          <br />
          <br />
          <div class="title">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ccc" @change="changes"></el-switch>
            <span>全场免费会员卡</span>
          </div>
          <br />
          <br />
          <div class="cont">
            <div class="tab-header">
              <div>类别</div>
              <div>月卡</div>
              <div>季卡</div>
              <div>年卡</div>
            </div>
            <div class="content">
              <span class="span-inner">售价</span>
              <div style="flex:1">
                <el-input placeholder="请输入金额" v-model="input" clearable id="inp2" :disabled="disabled" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"></el-input>&nbsp;
              </div>
              <div style="flex:1">
                <el-input placeholder="请输入金额" v-model="input1" clearable id="inp2" :disabled="disabled" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"></el-input>&nbsp;
              </div>
              <div style="flex:1">
                <el-input placeholder="请输入金额" v-model="input2" clearable id="inp2" :disabled="disabled" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"></el-input>&nbsp;
              </div>
            </div>
             <div class="content">
              <span class="span-inner">划线价<br>(原价)</span>
              <div style="flex:1">
                <el-input placeholder="0.01-50000" v-model="input3" clearable id="inp2" :disabled="disabled" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"></el-input>&nbsp;
              </div>
              <div style="flex:1">
                <el-input placeholder="0.01-50000" v-model="input4" clearable id="inp2" :disabled="disabled" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"></el-input>&nbsp;
              </div>
              <div style="flex:1">
                <el-input placeholder="0.01-50000" v-model="input5" clearable id="inp2" :disabled="disabled" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"></el-input>&nbsp;
              </div>
            </div>
          </div><br>
          <el-button type="primary" @click="Preservation">保存</el-button><br><br><br>
<div class="title">
            <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ccc" @change="changes1"></el-switch>
            <span style="margin-right:50px;">全场折扣会员卡</span>   
            <span>折扣：</span>
            <el-input
                placeholder="请输入折扣（5.5）"
                v-model="input12"
                clearable :disabled="disabled1"
                onkeyup="value=value.replace(/[^[1-9]\d*\.[1-9]$|0\.[1-9]$|^([^0]\d*)$|^0$/],'')">
            </el-input>
           <span style="color:#ccc;fontSize:13px"> *请输入大于0小于10，且允许保留一位小数点</span>
          </div>
          <br />
          <br />
        <div class="cont">
            <div class="tab-header">
              <div>类别</div>
              <div>月卡</div>
              <div>季卡</div>
              <div>年卡</div>
            </div>
           <div class="content">
              <span class="span-inner">售价</span>
              <div style="flex:1">
                <el-input placeholder="请输入金额" v-model="input6" clearable id="inp2" :disabled="disabled1" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"></el-input>&nbsp;
              </div>
              <div style="flex:1">
                <el-input placeholder="请输入金额" v-model="input7" clearable id="inp2" :disabled="disabled1" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"></el-input>&nbsp;
              </div>
              <div style="flex:1">
                <el-input placeholder="请输入金额" v-model="input8" clearable id="inp2" :disabled="disabled1" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"></el-input>&nbsp;
              </div>
            </div>
             <div class="content">
              <span class="span-inner">划线价<br>(原价)</span>
              <div style="flex:1">
                <el-input placeholder="0.01-50000" v-model="input9" clearable id="inp2" :disabled="disabled1" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"></el-input>&nbsp;
              </div>
              <div style="flex:1">
                <el-input placeholder="0.01-50000" v-model="input10" clearable id="inp2" :disabled="disabled1" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"></el-input>&nbsp;
              </div>
              <div style="flex:1">
                <el-input placeholder="0.01-50000" v-model="input11" clearable id="inp2" :disabled="disabled1" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"></el-input>&nbsp;
              </div>
            </div>
          </div><br>
          <el-button type="primary" @click="Preservation1">保存</el-button>
        </el-main>
      </el-container>
    </el-container>
  </div>
  </el-scrollbar>
 
</template>
    <script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import { selectvip } from "api/userAjax";
import { editvip } from "api/userAjax";

export default {
  data() {
    return {
      input: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      input8: "",
      input9: "",
      input10: "",
      input11: "",
      input12: "",
      disabled:true,
      disabled1:true,
      value: false,
      value1: false,
      Id: "",
      ids:[],
      opens:'',
      list:[
          {
              id:'',
              accountid:'',
              type:'common',
              unit:'year',
              priceformer:'',
              pricenow:'',
              discount:'',
              open:''
          },
          {
              id:'',
              accountid:'',
              type:'common',
              unit:'quarter',
              priceformer:'',
              pricenow:'',
              discount:'',
              open:''
          },
          {
              id:'',
              accountid:'',
              type:'common',
              unit:'month',
              priceformer:'',
              pricenow:'',
              discount:'',
              open:''
          }
      ],
      listone:[
          {
              id:'',
              accountid:'',
              type:'discount',
              unit:'year',
              priceformer:'',
              pricenow:'',
              discount:'',
              open:''
          },
          {
              id:'',
              accountid:'',
              type:'discount',
              unit:'quarter',
              priceformer:'',
              pricenow:'',
              discount:'',
              open:''
          },
          {
              id:'',
              accountid:'',
              type:'discount',
              unit:'month',
              priceformer:'',
              pricenow:'',
              discount:'',
              open:''
          }
      ]
    };
  },
  created() {
    this.reload();
    this.getdata();
    this.Id = localStorage.getItem("ex2");
  },
  methods: {
      getdata(){
         selectvip({accountId:localStorage.getItem("ex2")}).then(res => { 
            if (res.data.data.common[0].open == "1") {
                this.value = true;
                this.disabled = false;
            }else if(res.data.data.common[0].open == "0"){
                this.value = false;
                this.disabled = true;
            }
            this.input = res.data.data.common[0].pricenow
            this.input1 = res.data.data.common[1].pricenow
            this.input2 = res.data.data.common[2].pricenow
            this.input3 = res.data.data.common[0].priceformer
            this.input4 = res.data.data.common[1].priceformer
            this.input5 = res.data.data.common[2].priceformer
            this.list[0].id = res.data.data.common[2].id
            this.list[1].id = res.data.data.common[1].id
            this.list[2].id = res.data.data.common[0].id


            if (res.data.data.discount[0].open == "1") {
                this.value1 = true;
                this.disabled1 = false;
            }else if(res.data.data.discount[0].open == "0"){
                this.value1 = false;
                this.disabled1 = true;
            }

            this.input6 = res.data.data.discount[0].pricenow
            this.input7 = res.data.data.discount[1].pricenow
            this.input8 = res.data.data.discount[2].pricenow
            this.input9 = res.data.data.discount[0].priceformer
            this.input10 = res.data.data.discount[1].priceformer
            this.input11 = res.data.data.discount[2].priceformer
            this.input12 = res.data.data.discount[2].discount

            this.listone[0].id = res.data.data.discount[2].id
            this.listone[1].id = res.data.data.discount[1].id
            this.listone[2].id = res.data.data.discount[0].id 
         }) 
      },
      changes(){
          if (this.value == true) {
            this.disabled = false;  
          }else{
              this.disabled = true;
          }
      },
    changes1(){
          if (this.value1 == true) {
            this.disabled1 = false;  
          }else{
              this.disabled1 = true;
          }
      },
    Preservation(){   
            this.list[2].accountid = this.Id
            this.list[1].accountid = this.Id
            this.list[0].accountid = this.Id
            this.list[2].priceformer = this.input3
            this.list[1].priceformer = this.input4
            this.list[0].priceformer = this.input5
            this.list[2].pricenow = this.input
            this.list[1].pricenow = this.input1
            this.list[0].pricenow = this.input2
            if (this.value == true) {
                this.list[0].open = '1'
                this.list[1].open = '1'
                this.list[2].open = '1'
            }else{
                this.list[0].open = '0'
                this.list[1].open = '0'
                this.list[2].open = '0'
            }
        editvip(
           this.list
        ).then( res=> {
          console.log(res)
          this.list[0].id = res.data.data.year
          this.list[1].id = res.data.data.quarter
          this.list[2].id = res.data.data.month
            this.getdata();
            this.$message.success(res.data.msg)
        })
    },



    Preservation1(){
            this.listone[0].accountid = this.Id
            this.listone[1].accountid = this.Id
            this.listone[2].accountid = this.Id
            this.listone[2].priceformer = this.input9
            this.listone[1].priceformer = this.input10
            this.listone[0].priceformer = this.input11
            this.listone[2].pricenow = this.input6
            this.listone[1].pricenow = this.input7
            this.listone[0].pricenow = this.input8
            this.listone[2].discount = this.input12
            this.listone[1].discount = this.input12
            this.listone[0].discount = this.input12
            if (this.value1 == true) {
                this.listone[0].open = '1'
                this.listone[1].open = '1'
                this.listone[2].open = '1'
            }else{
                this.listone[0].open = '0'
                this.listone[1].open = '0'
                this.listone[2].open = '0'
            }
        editvip(
           this.listone
        ).then( res=> {
            this.listone[0].id = res.data.data.year
            this.listone[1].id = res.data.data.quarter
            this.listone[2].id = res.data.data.month
            this.getdata();
            this.$message.success(res.data.msg)
        })
    },
    // 初始化回到顶部
    reload() {
      $("body,html").animate({ scrollTop: 0 }, 200);
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
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.icon-money {
  width: 30px;
  height: 40px;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  line-height: 40px;
  display: inline-block;
  background: rgba(238, 238, 238, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  margin-left: 18px;
}
.tab-header {
  display: flex;
  align-items: center;
  background-color: #fafafa;
  border: 1px solid #f0f0f0;
  height: 40px;
  padding: 0 30px 0 30px;
}
.tab-header div {
  flex: 1;
}
.cont {
  border: 1px solid #f0f0f0;
  width: 80%;
}
.span-inner {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  flex: 1;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.content {
  padding: 30px;
  display: flex;
  align-items: center;
}
 .el-scrollbar__wrap {
   overflow-x: hidden;
 }
</style>