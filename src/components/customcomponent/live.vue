<template>
    <div class="newCourse_box">
        <div class="header" v-show="config.showTitle">
            <h1 class="title">{{config.titleName}}</h1>
            <span class="more" v-show="config.showMore">查看更多</span>
        </div>
        <div class="content">
            <div class="img">
                <img :src="currentLive.image" alt />
            </div>
            <p class="name one-txt-cut">{{currentLive.title}}</p>
            <div class="clearfix">
                <div class="time fl">
                    <span class="el-icon-video-play" v-if="currentLive.status!=2"></span>
                    <span v-if="currentLive.status==0">{{currentLive.createtime}}</span>
                    <span v-if="currentLive.status==1 || currentLive.status==3">正在直播</span>
                    <span class="back" v-if="currentLive.status==2">回看</span>
                </div>
                <div class="no_money fr" v-if="currentLive.livevip==0">免费</div>
                <div class="member fl" v-if="currentLive.livevip==1">会员免费</div>
                <div class="price fr" v-if="currentLive.livevip==1||currentLive.livevip==2">
                    <del class="old_p">¥{{currentLive.price}}</del>
                    <span class="new_p">¥{{currentLive.nowprice}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { selectlive } from "api/userAjax";

export default {
    data() {
        return {
            currentLive: {},
            pageNum: 1, // 默认第一页
            pageSize: 10000, //一页展示的数量
            liveList: {}
        }
    },
    props: ["config"],
    methods: {
        async searchLive() {
            let res = await selectlive({
                accountid: localStorage.getItem("ex2"),
                pageNum: this.pageNum,
                pageSize: this.pageSize
            });
            this.liveList = res.data.data.list
            if(this.config.contentFrom == 1) {
                if (this.liveList.length) {
                    this.currentLive = this.liveList[0]
                } else {
                    this.currentLive = {
                        "id": 0,
                        "title": "此处显示课程名称",
                        "status": "3",
                        "livevip": "0",
                        "image": "http://jskt.yichuangtang.com/icon/live.png"
                    }
                }
            } else {
                let hasSame = false
                for (let i in this.liveList) {
                    if (this.config.data == this.liveList[i].id) {
                        hasSame = true
                        this.currentLive = this.liveList[i]
                        break;
                    }
                }
                if (!hasSame) {
                    this.currentLive = {
                        "id": 0,
                        "title": "此处显示课程名称",
                        "status": "3",
                        "livevip": "0",
                        "image": "http://jskt.yichuangtang.com/icon/live.png"
                    }
                }
            }
        }
    },
    watch: {
        config() {
            this.searchLive()
        }
    },
    created() {
        this.searchLive()
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
        margin-top: 12px;
        .img {
            width: 100%;
            height: 150px;
            border-radius: 3px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .name {
            height: 30px;
            line-height: 30px;
            margin-bottom: 10px;
            font-size: 15px;
            color: #333;
            font-weight: bold;
        }
        .time {
            font-size: 13px;
            color: #999;
            height: 20px;
            line-height: 20px;
            .iconfont {
                font-size: 17px;
            }
            .back {
                border: 1px solid #333;
                padding: 2px 18px;
                border-radius: 20px;
            }
        }
        .price {
            margin-left: 20px;
            line-height: 16px;
            .new_p {
                font-size: 15px;
                color: #ff9000;
                margin-left: 11px;
            }

            .old_p {
                font-size: 12px;
                color: #9f9f9f;
            }
        }
        .no_money {
            font-size: 15px;
            color: #ff9000;
            margin-left: 20px;
        }
        .member {
            width: 60px;
            height: 16px;
            margin-left: 19px;
            font-size: 12px;
            line-height: 16px;
            text-align: center;
            color: #ff9000;
            border: 1px solid #ff9000;
            border-radius: 2px;
        }
    }
}
</style>