// 使用这个模块（方法）前要先导入 import exportXlsxPopulate from './export-table'。或者挂载到Vue的原型上，通过this.xxx来调用
import XlsxPopulate from 'xlsx-populate'

function getColumnList(table) {
	// table的数据的结构的示例如下：
	// table: [{
	//     value: 'id',
	//     label: 'ID',
	//     disabled: true,
	//     index: {
	//       '6': '运维',
	//       '1': '开发',
	//       '7': '测试',
	//       '14': '运营'
	//     }
	//   },{
	//     value: 'title',
	//     label: '通告标题',
	//     disabled: true
	//   },{
	//     value: 'content',
	//     label: '通告内容',
	//     isShow: false
	//   },{
	//     value: 'create_time',
	//     label: '发布时间',
	//     isShow: true
	//   }],
	// 定义一个数组，作为中转站，里面有三个元素，分别是数组、数组、对象
	const column_all = [[], [], {}]
	// 对table里面的每一个配置项（对应每一column列）进行遍历
	table.forEach((item) => {
		// 判断每一配置项里面，是否disabled为true，或是否isShow为true，若满足则说明这个配置项（这个column列）要被打印到表格上
		if (item.disabled || item.isShow) {
			column_all[0].push(item.value) // 把配置项里面的value值（每一列对应的字段属性）添加到中转站的第一个元素里，这个元素（数组）就是包含了需要被打印出来的（每一项的）字段属性的组合
			column_all[1].push(item.label) // 把配置项里面的label值（每一列对应的标题）添加到中转站的第二个元素里，这个元素（数组）就是包含了需要被打印出来的（每一项的）标题的组合
			// 对特殊的配置项进行处理，这里的特殊指的是该配置项里面含有index这个属性（其值是一个对象），如果含有index，则把这个index对象（进行深拷贝后）放到中转站的第三个元素，这个元素（对象）就是包含了进行特殊处理的键值对的组合（键是指特殊的字段属性，值是指index对象）
			item.index ? column_all[2][item.value] = JSON.parse(JSON.stringify(item.index)) : ''
		}
	})
	// console.log(column_all)
	// console.log(column_all[2].length) // 这种方法不能判断是否为空对象
	// 中转站column_all的数据的结构的示例如下：
	// [
	//   [
	//     'id', 'title', 'content', 'create_time'  // COLUMNS
	//   ],[
	//     'ID',                                             '日报标题', '日报内容', '发布时间'
	//   ],{
	//     'id': {'6': '运维','1': '开发','7': '测试','14': '运营'}
	//   }
	// ]
	return column_all
}

