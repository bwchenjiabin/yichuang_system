<template>
    <div class="courseList_box">
        <div class="header">
            <h1 class="title">{{config.titleName}}</h1>
            <span class="more">查看更多</span>
        </div>
        <div class="content">
            <div class="item1" v-for="item in detailList" :key="item.id">
                <div class="left_img fl">
                    <img :src="baseURL + item.img" alt />
                    <div class="courType" v-if="item.lessonType == 1">图文</div>
                    <div class="courType" v-if="item.lessonType == 2">音频</div>
                    <div class="courType" v-if="item.lessonType == 3">视频</div>
                </div>
                <div class="right_content">
                    <h3 class="title one-txt-cut">{{item.lessonName}}</h3>
                    <p class="info txt-cut">{{item.lessonDetail}}</p>
                    <div class="price">
                        <div class="vip" v-if="item.lessonVip == 1">会员免费</div>
                        <div class="money" v-if="item.lessonVip == 2">
                            <span>￥{{item.lessonPriceNow}}</span>
                            <del>￥{{item.lessonPriceFormer}}</del>
                        </div>
                        <div class="no_money" v-if="item.lessonVip == 0">免费</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ceshi} from 'api/userAjax';
import { baseURL } from "common/config";

export default {
    props: ["config"],
    data() {
        return {
            defaultData: {
                img: "/icon/kejianfengmian.png",
                lessonType: 1,
                lessonName: "示例课程",
                lessonDetail: "这是一个示例课程,请选择真实课程",
                lessonVip: 0
            },
            detailList: []
        }
    },
    computed: {
        baseURL() {
            return baseURL
        }
    },
    watch: {
        config(newVal) {
            if(newVal.showList.length == 0) {
                this.detailList = [this.defaultData]
            } else {
                this.getDetail(newVal.showList)
            }
        }
    },
    methods: {
        async getDetail(idList) {
            let list = []
            for (let i in idList) {
                await ceshi(idList[i]).then(res => {
                    if (res != "课程不存在或已下架") {
                        list.push(res.data)
                    }
                });
            }
            this.detailList = list
        }
    },
    created() {
        if(this.config.showList.length == 0) {
            this.detailList = [this.defaultData]
        } else {
            this.getDetail(this.config.showList)
        }
    }
};
</script>
<style lang='scss' scoped>
.courseList_box {
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
        .item1 {
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
                    font-size: 13px;
                    color: #999;
                    margin-bottom: 10px;
                }
                .price {
                    display: flex;
                    justify-content: space-between;
                    .money {
                        color: #ff9000;
                        font-size: 15px;
                        del {
                            color: #9f9f9f;
                            font-size: 12px;
                            margin-left: 6px;
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