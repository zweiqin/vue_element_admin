<template>
  <!--日报管理  -->
  <div class="notice">
    <el-card>
      <div slot="header" class="clearfix">
        <!-- s搜索区 -->
        <div class="container">
          <el-form inline size="small" :label-position="labelPosition">
            <!-- <el-form-item label="所属小区">
              <el-select
                v-model="noticeForm.community_code"
                clearable
                placeholder="请选择"
                class="selWidth"
                @change="get_list()"
              >
                <el-option v-for="(item,index) in community_list" :key="index" :label="item.name" :value="item.code"/>
              </el-select>
            </el-form-item> -->

            <el-form-item label="日报标题：" style="display: inline-block">
              <el-input v-model="noticeForm.title_like" placeholder="日报标题" clearable />
            </el-form-item>

            <el-button type="primary" label="default" size="small" @click="get_notice_list(noticeForm.page)">查询</el-button>
          </el-form>
        </div>
        <!-- e搜索区 -->

        <el-button type="primary" label="default" size="small" @click="addVisible = true">新增日报</el-button>
      </div>

      <!-- s表格 -->
      <el-table :data="tableData.data" style="width: 100%" size="small" highlight-current-row>
        <el-table-column prop="id" label="ID" width="50" />

        <el-table-column prop="title" label="日报标题" min-width="100" :show-overflow-tooltip="true" />

        <el-table-column prop="content" label="日报内容" min-width="100" :show-overflow-tooltip="true" />

        <el-table-column prop="create_time" label="发布时间" width="135" />

        <el-table-column label="操作" width="50" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="mr10" @click="open_detail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="fr">
        <el-pagination
          :page-sizes="[10, 20, 40, 60, 80]"
          :page-size="noticeForm.limit"
          :current-page="noticeForm.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handle_size_change"
          @current-change="page_change" />
      </div>
      <!-- e表格 -->

      <!-- s日报详情对话框 -->
      <el-dialog title="日报详情" :visible.sync="detailVisible" width="50%">
        <div class="notice-title">{{ detail.title }}</div>
        <div class="notice-content">{{ detail.content }}</div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="detailVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
      <!-- e日报详情对话框 -->

      <!-- s新增日报对话框 -->
      <el-dialog title="新增日报" :visible.sync="addVisible" width="50%">
        <el-form ref="addForm" :model="addForm" :rules="addRules">
          <el-form-item label="日报标题" :label-width="formLabelWidth" prop="title">
            <el-input v-model="addForm.title" autocomplete="off" placeholder="请输入日报标题" />
          </el-form-item>

          <el-form-item label="日报内容" :label-width="formLabelWidth" prop="content">
            <el-input v-model="addForm.content" autocomplete="off" placeholder="请输入日报内容" type="textarea" :rows="15" />
          </el-form-item>

          <el-form-item label="日报对象" :label-width="formLabelWidth">
            <el-button size="small" type="primary" @click="memberVisible = true">点击选择</el-button>
            <el-tag style="margin-left: 1em" v-if="addForm.member_id_list.length == 0" type="info">暂未选择</el-tag>
            <el-tag style="margin-left: 1em" v-else type="success">已选择</el-tag>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="add_notice('addForm')">确 认</el-button>
        </span>
      </el-dialog>
      <!-- e新增日报对话框 -->

      <el-dialog title="选择日报对象" :visible.sync="memberVisible" width="70%">
        <el-form ref="memberForm" :model="memberForm">
          <el-form-item label="所属小区" prop="community_code">
            <el-select v-model="memberForm.community_code" clearable placeholder="请选择" class="selWidth" @change="change_building('memberForm')">
              <el-option v-for="(item, index) in community_list" :key="index" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>

          <el-form-item label="所属栋数" prop="building_code">
            <el-select :disabled="build_disabled" v-model="memberForm.building_code" clearable placeholder="请选择" @change="get_all_house()" class="selWidth">
              <el-option v-for="(item, index) in build_list" :key="index" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-form>

        <ux-grid
          ref="plxTable"
          :height="height"
          :checkboxConfig="{ checkMethod: selectable, highlight: true }"
          @selection-change="selectionChange"
          @table-body-scroll="scroll"
          show-header-overflow="ellipsis">
          <ux-table-column type="checkbox" width="50" />

          <ux-table-column title="小区名称" field="community_code__name" min-width="100" />

          <ux-table-column title="栋数" field="building_code__name" min-width="100" />

          <ux-table-column title="房产号" field="name" min-width="100" />

          <ux-table-column title="业主姓名" field="m_id__username" min-width="100" />

          <ux-table-column title="业主联系方式" field="m_id__mobile" min-width="100" />
        </ux-grid>

        <span slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="memberVisible = false">确 认</el-button>
        </span>
      </el-dialog>
    </el-card>
    <el-card>
      <el-button size="small" type="danger" @click="exportExcel(tableData)">用js-xlsx导出Excel</el-button>
      <el-button size="small" type="danger" @click="exportXlsxPopulate(tableData)">用xlsx-populate导出Excel</el-button>
    </el-card>
    <el-card>
      <my-component>自定义组件里面的内容</my-component>
    </el-card>
  </div>
