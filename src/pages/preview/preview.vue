<template>
        <div class="box">
                <el-container>
                    <el-header>
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
                            </div>
                            <div class="content">
                                <span class="name">店铺名称</span>
                                <!-- <p class="phone" v-for="(item,index) in value" :key="index">{{item}}</p> -->
                                <input type="text" readonly="readonly" v-model="name" style="border:none;outline:none;" class="phone">
                                的店铺<span class="xiugai" @click="open">修改</span>
                            </div>
                            <div class="content">
                                <span class="name">店铺地址</span><span class="inp">https://unitnl.yichaungtang.com</span><span class="xiu">复制</span>
                            </div>
                            <div class="content">
                                <span class="name">二维码</span><img src="../../../static/img/微信图片_20190611141523.jpg" alt="">
                            </div>
                        </el-main>
                    </el-container>
                </el-container>
        </div>    
    </template>
    <script>
import sidebar from '@/components/sidebar/sidebar.vue'
import Header from '@/components/Header/Header.vue'
    export default {
        data(){
            return{
                // value:'',
                name:'许我七日暖!'
                }
            },
        created () {
      },
        methods:{
        open() {
            // let name = this.name;
            var that= this;
        this.$prompt('将应用在“移动端-我的-顶部”', '店铺名称', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          inputValue:this.name,
          inputPattern:/^.{0,6}$/,
          inputErrorMessage: '格式不正确'
        })
        .then(({ value }) => {
          this.$message({
            type: 'success',
            message: '已保存店铺名称为: ' + value,
          });
          this.value = value
          this.name = this.value
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }


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
 .title{padding: 20px;}
 .cont li{width: 300px;height: 200px;background:#F4F4F4 100%;float: left;margin-right: 20px;text-align: center;display: flex;justify-content: center;align-items: center;}
 .bq{width: 60px;height: 24px;line-height: 20px;border-radius: 1px;text-align: center;border: 1px solid rgba(0, 101, 255, 1);color: #0065FF;font-size: 14px;margin-left: 10px;}
 .el-tabs__item{padding: 0 50px;}.el-input{width: auto;}.icon{width: 6px;height: 17px;background: blue;float: left;margin-top: 3px;}
 .title{width: auto;display: block}.title span{margin-left: 10px;}.content{width: 500px;height: auto;padding: 0 40px 25px 40px;display: flex;align-items: center;}.phone{display: inline-block;flex: .5;text-align: center;font-size: 16px;}
 .name{flex: .5;}.xiugai{width: 50px;color: rgba(0, 101, 255, 1);font-size: 16px;text-align: left;font-family: SourceHanSansSC-regular;cursor: pointer;margin-left: 20px;flex: .5;}.inp{flex: 1;height: 40px;border: 1px solid #ccc;line-height: 40px;padding-left:10px;color: rgba(16, 16, 16, 1);font-size: 14px;text-align: left;font-family: Roboto;border: 1px solid rgba(238, 238, 238, 1);}
 .xiu{width: 50px;font-size: 16px;text-align: left;font-family: SourceHanSansSC-regular;cursor: pointer;height: 40px;text-align: center;line-height: 40px;border: 1px solid rgba(238, 238, 238, 1);background-color: rgba(244, 244, 244, 1);font-size: 14px;}
 .content img{width: 180px;height: 180px;}
</style>