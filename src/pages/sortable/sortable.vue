<template>
    <div>
        <ul ref="group1">
            <li class="item1">item 1</li>
            <li class="item2">item 2</li>
            <li class="item3">item 3</li>
        </ul>
        <hr>
        <ul ref="group2">
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
            <li v-if="show">item 4</li>
        </ul>
        <button @click="show = !show">按钮</button>
    </div>
</template>
<script>
import Sortable from 'sortablejs';

export default {
    data() {
        return{
            show: false
        }
    },
    computed: {
        group1() {
            return this.$refs.group1
        },
        group2() {
            return this.$refs.group2
        }
    },
    mounted() {
        new Sortable(this.group1, {
            group: {
                name: "group",
                pull: "clone",
                put: false
            },
            sort: false,
            animation: 150,
            ghostClass: "sortable-ghost",
            onEnd(e) {
                console.log(e.item)
            }
        })
        new Sortable(this.group2, {
            group: {
                name: "group",
                put: (to, from, item) => {
                    return true
                },
                revertClone: true
            },
            animation: 150,
            ghostClass: "sortable-ghost",
            onChoose(e) {
                for (let i=0;i<e.target.children.length;i++) {
                    e.target.children[i].classList.remove("active")
                }
                e.item.classList.add("active")
                console.log(e.oldIndex)
            },
            onUpdate(e) {
                console.log(e.oldIndex, e.newIndex)
            }
        })
    }
}
</script>
<style lang="scss" scoped>
    .active{
        border:1px solid red;
    }
</style>