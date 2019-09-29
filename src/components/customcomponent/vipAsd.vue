<template>
    <div class="vipAsd_box" :class="config.padding?'pad0':''">
        <div class="content">
            <img :src="config.img" alt />
            <div class="text" :style="{color:config.textColor}">
                <p class="title">{{config.title}}</p>
                <p>{{config.info}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["config"],

    data() {
        return {};
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {}
};
</script>
<style lang='scss' scoped>
.vipAsd_box {
    padding: 10px 17px;
    background: #fff;
    .content {
        border-radius: 4px;
        position: relative;
        font-size: 0;
        img{
            width: 100%;
        }
        .text {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 60px;
            font-size: 13px;
            .title {
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 4px;
            }
        }
    }
}
.pad0 {
    padding: 0;
    .content {
        border-radius: 0;
    }
}
</style>