// exportXlsxPopulate
// 样式暂时没有开启
// 传入的参数分别为：数据对象，表格的名称，需要导出哪些数据（的那个配置数组table）
// 如果这个方法（exportXlsxPopulate）没有传入第三个参数（table），则默认打印出tableData里的所有数据的一个表格
export default function (tableData, title = '表格', table = []) {
	const column_all = getColumnList(table) // 中转站，里面有三个元素，分别是数组、数组、对象。[[], [], {}]
	const column_list = column_all[0] // 把中转站的第一个元素（字段属性的组合）放到column_list这个变量里
	const datas = tableData.data || [] // 把tableData里面的data赋值给datas这个变量，这个datas里面就是包含每一个数据项，每个数据项里面就包含每一排（横）里面的每个小数据（键值对形式，形式为，字段属性:值）
	// datas的数据的结构的示例如下：
	// [{
	//    content: "4111",
	//    create_time: "2022-05-26 14:49:29",
	//    id: 6,
	//    mer_id: 1,
	//    title: "123456",
	// }, {
	//    content: "1231231",
	//    create_time: "2022-05-28 11:31:52",
	//    id: 7,
	//    mer_id: 1,
	//    title: "1123"}]
	// console.log(data)
	// 开始生成表格
	XlsxPopulate.fromBlankAsync().then((workbook) => {
		const wb = workbook.sheet('Sheet1') // 第一个sheet页，命名为Sheet1
		const start = 1 // 大标头开始打印的那一排（横）
		const count = 3 // 大标头结束的那一排
		// 设置第一行的高度
		wb.row(start).height(50) // （一开始）含有大标头的那个单元格的那个格子的高度
		// 设置各列宽
		let charcode_a_uc = 65 // 对应开始打印的那一列
		const start_char = String.fromCharCode(charcode_a_uc) // 对应大写字母A
		// COLUMNS是被打印出来的（每一项的）字段属性的组合（数组）。如果没有传入table，则默认为tableData（第一项数据）里的字段属性的组合。如果有传table且不为空数组，则为table里需要进行打印的字段属性的组合。
		const COLUMNS = column_list.length === 0 ? Object.keys(datas[0]) : column_list
		// column_title是需要被打印出来的（每一项的）标题的组合（数组）。如果没有传入table，则默认为tableData（第一项数据）里的字段属性的组合。如果有传table且不为空数组，则为table里需要进行打印的字段属性对应的标题（label）的组合。
		const column_title = column_list.length === 0 ? COLUMNS : column_all[1]
		// 获取前10条数据项里的每一项里的每个字段属性的最大宽度。把最大宽度对应的那个字段属性的值覆盖到temp_data里
		const temp_data = JSON.parse(JSON.stringify(datas[0]))
		if (datas.length >= 10) {
			COLUMNS.forEach((column) => {
				for (let i = 1; i < 10; i++) {
					// 先把字段属性的值转化为字符串，再进行比较
					if (String(datas[i][column]).length > String(temp_data[column]).length) {
						temp_data[column] = datas[i][column]
					}
				}
			})	// ;console.log(temp_data)
		}
		// datas 代表整个表格数据（里面含有每一个数据项），data代表每一行的数据
		COLUMNS.forEach((column, index) => {
			// 设置每一列的宽度 如wb.column('A').width(10)
			wb.column(String.fromCharCode(charcode_a_uc)).width(Number(String(temp_data[column]).length) + 10)
			// 设置表头（标题） 如wb.cell('A3').value('编号ID')
			wb.cell(String.fromCharCode(charcode_a_uc) + count).value(column_title[index])
			// temp_num是临时变量（数据），用于在每一列进行循环时使用，每一列循环后则重新赋为初始值
			let temp_num = count + 1
			// 判断是否是比较特殊的那一列，是那就进行特殊处理。这里的特殊指的是那一列对应的配置项里面含有index这个属性（其值是一个对象），index里的键值对，其键是指对应的字段属性的值，其值是指（打印出来的时候）将这个值替换为的另一个名称
			// 判断方法是，中转站的第三个元素（对象）的长度不为0，且字段属性在这个对象里面（作为键）
			if (Object.keys(column_all[2]).length && column in column_all[2]) {
				datas.forEach((data) => {
					// 那一列的每一个单元格的真实数据 如wb.cell('A' + count).value(i.id)。而data[column]是指某个数据项里面的（那个特殊的）字段属性的值，然后把这个值作为中转站的第三个元素（对象）的键来进行查找，找到这个键对应的另一个名称
					wb.cell(String.fromCharCode(charcode_a_uc) + temp_num).value(column_all[2][column][data[column]])
					temp_num++
				})
			} else {
				// 这里是一整列数据（分别进行赋值）
				datas.forEach((data) => {
					// 数据 如wb.cell('A' + count).value(item.id)
					wb.cell(String.fromCharCode(charcode_a_uc) + temp_num).value(data[column])
					temp_num++
				})
			}
			// 重新初始化temp_num
			temp_num = count
			// 下一列，为下一轮（列）的每个单元格的赋值做准备
			charcode_a_uc++
		})
		// 标题合并单元格  A列到D列,1行到2行合并
		wb.range(`${start_char}${start}:${String.fromCharCode(charcode_a_uc - 1)}${count - 1}`)
			.merged(true)
			.value(title)
			.style('verticalAlignment', 'center') // 水平居中
			.style('horizontalAlignment', 'center') // 垂直居中
			.style('wrapText', true) // 自动换行
			.style('border', true)
		// Write to file.
		workbook.outputAsync().then(function (blob) {
			if (window.navigator && window.navigator.msSaveOrOpenBlob) {
				// If IE, you must uses a different method.
				window.navigator.msSaveOrOpenBlob(blob, '日报信息记录表.xlsx')
			} else {
				const url = window.URL.createObjectURL(blob)
				const a = document.createElement('a')
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
