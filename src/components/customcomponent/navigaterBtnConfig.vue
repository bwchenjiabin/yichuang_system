<template>
    <div class="component_item">
        <h3 class="component_name">{{ele.text}}</h3>
        <div class="swiper">
            <div class="option">
                <h5 class="title">一行显示</h5>
                <div class="oneLine">
                    <el-radio v-model="radio" label="3" @change="selectOneLine">三个</el-radio>
                    <el-radio v-model="radio" label="4" @change="selectOneLine">四个</el-radio>
                    <el-radio v-model="radio" label="5" @change="selectOneLine">五个</el-radio>
                </div>
            </div>
            <div class="option">
                <h5 class="title">添加内容</h5>
                <AddContent :currentEle="currentEle" @setConfig="setConfig" title="+ 增加图片导航"></AddContent>
            </div>
        </div>
    </div>
</template>

<script>
import AddContent from "@/components/addContent/addContent"

export default {
    components: {
        AddContent
    },
    data() {
        return {
            ele: {},
            radio: ""
        }
    },
    props: ["currentEle"],
    methods: {
        selectOneLine(amount) {
            this.ele.config.countOnLine = Number(amount)
            this.$emit("setConfig", this.ele)
        },
        setConfig(ele) {
            this.ele = JSON.parse(JSON.stringify(ele))
            this.$emit("setConfig", ele)
        }
    },
    created() {
        this.ele = JSON.parse(JSON.stringify(this.currentEle))
        this.radio = String(this.ele.config.countOnLine)
    }
};
</script>

<style lang="scss" scoped>
.component_item{
    .component_name {
        height: 60px;
        line-height: 60px;
        margin: 0;
        border-bottom: 1px solid #eaeaea;
        padding-left: 20px;
        font-size: 16px;
        font-weight: 600;
    }
    .swiper{
        padding: 10px;
        .option{
            padding-bottom: 20px;
            margin-bottom: 10px;
            border-bottom: 1px solid #eaeaea;
            h5{
                margin-bottom: 15px;
            }
        }
        .option:last-of-type{
            border-bottom: none;
        }
    }
}
</style>