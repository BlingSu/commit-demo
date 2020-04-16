import Pagination from 'component/public/Pagination'
import utils from '@/utils/util'
const mixin = {
  components: {
    Pagination
  },
  data () {
    return {
      isnoIE: null,
      hegihtNum: null,
      loading: false,
      isShow: true, // 查询条件是否张开(需要展开收起改为false)
      showTxt: '展开',
      tableHeight: null, // 表格高度
      treeHeight: {}, // 左侧树形同步表格高度
      treeHeightAll: {}, // 左侧树形同步右侧高度
      currentRows: [],
      currentIds: [],
      dialogTitle: '',
      params: {
        total: 0,
        size: 20,
        current: 1
      },
      headerCalss: {
        height: '47px',
        fontSize: '15px',
        color: '#7F8183',
        border: 'none'
      }
    }
  },
  watch: {

  },
  computed: {},
  mounted () {
    this.$nextTick(() => {
      if (this.$refs.focusVal) {
        this.$refs.focusVal.focus()
      }
    })
  },
  methods: {
    // 加载完再显示滚动条
    LoadOver () {
      document.querySelector('.el-table__body-wrapper').style.overflowX = 'auto'
    },
    // 判断不是ie
    isAgentType () {
      const userAgent = navigator.userAgent
      const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
      const isEdge = userAgent.indexOf('Edge') > -1 && !isIE
      const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
      if (isIE) {
        let reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        let fIEVersion = parseFloat(RegExp.$1)
        if (fIEVersion === 7) {
          this.isnoIE = false
        } else if (fIEVersion === 8) {
          this.isnoIE = false
        } else if (fIEVersion === 9) {
          this.isnoIE = false
        } else if (fIEVersion === 10) {
          this.isnoIE = false
        } else {
          this.isnoIE = false
        }
      } else if (isEdge) {
        this.isnoIE = false
      } else if (isIE11) {
        this.isnoIE = false
      } else {
        this.isnoIE = true
      }
    },
    getRowsData (rows) { // 获取选中行数
      this.currentRows = rows
      this.currentIds = this.currentRows.map(row => row && row.id)
    },
    getPagination (res, page) { // 获取分页参数
      this.params.total = res.totalRows
      this.params.size = res.pageRows
      this.params.current = res.currentPage
      // 获取完分页获取高度
      this.$nextTick(() => {
        this.getheihgt()
      })
    },
    handleCurrentChange (currentPage) { // 分页触发
      this.params.current = currentPage
      this.getTableData(1)
    },
    handleSizeChange (currentSize) {
      this.params.current = 1
      this.params.size = currentSize
      this.getTableData(1)
    },
    // 对比两数组,return筛选不相同的
    getArrDifference (data, data2) {
      return data.concat(data2).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v)
      })
    },
    getheihgt () {
      this.tableHeight = utils.getTableHeight(60, '.top', '.footer-btn', null, null)
      let resizeTimer = null
      let that = this
      window.addEventListener('resize', () => {
        if (resizeTimer) clearTimeout(resizeTimer)
        resizeTimer = setTimeout(function () {
          // 表格高度
          that.tableHeight = utils.getTableHeight(60, '.top', '.footer-btn', null, null)
          // that.hegihtNum = document.querySelector('.filterForm').clientHeight
        }, 200)
      })
    }
  }
}
export default mixin
