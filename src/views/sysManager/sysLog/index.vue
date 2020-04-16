<template>
  <div class="sys_log_page">
    <div class="top clearfix">
      <div class="queryInput fl">
        <el-form :model="filterForm" ref="filterForm" class="filterForm" :inline="true">
          <el-form-item label="账号">
            <el-input v-model.trim="filterForm.accountName" size="mini" placeholder="账号" maxlength="50" clearable></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model.trim="filterForm.userName" size="mini" placeholder="用户名" maxlength="50" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="queryBtn fr">
        <el-button type="primary" icon="el-icon-search" size="medium" @click="getTableData"></el-button>
      </div>
    </div>
    <div class="tableBackgroundDiv">
      <el-table
        v-loading="loading"
        :data="tableData"
        :height="tableHeight"
        :header-cell-style="headerCalss"
        border
        ref="table"
        size="mini"
        style="width: 100%">
        <el-table-column type="index" fixed="left" header-align="center" align="center" width="50" label="序号"></el-table-column>
        <el-table-column prop="operationAccount" header-align="center" align="center" label="账号"></el-table-column>
        <el-table-column prop="operationName" header-align="center" align="center" label="姓名"></el-table-column>
        <el-table-column prop="requestMethod" header-align="center" align="center" label="请求方式"></el-table-column>
        <el-table-column prop="requestUri" header-align="center" align="center" label="请求链接"></el-table-column>
        <el-table-column prop="description" header-align="center" align="center" label="描述"></el-table-column>
        <el-table-column prop="createTime" header-align="center" align="center" label="操作时间"></el-table-column>
      </el-table>
    </div>
    <el-form :inline="true" class="footer-btn clearfix">
      <Pagination class="pageClass"
        :params="params"
        @hanlePage="handleCurrentChange"
        @hanleSize="handleSizeChange">
      </Pagination>
    </el-form>
  </div>
</template>
<script>
    import mixin from '@/mixin'
    // import { logPage } from '@/api/api'
    export default {
        mixins: [mixin],
        components: {},
        data () {
            return {
                filterForm: {
                    accountName: '',
                    userName: ''
                },
                loading: true,
                tableData: []
            }
        },
        watch: {
            filterForm: {
                handler: function () {
                    this.params.current = 1
                    this.getTableData()
                },
                deep: true
            }
        },
        methods: {
            getTableData () {
                this.loading = true
                // logPage({
                //     page: this.params.current,
                //     size: this.params.size,
                //     ...this.filterForm
                // }).then(res => {
                //     this.tableData = res.data
                //     this.getPagination(res)
                //     this.loading = false
                // })
            }
        },
        created () {},
        mounted () {
            this.hegihtNum = document.querySelector('.filterForm').clientHeight
            this.getheihgt()
            // this.getTableData()
        }
    }
</script>
