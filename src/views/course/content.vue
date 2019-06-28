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
                        
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="图文" name="first">
                                    <el-select v-model="value" clearable placeholder="全部状态">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input placeholder="搜索关键词" v-model="input" clearable></el-input>
                                    <el-button type="info" plain>筛选</el-button>
                                    <el-button type="primary" style="float:right;margin-right:150px;">新增图文</el-button><br><br>

                                    <el-table ref="test" :data="tableData" tooltip-effect="dark" style="width: 100%" :header-cell-style="{background:'#f5f5f5',color:'#000'}">
                                        <el-table-column type="selection" width="55">
                                        </el-table-column>
                                        <el-table-column label="名称" width="250">
                                        <template slot-scope="scope">{{ scope.row.date }}</template>
                                        </el-table-column>
                                        <el-table-column prop="name" label="上架时间" width="250">
                                        </el-table-column>
                                        <el-table-column prop="address" label="访客数/浏览数" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="xl" label="销量" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="xl" label="状态" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="xl" label="序号" show-overflow-tooltip>
                                        </el-table-column>
                                        
                                        <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="200">
                                        <template slot-scope="scope">
                                          <el-button @click="handleClicks(scope.row)" type="text" size="small">排序</el-button>
                                          <el-button type="text" size="small"  @click.native.prevent="deleteRow(scope.$index, tableData)">编辑</el-button>
                                        </template>
                                      </el-table-column>


                                    </el-table>
                                    
                                    <el-button>上架</el-button>
                                    <el-button>下架</el-button>
                                    <el-button @click="del">删除</el-button>
                                    

                                </el-tab-pane>
                                <el-tab-pane label="音频" name="second">

                                    <el-select v-model="value" clearable placeholder="全部状态">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
                                    <el-button type="info" plain>筛选</el-button>
                                    <el-button type="primary" style="float:right;margin-right:150px;">新增图文</el-button>

                                    <el-table
                                        ref="multipleTable"
                                        :data="tableDataa"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        @selection-change="">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        label="名称"
                                        width="250">
                                        <template slot-scope="scope">{{ scope.row.date }}</template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="name"
                                        label="上架时间"
                                        width="250">
                                        </el-table-column>
                                        <el-table-column
                                        prop="address"
                                        label="访客数/浏览数"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="xl"
                                        label="销量"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="xl"
                                        label="状态"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="xl"
                                        label="序号"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        
                                        <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="200">
                                        <template slot-scope="scope">
                                          <el-button @click="handleClicks(scope.row)" type="text" size="small">排序</el-button>
                                          <el-button type="text" size="small"  @click.native.prevent="deleteRow(scope.$index, tableDataa)">编辑</el-button>
                                        </template>
                                      </el-table-column>


                                    </el-table>
                                    
                                    <el-button>上架</el-button>
                                    <el-button>下架</el-button>
                                    <el-button>删除</el-button>
                                    

                                </el-tab-pane>
                                <el-tab-pane label="视频" name="third">
                                    
                                    <el-select v-model="value" clearable placeholder="全部状态">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
                                    <el-button type="info" plain>筛选</el-button>
                                    <el-button type="primary" style="float:right;margin-right:150px;">新增图文</el-button>

                                    <el-table
                                        ref="multipleTable"
                                        :data="tableDatab"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        @selection-change="">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        label="名称"
                                        width="250">
                                        <template slot-scope="scope">{{ scope.row.date }}</template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="name"
                                        label="上架时间"
                                        width="250">
                                        </el-table-column>
                                        <el-table-column
                                        prop="address"
                                        label="访客数/浏览数"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="xl"
                                        label="销量"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="xl"
                                        label="状态"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        prop="xl"
                                        label="序号"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="200">
                                        <template slot-scope="scope">
                                          <el-button @click="handleClicks(scope.row)" type="text" size="small">排序</el-button>
                                          <el-button type="text" size="small"  @click.native.prevent="deleteRow(scope.$index, tableDatab)">编辑</el-button>
                                        </template>
                                      </el-table-column>
                                    </el-table>
                                    
                                    <el-button>上架</el-button>
                                    <el-button>下架</el-button>
                                    <el-button >删除</el-button>
                                    
                                    
                                </el-tab-pane>
                            </el-tabs>
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
                activeName: 'first',
                options: [{
                value: '选项1',
                label: '上架中'
                }, {
                value: '选项2',
                label: '下架中'
                }],
                value: '',
                input:'',


        tableData: [{
          date: '最新金融学习方法',
          name: '2019-02-24',
          address: '0/1',
          xl:'0'
        }, {
          date: '最新金融学习方法',
          name: '2019-02-24',
          address: '0/1',
          xl:'0'

        }, {
          date: '最新金融学习方法',
          name: '2019-02-24',
          address: '0/1',
          xl:'0'
        }, {
          date: '最新金融学习方法',
          name: '2019-02-24',
          address: '0/1',
          xl:'0'
        }, {
          date: '最新金融学习方法',
          name: '2019-02-24',
          address: '0/1',
          xl:'0'
        }, {
          date: '最新金融学习方法',
          name: '2019-02-24',
          address: '0/1',
          xl:'0'
        }, {
          date: '最新金融学习方法',
          name: '2019-02-24',
          address: '0/1',
          xl:'0'
        }],
        tableDataa: [{
          date: '最新金融',
          name: '2019-02-24',
          address: '0/1',
          xl:'0'
        }, {
          date: '最新金融',
          name: '2019-02-24',
          address: '0/1',
          xl:'0'

        }, {
          date: '最新金融',
          name: '2019-02-24',
          address: '0/1',
          xl:'0'
        }, {
          date: '最新金融',
          name: '2019-02-24',
          address: '0/1',
          xl:'0'
        }],
        tableDatab: [{
          date: '最新金融xuexi',
          name: '2019-02-24',
          address: '0/1',
          xl:'0'
        }, {
          date: '最新金融学习',
          name: '2019-02-24',
          address: '0/1',
          xl:'0'

        }, {
          date: '最新金融第七位',
          name: '2019-02-24',
          address: '0/1',
          xl:'0'
        }, {
          date: '最新金融阿萨德',
          name: '2019-02-24',
          address: '0/1',
          xl:'0'
        }],
        multipleSelection: []
                }
                },
        created () {
      },
        methods:{
            handleClick(tab, event) {
        // console.log(tab, event);
      },
      handleClicks(row) {
        console.log(row);
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      del(){
            let len = this.tableData.length;
            for(let item in this.$refs.test.selection){
            this.tableData.splice(item.name - 1 ,1);
        }},
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
  body > .el-container {margin-bottom: 40px;}
 .el-header, .el-footer {background-color: #fff;color: #333;text-align: center;line-height: 60px;}
 .el-header{margin-bottom: 20px;}
 .el-aside {margin-left: 20px;margin-right: 20px;background-color: #fff;color: #333;text-align: center;line-height: 200px;}
 .el-main {background-color: #fff;color: #333;}
 .el-tabs__item{padding: 0 50px;}.el-input{width: auto;}
    </style>
    