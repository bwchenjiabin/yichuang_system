<template>
    <el-container>
        <el-header>
            <el-button plain size="small" class="fl" @click="openAlert">退出编辑</el-button>
            <el-button type="primary" size="small" class="fr" @click="save">保存</el-button>
            <el-button type="primary" plain size="small" class="fr">保存并预览</el-button>
        </el-header>
        <el-container>
            <!-- 左侧区域 -->
            <el-aside width="280px">
                <!-- 组件分类 -->
                <ul class="component_list">
                    <li
                        v-for="(ele, index) in componentDataList"
                        :key="index"
                        :class="listIndex==index?'active':''"
                        @click="listIndex=index"
                    >
                        <span :class="ele.icon" style="font-size: 26px;"></span>
                        <p>{{ele.text}}</p>
                    </li>
                </ul>
                <!-- 组件列表 -->
                <div
                    class="item_box"
                    v-show="listIndex == index"
                    v-for="(item, index) in componentDataList"
                    :key="index"
                >
                    <div
                        class="item"
                        v-for="(ele, index) in item.content"
                        :key="index"
                        @click="addComponent(ele)"
                        :componentId="ele.id"
                    >
                        <span class="icon" :class="ele.icon"></span>
                        <p>{{ele.text}}</p>
                    </div>
                </div>
            </el-aside>
            <!-- 右侧区域 -->
            <el-main>
                <el-container>
                    <el-main class="component_show">
                        <div class="phone_show">
                            <div style="padding-bottom: 40px;">
                                <h1 class="title_img">
                                    <img src="~assets/customcomponent/img_top_weixin.png" alt />
                                </h1>
                                <div
                                    ref="components"
                                    style="background-color: #F5F6F9;box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.05); min-height: 611px;"
                                >
                                    <div
                                        style="position: relative"
                                        v-for="(ele,index) in currentList"
                                        :key="index"
                                        :index="index"
                                        @mousedown="setCurrentConfig(ele, index)"
                                        class="component_border"
                                        :class="{active: currentEleIndex == index, space: ele.id == 7 || ele.id == 6 || ele.id == 5}"
                                    >
                                        <Search v-if="ele.id==1" :config="ele.config"></Search>
                                        <Swiper v-if="ele.id==2" :config="ele.config"></Swiper>
                                        <NavigaterBtn v-if="ele.id==3" :config="ele.config"></NavigaterBtn>
                                        <Ads v-if="ele.id==4" :config="ele.config"></Ads>
                                        <CourseList v-if="ele.id==5" :config="ele.config"></CourseList>
                                        <Live v-if="ele.id==6" :config="ele.config"></Live>
                                        <NewCourse v-if="ele.id==7" :config="ele.config"></NewCourse>
                                        <VipAsd v-if="ele.id==8" :config="ele.config"></VipAsd>
                                        <div
                                            class="del"
                                            v-if="currentEleIndex == index"
                                            @click.stop="del(index)"
                                        >×</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-main>
                    <div class="component_configbox">
                        <el-aside class="component_config">
                            <h3 class="config_header">组件配置</h3>
                            <SearchConfig
                                v-if="currentList.length && currentEle.id==1"
                                :currentEle="currentEle"
                                @setConfig="setConfig"
                            ></SearchConfig>
                            <SwiperConfig
                                v-if="currentList.length && currentEle.id==2"
                                :currentEle="currentEle"
                                @setConfig="setConfig"
                            ></SwiperConfig>
                            <NavigaterBtnConfig
                                v-if="currentList.length && currentEle.id==3"
                                :currentEle="currentEle"
                                @setConfig="setConfig"
                            ></NavigaterBtnConfig>
                            <AdsConfig
                                v-if="currentList.length && currentEle.id==4"
                                :currentEle="currentEle"
                                @setConfig="setConfig"
                            ></AdsConfig>
                            <CourseListConfig
                                v-if="currentList.length && currentEle.id==5"
                                :currentEle="currentEle"
                                @setConfig="setConfig"
                            ></CourseListConfig>
                            <LiveConfig
                                v-if="currentList.length && currentEle.id==6"
                                :currentEle="currentEle"
                                @setConfig="setConfig"
                            ></LiveConfig>
                            <NewCourseConfig
                                v-if="currentList.length && currentEle.id==7"
                                :currentEle="currentEle"
                                @setConfig="setConfig"
                            ></NewCourseConfig>
                            <VipAsdConfig
                                v-if="currentList.length && currentEle.id==8"
                                :currentEle="currentEle"
                                @setConfig="setConfig"
                            ></VipAsdConfig>
                        </el-aside>
                    </div>
                </el-container>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import Sortable from "sortablejs";
