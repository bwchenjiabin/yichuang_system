<template>
    <div class="ads_box" :class="config.padding?'pad0':''">
        <div class="content">
            <div
                class="item"
                :class="'num'+config.num"
                v-for="(ele,index) in dataList"
                :key="index"
            >
                <img :class="config.itemList.length>0?'active':''" :src="ele.img" alt />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["config"],
    computed: {
        dataList() {
            if (this.config.itemList.length > 0) {
                return this.config.itemList;
            } else {
                let arr = [];
                for (let i = 0; i < this.config.num; i++) {
                    arr[i] = {
                        img: "http://jskt.yichuangtang.com/icon/ads.png",
                        title: "图片广告"
                    };
                }
                return arr;
            }
        }
    }
};
</script>
<style lang='scss' scoped>
.ads_box {
    padding: 20px 17px;
    background: #fff;
    .content {
        border-radius: 14px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            background: #ffe6c5;
            font-size: 14px;
            color: #b2b2b2;
            .active {
                width: 100%;
                height: auto;
                padding: 0;
                background: #fff;
            }
        }
        .num1 {
            width: 100%;
            img {
                height: 70px;
                padding: 10px 0;
            }
        }
        .num2 {
            width: calc((100% - 5px) / 2);
            img {
                height: 70px;
                padding: 10px 0;
            }
        }
        .num3 {
            width: calc((100% - 10px) / 3);
            img {
                height: 70px;
                padding: 10px 0;
            }
        }
    }
}
.pad0 {
    padding: 0;
    .content{
        border-radius: 0;
    }
}
</style>