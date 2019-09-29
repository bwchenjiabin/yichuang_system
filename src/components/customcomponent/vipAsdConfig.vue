<template>
    <div class="component_item">
        <h3 class="component_name">{{ele.text}}</h3>
        <div class="swiper">
            <div class="option">
                <h5 class="title">会员标题</h5>
                <el-input
                    v-model="ele.config.title"
                    :placeholder="ele.config.title"
                    @input="$emit('setConfig', ele)"
                ></el-input>
            </div>
            <div class="option">
                <h5 class="title">会员简介</h5>
                <el-input
                    v-model="ele.config.info"
                    :placeholder="ele.config.info"
                    @input="$emit('setConfig', ele)"
                ></el-input>
            </div>
            <div class="option">
                <h5 class="title">内容样式</h5>
                <el-radio-group v-model="ele.config.padding" @change="$emit('setConfig', ele)">
                    <el-radio :label="false">留边</el-radio>
                    <el-radio :label="true">填充</el-radio>
                </el-radio-group>
            </div>
            <div class="option">
                <h5 class="title">字体颜色</h5>
                <el-color-picker
                    v-model="ele.config.textColor"
                    show-alpha
                    :predefine="predefineColors"
                    @active-change="selectFontColor"
                    class="font_color"
                ></el-color-picker>
            </div>
            <div class="option">
                <h5 class="title">背景图片</h5>
                <div class="add_content">
                    <div class="add_item">
                        <img :src="ele.config.img" alt />
                    </div>
                    <p class="add_btn" @click="selectBgImg">+ 选择背景图</p>
                </div>
            </div>
        </div>
        <el-dialog title="选择背景图" :visible.sync="dialogTableVisible" width="30%" center>
            <div class="add_list">
                <div
                    class="item"
                    v-for="(item,index) in tableData"
                    :key="index"
                    :class="active==item.id?'active':''"
                    @click="active=item.id"
                >
                    <img :src="item.img" alt />
                </div>
            </div>
            <div class="foot_btn">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ["currentEle"],
    data() {
        return {
            ele: {},
            active: "",
            dialogTableVisible: false, //模态框显示/隐藏
            tableData: [
                {
                    img: "http://yckt.yichuangketang.com/img/advert/b3.png",
                    id: 1
                },
                {
                    img: "http://yckt.yichuangketang.com/img/advert/a1.png",
                    id: 2
                },
                {
                    img: "http://yckt.yichuangketang.com/img/advert/a2.png",
                    id: 3
                },
                {
                    img: "http://yckt.yichuangketang.com/img/advert/a3.png",
                    id: 4
                },
                {
                    img: "http://yckt.yichuangketang.com/img/advert/a4.png",
                    id: 5
                },
                {
                    img: "http://yckt.yichuangketang.com/img/advert/a5.png",
                    id: 6
                },
                {
                    img: "http://yckt.yichuangketang.com/img/advert/b1.png",
                    id: 7
                },
                {
                    img: "http://yckt.yichuangketang.com/img/advert/b2.png",
                    id: 8
                }
            ],
            predefineColors: [
                "rgba(74, 40, 9, 1)",
                "#ff4500",
                "#ff8c00",
                "#ffd700",
                "#90ee90",
                "#00ced1",
                "#1e90ff",
                "#c71585",
            ]
        };
    },

    created() {
        this.ele = JSON.parse(JSON.stringify(this.currentEle));
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {
        setConfig(ele) {
            this.ele = JSON.parse(JSON.stringify(ele));
            this.$emit("setConfig", ele);
        },
        // 选择字体颜色
        selectFontColor(val){
            this.ele.config.textColor = val;
            this.$emit("setConfig", this.ele);
        },
        // 选择背景图片
        selectBgImg() {
            this.dialogTableVisible = true;
            this.active = this.ele.config.id;
        },
        // 模态框取消
        cancel() {
            this.dialogTableVisible = false;
        },
        // 模态框确定
        confirm() {
            this.dialogTableVisible = false;
            let url = "";
            for (let i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].id == this.active) {
                    url = this.tableData[i].img;
                }
            }
            this.ele.config.id = this.active;
            this.ele.config.img = url;
            this.$emit("setConfig", this.ele);
        }
    },
    created() {
        this.ele = JSON.parse(JSON.stringify(this.currentEle));
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
            .add_content {
                width: 100%;
                margin-top: 10px;
                padding: 16px;
                background: rgba(237, 237, 237, 0.53);
                box-sizing: border-box;
                .add_item {
                    padding: 12px;
                    background: #fff;
                    img {
                        width: 100%;
                    }
                }
            }
            .add_btn {
                width: 100%;
                height: 36px;
                line-height: 36px;
                border-radius: 2px;
                text-align: center;
                border: 1px dashed #e3e5e8;
                box-sizing: border-box;
                cursor: pointer;
                margin-bottom: 10px;
                background: #fff;
                font-size: 12px;
                color: #409eff;
            }
            /deep/ .font_color {
                .el-color-picker__trigger{
                    width: 100px;
                }
            }
        }
        .option:last-of-type {
            border-bottom: none;
        }
    }
}
.add_list {
    width: 80%;
    height: 450px;
    overflow-y: auto;
    margin: 0 auto;
    padding-right: 30px;
    .item {
        width: 100%;
        margin: 6px 0;
        padding: 5px 10px;
        border: 2px solid #fff;
        img {
            width: 100%;
        }
    }
    .active {
        border: 2px solid #2878f0;
    }
}
.foot_btn {
    text-align: center;
    margin-top: 30px;
}
</style>