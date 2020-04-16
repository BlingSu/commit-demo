<template>
  <div id="pagination">
    <el-pagination
      background
      :total="params.total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="params.size"
      :current-page="params.current"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      class="pagination">
    </el-pagination>
  </div>
</template>

<script>

    export default {
        name: 'pagination',
        props: ['params'],
        data () {
            return {
                current: 1,
                size: '',
                total: null
            }
        },
        methods: {
            handleSizeChange (val) {
                this.size = val
                this.$emit('hanleSize', this.size)
            },
            handleCurrentChange (val) {
                document.querySelector('.el-table__body-wrapper').scrollTop = 0
                this.current = val
                this.$emit('hanlePage', this.current)
            }
        },
        created () {
        }
    }
</script>

<style>
#pagination{
  min-width: 390px;
  text-align: right;
}
#pagination .el-input--mini .el-input__inner {
  width: inherit;
}
#pagination .el-pagination.is-background .el-pager li:not(.disabled).active {
  border-radius: 50%
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
  background-color: transparent;
}
#pagination .el-pagination.is-background .el-pager li {
  border-radius: 50%;
}
#pagination .el-pagination__total,
#pagination .el-pagination__jump {
  color:#333;
  font-weight: 500;
  margin-left: 0;
}
#pagination .el-pagination .btn-next .el-icon,#pagination .el-pagination .btn-prev .el-icon{
  display: block !important;
}
#pagination .number{
  margin:0;
}
</style>
