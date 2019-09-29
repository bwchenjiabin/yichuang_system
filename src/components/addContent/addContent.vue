<template>
    <div class="addContent" ref="components">
        <div
            class="addContentItem clearfix"
            v-for="(item, index) in ele.config.itemList"
            :key="index"
        >
            <div class="img">
                <img :src="item.img" />
                <p class="shadow">
                    修改
                    <input type="file" @change="uploadImg($event, index)" />
                </p>
            </div>
            <div class="optionItem">
                <div>
                    <span>标题</span>
                    <input type="text" :value="item.title" :placeholder="item.placeholder" @input="changeTitle($event, index)" :disabled="diabledTitle"/>
                </div>
                <div>
                    <span>跳转链接</span>
                    <p :title="item.url.title + '|' + item.url.link">{{item.url.title + "|" + item.url.link}}</p>
                    <button @click="showModal(index)">更改</button>
                </div>
            </div>
            <span class="del" @click="del(index)">×</span>
        </div>
        <div class="addOne" @click="addOne">{{title}}</div>
        <el-dialog
            title
            :visible.sync="delVisible"
            width="550px"
            center
            style="z-index: 999"
            :close-on-click-modal="false"
        >
            <div class="del-dialog-cnt">
                <div class="tab">
                    <el-tabs v-model="activeName" @tab-click="handleClickq">
                        <el-tab-pane label="课程" name="lesson">
                            <el-tabs
                                :tab-position="tabPosition"
                                style="height:400px;overflow:auto;position:relative"
                                v-model="courser"
                            >
                                <el-tab-pane label="图文" name="imgText">
                                    <el-table
                                        @current-change="handleCurrentChange"
                                        ref="singleTable"
                                        :data="tableData"
                                        highlight-current-row
                                        style="width: 100%"
                                    >
                                        <el-table-column type="index" width="50"></el-table-column>
                                        <el-table-column
                                            property="lessonName"
                                            label="名称"
                                            width="120"
                                        ></el-table-column>
                                        <el-table-column
                                            property="upperoffTime"
                                            label="创建时间"
                                            width="120"
                                        ></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="音频" name="audio">
                                    <el-table
                                        @current-change="handleCurrentChange"
                                        ref="singleTable"
                                        :data="tableData1"
                                        highlight-current-row
                                        style="width: 100%"
                                    >
                                        <el-table-column type="index" width="50"></el-table-column>
                                        <el-table-column
                                            property="lessonName"
                                            label="名称"
                                            width="120"
                                        ></el-table-column>
                                        <el-table-column
                                            property="upperoffTime"
                                            label="创建时间"
                                            width="120"
                                        ></el-table-column>
                                    </el-table>
                                </el-tab-pane>

                                <el-tab-pane label="视频" name="video">
                                    <el-table
                                        @current-change="handleCurrentChange"
                                        ref="singleTable"
                                        :data="tableData2"
                                        highlight-current-row
                                        style="width: 100%"
                                    >
                                        <el-table-column type="index" width="50"></el-table-column>
                                        <el-table-column
                                            property="lessonName"
                                            label="名称"
                                            width="120"
                                        ></el-table-column>
                                        <el-table-column
                                            property="upperoffTime"
                                            label="创建时间"
                                            width="120"
                                        ></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <!-- 图文分页 -->
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="current_change0"
                                    @current-page="currentPage0"
                                    :page-size="pagesize"
                                    background
                                    layout="total, prev, pager, next"
                                    :total="this.twsize"
                                    v-if="this.courser == 'imgText'"
                                ></el-pagination>
                                <!-- 音频分页 -->
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="current_change1"
                                    :current-page="currentPage1"
                                    :page-size="pagesize"
                                    background
                                    layout="total, prev, pager, next"
                                    :total="this.ypsize"
                                    v-if="this.courser == 'audio'"
                                ></el-pagination>

                                <!-- 视频分页 -->
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="current_change2"
                                    :current-page="currentPage2"
                                    :page-size="pagesize"
                                    background
                                    layout="total, prev, pager, next"
                                    :total="this.spsize"
                                    v-if="this.courser == 'video'"
                                ></el-pagination>
                            </el-tabs>
                        </el-tab-pane>
                        <el-tab-pane label="分类" name="type" style="height:400px;overflow:auto;">
                            <div class="Choice">
                                <ul>
                                    <li v-for="(item,index) in Choice" :key="index">
                                        <el-radio
                                            v-model="radio2"
                                            :label="item.kindId"
                                            @change="changeq(item.kindId,item.kindName)"
                                        >{{item.kindName}}</el-radio>
                                        <br />
                                    </li>
                                </ul>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="自定义链接" name="diy" style="height:400px;overflow:auto;" class="diy">
                            <div>
                                <div>
                                    <span>链接名称：</span>
                                    <input type="text" v-model="linkName">
                                </div>
                                <div>
                                    <span>链接地址：</span>
                                    <input type="text" v-model="linkAddr">
                                </div>
                                <p>注意：链接请以http://或者https://开头</p>
                            </div>
                        </el-tab-pane>
                        <br />
                        <br />
                    </el-tabs>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="getdataadd()">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { uploadImg } from "api/userAjax";
