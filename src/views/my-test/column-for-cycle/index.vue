<template>
	<!--通告管理  -->
	<div class="notice">
		<el-card>
			<div slot="header" class="clearfix">
				<!-- s搜索区 -->
				<div class="container">
					<el-form inline size="small" :label-position="labelPosition">
						<!-- <el-form-item label="所属小区">
							<el-select v-model="tableShow" multiple placeholder="请选择" class="selWidth" @change="showTableArr()">
								<el-option v-for="item in table" :key="item.label" :disabled="item.disabled" :label="item.label" :value="item" />
							</el-select>
						</el-form-item> -->
						<el-form-item label="所属小区">
							<!--              select选择框（多选）的值（数组形式）v-model到tableShow这个数组，里面的每一个元素是指对应的配置项里面的（自定义的）label值-->
							<!--              点击选择框的那个叉叉符号就会触发remove-tag这个方法-->
							<el-select v-model="tableShow" multiple placeholder="请选择" class="selWidth" @remove-tag="(e) => changeTableArr(e)">
								<!--                循环table里的每一个配置项，如果该配置项里（含有）的disabled为真，则表示不能被改变（或移除）-->
								<!--                点击每一个option选项就会触发click事件方法（注意要加上.native）-->
								<el-option v-for="item in table" :key="item.label" :disabled="item.disabled" :label="item.label" :value="item.label" @click.native="item.isShow = !item.isShow" />
							</el-select>
						</el-form-item>

						<el-form-item label="通告标题：" style="display: inline-block">
							<el-input v-model="noticeForm.title_like" placeholder="通告标题" clearable />
						</el-form-item>

						<el-button type="primary" label="default" size="small" @click="get_notice_list(noticeForm.page)">查询</el-button>
					</el-form>
				</div>
				<!-- e搜索区 -->
			</div>

			<!-- s表格 -->
			<el-table :data="tableData.data" style="width: 100%" size="small" highlight-current-row>
				<!--        用于数组形式-->
				<!--        <el-table-column v-for="item in tableShow" :prop="item.value" :label="item.label">-->
				<!--          <template v-slot="scope">-->
				<!--            <div v-if="!item.index">{{ scope.row[item.value] }}</div>-->
				<!--            <div v-else>-->
				<!--              {{ getValue(item,scope.row) }}-->
				<!--            </div>-->
				<!--          </template>-->
				<!--        </el-table-column>-->

				<!--            用于对象形式-->
				<!-- <el-table-column v-for="(column, i) in tableShow" :key="i" :prop="column.value" :label="column.label">
					<template #default="scope">
						<div v-if="!column.index">{{ scope.row[column.value] }}</div>
						<div v-else>
							{{ table[column.value].index[scope.row[column.value]] }}
						</div>
					</template>
				</el-table-column> -->

				<!--            大一统之用于数组形式-->
				<!--        首先根据table里的每一个配置项来循环el-table-column标签，只要disabled或isShow有一个为真就把对应的这个column标签显示出来（注意这里不能用v-show）-->
				<el-table-column v-for="column in table" v-if="column.isShow || column.disabled" :key="column.value" :prop="column.value" :label="column.label">
					<!--					对应展示的内容是tableData.data里的column.value的值，但是如果配置项里的index存在的话，则展示index里面的对应的键的值（另一个名称）-->
					<template v-if="column.index" #default="scope">
						<div>{{ column.index[scope.row[column.value]] }}</div>
					</template>
				</el-table-column>
				<!--        <el-table-column prop="id" label="ID" width="50" />-->

				<!--        <el-table-column prop="title" label="通告标题" min-width="100" :show-overflow-tooltip='true' />-->

				<!--        <el-table-column prop="content" label="通告内容" min-width="100" :show-overflow-tooltip='true' />-->

				<!--        <el-table-column prop="create_time" label="发布时间" width="135" />-->

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
					@current-change="page_change"
				/>
			</div>
			<!-- e表格 -->

			<!-- s通告详情对话框 -->
			<el-dialog title="通告详情" :visible.sync="detailVisible" width="50%">
				<div class="notice-title">{{ detail.title }}</div>
				<div class="notice-content">{{ detail.content }}</div>
				<span slot="footer" class="dialog-footer">
					<el-button size="mini" type="primary" @click="detailVisible = false">关 闭</el-button>
				</span>
			</el-dialog>
			<!-- e通告详情对话框 -->

		</el-card>

		<el-card>
			<!--			<el-button size="small" type="danger" @click="exportExcel(tableData)">用js-xlsx导出Excel</el-button>-->
			<!--			<el-button size="small" type="danger" @click="exportXlsxPopulate(tableData)">用xlsx-populate导出Excel</el-button>-->
			<el-button size="small" type="danger" @click="exportGlobalExcel(tableData)">用前端全局方法自动导出Excel</el-button>
			<!--			<el-button size="small" type="warning" @click="generateExcel()">后端生成excel</el-button>-->
			<!--			<el-button size="small" type="warning" @click="postMsg()"> 推送</el-button>-->
		</el-card>

		<!--    <el-button v-for="item in table">{{ item.label }}</el-button>-->
	</div>