</template>

<script>
import { get_notice_list, add_notice } from '../api/property/notice'
import { get_all_house, get_all_building } from '../api/property/property'
import { get_community_list } from '../api/property/community'
import XLSX from 'xlsx'
import XlsxPopulate from 'xlsx-populate'
export default {
  name: 'notice',
  data() {
    return {
      noticeForm: {
        title_like: '',
        page: 1,
        limit: 10,
        mer_id: 1
      },
      tableData: {
        data: [],
        total: 0
      },
      formLabelWidth: '120px',
      labelPosition: 'right',
      //详情对话框
      detailVisible: false,
      detail: {},
      //新增日报
      addVisible: false,
      addForm: {
        member_id_list: [],
        title: '',
        content: '',
        mer_id: 1
      },
      addRules: {
        title: [
          {
            required: true,
            message: '日报标题不能为空',
            change: 'blue'
          }
        ],
        content: [
          {
            required: true,
            message: '日报内容不能为空',
            change: 'blue'
          }
        ]
      },
      memberVisible: false,
      community_list: [],
      build_list: [],
      build_disabled: false,
      memberForm: {
        community_code: '',
        building_code: '',
        mer_id: 1
      },
      height: 500
    }
  },
  mounted() {
    this.get_community_list()
    this.get_notice_list()
    console.log(this.$compute(996).add(997))
    // console.log(compute(996).add(997))
  },
  methods: {
    //获取日报列表
    get_notice_list(num) {
      this.noticeForm.page = num || this.noticeForm.page
      const param = this.noticeForm
      get_notice_list(param)
        .then((res) => {
          // console.log(res);
          this.tableData.data = res.data[0].items
          this.tableData.total = res.data[0].total
        })
        .catch((res) => {})
    },

    //分页
    page_change(page) {
      this.noticeForm.page = page
      this.get_notice_list('')
    },

    handle_size_change(val) {
      this.noticeForm.limit = val
      this.get_notice_list('')
    },

    //查看日报详情
    open_detail(e) {
      this.detailVisible = true
      this.detail = e
    },

    //获取小区信息
    get_community_list() {
      get_community_list({
        name_like: '',
        limit: '',
        status: 1,
        mer_id: 1
      })
        .then((res) => {
          // console.log(res);
          this.community_list = res.data[0].items
        })
        .catch((err) => {
          this.$message.error(err.data.data)
        })
    },

    //更换小区
    async change_building(data) {
      this.memberForm.building_code = ''
      if (this.memberForm.community_code != '' && this.memberForm.community_code != undefined) {
        await this.get_building_list(data)
        this.get_all_house(data)
        this.build_disabled = false
      } else {
        this.build_disabled = true
      }
    },

    //获取栋数
    async get_building_list(data) {
      await get_all_building(this[data])
        .then((res) => {
          // console.log(res)
          this.build_list = res.data[0].items
        })
        .catch((err) => {
          this.$message.error(err.data)
        })
    },

    //获取某小区所有人员
    get_all_house() {
      get_all_house(this.memberForm)
        .then((res) => {
          // console.log(res)
          this.$refs.plxTable.reloadData(res.data)
        })
        .catch((err) => {
          this.$message.error(err.data)
        })
    },

    //添加日报
    add_notice(formName) {
      this.$refs[formName].validate(async (valid) => {
        // 若必填项不为空
        if (valid) {
          if (this.addForm.member_id_list.length == 0) {
            this.$message.error('请先选择日报对象')
            return
          }
          add_notice(this.addForm)
            .then((res) => {
              this.addVisible = false
              this.$message.success('添加成功！')
              this.$refs['addForm'].resetFields()
              this.addForm.member_id_list = []
              this.$refs['memberForm'].resetFields()
              this.$refs.plxTable.reloadData([])

              this.get_notice_list()
            })
            .catch((err) => {
              this.$message.error(err.data.data)
            })
        } else {
          return false
        }
      })
    },

    //滚动时赋值顶部坐标
    scroll({ scrollTop, scrollLeft }) {
      this.scrollTop = scrollTop
    },

    selectable({ row }) {
      return row.id !== 2
    },

    // 选中的行
    selectionChange(row) {
      console.log(row)
      this.addForm.member_id_list = []
      if (row.length != 0) {
        row.forEach((item) => {
          this.addForm.member_id_list.push(item.m_id)
        })
      } else {
        this.addForm.member_id_list = []
      }
    },

    exportExcel(tableData, fileName = '日报信息记录表.xlsx') {
      // 表头
      const headers = {
        A1: { v: '日报信息记录表' },
        A3: { v: '编号ID' },
        B3: { v: '日报标题' },
        C3: { v: '日报内容' },
        D3: { v: '发布时间' }
      }
      // 数据
      const data = {
        // A4: { v: '100' },
        // B4: { v: '张三' },
        // C4: { v: '28' },
        // D4: { v: 'sanzhang@outlook.com' },
        // A5: { v: '200' },
        // B5: { v: '李四' },
        // C5: { v: '26' },
        // D5: { v: 'sili@sina.com' },
      }
      let count = 4
      // console.log(tableData.data)
      tableData.data.forEach((item) => {
        data['A' + count] = { v: item.id }
        data['B' + count] = { v: item.title }
        data['C' + count] = { v: item.content }
        data['D' + count] = { v: item.create_time }
        count++
      })
      // console.log(this)
      // 合并 headers 和 data
      const output = Object.assign({}, headers, data)
      // 获取所有单元格的位置
      const outputPos = Object.keys(output)
      // 计算出范围 ,["A1",..., "H2"]
      const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`
      // 构建 workbook 对象
      const wb = {
        // SheetNames: ['mySheet1', 'mySheet2'],
        SheetNames: ['daily'],
        Sheets: {
          daily: Object.assign({}, output, {
            '!ref': ref,
            // 列宽度
            '!cols': [{ wpx: 60 }, { wpx: 100 }, { wpx: 200 }, { wpx: 150 }],
            // 合并单元格 0到1行，0到3列合并
            '!merges': [
              {
                s: {
                  // s开始
                  c: 0, // 开始列
                  r: 0 // 开始行
                },
                e: {
                  // e结束
                  c: 3, // 结束列
                  r: 1 // 结束行
                }
              }
            ]
          })
        }
      }
      // 导出 Excel
      XLSX.writeFile(wb, fileName)
    },

    exportXlsxPopulate(tableData) {
      XlsxPopulate.fromBlankAsync().then((workbook) => {
        // Modify the workbook.
        // 第一个sheet页
        let wb = workbook.sheet('Sheet1')
        // 设置A列宽
        // console.log(wb)
        wb.column('A').width(10)
        wb.column('B').width(20)
        wb.column('C').width(45)
        wb.column('D').width(30)
        // 设置第一行高
        wb.row(1).height(50)
        // 标题合并单元格  A列到D列,1行到2行合并
        wb.range('A1:D2')
          .merged(true)
          .value('日报信息记录表\n内容：')
          .style('verticalAlignment', 'center') //水平居中
          .style('horizontalAlignment', 'center') //垂直居中
          .style('wrapText', true) //自动换行
          .style('border', true)
        // 表头
        wb.cell('A3')
          .value('编号ID')
          .style('border', true)
          .style('verticalAlignment', 'center') //水平居中
          .style('horizontalAlignment', 'center') //垂直居中;
        wb.cell('B3')
          .value('日报标题')
          .style('border', true)
          .style('verticalAlignment', 'center') //水平居中
          .style('horizontalAlignment', 'center') //垂直居中;
        wb.cell('C3')
          .value('日报内容')
          .style('border', true)
          .style('verticalAlignment', 'center') //水平居中
          .style('horizontalAlignment', 'center') //垂直居中;
        wb.cell('D3')
          .value('发布时间')
          .style('border', true)
          .style('verticalAlignment', 'center') //水平居中
          .style('horizontalAlignment', 'center') //垂直居中;
        // 数据
        // console.log(tableData.data)
        let count = 4
        tableData.data.forEach((item) => {
          wb.cell('A' + count)
            .value(item.id)
            .style('border', true)
            .style('verticalAlignment', 'center') //水平居中
            .style('horizontalAlignment', 'center') //垂直居中;
          wb.cell('B' + count)
            .value(item.title)
            .style('border', true)
            .style('verticalAlignment', 'center') //水平居中
            .style('horizontalAlignment', 'center') //垂直居中;
          wb.cell('C' + count)
            .value(item.content)
            .style('border', true)
            .style('verticalAlignment', 'center') //水平居中
            .style('horizontalAlignment', 'center') //垂直居中;
          wb.cell('D' + count)
            .value(item.create_time)
            .style('border', true)
            .style('verticalAlignment', 'center') //水平居中
            .style('horizontalAlignment', 'center') //垂直居中;
          count++
        })
        // Write to file.
        workbook.outputAsync().then(function (blob) {
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // If IE, you must uses a different method.
            window.navigator.msSaveOrOpenBlob(blob, '日报信息记录表.xlsx')
          } else {
            let url = window.URL.createObjectURL(blob)
            let a = document.createElement('a')
            document.body.appendChild(a)
            a.href = url
            a.download = '日报信息记录表.xlsx'
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
::deep [type='reset'],
[type='submit'],
button,
html [type='button'] {
  -webkit-appearance: none !important;
}
//限制el-tooltop宽度
.el-tooltip__popper {
  max-width: 600px;
}
.notice {
  padding: 1em;
  .notice-title {
    font-size: 18px;
  }
  .notice-content {
    margin-top: 1.5em;
    font-size: 14px;
  }
}
</style>
