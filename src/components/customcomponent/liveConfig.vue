<template>
    <div class="component_item">
        <h3 class="component_name">{{ele.text}}</h3>
        <div class="swiper">
            <div class="option">
                <div class="clearfix">
                    <h5 class="title fl">标题栏</h5>
                    <el-checkbox
                        class="fr"
                        v-model="ele.config.showTitle"
                        @change="$emit('setConfig', ele)"
                    >显示</el-checkbox>
                </div>
                <div class="clearfix" v-show="ele.config.showTitle">
                    <h5 class="title fl">查看全部入口</h5>
                    <el-checkbox
                        class="fr"
                        v-model="ele.config.showMore"
                        @change="$emit('setConfig', ele)"
                    >显示</el-checkbox>
                </div>
                <div v-show="ele.config.showTitle">
                    <h5 class="title">标题名称</h5>
                    <el-input
                        v-model="ele.config.titleName"
                        :placeholder="ele.config.titleName"
                        @input="$emit('setConfig', ele)"
                    ></el-input>
                </div>
            </div>
            <div class="option">
                <h5 class="title">内容来源</h5>
                <el-radio-group v-model="ele.config.contentFrom" @change="changeContentFrom">
                    <el-radio :label="1">默认规则</el-radio>
                    <el-radio :label="2">手动选择</el-radio>
                </el-radio-group>
                <div class="add_content">
                    <div v-show="currentLive.title && ele.config.contentFrom == 2" class="add_item">
                        <div class="type">直播</div>
                        <div class="title">{{currentLive.title}}</div>
                    </div>
                    <p
                        class="add_btn"
                        :class="{active: ele.config.contentFrom ==2}"
                        @click="ele.config.contentFrom ==1?dialogTableVisible = false : dialogTableVisible = true"
                    >+ 选择直播</p>
                    <p class="text" v-show="ele.config.contentFrom ==1">默认展示一个最新的直播</p>
                    <p class="text" v-show="ele.config.contentFrom ==2">此页面仅展示一个直播课程, 请选择要展示的直播</p>
                </div>
            </div>
        </div>
        <!-- 模态框 -->
        <el-dialog title="选择直播" :visible.sync="dialogTableVisible" width="40%">
            <!-- <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="inputName" placeholder="请输入名称" prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button>搜索</el-button>
                </el-form-item>
            </el-form> -->
            <h3 class="mode_title">
                <div style="padding-left:60px">直播名称</div>
                <div style="padding-right:60px">创建时间</div>
            </h3>
            <div class="mode_content">
                <div
                    class="item"
                    v-for="(ele,index) in liveList.list"
                    :key="index"
                    @click="modeRadio=ele.id"
                >
                    <div class="item_left">
                        <el-radio v-model="modeRadio" :label="ele.id"></el-radio>
                        <img :src="ele.image" alt />
                        <span>{{ele.title}}</span>
                    </div>
                    <div class="item_right">{{ele.createtime}}</div>
                </div>
            </div>
            <div class="mode_page">
                <span>共{{liveList.total}}条</span>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="liveList.total"
                    :page-size="pageSize"
                    @current-change="changePage"
                    @prev-click="changePage"
                    @next-click="changePage"
                ></el-pagination>
            </div>
            <div class="foot_btn">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { selectlive } from "api/userAjax";

export default {
    data() {
        return {
            ele: {},
            radio: "1", //1->默认规则/ 2->手动选择
            modeRadio: "", //选择直播课程id
            inputName: "", //搜索课程名称
            dialogTableVisible: false, //模态框显示/隐藏
            liveList: [], //直播课程数据
            pageNum: 1, // 默认第一页
            pageSize: 6, //一页展示的数量
            allPage: 0, // 数据的总页数
            currentLive: {}
        };
    },
    props: ["currentEle"],

    methods: {
        async searchLive() {
            let res = await selectlive({
                accountid: localStorage.getItem("ex2"),
                pageNum: this.pageNum,
                pageSize: this.pageSize
            });
            this.liveList = res.data.data;
        },
        changePage(val) {
            this.pageNum = val;
            this.searchLive();
        },
        // 改变内容来源的规则
        changeContentFrom(val) {
            this.ele.config.contentFrom = val;
            this.currentLive = {};
            if (val == 1) {
                if (this.liveList.list.length) {
                    this.ele.config.data = this.liveList.list[0].id;
                } else {
                    this.ele.config.data = 0;
                }
            } else {
                this.ele.config.data = 0;
            }
            this.$emit("setConfig", this.ele);
        },
        // 取消函数
        cancel() {
            this.dialogTableVisible = false;
            this.modeRadio = "";
        },
        // 确定函数
        confirm() {
            if (this.modeRadio == "") {
                this.$message.error("请选择一个直播");
                return
            }
            let arr = this.liveList.list.filter((item, index) => {
                return item.id == this.modeRadio;
            });
            this.ele.config.data = arr[0].id;
            this.currentLive = arr[0]
            this.$emit("setConfig", this.ele);
            this.dialogTableVisible = false;
        }
    },

    created() {
        this.ele = JSON.parse(JSON.stringify(this.currentEle));
        this.searchLive()
    }
};
</script>

<style lang="scss" scoped>
.component_item {
    .component_name {
        height: 60px;
        line-height: 60px;
        margin: 0;
        border-bottom: 1px solid #eaeaea;
        padding-left: 20px;
        font-size: 16px;
        font-weight: 600;
    }
    .swiper {
        padding: 10px;
        .option {
            padding-bottom: 20px;
            margin-bottom: 10px;
            border-bottom: 1px solid #eaeaea;
            h5 {
                margin-bottom: 15px;
            }
            .add_content {
                width: 100%;
                margin-top: 10px;
                padding: 16px;
                background: rgba(237, 237, 237, 0.53);
                box-sizing: border-box;
                .text {
                    font-size: 12px;
                    color: #888;
                    margin-top: 10px;
                }
                .add_item {
                    display: flex;
                    align-items: center;
                    position: relative;
                    margin-bottom: 8px;
                    padding: 12px;
                    height: 20px;
                    background: #fff;
                    cursor: move;
                    .type {
                        font-size: 12px;
                        color: #2878f0;
                        margin-right: 10px;
                    }
                    .title {
                        width: 170px;
                        font-size: 12px;
                        color: #333333;
                    }
                }
            }
            .add_btn {
                width: 100%;
                height: 36px;
                line-height: 36px;
                border-radius: 2px;
                text-align: center;
                border: 1px dashed #e3e5e8;
                box-sizing: border-box;
                cursor: pointer;
                margin-bottom: 10px;
                background: #fff;
                font-size: 12px;
                color: #dddddd;
            }
            .active {
                color: #409eff;
            }
        }
        .option:last-of-type {
            border-bottom: none;
        }
    }
}
/deep/ .el-dialog__header {
    background: #f5f7fa;
}
.mode_title {
    width: 98%;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    background: #f6f8fa;
    border-bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #333;
}
.mode_content {
    height: 376px;
    overflow: auto;
    .item {
        display: flex;
        justify-content: space-between;
        height: 72px;
        width: 100%;
        border-bottom: 1px solid #eeeeee;
        align-items: center;

        .item_left {
            display: flex;
            align-items: center;
            img {
                width: 56px;
                height: 42px;
                border-radius: 2px;
                margin-right: 10px;
            }
        }
        .item_right {
            padding-right: 20px;
        }
    }
}
.mode_page {
    display: flex;
    justify-content: center;
    align-items: center;
}
.foot_btn {
    text-align: center;
    margin-top: 30px;
}
</style>