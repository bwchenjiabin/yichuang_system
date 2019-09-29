<template>
    <div class="component_item">
        <h3 class="component_name">{{ele.text}}</h3>
        <div class="swiper">
            <div class="option">
                <h5 class="title">占位提示</h5>
                <div>
                    <input type="text" :value="ele.config.placeholder" @input="changePlaceholder($event)">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ele: {}
        }
    },
    props: ["currentEle"],
    methods: {
        changePlaceholder(e) {
            this.ele.config.placeholder = e.target.value
            this.$emit("setConfig", this.ele)
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
            input{
                width: 100%;
                height: 36px;
                box-sizing: border-box;
                line-height: 36px;
                padding: 0 8px;
                font-size: 14px;
                border: 1px solid #dcdfe6;
            }
        }
        .option:last-of-type{
            border-bottom: none;
        }
    }
}
</style>