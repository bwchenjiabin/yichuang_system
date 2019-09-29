<template>
    <div class="component_item">
        <h3 class="component_name">{{ele.text}}</h3>
        <div class="swiper">
            <div class="option">
                <h5 class="title">选择专题</h5>
                <div>
                    <el-select v-model="classValue" placeholder="示例专题" @change="changeClass" style="width: 100%;">
                        <el-option
                        v-for="item in classList"
                        :key="item.kindId"
                        :label="item.kindName"
                        :value="item.kindName"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="option">
                <h5 class="title">选择要在首页展示的课程(请按照要展示的顺序勾选)</h5>
                <div>
                    <el-checkbox-group size="medium" v-model="lessonCheckedList">
                        <el-checkbox
                        border
                        v-for="item in lessonList"
                        :key="item.lessonid"
                        :label="item.lessonid"
                        style="width: 100%;margin-left: 0;margin-bottom: 10px;">
                        {{item.lessonName}}
                        </el-checkbox>
                        <!-- <el-checkbox label="0" checked v-if="lessonList === null" style="width: 100%;margin-left: 0;margin-bottom: 10px;">示例课程</el-checkbox> -->
                    </el-checkbox-group>
                    <p v-if="lessonList.length == 0">该专题下没有课程</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {checkclass, classlesson} from 'api/userAjax';

export default {
    data() {
        return {
            ele: {},
            classList: [],
            classValue: "",
            lessonList: [],
            lessonCheckedList: []
        }
    },
    props: ["currentEle"],
    methods: {
        // 查询分类
        getClass() {
            checkclass(localStorage.getItem('ex2')).then(res => {
                this.classList = res.data;
                this.lessonCheckedList = [];
            })
        },
        getLesson(id) {
            classlesson(id, localStorage.getItem('ex2'), 2).then(res => {
                this.lessonList = res.data.data.data;
            });
        },
        changeClass(val) {
            this.lessonCheckedList = []
            this.ele.config.titleName = val
            this.ele.config.classId = val
            this.ele.config.showList = this.lessonCheckedList
            this.$emit("setConfig", this.ele)
            this.getLesson(val)
        },
        resetConfig() {
            if(this.ele.config.classId != 0) {
                this.classValue = this.ele.config.classId
                this.getLesson(this.ele.config.classId)
                this.lessonCheckedList = this.ele.config.showList
            } else {
                this.classValue = ""
                this.lessonList = []
            }
        }
    },
    watch: {
        lessonCheckedList(newVal) {
            this.ele.config.showList = newVal
            this.$emit("setConfig", this.ele)
        }
    },
    created() {
        this.ele = JSON.parse(JSON.stringify(this.currentEle));
        this.getClass();
        this.resetConfig()
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