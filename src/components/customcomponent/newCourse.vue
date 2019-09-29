<template>
    <div class="newCourse_box">
        <div class="header" v-show="config.showTitle">
            <h1 class="title">{{config.titleName}}</h1>
        </div>
        <div class="content">
            <div class="item" v-for="(ele,index) in reqData" :key="index">
                <div class="left_img fl">
                    <img :src="ele.img" alt />
                    <div class="courType" v-if="ele.lessonType==1">图文</div>
                    <div class="courType" v-if="ele.lessonType==2">音频</div>
                    <div class="courType" v-if="ele.lessonType==3">视频</div>
                </div>
                <div class="right_content">
                    <h3 class="title one-txt-cut">{{ele.lessonName}}</h3>
                    <p class="info txt-cut">{{ele.lessonDetail}}</p>
                    <div class="price">
                        <div class="money" v-if="ele.lessonVip==2 || ele.lessonVip==1">
                            <del>¥{{ele.lessonPriceFormer}}</del>
                            <span>¥{{ele.lessonPriceNow}}</span>
                        </div>
                        <div class="vip" v-if="ele.lessonVip==1">会员免费</div>
                        <div class="no_money fr" v-if="ele.lessonVip==0">免费</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getNewCourse } from "api/userAjax";

export default {
    props: ["config"],

    data() {
        return {
            allDate: [], //请求的数据
            reqData: [] //展示的数据
        };
    },

    mounted() {
        this.initData();
    },

    watch: {
        config(newVal) {
            this.reqData = this.allDate.slice(0, newVal.num);
        }
    },

    methods: {
        async initData() {
            let res = await getNewCourse({
                accountid: localStorage.getItem("ex2")
            });
            if (res.data.data.length) {
                this.allDate = res.data.data;
            } else {
                this.allDate = this.config.defData;
            }
            this.reqData = this.allDate.slice(0, this.config.num);
        }
    }
};
</script>
<style lang='scss' scoped>
.newCourse_box {
    padding: 10px 17px;
    background: #fff;
    .header {
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
            font-size: 16px;
            font-weight: 600;
            color: #030303;
        }
        .more {
            font-size: 12px;
            line-height: 18px;
            color: #999999;
        }
    }
    .content {
        margin-top: 2px;
        .item {
            padding: 10px 0;
            .left_img {
                position: relative;
                width: 120px;
                height: 90px;
                border-radius: 4px;
                background: #ccc;
                img {
                    width: 100%;
                    height: 100%;
                }
                .courType {
                    position: absolute;
                    left: 0;
                    top: 0;
                    font-size: 12px;
                    color: #fff;
                    background: rgba(255, 144, 0, 1);
                    padding: 3px 5px;
                    border-top-left-radius: 4px;
                    border-top-right-radius: 16px;
                    border-bottom-right-radius: 16px;
                }
            }
            .right_content {
                height: 90px;
                padding-left: 130px;
                .title {
                    font-size: 15px;
                    color: #333;
                    margin-bottom: 6px;
                }
                .info {
                    height: 34px;
                    font-size: 13px;
                    color: #999;
                    margin-bottom: 10px;
                }
                .price {
                    display: flex;
                    flex-direction: row-reverse;
                    justify-content: space-between;
                    .money {
                        color: #ff9000;
                        font-size: 15px;
                        del {
                            color: #9f9f9f;
                            font-size: 12px;
                            margin-right: 8px;
                        }
                    }
                    .no_money {
                        color: #ff9000;
                        font-size: 15px;
                    }
                    .vip {
                        width: 60px;
                        height: 18px;
                        border: 1px solid #ff9000;
                        color: #ff9000;
                        font-size: 12px;
                        line-height: 18px;
                        text-align: center;
                        border-radius: 4px;
                    }
                }
            }
        }
    }
}
</style>