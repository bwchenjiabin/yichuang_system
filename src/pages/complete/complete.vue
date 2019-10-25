<template>
    <div>
        你输入的数字：<input type="number" v-model="decimal">
        <h3>16进制为：{{hex}}</h3>
    </div>
</template>
<script>
export default {
    data () {
        return {
            hex: 'ff' // 10进制表示255
        }
    },
    computed: {
        decimal: {
            get () {
                return Number.parseInt(this.hex, 16)
            },
            set (value) {
                const dec = Number(value) || 0; 
                this.hex = dec.toString(16)
            }
        }
    }
}
</script>