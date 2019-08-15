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
                            <h4>店铺会员</h4><br><br>
                           <span>会员名称&nbsp;&nbsp;&nbsp;</span> <el-input placeholder="请输入内容" v-model="input1" clearable class="inpp"></el-input>&nbsp;<i class="el-icon-edit"></i><br><br>
                             <span>会员类型&nbsp;&nbsp;&nbsp;</span>
                              <el-select v-model="value" clearable placeholder="请选择" @change="current">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                           
                            <br><br>
                             <span>年卡价格&nbsp;&nbsp;&nbsp;</span>
                                <el-input placeholder="请输入内容" v-model="input" clearable id="inp2">
                                </el-input>&nbsp;
                                <i class="el-icon-edit"></i><br><br>
                                <span>划线价格&nbsp;&nbsp;&nbsp;</span>
                                <el-input placeholder="请输入内容" v-model="inputt" clearable id="inp2">
                                </el-input>&nbsp;
                                <i class="el-icon-edit"></i><br><br>
                            <el-button type="primary"  @click="editvips();">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;保存&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                        </el-main>
                    </el-container>
            </el-container>
        </div>    
    </template>
    <script>
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
import {selectvip} from 'api/userAjax';
import {editvip} from 'api/userAjax';

    export default {
        data(){
            return{
                    input:'',
                    inputt:'',
                    input1:'',
                    options: [{
                    value: 'month',
                    label: '包月'
                    },{
                    value: 'quarter',
                    label: '包季'
                    },{
                    value: 'year',
                    label: '包年'
                    }],
                    value: '',
                    Id:'',
                }
            },
        created () {
            this.reload();
      },
        methods:{

      current(val){
          selectvip({accountId:localStorage.getItem('ex2'),length:val}).then(res => {
              this.Id = res.data.data[0].id
              this.input = res.data.data[0].pricenow
              this.inputt = res.data.data[0].priceformer
          })
      },
      editvips(){
          editvip({id:this.Id,priceformer:this.inputt,pricenow:this.input,name:this.input1}).then(res => {
                this.$message.success(res.data.msg)
          })
      },
    // 初始化回到顶部
      reload() {
     $('body,html').animate({scrollTop:0},200);
    },
        },
        components:{
            sidebar,
            Header
        }
    }
    </script>
    <style scoped>
 .box{background: #f5f5f5;}
 .el-tabs__item{padding: 0 50px;}.el-input{width: auto;}.icon{width: 6px;height: 17px;background: blue;float: left;margin-top: 3px;}
 .title{width: auto;display: block}.title span{margin-left: 10px;}
 .icon-money{width: 30px;height: 40px;font-size:16px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(51,51,51,1);text-align: center;line-height: 40px;display: inline-block;background:rgba(238,238,238,1);border:1px solid rgba(238,238,238,1);margin-left: 18px;}
</style>