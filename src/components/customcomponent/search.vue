<template>
    <div class="search_box">
        <div class="content">
            <span class="el-icon-search"></span>&nbsp;
            <span>{{config.placeholder}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["config"]
};
</script>

<style lang="scss" scoped>
.search_box {
    padding: 8px 15px;
    background: #fff;
    .content {
        height: 30px;
        width: 100%;
        background: #f7f7f7;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #b2b2b2;
        font-size: 14px;
    }
}
</style>