</template>

<script>
// import { get_notice_list, add_notice, generate_excel, PostMsg } from '@/api/property/notice'
// import { get_all_house, get_all_building } from '@/api/property/property'
// import { get_community_list } from '@/api/property/community'
import { get_notice_list } from '../api/property/notice'
// import localStorage from '@/utils/localStorage'
// import XlsxPopulate from 'xlsx-populate'
// import XLSX from 'xlsx'
import exportXlsxPopulate from './export-table'
export default {
	name: 'Notice',
	data() {
		return {
			// 表格显示的形式(数组形式)
			// tableShow: [
			// 	{
			// 		value: 'id',
			// 		label: 'ID',
			// 		disabled: true,
			// 		index: ['运维', '开发', '运维', '开发', '运维', '开发', 'hhh', '开发']
			// 	},
			// 	{
			// 		value: 'title',
			// 		label: '通告标题',
			// 		disabled: true
			// 	}
			// ],

			// 表格显示的形式(对象形式)
			// ableShow: {
			// 	id: {
			// 		value: 'id',
			// 		label: 'ID',
			// 		disabled: true,
			// 		index: ['运维', '开发', '运维', '开发', '运维', '开发', 'hhh', '开发']
			// 	},
			// 	title: {
			// 		value: 'title',
			// 		label: '通告标题',
			// 		disabled: true
			// 	}
			// },

			// 表格配置对象形式
			// table: {
			// 	id: {
			// 		value: 'id',
			// 		label: 'ID',
			// 		disabled: true,
			// 		index: {
			// 			6: '运维',
			// 			9: '开发'
			// 		}
			// 	},
			// 	title: {
			// 		value: 'title',
			// 		label: '通告标题',
			// 		disabled: true
			// 	},
			// 	content: {
			// 		value: 'content',
			// 		label: '通告内容',
			// 		default: false
			// 	},
			// 	create_time: {
			// 		value: 'create_time',
			// 		label: '发布时间',
			// 		default: false
			// 	}
			// },

			// 表格配置config数组形式
			// table: [
			// 	{
			// 		value: 'id',
			// 		label: 'ID',
			// 		disabled: true,
			// 		index: {
			// 			'6': '运维',
			// 			'1': '开发'
			// 		}
			// 	},
			// 	{
			// 		value: 'title',
			// 		label: '通告标题',
			// 		disabled: true
			// 	},
			// 	{
			// 		value: 'content',
			// 		label: '通告内容',
			// 		disabled: false
			// 	},
			// 	{
			// 		value: 'create_time',
			// 		label: '发布时间',
			// 		disabled: false
			// 	}
			// ],

			// 大一统之表格配置全新config数组形式
			tableShow: ['ID', '通告标题', '发布时间'], // 无用，不影响最终打印出来的表格的效果
			// 使用说明：table是一个数组，里面是每一个配置项（对应每一个column列），原则上：示例：
			// table: [{
			//     value: 'id',	// value是tableData里面的某个数据里面的字段名（键）
			//     label: 'ID',	// label是自己自定义的，对应的是当前列（每一个value）的标题
			//     disabled: true, // disabled为true或false，如果为false则可以不写（默认为false），为true则表示导出表格时，（无论isShow是true还是false）该配置项必存在。可以理解为disabled为true时其优先级大于isShow，disabled为false时则以isShow为准。
			//     index: {'6': '运维','1': '开发','7': '测试','14': '运营'} // index是一个对象，如果配置项含有index这个（属性，键）对象（包括空对象），则会展示这个index对象里面的对应属性（字段属性）的值，而不会展示column的scope.row[column.value]默认值。
			//   }, {
			//     value: 'content',
			//     label: '通告内容',
			//     isShow: false // isShow为true或false，如果为true则导出表格时含该配置项，如果为false则反之
			//   }],
			table: [
				{
					value: 'id',
					label: 'ID',
					disabled: true,
					index: {
						'6': '运维',
						'1': '开发',
						'7': '测试',
						'14': '运营'
					}
				},
				{
					value: 'title',
					label: '通告标题',
					disabled: true
				},
				{
					value: 'content',
					label: '通告内容',
					isShow: false
				},
				{
					value: 'create_time',
					label: '发布时间',
					isShow: true
				}
			],

			noticeForm: {
				title_like: '',
				page: 1,
				limit: 20,
				mer_id: 1
			},
			tableData: {
				data: [],
				total: 0
			},
			formLabelWidth: '120px',
			labelPosition: 'right',

			// 详情对话框
			detailVisible: false,
			detail: {}

		}
	},
	mounted() {
		this.get_notice_list()
	},
	methods: {
		// 根据当前表格行的item与键值（用于数组形式）
		getValue(item, row) {
			const key = item.value
			// console.warn(row[key])
			let result = ''
			this.table.forEach((column) => {
				if (column.value === key) {
					console.log(column.index[row[key]])
					result = column.index[row[key]]
				}
			})
			return result
		},

		// showTableArr(e) {
		// 	// e.isShow = !e.isShow
		// 	// e.forEach((item) => {
		// 	// 	item.isShow = !item.isShow
		// 	// })
		// 	console.log(e)
		// },

		changeTableArr(e) {
			// 在每次点击选择框的里面的某个叉叉符号时就会触发
			// console.log(item)
			// 筛选出disabled为真的那一些配置项，在筛选过程中，把对应的那个配置项的isShow赋值为false
			const result = this.table.filter((item) => {
				item.label === e ? item.isShow = false : ''
				return item.disabled
			})
			// console.log(result)
			result.forEach((item) => {
				// 如果点击叉叉符号删掉的是必存在的配置项，则把这个配置项再放回tableShow数组里面
				this.tableShow.indexOf(item.label) !== -1 ? '' : this.tableShow.unshift(item.label)
			})
		},

		// 用前端全局方法自动导出excel
		exportGlobalExcel(tableData) {
			exportXlsxPopulate(tableData, '日报信息记录表', this.table)
		},

		// 获取通告列表
		get_notice_list(num) {
			this.noticeForm.page = num || this.noticeForm.page
			const param = this.noticeForm
			get_notice_list(param)
				.then((res) => {
					console.log(res)
					this.tableData.data = res.data[0].items
					this.tableData.total = res.data[0].total
				})
				.catch((res) => {})
		},

		// 分页
		page_change(page) {
			this.noticeForm.page = page
			this.get_notice_list('')
		},

		handle_size_change(val) {
			this.noticeForm.limit = val
			this.get_notice_list('')
		},

		// 查看通告详情
		open_detail(e) {
			this.detailVisible = true
			this.detail = e
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
