<template>
    <div class="component_item">
        <h3 class="component_name">{{ele.text}}</h3>
        <div class="swiper">
            <div class="option">
                <h5 class="title">添加内容</h5>
                <AddContent :currentEle="currentEle" @setConfig="setConfig" title="+ 增加轮播图" placeholder="(选填)"></AddContent>
            </div>
        </div>
    </div>
</template>

<script>
import AddContent from "@/components/addContent/addContent"
export default {
    data() {
        return {
            ele: {}
        }
    },
    props: ["currentEle"],
    components: {
        AddContent
    },
    methods: {
        setConfig(ele) {
            this.ele = JSON.parse(JSON.stringify(ele))
            this.$emit("setConfig", ele)
        }
    },
    created() {
        this.ele = JSON.parse(JSON.stringify(this.currentEle));
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