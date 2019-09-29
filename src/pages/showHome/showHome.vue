<template>
    <el-scrollbar style="height:100%">
        <div class="box">
            <el-container>
                <el-header
                    style="background-color: rgba(255, 255, 255, 0.95);box-shadow: 0 0 20px -10px #000;"
                >
                    <Header></Header>
                </el-header>
                <el-container>
                    <el-aside width="200px">
                        <sidebar></sidebar>
                    </el-aside>
                    <el-main>
                        <h4>店铺装修</h4>
                        <el-tabs v-model="activeName" @tab-click="handleClick" class="show_content">
                            <el-tab-pane label="店铺主页" name="first" class="phone_box">
                                <div class="phone_show">
                                    <div>
                                        <h1 class="title_img">
                                            <img src="~assets/customcomponent/img_top_weixin.png" />
                                        </h1>
                                        <div
                                            ref="components"
                                            style="background-color: #F5F6F9;box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.05)"
                                        >
                                            <div
                                                style="position: relative"
                                                v-for="(ele,index) in currentList"
                                                :key="index"
                                                :index="index"
                                                @mousedown="setCurrentConfig(ele, index)"
                                                class="component_border"
                                                :class="{active: currentEleIndex == index, space: ele.id == 7 || ele.id == 6 || ele.id == 5 }"
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
                                <div class="setContent">
                                    <el-button
                                        class="btn"
                                        type="primary"
                                        @click="$router.push('/designHome')"
                                    >搭建店铺首页</el-button>
                                    <p class="text">左图是您店铺主页当前的预览效果</p>
                                    <p class="text">主页是用户看到店铺的第一印象, 您可以点击搭建店铺主页选择组件自由组合，搭建个性化的店铺主页</p>
                                </div>
                                <div class="footer_nav">
                                    <div class="nav_item">
                                        <i class="f_icon home_icon"></i>
                                        <span class="item-text" style="color: #ff9000">首页</span>
                                    </div>
                                    <div class="nav_item">
                                        <i class="f_icon duang_icon"></i>
                                        <span class="item-text">头条</span>
                                    </div>
                                    <div class="nav_item">
                                        <i class="f_icon person_icon"></i>
                                        <span class="item-text">我的</span>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <!-- <el-tab-pane label="店铺导航" name="second">店铺导航</el-tab-pane> -->
                        </el-tabs>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </el-scrollbar>
</template>
<script>
import sidebar from "@/components/sidebar/sidebar.vue";
import Header from "@/components/Header/Header.vue";
import { componentDataList } from "@/components/customcomponent/componentList";
import defaultList from "@/components/customcomponent/defaultList";
import { loadDesignHomeData } from "api/userAjax";
import {
    Search,
    Swiper,
    NavigaterBtn,
    Ads,
    CourseList,
    Live,
    NewCourse,
    VipAsd
} from "@/components/customcomponent/componentList";

export default {
    components: {
        Search,
        Swiper,
        NavigaterBtn,
        Ads,
        CourseList,
        Live,
        NewCourse,
        VipAsd,
        sidebar,
        Header
    },
    data() {
        return {
            activeName: "first",
            currentList: [], //分类里组件数组
            currentEleIndex: -1 // 当前正在编辑的组件index
        };
    },
    created() {
        this.reload();
        this.load();
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
        },
        // 初始化回到顶部
        reload() {
            $("body,html").animate({ scrollTop: 0 }, 200);
        },
        handleClicks(row) {
            console.log(row);
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        handleClick(tab, event) {
            console.log(tab, event);
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
        }
    }
};
</script>
<style lang="scss" scoped>
.box {
    background: #f5f5f5;
}
h3 {
    display: inline;
}
.title {
    padding: 20px;
}
.cont li {
    width: 300px;
    height: 200px;
    background: #f4f4f4 100%;
    float: left;
    margin-right: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.bq {
    width: 60px;
    height: 24px;
    line-height: 20px;
    border-radius: 1px;
    text-align: center;
    border: 1px solid rgba(0, 101, 255, 1);
    color: #0065ff;
    font-size: 14px;
    margin-left: 10px;
}
.el-tabs__item {
    padding: 0 50px;
}
.el-input {
    width: auto;
}
.icon {
    width: 6px;
    height: 17px;
    background: blue;
    float: left;
    margin-top: 3px;
}
.title {
    width: auto;
    display: block;
}
.title span {
    margin-left: 10px;
}
.el-scrollbar__wrap {
    overflow-x: hidden;
}
.show_content {
    padding: 20px;
    padding-top: 10px;
    .phone_show {
        position: relative;
        width: 375px;
        height: 677px;
        border: 1px solid #eee;
        overflow-y: scroll;
        -ms-overflow-style: none; //IE 10+
        overflow: -moz-scrollbars-none; //Firefox
        &::-webkit-scrollbar {
            display: none;
        }
        .title_img {
            margin: 0;
            height: 64px;
            width: 100%;
            img {
                width: 100%;
            }
        }
        .space {
            margin: 8px 0;
        }
    }
    .phone_box {
        position: relative;
        .setContent {
            position: absolute;
            top: 10px;
            left: 400px;
            .btn {
                margin-bottom: 20px;
            }
            .text {
                margin-top: 4px;
                color: #666;
                font-size: 16px;
            }
        }
        .footer_nav {
            background-color: #fff;
            margin: 0 auto;
            width: 375px;
            height: 50px;
            position: absolute;
            z-index: 99;
            bottom: 1px;
            left: 1px;
            display: flex;
            box-shadow: 0 -2px 2px 0 #eee;

            .nav_item {
                display: flex;
                flex-direction: column;
                flex: 1;
                align-items: center;
                justify-content: center;
                .f_icon {
                    width: 23px;
                    height: 23px;
                    display: block;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                }
                .home_icon {
                    background-image: url(~assets/customcomponent/f_home.png);
                }
                .duang_icon {
                    background-image: url(~assets/customcomponent/f_duang.png);
                }
                .person_icon {
                    background-image: url(~assets/customcomponent/f_person.png);
                }
                .item-text {
                    color: #666;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>