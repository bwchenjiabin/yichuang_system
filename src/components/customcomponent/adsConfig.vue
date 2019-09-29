<template>
    <div class="component_item">
        <h3 class="component_name">{{ele.text}}</h3>
        <div class="swiper">
            <div class="option">
                <h5 class="title">一行显示</h5>
                <el-radio-group v-model="ele.config.num" @change="$emit('setConfig', ele)">
                    <el-radio :label="1">一张</el-radio>
                    <el-radio :label="2">两张</el-radio>
                    <el-radio :label="3">三张</el-radio>
                </el-radio-group>
            </div>
            <div class="option">
                <h5 class="title">内容样式</h5>
                <el-radio-group v-model="ele.config.padding" @change="$emit('setConfig', ele)">
                    <el-radio :label="false">留边</el-radio>
                    <el-radio :label="true">填充</el-radio>
                </el-radio-group>
            </div>
            <div class="option">
                <h5 class="title">添加内容</h5>
                <AddContent :currentEle="currentEle" @setConfig="setConfig" title="+ 增加图片导航" placeholder="(选填)" diabledTitle="true"></AddContent>
            </div>
        </div>
    </div>
</template>

<script>
import AddContent from "@/components/addContent/addContent";

export default {
    props: ["currentEle"],
    data() {
        return {
            ele: {}
        };
    },
    created() {
        this.ele = JSON.parse(JSON.stringify(this.currentEle));
    },
    components: {
        AddContent
    },
    methods: {
        setConfig(ele) {
            this.ele = JSON.parse(JSON.stringify(ele))
            this.$emit("setConfig", ele)
        }
    }
};
</script>
<style lang='scss' scoped>
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
        }
        .option:last-of-type {
            border-bottom: none;
        }
    }
}
</style>