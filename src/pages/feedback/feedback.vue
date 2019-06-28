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
                            <h4>用户反馈</h4><br><br>
                            
                      <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%"
                            :header-cell-style="{background:'#eef1f6',color:'#000'}">
                            <el-table-column
                            prop="date"
                            label="用户昵称"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="反馈标题"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="反馈内容">
                            </el-table-column>
                        </el-table>
                        
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
                tableData: [{
          date: '江南',
          name: '王小虎',
          address: '需要付费项目太多，没有看到想要的东西之前，会有很少的用户会愿意买单'
        }, {
          date: '王小虎',
          name: '王小虎',
          address: '需要付费项目太多，没有看到想要的东西之前，会有很少的用户会愿意买单'
        }, {
          date: '阿萨德',
          name: '王小虎',
          address: '需要付费项目太多，没有看到想要的东西之前，会有很少的用户会愿意买单'
        }, {
          date: '换个打算',
          name: '王小虎',
          address: '需要付费项目太多，没有看到想要的东西之前，会有很少的用户会愿意买单'
        }]
                }
                },
        created () {
      },
        methods:{
      
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
</style>