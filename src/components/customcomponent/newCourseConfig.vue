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
                <h5 class="title">展示数量</h5>
                <el-input-number v-model="ele.config.num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                <p class="text">默认显示前6个最新的图文、音频、视频课程</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["currentEle"],

    data() {
        return {
            ele: {},
            radio: "1",
        };
    },

    methods: {
        handleChange(val){
            this.ele.config.num = val;
            this.$emit("setConfig", this.ele);
        }
    },

    created() {
        this.ele = JSON.parse(JSON.stringify(this.currentEle));
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
            .text {
                font-size: 12px;
                color: #888888;
                margin-top: 6px;
            }
        }
        .option:last-of-type {
            border-bottom: none;
        }
    }
}
</style>