// 使用这个模块（方法）前要先导入 import exportXlsxPopulate from './export-table'。或者挂载到Vue的原型上，通过this.xxx来调用
// ref="excelExport" 原则上只能写在<el-table>标签上
// 如果<el-table>标签上没有任何的ref的excelExport，则默认打印出tableData里的所有数据的一个表格
import XlsxPopulate from 'xlsx-populate'

function getColumnList(ref) {
  // console.log(ref)
  // console.log(ref.excelExport.$slots.default[0].componentOptions.propsData)
  let column_all = [[], []]
  for (let key in ref) {
    if (!(ref[key] instanceof HTMLElement) && key === 'excelExport' && ref[key].$slots.default.length > 0) {
      ref[key].$slots.default.forEach((item) => {
        if (item.componentOptions.propsData.prop) {
          column_all[0].push(item.componentOptions.propsData.prop)
          column_all[1].push(item.componentOptions.propsData.label)
        }
      })
    }
  }
  // console.log(column_all)
  // [
  //   [
  //     'id', 'title', 'content', 'create_time'  // COLUMN
  //   ],[
  //     'ID', '日报标题', '日报内容', '发布时间'
  //   ]
  // ]
  return column_all
}

// exportXlsxPopulate
// 样式暂时没有开启
// 传入的参数分别为：数据，表格的名称，这个vue组件的实例this
export default function (tableData, title = '表格', vm) {
  const ref = vm.$refs
  const column_all = getColumnList(ref) //二维数组
  const column_list = column_all[0]
  const data = tableData.data || []
  // console.log(data)
  // 获取前10条数据里的每一项的最大宽度
  let temp_data = JSON.parse(JSON.stringify(data[0]))
  if (data.length >= 10 && column_list.length !== 0) {
    column_list.forEach((item) => {
      for (let i = 1; i < 10; i++) {
        if (String(data[i][item]).length > String(temp_data[item]).length) {
          temp_data[item] = data[i][item]
        }
      }
    })
    // console.log(temp_data)
  }
  // 开始生成表格
  XlsxPopulate.fromBlankAsync().then((workbook) => {
    let wb = workbook.sheet('Sheet1') // 第一个sheet页
    let start = 1
    let count = 3
    // 设置第一行高
    wb.row(start).height(50)
    // 设置各列宽
    let charcode_a_uc = 65 // A
    let start_char = String.fromCharCode(charcode_a_uc)
    const COLUMN = column_list.length === 0 ? Object.keys(data[0]) : column_list
    const column_title = column_list.length === 0 ? COLUMN : column_all[1]
    COLUMN.forEach((item, index) => {
      // 每一列 如wb.column('A').width(10)
      wb.column(String.fromCharCode(charcode_a_uc)).width(Number(String(temp_data[item]).length) + 10)
      // 表头 如wb.cell('A3').value('编号ID')
      wb.cell(String.fromCharCode(charcode_a_uc) + count).value(column_title[index])
      let temp_num = count + 1
      data.forEach((i) => {
        // 数据 如wb.cell('A' + count).value(i.id)
        wb.cell(String.fromCharCode(charcode_a_uc) + temp_num).value(i[item])
        temp_num++
      })
      temp_num = count
      charcode_a_uc++
    })
    // 标题合并单元格  A列到D列,1行到2行合并
    wb.range(`${start_char}${start}:${String.fromCharCode(charcode_a_uc - 1)}${count - 1}`)
      .merged(true)
      .value(title)
      .style('verticalAlignment', 'center') //水平居中
      .style('horizontalAlignment', 'center') //垂直居中
      .style('wrapText', true) //自动换行
      .style('border', true)
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
        a.download = `${title}.xlsx`
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    })
  })
}