import { componentDataList } from "@/components/customcomponent/componentList";
import defaultList from "@/components/customcomponent/defaultList";
import { saveDesignHomeData, loadDesignHomeData } from "api/userAjax";
import {
    Search,
    SearchConfig,
    Swiper,
    SwiperConfig,
    NavigaterBtn,
    NavigaterBtnConfig,
    Ads,
    AdsConfig,
    CourseList,
    CourseListConfig,
    Live,
    LiveConfig,
    NewCourse,
    NewCourseConfig,
    VipAsd,
    VipAsdConfig
} from "@/components/customcomponent/componentList";

export default {
    components: {
        Search,
        SearchConfig,
        Swiper,
        SwiperConfig,
        NavigaterBtn,
        NavigaterBtnConfig,
        Ads,
        AdsConfig,
        CourseList,
        CourseListConfig,
        Live,
        LiveConfig,
        NewCourse,
        NewCourseConfig,
        VipAsd,
        VipAsdConfig
    },
    data() {
        return {
            listIndex: 0, //组件分类索引, 默认第0个
            currentList: [], //分类里组件数组
            currentEle: {}, //当前正在编辑的组件
            currentEleIndex: -1, // 当前正在编辑的组件index
            index: -1
        };
    },

    computed: {
        components() {
            return this.$refs.components;
        },
        componentDataList() {
            return componentDataList;
        }
    },

    methods: {
        getComponent(id) {
            for (let i = 0; i < componentDataList.length; i++) {
                for (let j = 0; j < componentDataList[i].content.length; j++) {
                    if (componentDataList[i].content[j].id == id)
                        return componentDataList[i].content[j];
                }
            }
        },
        addComponent(ele) {
            ele.index = this.index++;
            this.currentList.push(ele);
            this.$nextTick(() => {
                document.querySelector(
                    ".component_show"
                ).scrollTop = document.querySelector(
                    ".component_show"
                ).scrollHeight;
            });
        },
        setCurrentConfig(ele, index) {
            this.currentEle = {};
            this.$nextTick(() => {
                this.currentEle = ele;
                this.currentEleIndex = index;
            });
        },
        initSortable() {
            let _this = this;
            for (let i in this.componentDataList) {
                new Sortable(document.querySelectorAll(".item_box")[i], {
                    group: {
                        name: "group",
                        pull: "clone",
                        put: false
                    },
                    sort: false,
                    animation: 150,
                    onEnd(e) {
                        e.to.removeChild(e.item);
                        let temp = _this.getComponent(
                            Number(e.item.getAttribute("componentId"))
                        );
                        temp.index = _this.index++;
                        for (
                            let i = _this.currentList.length;
                            i > e.newIndex;
                            i--
                        ) {
                            _this.currentList[i] = _this.currentList[i - 1];
                        }
                        _this.currentList[e.newIndex] = temp;

                        let newArray = _this.currentList.slice(0);
                        _this.currentList = [];
                        _this.$nextTick(() => {
                            _this.currentList = newArray;
                        });
                    }
                });
            }
            new Sortable(_this.components, {
                group: {
                    name: "group",
                    put: true
                },
                sort: true,
                animation: 150,
                ghostClass: "ghost",
                onUpdate(e) {
                    let temp = _this.currentList[e.oldIndex];
                    if (e.oldIndex < e.newIndex) {
                        for (let i = e.oldIndex; i < e.newIndex; i++) {
                            _this.currentList[i] = _this.currentList[i + 1];
                        }
                    } else {
                        for (let i = e.oldIndex; i > e.newIndex; i--) {
                            _this.currentList[i] = _this.currentList[i - 1];
                        }
                    }
                    _this.currentList[e.newIndex] = temp;

                    let newArray = _this.currentList.slice(0);
                    _this.currentList = [];
                    _this.$nextTick(() => {
                        _this.currentList = newArray;
                        _this.currentEleIndex = e.newIndex;
                    });
                }
            });
        },
        setConfig(ele) {
            this.currentEle = JSON.parse(JSON.stringify(ele));
            let list = JSON.parse(JSON.stringify(this.currentList));
            list[this.currentEleIndex] = ele;
            this.currentList = JSON.parse(JSON.stringify(list));
        },
        del(index) {
            let temp = this.currentList.slice(0);
            this.currentEle = {};
            temp.splice(index, 1);
            this.currentList = [];
            this.$nextTick(() => {
                this.currentList = temp;
                if (index == temp.length) {
                    this.currentEle = temp[temp.length - 1]
                        ? temp[temp.length - 1]
                        : {};
                    this.currentEleIndex = temp[temp.length - 1]
                        ? temp.length - 1
                        : -1;
                } else if (index == 0) {
                    this.currentEle = temp[0] ? temp[0] : {};
                    this.currentEleIndex = temp[0] ? 0 : -1;
                } else {
                    this.currentEle = temp[index] ? temp[index] : {};
                    this.currentEleIndex = temp[index] ? index : -1;
                }
            });
        },
        save() {
            let list = JSON.parse(JSON.stringify(this.currentList));
            for (let i in list) {
                delete list[i].index;
            }
            let dataStr = JSON.stringify(list);
            let encodeData = window.btoa(window.encodeURIComponent(dataStr));

            saveDesignHomeData({
                acId: localStorage.getItem("ex2"),
                type: "home",
                templateData: encodeData
            }).then(res => {
                if (res.data.code == "0000") {
                    this.$message.success("配置保存成功!");
                    this.$router.go(-1);
                }
            });
        },
        load() {
            loadDesignHomeData({
                acId: localStorage.getItem("ex2"),
                type: "home"
            }).then(res => {
                let currentList = [];
                if (res.data.data === null) {
                    currentList = JSON.parse(JSON.stringify(defaultList));
                } else {
                    let decodeData = window.decodeURIComponent(
                        window.atob(res.data.data.templateData)
                    );
                    currentList = JSON.parse(decodeData);
                }
                this.currentList = currentList;
                for (let i in this.currentList) {
                    this.currentList[i].index = Number(i);
                }
                this.index = this.currentList.length;
            });
        },
        openAlert() {
            this.$confirm("此时离开将丢失已编辑的内容，是否离开？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true
            }).then(() => {
                this.$router.go(-1);
            });
        }
    },

    created() {
        this.load();
    },

    mounted() {
        this.initSortable();
    }
};
</script>
<style lang="scss" scoped>
.fl {
    float: left;
}
.fr {
    float: right;
}
.el-main {
    padding: 0;
    margin-top: 60px;
}
.el-container,
.el-container {
    height: 100%;
}
.el-aside {
    margin-left: 0px;
    margin-right: 0px;
    color: #333;
    text-align: center;
    line-height: normal;
    background: #fff;
}
.el-header {
    background: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid #eee;
    .el-button {
        margin-top: 14px;
    }
}

