<template>
  <el-select v-model="value" size="mini" @change="handleChange" clearable filterable :multiple="isMultiple" collapse-tags :disabled="disabled" placeholder="-- 请选择 --">
    <el-option
      :loading="loading"
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
    export default {
        props: {
            lables: {
                default: null
            },
            typeName: {
                default: null
            },
            defaultVal: {
                default: null
            },
            disabled: {
                type: Boolean,
                default: false
            },
            isMultiple: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                options: [],
                loading: false,
                value: ''
            }
        },
        watch: {
            defaultVal (val) {
                this.value = val
            }
        },
        methods: {
            handleChange (val) {
                this.$emit('getSelectName', val, this.lables, this.options)
            },
            // 场馆类型
            stadiumType () {
                this.options = [
                    { value: '比赛场馆', label: '比赛场馆' },
                    { value: '训练场馆', label: '训练场馆' }
                ]
            },
            // 设备品牌
            brandList () {
                this.options = [
                    { value: '大华', label: '大华' },
                    { value: '海康', label: '海康' },
                    { value: '宇视', label: '宇视' },
                    { value: '索尼', label: '索尼' }
                ]
            },
            // 协议类型
            protocolList () {
                this.options = [
                    { value: 'RTMP协议', label: 'RTMP协议' },
                    { value: 'RTSP协议', label: 'RTSP协议' },
                    { value: 'HTTP协议', label: 'HTTP协议' }
                ]
            }
        },
        created () {
            this.typeName === '场馆类型' && this.stadiumType()
            this.typeName === '设备品牌' && this.brandList()
            this.typeName === '协议类型' && this.protocolList()
        }
    }
</script>
