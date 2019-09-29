<template>
    <div class="swiper_box">
        <div class="block">
            <el-carousel height="150px" :autoplay="true" arrow="never" trigger="click" :class="config.itemList.length>1?'':'cancel_active'">
                <el-carousel-item v-for="(item, index) in config.itemList" :key="index">
                    <h3 class="small">
                        <img :src="item.img" alt />
                    </h3>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
export default {
    props: ["config"],
    data() {
        return {
            swiper: null
        };
    }
};
</script>
<style lang='scss' scoped>
.swiper_box {
    width: 100%;
    position: relative;
    box-sizing: content-box;
    background-color: #fff;
    cursor: move;
    .el-carousel__item h3 {
        width: 100%;
        height: 100%;
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
        text-align: center;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }

    /deep/ .el-carousel__indicators {
        .el-carousel__indicator {
            .el-carousel__button {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #ededed;
            }
        }
        .is-active {
            .el-carousel__button {
                width: 15px;
                background: #ff9000;
                border-radius: 3px;
            }
        }
    }
    /deep/ .cancel_active {
        .el-carousel__indicators {
            display: none;
        }
    }
}
</style>