.el-container .el-aside {
    width: "80px";
    overflow: hidden;
    margin-top: 60px;
}
.component_list {
    background: #243042;
    width: 80px;
    padding-top: 20px;
    float: left;
    height: 100%;
    li {
        text-align: center;
        color: rgba(255, 255, 255, 0.35);
        margin-bottom: 40px;
        cursor: pointer;
        .icon {
            font-size: 26px;
        }
        p {
            margin: 0;
            margin-top: 6px;
            font-size: 12px;
        }
    }
    .active {
        color: rgba(255, 255, 255, 1);
        position: relative;
        &::after {
            content: "";
            display: inline-block;
            position: absolute;
            right: 0;
            top: 0;

            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-right: 8px solid #fff;
        }
    }
}
.item_box {
    width: 200px;
    height: 100%;
    background: #fff;
    padding: 11px;
    margin-left: 80px;
    box-shadow: 4px 0px 8px 0px rgba(0, 0, 0, 0.05);
    .item {
        position: relative;
        float: left;
        width: 78px;
        height: 69px;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;
        margin-left: 10px;
        margin-bottom: 20px;
        .icon {
            font-size: 24px;
            display: inline-block;
            margin-top: 10px;
        }
        p {
            margin: 0;
            margin-top: 6px;
            font-size: 12px;
        }
        &:hover {
            background: #2a75ed;
            color: #ffffff;
        }
    }
}

.el-main {
    // 中间手机展示
    .component_show {
        width: 100%;
        height: 100%;
        background-color: #f5f7fa;
        padding-top: 40px;
        margin-top: 0;
        .phone_show {
            width: 375px;
            height: 667px;
            margin: 0 auto;
            background: #f5f6f9;
            box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.05);
            cursor: move;
            .title_img {
                margin: 0;
                height: 64px;
                width: 100%;
                img {
                    width: 100%;
                }
            }
            .component_border {
                border: 2px solid transparent;
                // margin-bottom: 8px;
            }
            .component_border.active {
                border: 2px solid #1455fa;
            }
            .space {
                // margin: 8px 0;
                margin-bottom: 8px;
            }
            .del {
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                position: absolute;
                top: 0;
                right: -53px;
                background-color: #fff;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.16);
                cursor: pointer;
            }
        }
    }
    // 右侧配置项
    .component_configbox {
        overflow: hidden;
        width: 370px;
        .component_config {
            width: 317px !important;
            height: 100%;
            background: #fff;
            overflow-y: scroll;
            text-align: left;
            margin-top: 0;
            .config_header {
                height: 60px;
                line-height: 60px;
                margin: 0;
                text-align: center;
                font-size: 18px;
                border-bottom: 1px solid #eaeaea;
                font-weight: normal;
            }
        }
    }
}

.swiper {
    padding: 20px 20px 60px 20px;
    .title {
        font-size: 12px;
        font-weight: normal;
        color: #666;
        margin: 0;
    }
}

body > .el-container {
    margin-bottom: 40px;
}
.ghost {
    text-align: center;
    color: #1455fa;
    padding: 15px 0;
    border: 2px solid #1455fa;
}
</style>