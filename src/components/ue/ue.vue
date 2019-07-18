<template>
    <div>
        <script :id="id" type="text/plain"></script>
    </div>
</template>
<script>
import 'static/UE/ueditor.config.js'
import 'static/UE/ueditor.all.js'
import 'static/UE/lang/zh-cn/zh-cn.js'
import 'static/UE/ueditor.parse.js'
import { setTimeout } from 'timers';

export default {
    name: "UE",
    data() {
        return {
            editor: null
        };
    },
    props: {
        defaultMsg: {
            type: String
        },
        config: {
            type: Object
        },
        id: {
            type: String
        }
    },
    mounted() {
        const _this = this;
        this.editor = UE.getEditor(this.id, this.config); // 初始化UE

        // UE.Editor.getActionUrl = function(action) {
        //     console.log(action)
        //     if (
        //         action == "uploadimage" ||
        //         action == "uploadscrawl" ||
        //         action == "uploadimage"
        //     ) {
        //         return "/uploadimage"; //指定访问路径
        //     }
        // };

        this.editor.addListener("ready", function() {
            _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
        });
    },
    methods: {
        // 获取内容方法
        getUEContent() {
            if (!this.editor) {
                this.editor = UE.getEditor(this.id, this.config);
            }
            return this.editor.getContent();
        },
        // 设置内容方法
        setUEContent(content) {
            if (!this.editor) {
                this.editor = UE.getEditor(this.id, this.config);
            }
            setTimeout(() => {
                this.editor.setContent(content);
            }, 1000)
        }
    },
    destroyed() {
        this.editor.destroy();
    }
};
</script>
