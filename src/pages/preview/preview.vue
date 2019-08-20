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
                            <h4>店铺预览</h4><br><br>
                            <div class="title">
                                <i class="icon"></i>
                                <span>店铺预览</span>
                            </div><br>
                            <!-- <div class="content">
                                <span class="namee">店铺名称</span>
                                <span class="phone">{{this.name}}</span>
                            </div>
                             <div class="content">
                                <span class="namee">平台版本</span>
                                <span class="phone">{{this.accountType}}</span>
                            </div> -->

                            <div class="table-cont">
                                <el-table
                                :header-cell-style="{background:'#f5f5f5',color:'#000'}"
                                :data="tableData"
                                style="width: 100%">
                                <el-table-column
                                    prop="date"
                                    label="店铺信息"
                                    width="130"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label=""
                                    width="600">
                                </el-table-column>
                                 <el-table-column
                                    prop=""
                                    label="">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small"  v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">{{scope.row.address}}</el-button>
                                    </template>
                                </el-table-column>
                                </el-table>
                            </div><br><br>

                                
                            <!-- <div class="content">
                                <span class="name">店铺地址</span><span class="inp">{{this.url}}</span><span class="xiu" v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
                            </div> -->
                            <div style="margin-left:30px;">店铺内存(剩余)：</div>
                            <el-progress type="dashboard" :percentage="aa" :color="colors" style="margin-left:150px;"></el-progress>
                            <div style="margin-left:30px;">已用{{percentage}}GB</div><br><div style="margin-left:30px;">剩余{{percentages}}GB</div>                            
                        </el-main>
                    </el-container>
            </el-container>
        </div>  
        </el-scrollbar>  
    </template>
    <script>
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
import {preview} from 'api/userAjax';
    export default {
        data(){
            return{
                name:'',
                url:'',
                ewm:'',
                percentage: 0,
                percentages: 0,
                Memory:'',
                baifenbi:'',
                accountType:'',
                num:0,
                aa:0,
                memberName:'',
                memberPrice:'',
                colors: [
                {color: '#c62f2f', percentage: 20},
                {color: '#ff4949', percentage: 40},
                {color: '#e6a23c', percentage: 60},
                {color: '#e6a23c', percentage: 80},
                {color: '#67c23a', percentage: 100}
                    ],
                 tableData: [{
            date: '店铺名称',
            name: '',
          }, {
            date: '平台版本',
            name: '',
          },
           {
            date: '店铺地址',
            name: '',
            address: '复制'
          },{
            date: '会员名称',
            name: '',
          },{
            date: '会员价格',
            name: '',
          }]
                }
            },
        created () {
        this.reload();
        this.getdata();
      },
        methods:{
            
    onCopy: function (e) {
      this.$message.success("复制成功")
    },
    onError: function (e) {
      this.$message.error("复制失败")
    },
        // 展示
        getdata () {
        preview(localStorage.getItem('ex2')).then(res => {
            this.accountType = res.data.accountType
            this.name = res.data.accountTitle
            this.url = res.data.url
            this.memberName = res.data.memberName
            this.memberPrice = res.data.memberPrice
            this.tableData[0].name = this.name
            this.tableData[1].name = this.accountType
            this.tableData[2].name = this.url
            this.tableData[3].name = this.memberName
            this.tableData[4].name = this.memberPrice
            this.ewm = res.data.codepath          
            Number(this.percentages)
            var ee = res.data.totalFileSize
            ee.toFixed(2)
            var eee = ee/1024
            this.percentage = eee.toFixed(2)
        
            this.Memory = res.data.availableSize
            this.baifenbi = ee/this.Memory*100
            var num =this.baifenbi;
            this.num = num.toFixed(2);
            Number(this.num)
            var cc = 100-this.num
            this.aa = cc.toFixed(2);
            Number(this.aa)
            var dd = this.Memory-ee
            var ff = dd/1024
            this.percentages = ff.toFixed(2)
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
 h3{display: inline;}
 .table-cont{width: 50%;height: auto;border: 1px solid #ebeef5;margin-left: 35px;}
 .title{padding: 20px;}
 .cont li{width: 300px;height: 200px;background:#F4F4F4 100%;float: left;margin-right: 20px;text-align: center;display: flex;justify-content: center;align-items: center;}
 .bq{width: 60px;height: 24px;line-height: 20px;border-radius: 1px;text-align: center;border: 1px solid rgba(0, 101, 255, 1);color: #0065FF;font-size: 14px;margin-left: 10px;}
 .el-tabs__item{padding: 0 50px;}.el-input{width: auto;}.icon{width: 6px;height: 17px;background: blue;float: left;margin-top: 3px;}
 .title{width: auto;display: block}.title span{margin-left: 10px;}.content{width: 500px;height: auto;padding: 0 40px 25px 40px;display: flex;align-items: center;}.phone{display: inline-block;text-align: center;font-size: 16px;}
 .name{flex: .5;}.xiugai{width: 50px;color: rgba(0, 101, 255, 1);font-size: 16px;text-align: left;font-family: SourceHanSansSC-regular;cursor: pointer;margin-left: 20px;flex: .5;}.inp{flex: 1;height: 40px;border: 1px solid #ccc;line-height: 40px;padding-left:10px;color: rgba(16, 16, 16, 1);font-size: 14px;text-align: left;font-family: Roboto;border: 1px solid rgba(238, 238, 238, 1);}
 .xiu{width: 50px;font-size: 16px;text-align: left;font-family: SourceHanSansSC-regular;cursor: pointer;height: 40px;text-align: center;line-height: 40px;border: 1px solid rgba(238, 238, 238, 1);background-color: rgba(244, 244, 244, 1);font-size: 14px;}
 .content img{width: 180px;height: 180px;} .namee{flex: 0.35;}
  .el-scrollbar__wrap {
   overflow-x: hidden;
 }
</style>