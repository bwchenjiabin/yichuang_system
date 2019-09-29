<template>
    <div class="navigaterBtnBox">
        <div class="navigaterItem" :class="{type1: config.countOnLine == 3,type2: config.countOnLine == 4,type3: config.countOnLine == 5}" v-for="(item, index) in config.itemList" :key="index">
            <span v-if="item.url.type!='diy'">
                <img :src="item.img">
                <p>{{item.title}}</p>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["config"]
}
</script>

<style lang="scss" scoped>
.navigaterBtnBox{
    padding: 10px 5px;
    background-color: #fff;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .navigaterItem{
        padding: 10px 10px;
        img{
            width: 36px;
            height: 36px;
            display: block;
            margin: 0 auto;
            margin-bottom: 8px;
        }
        p{
            text-align: center;
            font-size: 12px;
            color: #888;
            margin: 0 auto;
        }
    }
    .navigaterItem.type1{
        width: 20%;
    }
    .navigaterItem.type2{
        width: 17%;
    }
    .navigaterItem.type3{
        width: 14%;
    }
}
</style>