import { baseURL } from "common/config";
import {ImgText, audio, video, Choicenav, checkclass} from 'api/userAjax';
import Sortable from "sortablejs";

export default {
    props: ["currentEle", "title", "placeholder", "diabledTitle"],
    data() {
        return {
            ele: {},
            Ids: "",
            delVisible: false,
            activeName: "lesson",
            tabPosition: "left",
            courser: "imgText", //默认选择
            tableData: [],
            tableData1: [],
            tableData2: [],
            currentPage0:1,   //图文当前页
            currentPage1: 1,  //音频当前页
            currentPage2: 1,  //视频当前页
            currentLinkIndex: 0,
            twsize:0,
            ypsize:0,
            spsize:0,
            currentRow: null,
            pagesize: 5,
            pageleng:0,
            Choice: [],
            classid:'',
            radio2: "",
            pointtype: 'lesson',
            targetids:'',
            lessonName:'',
            linkName: '',
            linkAddr: ''
        };
    },
    computed: {
        components() {
            return this.$refs.components
        },
        defaultImg(){
            if(this.ele.config.id===2){
                return "http://jskt.yichuangtang.com/icon/lunbotu.png"
            }else if(this.ele.config.id===3){
                return "http://jskt.yichuangtang.com/icon/navigaterBtn1.png"
            }else{
                return "http://jskt.yichuangtang.com/icon/ads_def.png"
            }
        }

    },
    methods: {
        showModal(index) {
            this.currentLinkIndex = index
            this.delVisible = true
        },
        handleClickq(tab, event) {
            this.pointtype = tab.name;
        },
        // 图文查询
        getImgText() {
            ImgText(localStorage.getItem('ex2'),"1",this.currentPage0).then(res => {
                this.tableData = res.data.data.data;
                this.twsize = res.data.data.total
            })
        },
        // 音频查询
        getaudio() {
            audio(localStorage.getItem('ex2'),"2",this.currentPage1).then(res => {
                this.tableData1 = res.data.data.data;
                this.ypsize = res.data.data.total
            })
        },
        // 视频查询
        getvideo() {
            video(localStorage.getItem('ex2'),"3",this.currentPage2).then(res => {
                this.tableData2 = res.data.data.data;
                this.spsize = res.data.data.total
            })
        },
        // 查询分类
        getdataClass() {
            checkclass(localStorage.getItem('ex2')).then(res => {
                this.Choice = res.data;
            })
        },
        handleCurrentChange(val) {
            this.lessonName = val.lessonName;
            this.currentRow = val.lessonid;
        },
        Choices() {
            Choicenav({accountId:localStorage.getItem('ex2'),extendone:this.radio}).then(res => {
                this.$message.success(res.data);
            })
        },
        handleSizeChange(size) {
            this.pagesize = size;
        },
        current_change0: function(currentPage) {
            this.currentPage0 = currentPage;
            this.getImgText();
        },
        current_change1: function(currentPage) {
            this.currentPage1 = currentPage;
            this.getaudio();
        },
        current_change2: function(currentPage) {
            this.currentPage2 = currentPage;
            this.getvideo();
        },
        changeq(val,name){
            this.lessonName = name;
            this.classid = val;
        },
        getdataadd() {
            if(this.pointtype == 'lesson'){
                this.targetids = this.currentRow;
            }else if(this.pointtype == 'type'){
                this.targetids = this.classid;
            }else if(this.pointtype == 'diy'){
                if(this.linkName.trim() == "" || this.linkAddr.trim() == "") {
                    this.$message.error("请输入链接名称和链接地址");
                    return
                } else if (!this.linkAddr.trim().match(/^http:\/\/|https:\/\//)) {
                    this.$message.error("链接请以http://或者https://开头");
                    return
                }
            }
            this.delVisible = false;

            if(this.pointtype == 'diy'){
                this.ele.config.itemList[this.currentLinkIndex].url.title = this.linkName
                this.ele.config.itemList[this.currentLinkIndex].url.link = this.linkAddr
                this.ele.config.itemList[this.currentLinkIndex].url.type = 'diy'
            } else {
                this.ele.config.itemList[this.currentLinkIndex].url.title = this.lessonName
                this.ele.config.itemList[this.currentLinkIndex].url.link = this.pointtype == 'lesson' ? '/courseDetail' : '/Course'
                this.ele.config.itemList[this.currentLinkIndex].url.type = this.pointtype
                this.ele.config.itemList[this.currentLinkIndex].url.ids = this.targetids
            }
            this.$emit("setConfig", this.ele);
            this.linkAddr = ""
            this.linkName = ""
        },

        uploadImg(e, index) {
            let formData = new FormData();
            formData.append("file", e.target.files[0]);
            formData.append("accountId", this.Ids);
            uploadImg(formData).then(res => {
                res = JSON.parse(res);
                if (res.code == "0000") {
                    this.$message.success("上传成功");
                    this.ele.config.itemList[index].img = baseURL + res.data;
                    this.$emit("setConfig", this.ele);
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        changeTitle(e, index) {
            this.ele.config.itemList[index].title = e.target.value;
            this.$emit("setConfig", this.ele);
        },
        addOne() {
            let newItem = {
                // "img": this.title === "+ 增加轮播图" ? "http://jskt.yichuangtang.com/icon/lunbotu.png" : "http://jskt.yichuangtang.com/icon/navigaterBtn1.png",
                "img": this.defaultImg,
                "title": "",
                "placeholder": this.placeholder || "",
                "url": {
                    "title": this.title === "+ 增加轮播图" ? '' : '导航按钮',
                    "link": "",
                    "ids": "",
                    "type": ""
                }
            }
            this.ele.config.itemList.push(newItem);
            this.$emit("setConfig", this.ele);
        },
        del(index) {
            this.ele.config.itemList.splice(index, 1)
            this.$emit("setConfig", this.ele);
        },
        initSortable() {
            let _this = this
            new Sortable(_this.components, {
                group: {
                    name: "group",
                    put: false
                },
                sort: true,
                animation: 150,
                onUpdate(e) {
                    let temp = _this.ele.config.itemList[e.oldIndex]
                    if (e.oldIndex < e.newIndex) {
                        for(let i=e.oldIndex;i<e.newIndex;i++) {
                            _this.ele.config.itemList[i] = _this.ele.config.itemList[i + 1]
                        }
                    } else {
                        for(let i=e.oldIndex;i>e.newIndex;i--) {
                            _this.ele.config.itemList[i] = _this.ele.config.itemList[i - 1]
                        }
                    }
                    _this.ele.config.itemList[e.newIndex] = temp

                    let newArray = _this.ele.config.itemList.slice(0);
                    _this.ele.config.itemList = [];
                    _this.$nextTick(() => {
                        _this.ele.config.itemList = newArray;
                        _this.$emit("setConfig", _this.ele);
                    });
                }
            });
        }
    },
    watch: {
        currentEle(newVal) {
            this.ele = JSON.parse(JSON.stringify(this.currentEle));
        }
    },
    created() {
        this.ele = JSON.parse(JSON.stringify(this.currentEle));
        this.Ids = localStorage.getItem("ex2");

        this.getImgText()
        this.getaudio()
        this.getvideo()
        this.getdataClass()
    },
    mounted() {
        this.initSortable()
    }
};
</script>
<style lang="scss" scoped>
.addContent {
    font-size: 12px;
    padding: 8px;
    background: rgba(237, 237, 237, 0.53);
    .addContentItem {
        background-color: #fff;
        padding: 5px 3px;
        margin-bottom: 13px;
        position: relative;
        cursor: move;
        .img {
            float: left;
            width: 54px;
            height: 54px;
            position: relative;
            margin-right: 6px;
            img {
                width: 100%;
                height: 100%;
            }
            .shadow {
                width: 100%;
                height: 20px;
                position: absolute;
                left: 0;
                bottom: 0;
                text-align: center;
                color: #fff;
                background: rgb(0, 0, 0);
                opacity: 0.7;
                input[type="file"] {
                    opacity: 0;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .optionItem {
            float: left;
            width: 198px;
            > div {
                span {
                    display: inline-block;
                    width: 64px;
                    vertical-align: middle;
                }
                input {
                    border-radius: 2px;
                    border: 1px solid #eee;
                    width: 130px;
                    height: 24px;
                    line-height: 24px;
                    outline: none;
                    padding-left: 5px;
                    box-sizing: border-box;
                }
                p {
                    padding-left: 5px;
                    display: inline-block;
                    border: 1px solid #89b4fa;
                    background: rgba(42, 117, 237, 0.1);
                    border-radius: 2px;
                    box-sizing: border-box;
                    width: 90px;
                    height: 24px;
                    line-height: 22px;
                    vertical-align: middle;
                    word-break: keep-all;
                    overflow: hidden;
                }
                button {
                    height: 24px;
                    width: 36px;
                    background: #fff;
                    border: 1px solid #dcdfe6;
                    color: #606266;
                    text-align: center;
                    border-radius: 4px;
                    vertical-align: middle;
                }
            }
            > div:first-of-type {
                margin-bottom: 6px;
            }
        }
        .del{
            position: absolute;
            top: -7px;
            right: -7px;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            line-height: 16px;
            background-color: #bbb;
            color: #fff;
            text-align: center;

            cursor: default;
        }
    }
    .addOne {
        background-color: #fff;
        padding: 5px 3px;
        height: 54px;
        line-height: 54px;
        text-align: center;
        color: #2a75ed;
        cursor: pointer;
    }
}
.Choice ul li {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    height: 15px;
    padding: 20px;
}
.diy{
    >div{
        margin-top: 136px;
        >div{
            margin-bottom: 20px;
            span{
                font-size: 20px;
            }
            input{
                border-radius: 2px;
                border: 1px solid #eee;
                width: calc(100% - 130px);
                height: 30px;
                padding-left: 5px;
            }
        }
        p{
            color: red;padding-left: 105px;
        }
        >div:last-of-type{
            margin-bottom: 8px;
        }
    }
}
</style>